import * as THREE from "three";

/**
 * The whole harvest sequence as a pure function of scroll progress (0..1).
 * Components read `evalTimeline(p)` each frame, so scrubbing forwards, backwards or jumping
 * always lands on the correct frame: no accumulated state, no event timing.
 */

export type Vec3 = [number, number, number];

export const PLUCK_AT = 0.56;
export const BAG_RADIUS = 1.55;
/** Distance along the trunk (from its base) where the fingers close. */
export const GRIP_ALONG = 0.3;

/** Hand-space point (palm-local) the stem axis passes through when gripped. */
export const GRIP_LOCAL: Vec3 = [0, 0.78, 0.3];
/** The hand is modelled at ~1 unit per 10 cm; this scales it to read well against the cluster. */
export const HAND_SCALE = 1.2;
/** The picked cluster is a prize-sized one, a touch larger than its neighbours. */
export const HERO_SCALE = 1.35;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Monotone cubic Hermite through [t, ...values] keys. Writes into `out`. */
function sample(p: number, keys: number[][], out: number[]) {
  const dims = keys[0].length - 1;
  const n = keys.length;
  if (p <= keys[0][0]) {
    for (let d = 0; d < dims; d++) out[d] = keys[0][d + 1];
    return out;
  }
  if (p >= keys[n - 1][0]) {
    for (let d = 0; d < dims; d++) out[d] = keys[n - 1][d + 1];
    return out;
  }
  let i = 0;
  while (i < n - 2 && p > keys[i + 1][0]) i++;
  const t0 = keys[i][0];
  const t1 = keys[i + 1][0];
  const h = t1 - t0;
  const s = (p - t0) / h;
  const s2 = s * s;
  const s3 = s2 * s;
  for (let d = 0; d < dims; d++) {
    const v0 = keys[i][d + 1];
    const v1 = keys[i + 1][d + 1];
    const tan = (j: number) => {
      if (j <= 0 || j >= n - 1) return 0;
      const a = (keys[j][d + 1] - keys[j - 1][d + 1]) / (keys[j][0] - keys[j - 1][0]);
      const b = (keys[j + 1][d + 1] - keys[j][d + 1]) / (keys[j + 1][0] - keys[j][0]);
      return a * b <= 0 ? 0 : (a + b) / 2;
    };
    const m0 = tan(i) * h;
    const m1 = tan(i + 1) * h;
    out[d] =
      (2 * s3 - 3 * s2 + 1) * v0 +
      (s3 - 2 * s2 + s) * m0 +
      (-2 * s3 + 3 * s2) * v1 +
      (s3 - s2) * m1;
  }
  return out;
}

const norm3 = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

/* ---- world layout ------------------------------------------------------- */

/** Where the hero cluster is rooted on the bag. */
export const HERO_THETA = 0.18;
export const HERO_ROOT: Vec3 = [
  BAG_RADIUS * Math.sin(HERO_THETA),
  -0.75,
  BAG_RADIUS * Math.cos(HERO_THETA) - 0.02,
];
const D0 = norm3([0.1, 0.78, 0.62]);
const D1 = norm3([0.1, 0.84, 0.5]);
const DISPLAY: Vec3 = [0.1, 0.7, 4.0];

/* ---- keys ---------------------------------------------------------------- */

const K_CAM_POS: number[][] = [
  [0.0, 1.0, 0.9, 10.2],
  [0.16, 0.8, 0.7, 9.4],
  [0.4, 0.5, 0.45, 8.2],
  [0.56, 0.35, 0.35, 7.4],
  [0.8, 0.1, 0.9, 9.8],
  [1.0, 0.0, 1.0, 10.0],
];
const K_CAM_LOOK: number[][] = [
  [0.0, 0.3, -0.45, 1.6],
  [0.4, 0.3, -0.2, 1.7],
  [0.56, 0.35, 0.1, 2.0],
  [0.8, 0.1, 1.0, 3.8],
  [1.0, 0.1, 1.2, 4.0],
];
/** Horizontal camera slide so the subject sits left of the copy on wide screens. */
const K_SHIFT: number[][] = [
  [0.0, 1.2],
  [0.6, 1.0],
  [0.86, 0.8],
  [1.0, 0.8],
];
const K_FOV: number[][] = [
  [0, 34],
  [0.56, 32],
  [1, 30],
];

/** Free-flying approach path (before the hand locks onto the stem). */
const K_FREE: number[][] = [
  [0.0, -5.6, 1.8, 3.4],
  [0.14, -5.2, 1.7, 3.3],
  [0.26, -2.2, 1.1, 2.9],
  [0.38, -0.7, 0.35, 2.3],
];

const K_MPOS: number[][] = [
  [0.0, ...HERO_ROOT],
  [PLUCK_AT - 0.01, ...HERO_ROOT],
  [PLUCK_AT + 0.05, HERO_ROOT[0] + 0.02, HERO_ROOT[1] + 0.12, HERO_ROOT[2] + 0.16],
  [0.82, ...DISPLAY],
  [1.0, DISPLAY[0], DISPLAY[1] + 0.02, DISPLAY[2] + 0.1],
];
const K_MDIR: number[][] = [
  [0.0, ...D0],
  [PLUCK_AT, ...D0],
  [0.68, 0.08, 0.8, 0.6],
  [0.9, ...D1],
  [1.0, 0.1, 0.82, 0.56],
];
const K_PALM: number[][] = [
  [0.0, 0.15, -0.6, 0.78],
  [0.6, 0.15, -0.6, 0.78],
  [0.9, 0.1, -0.05, 1.0],
];

