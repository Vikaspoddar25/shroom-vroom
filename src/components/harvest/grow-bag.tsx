"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildBag, buildMound } from "./procedural";
import { Mushroom, HERO_SPECS, type StemSpec } from "./mushroom";
import type { HarvestMaterials } from "./materials";
import {
  BAG_RADIUS,
  HERO_ROOT,
  HERO_SCALE,
  evalTimeline,
  mushroomQuaternion,
  type Vec3,
} from "./timeline";

interface Progress {
  get(): number;
}

const BAG_H = 4.4;
const BAG_Y = -3.3;

interface Bg {
  theta: number;
  y: number;
  /** [side, up, out] in the bag-surface frame */
  dir: Vec3;
  len: number;
  capR: number;
  yaw: number;
  tilt: number;
  seed: number;
}

const BG: Bg[] = [
  {
    theta: -0.3,
    y: -0.72,
    dir: [-0.35, 0.85, 0.45],
    len: 0.72,
    capR: 0.58,
    yaw: 3.4,
    tilt: 0.55,
    seed: 41,
  },
  {
    theta: -0.62,
    y: -0.8,
    dir: [-0.55, 0.7, 0.5],
    len: 0.56,
    capR: 0.5,
    yaw: 2.9,
    tilt: 0.6,
    seed: 43,
  },
  {
    theta: -0.88,
    y: -0.7,
    dir: [-0.7, 0.65, 0.3],
    len: 0.5,
    capR: 0.42,
    yaw: 2.4,
    tilt: 0.65,
    seed: 47,
  },
  {
    theta: 0.52,
    y: -0.82,
    dir: [0.45, 0.75, 0.5],
    len: 0.62,
    capR: 0.52,
    yaw: -0.8,
    tilt: 0.55,
    seed: 53,
  },
  {
    theta: 0.82,
    y: -0.74,
    dir: [0.6, 0.7, 0.4],
    len: 0.5,
    capR: 0.44,
    yaw: -1.2,
    tilt: 0.6,
    seed: 59,
  },
  {
    theta: 0.05,
    y: -1.02,
    dir: [0.1, 0.55, 0.85],
    len: 0.42,
    capR: 0.4,
    yaw: 0.5,
    tilt: 0.45,
    seed: 61,
  },
  {
    theta: -0.16,
    y: -0.98,
    dir: [-0.2, 0.5, 0.8],
    len: 0.3,
    capR: 0.26,
    yaw: 1.1,
    tilt: 0.5,
    seed: 67,
  },
  {
    theta: 0.38,
    y: -1.0,
    dir: [0.2, 0.5, 0.8],
    len: 0.3,
    capR: 0.25,
    yaw: -0.4,
    tilt: 0.5,
    seed: 71,
  },
];

function BgMushroom({ b, mats, shadows }: { b: Bg; mats: HarvestMaterials; shadows: boolean }) {
  const spec: StemSpec = useMemo(
    () => ({
      pos: [0, 0, 0],
      dir: b.dir,
      len: b.len,
      r0: 0.1 + b.capR * 0.07,
      r1: 0.085 + b.capR * 0.05,
      bend: (b.theta > 0 ? 1 : -1) * 0.1,
      capR: b.capR,
      yaw: b.yaw,
      tilt: b.tilt,
      seed: b.seed,
    }),
    [b]
  );
  return (
    <group rotation-y={b.theta}>
      <group position={[0, b.y, BAG_RADIUS + 0.1]}>
        <Mushroom spec={spec} mats={mats} shadows={shadows} />
      </group>
    </group>
  );
}

/** The cluster that is picked: its transform comes straight from the timeline. */
export function HeroCluster({
  progress,
  mats,
  shadows,
}: {
  progress: Progress;
  mats: HarvestMaterials;
  shadows: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const s = evalTimeline(progress.get());
    g.position.set(s.mPos[0], s.mPos[1], s.mPos[2]);
    mushroomQuaternion(s, g.quaternion);
  });
  return (
    <group ref={ref} scale={HERO_SCALE}>
      {HERO_SPECS.map((spec) => (
        <Mushroom key={spec.seed} spec={spec} mats={mats} shadows={shadows} />
      ))}
      {/* chunk of substrate that comes away with the stem */}
      <mesh
        position={[0.01, -0.03, 0.01]}
        scale={[0.22, 0.13, 0.2]}
        material={mats.straw}
        castShadow={shadows}
      >
        <icosahedronGeometry args={[1, 3]} />
      </mesh>
    </group>
  );
}

export function GrowBag({
  progress,
  mats,
  shadows,
}: {
  progress: Progress;
  mats: HarvestMaterials;
  shadows: boolean;
}) {
  const bagGeo = useMemo(() => buildBag(BAG_RADIUS, BAG_H), []);
  const moundGeo = useMemo(() => buildMound(BAG_RADIUS - 0.02, -1.05, 2.1, 1.2), []);
  useEffect(
    () => () => {
      bagGeo.dispose();
      moundGeo.dispose();
    },
    [bagGeo, moundGeo]
  );

  // dark scar where the cluster was pulled out, grows in once detached
  const scar = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const m = scar.current;
    if (!m) return;
    const d = evalTimeline(progress.get()).detached;
    m.scale.setScalar(Math.max(0.0001, d));
  });

  return (
    <group>
      <group position={[0, BAG_Y, 0]}>
        {/* substrate block inside the bag */}
        <mesh position={[0, BAG_H * 0.45, 0]} material={mats.straw} receiveShadow={shadows}>
          <cylinderGeometry
            args={[BAG_RADIUS - 0.05, BAG_RADIUS - 0.05, BAG_H * 0.88, 48, 1, true]}
          />
        </mesh>
        <mesh geometry={bagGeo} material={mats.plastic} renderOrder={2} />
        {/* cable tie at the neck */}
        <mesh position={[0, BAG_H * 0.972, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.2, 0.035, 8, 24]} />
          <meshStandardMaterial color="#1a1715" roughness={0.6} />
        </mesh>
      </group>

      {/* fruiting slit: substrate pushing through the plastic */}
      <mesh
        geometry={moundGeo}
        material={mats.straw}
        position={[0, -0.85, 0]}
        receiveShadow={shadows}
      />
      <mesh
        ref={scar}
        position={[HERO_ROOT[0], HERO_ROOT[1] - 0.02, HERO_ROOT[2] - 0.05]}
        scale={[0.0001, 0.0001, 0.0001]}
      >
        <sphereGeometry args={[0.26, 20, 12]} />
        <meshStandardMaterial color="#241a10" roughness={1} />
      </mesh>

      {BG.map((b) => (
        <BgMushroom key={b.seed} b={b} mats={mats} shadows={shadows} />
      ))}
    </group>
  );
}
