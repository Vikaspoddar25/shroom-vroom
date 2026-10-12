# Harvest scroll story

A scroll-driven 3D sequence on the home page: a hand reaches into a grow bag, twists off a cluster of oyster
mushrooms and lifts it to the camera. Built with React Three Fiber and framer-motion. No external 3D assets.

## How it works

`harvest-section.tsx` owns a tall section (430vh mobile, 540vh desktop) with a sticky full-screen stage.
`useScroll` gives progress 0..1, a spring smooths it, and that single value drives everything.

`timeline.ts` is the whole choreography as a pure function: `evalTimeline(progress)` returns camera, hand
target, grip amount, mushroom transform and pluck state. Scrubbing, reversing or jumping always lands on the right
frame because nothing is stored between frames. Edit the `K_*` keyframe tables to retime or reframe.

| File                           | Role                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `harvest-scene.tsx`            | R3F canvas, lights, camera rig. Default export so it can be `dynamic()`-imported            |
| `hand.tsx`                     | Rigged procedural hand (joint hierarchy posed per frame)                                    |
| `mushroom.tsx`, `grow-bag.tsx` | Cluster, stems, caps with gills, bag, substrate, scar                                       |
| `crumbs.tsx`                   | Instanced substrate crumbs that fall at the pluck                                           |
| `backdrop.tsx`                 | Full-screen GLSL atmosphere (gradient, drifting sun, mist, grain), follows light/dark theme |
| `materials.ts`                 | PBR materials plus a Fresnel "subsurface" shader patch (skin, flesh, polythene)             |
| `procedural.ts`                | Geometry and canvas-texture generators                                                      |
| `use-quality.ts`               | Capability detection and theme observer                                                     |

## Performance and fallbacks

1. The 3D chunk is `dynamic()`-imported with `ssr: false` and mounted only within one screen of the section.
2. The render loop (`frameloop`) runs only while the section is on screen.
3. `high`: shadows, dpr up to 1.75. `medium` (phones, coarse pointer): no shadows, dpr 1.
4. `fallback` (reduced motion, no WebGL, save-data, 2 GB or 2-core devices, WebGL context loss): a static
   layout with the product photo and the same copy.
5. Copy lives in `src/lib/lang.tsx` under `harvest.*` (English and Hindi).

## Swapping in real assets

The procedural hand and mushrooms are stylised. For photoreal results, export a rigged hand and a mushroom
cluster as compressed GLB (Draco/Meshopt), load them with drei `useGLTF`, and keep `timeline.ts` as the driver.
`GRIP_LOCAL`, `GRIP_ALONG`, `HAND_SCALE` and `HERO_SCALE` are the constants that line the two up.
