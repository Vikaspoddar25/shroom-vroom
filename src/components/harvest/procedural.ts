import * as THREE from "three";

/**
 * Procedural geometry + canvas textures for the harvest scene.
 * No external 3D assets: everything is generated at runtime so the section ships as code only.
 * Browser-only (uses <canvas>); call from inside the R3F tree.
 */

const TAU = Math.PI * 2;

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cheap smooth pseudo-noise in roughly [-1, 1]. */
export function smoothNoise(x: number, y: number): number {
  return (
    (Math.sin(x * 1.91 + Math.sin(y * 2.37) * 1.7) +
      Math.sin(y * 1.53 - Math.sin(x * 1.11) * 2.1) +
      Math.sin((x + y) * 0.73)) /
    3
  );
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function finish(c: HTMLCanvasElement, opts: { srgb?: boolean; repeat?: [number, number] } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = opts.srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (opts.repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}

/* ------------------------------------------------------------------ textures */

/** Radiating gills. x = angle across the fan, y = radius from stem outward. */
export function makeGillTextures(seed = 7) {
  const w = 1024;
  const h = 256;
  const r = rng(seed);
  const col = makeCanvas(w, h);
  const bump = makeCanvas(w, h);
  const cc = col.getContext("2d")!;
  const bc = bump.getContext("2d")!;
  cc.fillStyle = "#d9c8a2";
  cc.fillRect(0, 0, w, h);
  bc.fillStyle = "#000";
  bc.fillRect(0, 0, w, h);

  const line = (x: number, y0: number, y1: number, lw: number, tone: number) => {
    const j = (r() - 0.5) * 4;
    const l = 214 + tone * 30;
    cc.strokeStyle = `rgb(${l + 14},${l + 4},${l - 28})`;
    cc.lineWidth = lw;
    cc.beginPath();
    cc.moveTo(x, y0);
    cc.lineTo(x + j, y1);
    cc.stroke();
    const b = Math.floor(190 + tone * 60);
    bc.strokeStyle = `rgb(${b},${b},${b})`;
    bc.lineWidth = lw * 0.8;
    bc.beginPath();
    bc.moveTo(x, y0);
    bc.lineTo(x + j, y1);
    bc.stroke();
  };

  const N = 96;
  for (let i = 0; i < N; i++) line(((i + 0.5) / N) * w + (r() - 0.5) * 2, 0, h, 6, r());
  for (let i = 0; i < N; i++) line(((i + 1) / N) * w, h * (0.28 + r() * 0.3), h, 4.2, r());
  for (let i = 0; i < N * 2; i++)
    line(((i + 0.5) / (N * 2)) * w, h * (0.6 + r() * 0.25), h, 3, r());

  return { map: finish(col, { srgb: true }), bump: finish(bump) };
}

/** Fine radial fibres on the cap's top surface. */
export function makeCapBump(seed = 11) {
  const w = 512;
  const h = 256;
  const r = rng(seed);
  const c = makeCanvas(w, h);
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 900; i++) {
    const x = r() * w;
    const y0 = r() * h * 0.6;
    const len = 30 + r() * 140;
    const v = r() > 0.5 ? 255 : 0;
    g.strokeStyle = `rgba(${v},${v},${v},${0.05 + r() * 0.12})`;
    g.lineWidth = 0.6 + r() * 1.6;
    g.beginPath();
    g.moveTo(x, y0);
    g.lineTo(x + (r() - 0.5) * 5, y0 + len);
    g.stroke();
  }
  return finish(c);
}

/** Vertical flutes along stems. */
export function makeStemBump(seed = 21) {
  const w = 256;
  const h = 256;
  const r = rng(seed);
  const c = makeCanvas(w, h);
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 360; i++) {
    const x = r() * w;
    const y0 = r() * h;
    const len = 40 + r() * 160;
    const v = r() > 0.5 ? 255 : 0;
    g.strokeStyle = `rgba(${v},${v},${v},${0.06 + r() * 0.14})`;
    g.lineWidth = 1 + r() * 2.4;
    g.beginPath();
    g.moveTo(x, y0);
    g.lineTo(x + (r() - 0.5) * 4, y0 + len);
    g.stroke();
  }
  return finish(c, { repeat: [3, 1] });
}

