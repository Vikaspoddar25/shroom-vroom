# Website Blueprint (Generic, AI-Readable)

Fill in Section 0, hand this file to any AI coding tool, and say: "Build the site described in website-blueprint.md." Everything else is derived.
Design benchmark: apple.com. Restraint, huge type, generous whitespace, scroll-driven storytelling, one hero visual, nothing decorative without purpose.

---

## 0. Project Inputs (the only part the human fills in)

```yaml
brand_name:        # e.g. "Shroom Vroom"
one_liner:         # what it is, in <= 12 words
core_offering:     # product / service / content being sold or shown
target_audience:   # who, and what they care about
primary_cta:       # the single action we want (Buy, Book, Sign up, Contact)
color_mood:        # e.g. "earthy warm neutral + one emerald accent"
tone:              # e.g. "calm, premium, confident"
languages:         # e.g. [en, hi]
pages:             # default: [Home, Product/Services, About, Contact]
assets:            # logo, photos, 3D models (.glb/.spline), copy. Missing = AI generates placeholders
hero_style:        # one of: 3d-object | shader-gradient | liquid-glass | scroll-video | editorial-type
motion_level:      # subtle | standard | cinematic (default: standard)
```

Rules for missing inputs: infer from the one_liner, state assumptions in a short `ASSUMPTIONS.md`, and continue. Do not stop to ask more than 3 questions.

---

## 1. Default Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React + TypeScript (or Next.js App Router if SEO/SSR is required) |
| Styling | Tailwind CSS + CSS variables for tokens |
| UI primitives | shadcn/ui (Radix), Kokonut UI and Backlit UI components via shadcn registry where they fit |
| Motion (UI) | `motion` (Motion.dev, `import { motion } from "motion/react"`) |
| Motion (timelines) | Anime.js v4 (`animejs`) for small sequenced effects; Theatre.js only for hero cinematics |
| Scroll | Lenis smooth scroll + `motion` `useScroll` / GSAP ScrollTrigger for pinned scenes |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| Rapid 3D | `@splinetool/react-spline` (lazy) when a designer-made Spline scene exists |
| Gradients | `@shadergradient/react` (needs R3F) |
| Glass / liquid | `liquid-glass-js` and `liquid-logo` (Paper Design shaders) for refractive panels and logo |
| DOM-to-WebGL | `curtainsjs` (or successor `gpu-curtains`) for image distortion on hover/scroll |
| i18n | `i18next` or simple dictionary context |
| Theming | `data-theme` attribute, `prefers-color-scheme` default, user toggle persisted |

Verify every package name, version, and API against its current official docs before use. Several of these libraries change fast or are lightly maintained. If one is unavailable or broken, use the fallback in Section 6.

---

## 2. Design System (derive tokens from `color_mood`)

Generate these as CSS variables, light and dark.

```css
:root {
  --bg: ; --bg-elevated: ; --surface-glass: rgb(255 255 255 / .6);
  --text: ; --text-muted: ; --border: ;
  --accent: ; --accent-contrast: ;
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 28px;
  --ease-apple: cubic-bezier(.22, 1, .36, 1);
  --dur-fast: 200ms; --dur-base: 500ms; --dur-slow: 900ms;
}
[data-theme="dark"] { /* mirror every token, never invert blindly; check contrast */ }
```

Typography: system stack or one variable font (Inter / SF-like). Fluid sizes with `clamp()`.
Display `clamp(2.75rem, 8vw, 7rem)`, weight 600-700, tracking -0.03em, line-height 1.02.
Body `clamp(1rem, 1.1vw, 1.25rem)`, line-height 1.5, max 65ch.

Rules:
1. One accent color. Neutrals do the rest.
2. Contrast at least WCAG AA in both themes (4.5:1 body, 3:1 large text). Test dark mode explicitly.
3. Glassmorphism only on floating layers (nav, cards over imagery): `backdrop-filter: blur(20px) saturate(1.4)` plus a 1px translucent border.
4. Spacing on an 8px scale. Sections get `py-24 md:py-40`.
5. No more than 2 font weights per view, no more than 1 animated hero effect.

---

## 3. Page Architecture

Default Home sequence (drop or reorder based on `core_offering`):

