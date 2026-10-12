---
name: website-blueprint-builder
description: Builds an Apple-quality marketing website from a short prompt using website-blueprint.md. Use when asked to build, redesign, or enhance a website, landing page, or hero with 3D, shaders, glass effects, or scroll animation.
---

# Website Blueprint Builder

You build polished, fast, accessible websites from minimal input. `website-blueprint.md` is your spec. Read it fully before writing code.

## Operating rules

1. Read `website-blueprint.md`. Fill Section 0 from the user's prompt. Infer the rest, record assumptions in `ASSUMPTIONS.md`, ask at most 3 questions (brand name, primary CTA, missing real assets).
2. Build static first, then motion, then WebGL. Never start with the 3D hero.
3. Use at most 3 effect libraries per page, chosen by the Library Selection Matrix (Blueprint 6.5).
4. Every heavy module (R3F, Spline, ShaderGradient, curtains, liquid-glass) must be lazy-loaded, viewport-gated, and have a static poster fallback.
5. Honor `prefers-reduced-motion`, low GPU tier, and `saveData`. Essential content stays in the DOM, never only in a canvas.
6. Animate only `transform` and `opacity`. Cap `dpr` at 1.75 (1 on mobile).
7. Colors, fonts, and copy come from tokens and content files, never hardcoded in components.
8. Verify package names and APIs against current official docs before installing. If a library is broken or missing, use the fallback ladder: 3D/shader, then CSS gradient plus image, then plain content.
9. Do not claim done until Blueprint Section 7 passes. Report failures plainly.

## Library wiring cheatsheet

Motion: `import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"`. Use for reveals, springs, layout transitions, scroll-linked values. Default easing `[0.22, 1, 0.36, 1]`.

Anime.js v4: `import { animate, createTimeline, stagger } from "animejs"`. Use for SVG paths, text sequences, counters. Run inside `useEffect`, call revert on cleanup.

Theatre.js: `@theatre/core`, `@theatre/studio` (dev only, strip from production), `@theatre/r3f`. Use for authored hero camera moves. Export project state JSON and load it in production.

React Three Fiber: `<Canvas dpr={[1,1.75]} frameloop="demand">`, drei `useGLTF`, `Environment`, `ContactShadows`, `View` for multiple scenes on one canvas. Call `invalidate()` when animating under demand loop. Dispose geometries and textures on unmount.

Spline: `React.lazy(() => import("@splinetool/react-spline"))`, one scene per page, poster until `onLoad`.

ShaderGradient: render inside its own canvas wrapper behind content, `pixelDensity={1}`, pause when offscreen.

liquid-glass-js / liquid-logo: single feature element only. Detect support and fall back to `backdrop-filter`.

curtainsjs / gpu-curtains: only on a small set of hero or gallery images, destroy the instance on unmount, disable on touch and reduced motion.

Lenis: initialize once at app root, sync with GSAP ticker or `motion` frame loop if both are used, disable under reduced motion.

Kokonut UI / Backlit UI: install via shadcn registry CLI, then retheme to tokens. Remove unused components.

21st.dev Magic MCP: if connected, request the section component by description ("pricing cards with glow, dark mode"), then adapt. If not connected, skip, do not invent its output.

UI-UX-Pro-Max-skill: if installed, run its hierarchy, accessibility, and conversion review on the finished pages and apply its fixes.

Manus-style execution: plan as an explicit checklist (Blueprint Section 8), execute step by step, verify each step with a build or browser check before moving on, and keep a running log of decisions.

## Self-check before finishing

1. Build passes, console clean.
2. Checked at 375 / 768 / 1440 px, light and dark, reduced motion on and off.
3. Initial JS under 200 KB gzip, LCP under 2.5s on throttled mobile.
4. 3D disabled still yields a complete, good-looking page.
5. Summary to user: live URL or run command, assumptions made, assets to replace.
