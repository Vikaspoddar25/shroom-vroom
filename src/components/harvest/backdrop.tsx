"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { evalTimeline } from "./timeline";

interface Progress {
  get(): number;
}

const vert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}`;

/**
 * Full-screen atmosphere: vertical gradient, a "sun" that drifts across with scroll,
 * slow fractal mist and film grain. Colours come from the site theme.
 */
const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform float uAspect;
uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uGlow;
uniform float uGlowAmt;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec3 col = mix(uBottom, uTop, smoothstep(0.0, 1.0, uv.y));

  vec2 sun = vec2(mix(0.12, 0.85, uProgress), 1.02);
  float d = distance(uv * vec2(uAspect, 1.0), sun * vec2(uAspect, 1.0));
  col += uGlow * exp(-d * 1.9) * (0.35 + 0.65 * uGlowAmt);

  float m = fbm(uv * vec2(2.6, 1.6) + vec2(uTime * 0.015, uProgress * 0.8));
  col += uGlow * (m - 0.35) * 0.16;

  float vig = smoothstep(0.35, 1.15, length((uv - 0.5) * vec2(uAspect * 0.7, 1.0)));
  col *= 1.0 - vig * 0.28;

  col += (hash(uv * 900.0 + fract(uTime)) - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

export function Backdrop({ progress, dark }: { progress: Progress; dark: boolean }) {
  const size = useThree((s) => s.size);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uAspect: { value: 1 },
      uTop: { value: new THREE.Color() },
      uBottom: { value: new THREE.Color() },
      uGlow: { value: new THREE.Color() },
      uGlowAmt: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    if (dark) {
      uniforms.uTop.value.set("#0b1510");
      uniforms.uBottom.value.set("#121412");
      uniforms.uGlow.value.set("#4b7d5d");
    } else {
      uniforms.uTop.value.set("#d9e5d2");
      uniforms.uBottom.value.set("#f5efe2");
      uniforms.uGlow.value.set("#ffd9a3");
    }
  }, [dark, uniforms]);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    const s = evalTimeline(progress.get());
    uniforms.uProgress.value = s.p;
    uniforms.uGlowAmt.value = s.glow;
    uniforms.uAspect.value = size.width / size.height;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-100}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