1. **Nav**: sticky, glass, logo, 4-5 links, theme toggle, language toggle, primary CTA.
2. **Hero**: full viewport. Headline (max 8 words), one sub-line, primary CTA, hero visual per `hero_style`.
3. **Statement**: one huge sentence that reveals word by word on scroll.
4. **Feature scenes (3-5)**: each pins on scroll, one idea per scene, visual changes as copy changes.
5. **Product / Offering grid**: cards with hover tilt or glow (Kokonut / Backlit).
6. **Proof**: stats count-up, testimonials, logos.
7. **Story / About teaser**: editorial split layout.
8. **Final CTA**: repeat the primary CTA over a quiet shader gradient.
9. **Footer**: minimal, link groups, legal, language and theme controls.

Folder layout:

```
src/
  app/ or pages/          routes
  components/
    ui/                   primitives (button, card, glass-panel)
    sections/             Hero, Statement, FeatureScene, Grid, Proof, CTA
    canvas/               R3F scenes, ShaderGradient wrappers, Spline wrapper
    motion/               Reveal, ScrollScene, Parallax, SplitText
  lib/                    tokens, i18n, hooks (useReducedMotion, useInView, useGpuTier)
  content/                copy per language (JSON), no copy hardcoded in components
public/models, public/img
```

---

## 4. Hero and Scroll Storytelling Recipes

Pick the recipe matching `hero_style`.

**3d-object**: R3F `<Canvas dpr={[1, 1.75]} frameloop="demand">`, a `.glb` loaded with `useGLTF`, `<Environment preset="studio" />`, `<ContactShadows />`, slow idle rotation, pointer parallax, scroll-linked rotation via drei `ScrollControls` or `useScroll`. Compress models with `gltf-transform` (Draco/Meshopt, textures to KTX2/WebP). Target under 1.5 MB.

**shader-gradient**: `<ShaderGradientCanvas>` behind content with `pixelDensity={1}`, low `grain`, brand colors from tokens. Keep text on a contrast-safe layer.

**liquid-glass**: refractive panel over a rich background (photo or gradient). Use for one element (CTA card or nav), not everywhere. Fall back to plain `backdrop-filter` on unsupported browsers (Safari/Firefox differences).

**scroll-video**: pre-rendered frames or short MP4 scrubbed by scroll progress, pinned section, poster image first.

**editorial-type**: giant type with mask reveal, `motion` stagger, image parallax. Cheapest and often the most Apple-like.

Scroll scene pattern (Motion):

```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
// section height 300vh, inner div `sticky top-0 h-screen`
```

Micro-interactions to include: magnetic CTA, button press scale 0.97 with spring, card hover lift plus soft glow, link underline wipe, number count-up, nav shrink on scroll, cursor-aware gradient on cards, smooth theme crossfade.

---

## 5. Component Sourcing Order

1. Check the project's existing components first and match them.
2. Use 21st.dev Magic MCP (if connected) to fetch a production-ready component for the section, then restyle to tokens.
3. Kokonut UI / Backlit UI via shadcn registry for buttons, cards, glow effects.
4. Build custom only for the hero and scroll scenes.

Never paste a component without replacing hardcoded colors, fonts, and copy with tokens and content files.

---

## 6. Performance, Accessibility, Fallbacks (non-negotiable)

Budgets: LCP under 2.5s on mid-range mobile, CLS under 0.05, initial JS under 200 KB gzip (heavy 3D excluded), 60fps scroll.