export interface HarvestState {
  p: number;
  camPos: Vec3;
  camLook: Vec3;
  fov: number;
  shiftX: number;
  /** 0 relaxed-open .. 1 closed around the stem */
  grip: number;
  thumb: number;
  /** hand blends from free path to the stem between these */
  attach: number;
  gripTarget: Vec3;
  handDir: Vec3;
  palmHint: Vec3;
  mPos: Vec3;
  mDir: Vec3;
  mSpin: number;
  /** 0 before the pluck, 1 once free */
  detached: number;
  /** seconds-ish since pluck, for crumbs */
  crumbT: number;
  glow: number;
}

const tmp3 = [0, 0, 0];
let cachedP = -1;
const state: HarvestState = {
  p: 0,
  camPos: [0, 0, 0],
  camLook: [0, 0, 0],
  fov: 34,
  shiftX: 0,
  grip: 0,
  thumb: 0,
  attach: 0,
  gripTarget: [0, 0, 0],
  handDir: [0, 1, 0],
  palmHint: [0, -1, 0],
  mPos: [0, 0, 0],
  mDir: [0, 1, 0],
  mSpin: 0,
  detached: 0,
  crumbT: 0,
  glow: 0,
};

const set3 = (dst: Vec3, src: number[]) => {
  dst[0] = src[0];
  dst[1] = src[1];
  dst[2] = src[2];
};

/** Shared, reused state object. Treat as read-only and do not hold references across frames. */
export function evalTimeline(pIn: number): HarvestState {
  const p = clamp01(pIn);
  if (p === cachedP) return state;
  cachedP = p;
  state.p = p;

  set3(state.camPos, sample(p, K_CAM_POS, tmp3));
  set3(state.camLook, sample(p, K_CAM_LOOK, tmp3));
  state.fov = sample(p, K_FOV, [0])[0];
  state.shiftX = sample(p, K_SHIFT, [0])[0];

  set3(state.mPos, sample(p, K_MPOS, tmp3));
  const md = sample(p, K_MDIR, tmp3);
  const mdn = norm3([md[0], md[1], md[2]]);
  set3(state.mDir, mdn);
  set3(state.palmHint, sample(p, K_PALM, tmp3));

  // twist-and-pull wobble just before the stem lets go
  const w = clamp01((p - 0.47) / 0.09);
  state.mSpin = 0.32 * Math.sin(w * Math.PI * 4) * (1 - 0.3 * w);

  state.grip = smooth(clamp01((p - 0.4) / 0.12));
  state.thumb = smooth(clamp01((p - 0.43) / 0.12));
  state.attach = smooth(clamp01((p - 0.27) / 0.16));
  state.detached = smooth(clamp01((p - PLUCK_AT) / 0.04));
  state.crumbT = Math.max(0, p - PLUCK_AT);
  state.glow = smooth(clamp01((p - 0.78) / 0.2));

  // hand grip target: free path → point on the mushroom's trunk
  const free = sample(Math.min(p, 0.38), K_FREE, tmp3);
  const along = GRIP_ALONG * HERO_SCALE;
  const gx = state.mPos[0] + mdn[0] * along;
  const gy = state.mPos[1] + mdn[1] * along;
  const gz = state.mPos[2] + mdn[2] * along;
  const a = state.attach;
  state.gripTarget[0] = free[0] + (gx - free[0]) * a;
  state.gripTarget[1] = free[1] + (gy - free[1]) * a;
  state.gripTarget[2] = free[2] + (gz - free[2]) * a;
  state.handDir[0] = mdn[0];
  state.handDir[1] = mdn[1];
  state.handDir[2] = mdn[2];
  return state;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

/* ---- orientation helpers shared by Hand / Mushroom ------------------------ */

const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();
const _m = new THREE.Matrix4();

/**
 * Hand basis: local -X points along the stem toward the cap (thumb side), local +Z (palm normal) follows
 * `palmHint`, local +Y (fingers) = Z × X. The forearm therefore enters from the left of the frame.
 */
export function handQuaternion(s: HarvestState, out: THREE.Quaternion) {
  _x.set(-s.handDir[0], -s.handDir[1], -s.handDir[2]);
  _z.set(s.palmHint[0], s.palmHint[1], s.palmHint[2]);
  _z.addScaledVector(_x, -_z.dot(_x)).normalize();
  _y.crossVectors(_z, _x);
  _m.makeBasis(_x, _y, _z);
  return out.setFromRotationMatrix(_m);
}

const _up = new THREE.Vector3(0, 1, 0);
const _d = new THREE.Vector3();
const _spin = new THREE.Quaternion();

/** Mushroom group orientation: local +Y along the trunk direction, plus twist about it. */
export function mushroomQuaternion(s: HarvestState, out: THREE.Quaternion) {
  _d.set(s.mDir[0], s.mDir[1], s.mDir[2]);
  out.setFromUnitVectors(_up, _d);
  _spin.setFromAxisAngle(_up, s.mSpin);
  return out.multiply(_spin);
}
