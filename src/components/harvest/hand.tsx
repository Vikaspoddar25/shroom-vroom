"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { taperedCapsule } from "./procedural";
import type { HarvestMaterials } from "./materials";
import { GRIP_LOCAL, HAND_SCALE, evalTimeline, handQuaternion } from "./timeline";

interface Progress {
  get(): number;
}

/**
 * Rigged procedural hand. Local frame: wrist at origin, fingers along +Y, palm normal +Z,
 * thumb on -X. Joints are plain Object3D hierarchies, posed from the timeline each frame.
 * One unit is roughly 10 cm.
 */

interface FingerDef {
  x: number;
  y: number;
  len: [number, number, number];
  r: number;
  spread: number;
  open: [number, number, number];
  closed: [number, number, number];
}

const FINGERS: FingerDef[] = [
  {
    x: -0.3,
    y: 0.9,
    len: [0.5, 0.25, 0.2],
    r: 0.088,
    spread: -0.2,
    open: [0.38, 0.5, 0.3],
    closed: [1.3, 1.5, 1.0],
  },
  {
    x: -0.1,
    y: 0.94,
    len: [0.55, 0.28, 0.21],
    r: 0.093,
    spread: -0.02,
    open: [0.3, 0.46, 0.28],
    closed: [1.38, 1.55, 1.05],
  },
  {
    x: 0.1,
    y: 0.91,
    len: [0.5, 0.26, 0.2],
    r: 0.087,
    spread: 0.12,
    open: [0.34, 0.5, 0.3],
    closed: [1.45, 1.55, 1.05],
  },
  {
    x: 0.28,
    y: 0.84,
    len: [0.4, 0.2, 0.17],
    r: 0.074,
    spread: 0.3,
    open: [0.42, 0.55, 0.32],
    closed: [1.5, 1.6, 1.05],
  },
];

const THUMB = {
  pos: [-0.4, 0.2, 0.06] as const,
  r: 0.112,
  len: [0.44, 0.34, 0.28] as const,
  open: { rx: 0.1, rz: 0.9, c1: 0.12, c2: 0.1 },
  closed: { rx: 0.7, rz: 0.55, c1: 0.9, c2: 0.8 },
};

interface FingerRig {
  base: THREE.Group | null;
  j2: THREE.Group | null;
  j3: THREE.Group | null;
}