/** Straw / sawdust substrate; optionally flecked with white mycelium. */
export function makeStrawTexture(seed = 5) {
  const w = 512;
  const r = rng(seed);
  const col = makeCanvas(w, w);
  const bump = makeCanvas(w, w);
  const g = col.getContext("2d")!;
  const b = bump.getContext("2d")!;
  g.fillStyle = "#7a5b34";
  g.fillRect(0, 0, w, w);
  b.fillStyle = "#555";
  b.fillRect(0, 0, w, w);
  const palette = ["#c9a566", "#a98446", "#8b6a37", "#d9bf86", "#5b4426", "#e6d3a0"];
  for (let i = 0; i < 9000; i++) {
    const x = r() * w;
    const y = r() * w;
    const a = (r() - 0.5) * 6.28;
    const len = 5 + r() * 16;
    const lw = 0.8 + r() * 1.8;
    g.strokeStyle = palette[Math.floor(r() * palette.length)];
    g.globalAlpha = 0.55 + r() * 0.45;
    g.lineWidth = lw;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    g.stroke();
    const v = Math.floor(120 + r() * 135);
    b.strokeStyle = `rgb(${v},${v},${v})`;
    b.lineWidth = lw;
    b.beginPath();
    b.moveTo(x, y);
    b.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    b.stroke();
  }
  g.globalAlpha = 1;
  // mycelium flecks
  for (let i = 0; i < 70; i++) {
    const x = r() * w;
    const y = r() * w;
    const rad = 6 + r() * 22;
    const grad = g.createRadialGradient(x, y, 0, x, y, rad);
    grad.addColorStop(0, "rgba(250,246,236,0.75)");
    grad.addColorStop(1, "rgba(250,246,236,0)");
    g.fillStyle = grad;
    g.beginPath();
    g.arc(x, y, rad, 0, TAU);
    g.fill();
  }
  return {
    map: finish(col, { srgb: true, repeat: [2, 1] }),
    bump: finish(bump, { repeat: [2, 1] }),
  };
}

/** Fine pore / micro-crease noise for skin. */
export function makeSkinBump(seed = 3) {
  const w = 256;
  const r = rng(seed);
  const c = makeCanvas(w, w);
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, w, w);
  for (let i = 0; i < 5200; i++) {
    const v = Math.floor(r() * 255);
    g.fillStyle = `rgba(${v},${v},${v},0.35)`;
    g.fillRect(r() * w, r() * w, 1 + r() * 1.6, 1 + r() * 1.6);
  }
  for (let i = 0; i < 150; i++) {
    g.strokeStyle = `rgba(0,0,0,${0.06 + r() * 0.1})`;
    g.lineWidth = 0.7;
    const x = r() * w;
    const y = r() * w;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + (r() - 0.5) * 36, y + (r() - 0.5) * 36);
    g.stroke();
  }
  return finish(c, { repeat: [4, 4] });
}

/** Soft vertical crinkles for polythene. */
export function makePlasticBump(seed = 9) {
  const w = 512;
  const r = rng(seed);
  const c = makeCanvas(w, w);
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, w, w);
  g.filter = "blur(1.4px)";
  for (let i = 0; i < 260; i++) {
    const x = r() * w;
    const y = r() * w;
    const len = 40 + r() * 220;
    const v = r() > 0.5 ? 255 : 0;
    g.strokeStyle = `rgba(${v},${v},${v},${0.12 + r() * 0.25})`;
    g.lineWidth = 1 + r() * 3.2;
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(x + (r() - 0.5) * 60, y + len / 2, x + (r() - 0.5) * 30, y + len);
    g.stroke();
  }
  return finish(c, { repeat: [3, 2] });
}

/* ------------------------------------------------------------------ geometry */

/** Capsule with different end radii, running along +Y from y=0 to y=len. */
export function taperedCapsule(r0: number, r1: number, len: number, seg = 20, capSeg = 6) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= capSeg; i++) {
    const a = -Math.PI / 2 + (i / capSeg) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.max(0.0001, r0 * Math.cos(a)), r0 * Math.sin(a)));
  }
  for (let i = 0; i <= capSeg; i++) {
    const a = (i / capSeg) * (Math.PI / 2);
    pts.push(new THREE.Vector2(Math.max(0.0001, r1 * Math.cos(a)), len + r1 * Math.sin(a)));
  }
  return new THREE.LatheGeometry(pts, seg);
}

