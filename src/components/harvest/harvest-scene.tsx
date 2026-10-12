"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { createMaterials } from "./materials";
import { Backdrop } from "./backdrop";
import { GrowBag, HeroCluster } from "./grow-bag";
import { Hand } from "./hand";
import { Crumbs } from "./crumbs";
import { evalTimeline } from "./timeline";

interface Progress {
  get(): number;
}

export interface HarvestSceneProps {
  progress: Progress;
  quality: "high" | "medium";
  dark: boolean;
  /** render loop runs only while the section is on screen */
  active: boolean;
  onReady?: () => void;
  onFail?: () => void;
}

function CameraRig({ progress }: { progress: Progress }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const s = evalTimeline(progress.get());
    const shift = camera.aspect > 1.2 ? s.shiftX : 0;
    // portrait screens: pull back so the bag and the hand still fit the narrower frame
    const k = camera.aspect < 1 ? 1 + (1 - camera.aspect) * 0.9 : 1;
    look.set(s.camLook[0] + shift, s.camLook[1], s.camLook[2]);
    camera.position.set(
      look.x + (s.camPos[0] + shift - look.x) * k,
      look.y + (s.camPos[1] - look.y) * k,
      look.z + (s.camPos[2] - look.z) * k
    );
    camera.lookAt(look);
    if (Math.abs(camera.fov - s.fov) > 0.01) {
      camera.fov = s.fov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

function World({
  progress,
  quality,
  dark,
}: Pick<HarvestSceneProps, "progress" | "quality" | "dark">) {
  const shadows = quality === "high";
  const mats = useMemo(() => createMaterials(), []);
  useEffect(() => () => mats.dispose(), [mats]);

  return (
    <>
      <Backdrop progress={progress} dark={dark} />
      <CameraRig progress={progress} />

      <hemisphereLight
        args={[dark ? "#6f8f7c" : "#e4efff", dark ? "#1c1a14" : "#8a7350", dark ? 0.5 : 0.75]}
      />
      <directionalLight
        position={[3.5, 6, 6]}
        intensity={dark ? 2.2 : 3.1}
        color="#fff0d6"
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.025}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={1}
        shadow-camera-far={20}
      />
      <directionalLight
        position={[-5, 2.5, -2]}
        intensity={dark ? 1.0 : 0.7}
        color={dark ? "#9fd8b4" : "#e6efe0"}
      />

      <Environment resolution={256} frames={1} environmentIntensity={dark ? 0.5 : 0.9}>
        <Lightformer
          form="rect"
          intensity={3.2}
          position={[0, 5, 3]}
          scale={[9, 3, 1]}
          color="#fff3dc"
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[-5, 1, 2]}
          scale={[3, 6, 1]}
          color="#d3ead9"
        />
        <Lightformer
          form="rect"
          intensity={1}
          position={[5, 0, 1]}
          scale={[2, 5, 1]}
          color="#ffe2b8"
        />
        <Lightformer form="ring" intensity={1.5} position={[0, 1, -5]} scale={6} color="#ffffff" />
      </Environment>

      <GrowBag progress={progress} mats={mats} shadows={shadows} />
      <HeroCluster progress={progress} mats={mats} shadows={shadows} />
      <Hand progress={progress} mats={mats} shadows={shadows} />
      <Crumbs progress={progress} mats={mats} />
    </>
  );
}

/** Default export so the section can `dynamic()`-import the whole 3D chunk. */
export default function HarvestScene({
  progress,
  quality,
  dark,
  active,
  onReady,
  onFail,
}: HarvestSceneProps) {
  const high = quality === "high";
  return (
    <Canvas
      aria-hidden
      shadows={high ? "soft" : false}
      dpr={high ? [1, 1.75] : 1}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 34, near: 0.1, far: 60, position: [1.4, 0.7, 7.6] }}
      gl={{ antialias: high, powerPreference: "high-performance", alpha: false }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail?.();
        });
        onReady?.();
      }}
    >
      <World progress={progress} quality={quality} dark={dark} />
    </Canvas>
  );
}