export function Hand({
  progress,
  mats,
  shadows,
}: {
  progress: Progress;
  mats: HarvestMaterials;
  shadows: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const fingers = useRef<FingerRig[]>(FINGERS.map(() => ({ base: null, j2: null, j3: null })));
  const thumb = useRef<FingerRig>({ base: null, j2: null, j3: null });

  const geo = useMemo(() => {
    const phalanges = FINGERS.map((f) => {
      const r = f.r;
      return [
        taperedCapsule(r, r * 0.88, f.len[0]),
        taperedCapsule(r * 0.88, r * 0.78, f.len[1]),
        taperedCapsule(r * 0.78, r * 0.62, f.len[2]),
      ];
    });
    const t = THUMB;
    const thumbG = [
      taperedCapsule(t.r, t.r * 0.88, t.len[0]),
      taperedCapsule(t.r * 0.88, t.r * 0.76, t.len[1]),
      taperedCapsule(t.r * 0.76, t.r * 0.62, t.len[2]),
    ];
    const forearm = taperedCapsule(0.27, 0.4, 3.8, 32, 6);
    const sleeve = new THREE.CylinderGeometry(0.56, 0.6, 2.4, 40, 1, true);
    const cuff = new THREE.TorusGeometry(0.58, 0.07, 12, 40);
    const palm = new THREE.SphereGeometry(1, 40, 28);
    const nail = new THREE.SphereGeometry(1, 14, 10);
    return { phalanges, thumbG, forearm, sleeve, cuff, palm, nail };
  }, []);
  useEffect(
    () => () => {
      geo.phalanges.flat().forEach((g) => g.dispose());
      geo.thumbG.forEach((g) => g.dispose());
      [geo.forearm, geo.sleeve, geo.cuff, geo.palm, geo.nail].forEach((g) => g.dispose());
    },
    [geo]
  );

  const q = useMemo(() => new THREE.Quaternion(), []);
  const off = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const g = root.current;
    if (!g) return;
    const s = evalTimeline(progress.get());

    // fully offscreen early on: skip all work
    g.visible = s.p > 0.04;
    if (!g.visible) return;

    handQuaternion(s, q);
    g.quaternion.copy(q);
    off
      .set(GRIP_LOCAL[0], GRIP_LOCAL[1], GRIP_LOCAL[2])
      .multiplyScalar(HAND_SCALE)
      .applyQuaternion(q);
    g.position.set(s.gripTarget[0] - off.x, s.gripTarget[1] - off.y, s.gripTarget[2] - off.z);

    // idle breathing so the open hand never looks frozen
    const breathe = (1 - s.grip) * 0.03 * Math.sin(performance.now() / 600);

    FINGERS.forEach((f, i) => {
      const r = fingers.current[i];
      if (!r.base || !r.j2 || !r.j3) return;
      const k = s.grip;
      r.base.rotation.set(
        f.open[0] + (f.closed[0] - f.open[0]) * k + breathe,
        0,
        f.spread * (1 - k * 0.7)
      );
      r.j2.rotation.x = f.open[1] + (f.closed[1] - f.open[1]) * k;
      r.j3.rotation.x = f.open[2] + (f.closed[2] - f.open[2]) * k;
    });

    const t = thumb.current;
    if (t.base && t.j2 && t.j3) {
      const k = s.thumb;
      const o = THUMB.open;
      const c = THUMB.closed;
      t.base.rotation.set(o.rx + (c.rx - o.rx) * k, 0, o.rz + (c.rz - o.rz) * k, "ZXY");
      t.j2.rotation.x = o.c1 + (c.c1 - o.c1) * k;
      t.j3.rotation.x = o.c2 + (c.c2 - o.c2) * k;
    }
  });

  return (
    <group ref={root} visible={false} scale={HAND_SCALE}>
      {/* forearm runs off-screen along -Y */}
      <mesh
        geometry={geo.forearm}
        material={mats.skin}
        rotation-z={Math.PI}
        scale={[1, 1, 0.8]}
        castShadow={shadows}
      />
      <mesh
        geometry={geo.sleeve}
        material={mats.cloth}
        position={[0, -2.6, 0]}
        scale={[1, 1, 0.82]}
        castShadow={shadows}
      />
      <mesh
        geometry={geo.cuff}
        material={mats.cloth}
        position={[0, -1.4, 0]}
        rotation-x={Math.PI / 2}
        scale={[1, 0.82, 1]}
      />

      {/* palm and muscle pads */}
      <mesh
        geometry={geo.palm}
        material={mats.skin}
        position={[0, 0.5, 0]}
        scale={[0.45, 0.52, 0.19]}
        castShadow={shadows}
      />
      <mesh
        geometry={geo.palm}
        material={mats.skin}
        position={[-0.26, 0.3, 0.09]}
        scale={[0.2, 0.3, 0.15]}
        castShadow={shadows}
      />
      <mesh
        geometry={geo.palm}
        material={mats.skin}
        position={[0.27, 0.32, 0.07]}
        scale={[0.17, 0.3, 0.12]}
        castShadow={shadows}
      />
      <mesh
        geometry={geo.palm}
        material={mats.skin}
        position={[0, 0.04, 0]}
        scale={[0.3, 0.2, 0.2]}
        castShadow={shadows}
      />

      {FINGERS.map((f, i) => (
        <group key={i} position={[f.x, f.y, 0]} ref={(el) => void (fingers.current[i].base = el)}>
          <mesh geometry={geo.phalanges[i][0]} material={mats.skin} castShadow={shadows} />
          <group position={[0, f.len[0], 0]} ref={(el) => void (fingers.current[i].j2 = el)}>
            <mesh geometry={geo.phalanges[i][1]} material={mats.skin} castShadow={shadows} />
            <group position={[0, f.len[1], 0]} ref={(el) => void (fingers.current[i].j3 = el)}>
              <mesh geometry={geo.phalanges[i][2]} material={mats.skin} castShadow={shadows} />
              <mesh
                geometry={geo.nail}
                material={mats.nail}
                position={[0, f.len[2] * 0.72, -f.r * 0.58]}
                scale={[f.r * 0.55, f.len[2] * 0.36, f.r * 0.14]}
              />
            </group>
          </group>
        </group>
      ))}

      <group
        position={[THUMB.pos[0], THUMB.pos[1], THUMB.pos[2]]}
        ref={(el) => void (thumb.current.base = el)}
      >
        <mesh geometry={geo.thumbG[0]} material={mats.skin} castShadow={shadows} />
        <group position={[0, THUMB.len[0], 0]} ref={(el) => void (thumb.current.j2 = el)}>
          <mesh geometry={geo.thumbG[1]} material={mats.skin} castShadow={shadows} />
          <group position={[0, THUMB.len[1], 0]} ref={(el) => void (thumb.current.j3 = el)}>
            <mesh geometry={geo.thumbG[2]} material={mats.skin} castShadow={shadows} />
            <mesh
              geometry={geo.nail}
              material={mats.nail}
              position={[0, THUMB.len[2] * 0.7, -THUMB.r * 0.55]}
              scale={[THUMB.r * 0.55, THUMB.len[2] * 0.36, THUMB.r * 0.14]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