export interface CapOpts {
  R: number;
  spread: number;
  seed: number;
}

/**
 * Oyster-mushroom cap: a shell/fan whose apex sits on the stem top.
 * One geometry, three draw groups: [0] convex top, [1] rolled rim + side walls, [2] gill face underneath.
 */
export function buildCap(o: CapOpts) {
  const nu = 30;
  const nv = 72;
  const r = rng(o.seed);
  const p1 = r() * 6;
  const p2 = r() * 6;
  const p3 = r() * 6;
  const thick = o.R * 0.12;
  const pos: number[] = [];
  const uv: number[] = [];
  const col: number[] = [];
  const cA = new THREE.Color("#e2cfa6");
  const cB = new THREE.Color("#f7f1e2");
  const tmp = new THREE.Color();
  const grid = (nv + 1) * (nu + 1);

  for (const side of ["top", "under"] as const) {
    for (let iu = 0; iu <= nu; iu++) {
      const u = iu / nu;
      for (let iv = 0; iv <= nv; iv++) {
        const v = iv / nv;
        const phi = (v - 0.5) * o.spread;
        const edge = 1 + 0.045 * Math.sin(5 * phi + p1) + 0.02 * Math.sin(11 * phi + p2);
        const lobe = 0.74 + 0.26 * Math.cos(phi * 0.85);
        const rad = o.R * edge * lobe * u;
        const x = rad * Math.cos(phi);
        const z = rad * Math.sin(phi);
        let y =
          o.R * (0.48 * u - 0.82 * u * u) +
          o.R * 0.02 * Math.pow(u, 2.5) * Math.sin(9 * phi + p3) +
          o.R * 0.012 * Math.pow(u, 3) * Math.sin(17 * phi + p1);
        if (side === "under") y -= thick * (0.3 + 0.7 * (1 - Math.pow(u, 0.55)));
        pos.push(x, y, z);
        uv.push(v, u);
        tmp.copy(cA).lerp(cB, smoothstep(0, 0.55, u));
        const n = smoothNoise(phi * 3 + p1, u * 5) * 0.025;
        col.push(tmp.r + n, tmp.g + n, tmp.b + n);
      }
    }
  }

  const topIdx: number[] = [];
  const rimIdx: number[] = [];
  const underIdx: number[] = [];
  const at = (iu: number, iv: number, under: boolean) => (under ? grid : 0) + iu * (nv + 1) + iv;
  for (let iu = 0; iu < nu; iu++) {
    for (let iv = 0; iv < nv; iv++) {
      const a = at(iu, iv, false);
      const b = a + 1;
      const c = a + (nv + 1);
      const d = c + 1;
      topIdx.push(a, b, c, b, d, c);
      const ua = at(iu, iv, true);
      const ub = ua + 1;
      const uc = ua + (nv + 1);
      const ud = uc + 1;
      underIdx.push(ua, uc, ub, ub, uc, ud);
    }
  }
  // rolled rim around the outer edge
  for (let iv = 0; iv < nv; iv++) {
    const a0 = at(nu, iv, false);
    const a1 = at(nu, iv + 1, false);
    const b0 = at(nu, iv, true);
    const b1 = at(nu, iv + 1, true);
    rimIdx.push(a0, a1, b0, a1, b1, b0);
  }
  // side walls (rim material is double-sided, so winding is not critical)
  for (let iu = 0; iu < nu; iu++) {
    for (const iv of [0, nv]) {
      const t0 = at(iu, iv, false);
      const t1 = at(iu + 1, iv, false);
      const u0 = at(iu, iv, true);
      const u1 = at(iu + 1, iv, true);
      rimIdx.push(t0, u0, t1, t1, u0, u1);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex([...topIdx, ...rimIdx, ...underIdx]);
  g.addGroup(0, topIdx.length, 0);
  g.addGroup(topIdx.length, rimIdx.length, 1);
  g.addGroup(topIdx.length + rimIdx.length, underIdx.length, 2);
  g.computeVertexNormals();
  return g;
}

export interface StemOpts {
  len: number;
  r0: number;
  r1: number;
  bend: number;
  seed: number;
}

/** Curved, fluted stem along +Y that flares into the cap and ends in a ragged cut base. */
export function buildStem(o: StemOpts) {
  const rings = 30;
  const seg = 30;
  const r = rng(o.seed);
  const ph = r() * 6;
  const pos: number[] = [];
  const uv: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const cBase = new THREE.Color("#d2b887");
  const cTop = new THREE.Color("#f1e8d3");
  const tmp = new THREE.Color();

  for (let i = 0; i <= rings; i++) {
    const t = i / rings;
    const cx = o.bend * t * t * o.len;
    const cy = t * o.len;
    const tx = 2 * o.bend * t;
    const ty = 1;
    const tl = Math.hypot(tx, ty);
    const nx = ty / tl;
    const ny = -tx / tl;
    const flare = 1 + 0.55 * smoothstep(0.72, 1, t);
    const radius = (o.r0 + (o.r1 - o.r0) * Math.pow(t, 1.3)) * flare;
    tmp.copy(cBase).lerp(cTop, smoothstep(0, 0.5, t));
    for (let j = 0; j <= seg; j++) {
      const a = (j / seg) * TAU;
      const flute =
        1 +
        0.04 * Math.sin(a * 9 + ph) * smoothstep(0, 0.4, t) +
        0.035 * smoothNoise(a * 2 + ph, t * 6);
      const rr = radius * flute;
      pos.push(cx + nx * Math.cos(a) * rr, cy + ny * Math.cos(a) * rr, Math.sin(a) * rr);
      uv.push(j / seg, t);
      col.push(tmp.r, tmp.g, tmp.b);
    }
  }
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < seg; j++) {
      const a = i * (seg + 1) + j;
      const b = a + 1;
      const c = a + (seg + 1);
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  // base cap (cut end)
  const centre = pos.length / 3;
  pos.push(0, -0.01, 0);
  uv.push(0.5, 0);
  col.push(cBase.r * 0.8, cBase.g * 0.75, cBase.b * 0.65);
  for (let j = 0; j < seg; j++) idx.push(centre, j, j + 1);

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Cylinder grow-bag gathered into a tied neck, with polythene creases baked into the mesh. */
export function buildBag(R: number, H: number) {
  const pts = [
    new THREE.Vector2(0.001, 0),
    new THREE.Vector2(R * 0.78, 0),
    new THREE.Vector2(R * 0.96, 0.1),
    new THREE.Vector2(R, 0.45),
    new THREE.Vector2(R, H * 0.8),
    new THREE.Vector2(R * 0.93, H * 0.86),
    new THREE.Vector2(R * 0.6, H * 0.92),
    new THREE.Vector2(R * 0.26, H * 0.96),
    new THREE.Vector2(0.15, H * 0.985),
    new THREE.Vector2(0.17, H * 0.995),
    new THREE.Vector2(0.3, H),
    new THREE.Vector2(0.001, H),
  ];
  const g = new THREE.LatheGeometry(pts, 96);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const th = Math.atan2(z, x);
    const shoulder = smoothstep(H * 0.78, H * 0.95, y);
    const k =
      1 +
      0.012 * Math.sin(th * 11 + y * 1.3) +
      0.008 * Math.sin(th * 23 - y * 2.1) +
      shoulder * 0.07 * Math.sin(th * 7 + y * 4.0);
    p.setXYZ(i, x * k, y, z * k);
  }
  g.computeVertexNormals();
  return g;
}

/** Lumpy substrate band pushing out through the slit in the bag. */
export function buildMound(R: number, thetaStart: number, thetaLen: number, h: number) {
  const g = new THREE.CylinderGeometry(R, R, h, 64, 20, true, thetaStart, thetaLen);
  const p = g.attributes.position as THREE.BufferAttribute;
  const uvA = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const u = uvA.getX(i);
    const v = uvA.getY(i);
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const window = Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
    const bulge = 0.16 * Math.pow(window, 0.6) * (1 + 0.45 * smoothNoise(u * 14, v * 9));
    const k = (R + bulge) / R;
    p.setXYZ(i, x * k, y, z * k);
  }
  g.computeVertexNormals();
  return g;
}
