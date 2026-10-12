"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { rng } from "./procedural";
import { HERO_ROOT, evalTimeline } from "./timeline";
import type { HarvestMaterials } from "./materials";

interface Progress {
  get(): number;
}

const COUNT = 26;

/** Substrate crumbs that fall when the stem lets go. Positions are a pure function of progress. */
export function Crumbs({ progress, mats }: { progress: Progress; mats: HarvestMaterials }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    const r = rng(77);
    return Array.from({ length: COUNT }, () => ({
      vx: (r() - 0.5) * 1.1,
      vy: 0.5 + r() * 0.9,
      vz: (r() - 0.2) * 0.9,
      s: 0.018 + r() * 0.03,
      rx: r() * 6,
      ry: r() * 6,
      sp: 3 + r() * 8,
    }));
  }, []);
  useEffect(() => () => void mesh.current?.dispose(), []);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    const t = evalTimeline(progress.get()).crumbT * 7;
    seeds.forEach((c, i) => {
      const life = Math.min(1, t / 1.6);
      const alive = t > 0 && life < 1;
      dummy.position.set(
        HERO_ROOT[0] + c.vx * t * 0.5,
        HERO_ROOT[1] + c.vy * t * 0.6 - 2.4 * t * t * 0.5,
        HERO_ROOT[2] + 0.1 + c.vz * t * 0.5
      );
      dummy.rotation.set(c.rx + t * c.sp, c.ry + t * c.sp * 0.7, 0);
      dummy.scale.setScalar(alive ? c.s * (1 - life * life) : 0.00001);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} material={mats.crumb}>
      <icosahedronGeometry args={[1, 0]} />
    </instancedMesh>
  );
}
