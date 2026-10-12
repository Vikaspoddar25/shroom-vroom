"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { buildCap, buildStem } from "./procedural";
import type { HarvestMaterials } from "./materials";
import type { Vec3 } from "./timeline";

export interface StemSpec {
  /** base position in the parent's local space */
  pos: Vec3;
  /** stem direction in the parent's local space */
  dir: Vec3;
  len: number;
  r0: number;
  r1: number;
  bend: number;
  capR: number;
  /** spin of the fan around the stem */
  yaw: number;
  /** lift of the fan relative to perpendicular */
  tilt: number;
  spread?: number;
  seed: number;
}

/** The cluster that gets harvested. Local +Y is the trunk axis; origin is the cut base. */
export const HERO_SPECS: StemSpec[] = [
  {
    pos: [0, 0, 0],
    dir: [0, 1, 0],
    len: 0.98,
    r0: 0.11,
    r1: 0.095,
    bend: 0.1,
    capR: 0.66,
    yaw: 0.45,
    tilt: 0.55,
    seed: 3,
  },
  {
    pos: [0, 0.52, 0],
    dir: [-0.6, 0.78, 0.18],
    len: 0.62,
    r0: 0.085,
    r1: 0.07,
    bend: -0.12,
    capR: 0.46,
    yaw: 2.5,
    tilt: 0.7,
    seed: 11,
  },
  {
    pos: [0.02, 0.58, 0],
    dir: [0.58, 0.74, -0.3],
    len: 0.5,
    r0: 0.075,
    r1: 0.062,
    bend: 0.1,
    capR: 0.38,
    yaw: -1.9,
    tilt: 0.75,
    seed: 19,
  },
  {
    pos: [0, 0.4, 0.04],
    dir: [0.15, 0.4, 0.9],
    len: 0.3,
    r0: 0.06,
    r1: 0.05,
    bend: 0.05,
    capR: 0.22,
    yaw: 0.2,
    tilt: 0.5,
    seed: 29,
  },
];

export function Mushroom({
  spec,
  mats,
  shadows,
}: {
  spec: StemSpec;
  mats: HarvestMaterials;
  shadows: boolean;
}) {
  const geo = useMemo(() => {
    const capOpts = { R: spec.capR, spread: spec.spread ?? 3.3, seed: spec.seed };
    return {
      stem: buildStem({
        len: spec.len,
        r0: spec.r0,
        r1: spec.r1,
        bend: spec.bend,
        seed: spec.seed,
      }),
      cap: buildCap(capOpts),
    };
  }, [spec]);
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);

  const quat = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(...spec.dir).normalize()
      ),
    [spec.dir]
  );
  const capQuat = useMemo(() => {
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), spec.yaw);
    return q.multiply(
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), spec.tilt)
    );
  }, [spec.yaw, spec.tilt]);

  const top: Vec3 = [spec.bend * spec.len, spec.len, 0];

  return (
    <group position={spec.pos} quaternion={quat}>
      <mesh geometry={geo.stem} material={mats.stem} castShadow={shadows} receiveShadow={shadows} />
      {/* fungal tissue left at the base */}
      <mesh
        position={[0, 0.01, 0]}
        scale={[spec.r0 * 1.9, spec.r0 * 0.7, spec.r0 * 1.9]}
        material={mats.myc}
      >
        <sphereGeometry args={[1, 16, 10]} />
      </mesh>
      <group position={top} quaternion={capQuat}>
        <mesh
          geometry={geo.cap}
          material={[mats.capTop, mats.capRim, mats.gill]}
          castShadow={shadows}
          receiveShadow={shadows}
        />
      </group>
    </group>
  );
}