1. Lazy-load every WebGL/3D/Spline/curtains module with `React.lazy` + `Suspense` and mount only when the section is near viewport (`IntersectionObserver`, rootMargin 400px). Show a static poster (WebP) until ready.
2. One WebGL context per page where possible. Share a single `<Canvas>` with drei `<View>` for multiple 3D elements.
3. `dpr` capped at 1.75 (1 on mobile or low GPU tier, use `@pmndrs/detect-gpu`). Use `frameloop="demand"` for static scenes. Pause rendering when offscreen or tab hidden.
4. Animate only `transform` and `opacity`. No layout-thrashing properties. Use `will-change` sparingly.
5. `prefers-reduced-motion`: disable parallax, pinned scenes, autoplay, shader animation. Show static poster/gradient.
6. Mobile: replace 3D hero with poster or lightweight shader if GPU tier is low or `saveData` is on.
7. Never put essential content only inside a canvas. Headlines, CTAs, and alt text stay in the DOM.
8. Fonts: `font-display: swap`, preload one weight, subset.
9. Images: AVIF/WebP, explicit width/height, `loading="lazy"` below the fold.
10. Semantic HTML, visible focus rings, keyboard-navigable nav, `aria-label` on icon buttons, proper heading order, meta/OG tags, `lang` attribute updated on language switch.
11. Fallback ladder: 3D/shader fails or is unsupported, then CSS gradient plus static image, then plain content. The site must work with JS 3D entirely disabled.
12. Do not use more than 3 of the effect libraries on one page. Pick by `hero_style` and `motion_level` (subtle = Motion only; standard = Motion + one of R3F/ShaderGradient/liquid-glass; cinematic = add Theatre.js or pinned scenes).

---

## 6.5 Library Selection Matrix

| Need | Use | Avoid |
|---|---|---|
| Fade/slide/stagger/layout/spring | Motion | Anime.js (redundant) |
| Small SVG or text timeline | Anime.js | Theatre.js (overkill) |
| Cinematic authored camera/scroll sequence | Theatre.js + `@theatre/r3f` | Hand-tuned keyframes |
| Interactive 3D product | R3F + drei | Spline unless designer supplies scene |
| Quick designer 3D embed | Spline (lazy) | Multiple Spline scenes per page |
| Ambient animated background | ShaderGradient | Video backgrounds |
| Refractive glass/branding | liquid-glass-js / liquid-logo | Full-page glass |
| Image distortion on hover | curtainsjs | Running on every image |

---

## 7. Definition of Done

1. Builds with zero errors and no console warnings.
2. Lighthouse mobile: Performance 85+, Accessibility 95+, SEO 95+.
3. Verified at 375, 768, 1440 px, in light and dark, with reduced motion on and off.
4. All copy lives in content files; every language in `languages` is complete.
5. Primary CTA appears in nav, hero, and final section.
6. `README.md` lists run, build, and deploy commands plus where to swap assets and tokens.

---

## 8. Execution Workflow (3-sentence prompt to live site)

Example prompt: "Build a site for a premium oyster mushroom farm in Pune. Sell fresh and dried mushrooms to home cooks and restaurants. Earthy, calm, English and Hindi."

1. **Parse.** Extract Section 0 fields from the prompt. Fill gaps with defaults (hero_style from offering: physical product means `3d-object` or `editorial-type`; digital means `shader-gradient`). Write `ASSUMPTIONS.md`.
2. **Tokens.** Generate light and dark palettes from `color_mood`, check contrast, write CSS variables and the Tailwind theme.
3. **Scaffold.** `npm create vite@latest`, add Tailwind, shadcn, `motion`, Lenis, i18n. Create the folder layout from Section 3. Commit.
4. **Content.** Write all copy into `content/<lang>.json`: headline, sub-line, 3-5 feature scenes, offering cards, proof, CTA. Keep headlines under 8 words.
5. **Static first.** Build every section with no animation and no WebGL. Confirm responsive layout and dark mode. Commit.
6. **Components.** Pull section components (Magic MCP, Kokonut, Backlit), restyle to tokens.
7. **Motion layer.** Add Reveal, scroll scenes, micro-interactions with Motion and Lenis. Honor reduced motion.
8. **Hero.** Install only the library the `hero_style` needs. Lazy-load it, add poster fallback, GPU-tier gating. Add Theatre.js only if `motion_level` is cinematic.
9. **Polish.** Glass nav, theme crossfade, language switch, SEO/OG tags, favicon, sitemap.
10. **Audit.** Run build, Lighthouse, axe, check bundle size with `vite-bundle-visualizer`. Fix anything outside Section 6 budgets by removing effects, not by loosening budgets.
11. **Verify in browser.** Open at three breakpoints, both themes, scroll the full page, check console. Screenshot the hero.
12. **Ship.** Deploy to Vercel/Netlify/Cloudflare Pages. Report URL, what was assumed, and what assets the human should replace.

Stop conditions: ask the human only for missing brand name, primary CTA, or real assets that cannot be invented (logo, legal text, prices).
