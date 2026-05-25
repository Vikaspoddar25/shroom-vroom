---
description: "Add a new section to the Shroom Vroom homepage"
name: "New Homepage Section"
argument-hint: "Describe the section (e.g. wholesale CTA, delivery map, founder photos...)"
agent: "agent"
---

Create a new homepage section for Shroom Vroom.

Section idea: $input

Steps:
1. Read `src/app/page.tsx` to see the current homepage section order
2. Read 2–3 existing sections in `src/components/sections/` to understand the pattern
3. Create a new file at `src/components/sections/<section-name>.tsx` following this structure:
   - Use `<Section>` + `<Container>` as wrappers
   - Wrap animated elements in `<FadeIn delay={0.X}>`
   - Use brand colors: `text-forest`, `bg-cream`, `text-terracotta`, `bg-moss`, `text-char`, `bg-mist`
   - Use `rounded-organic` for cards/images
   - Export a named component e.g. `export function NewSection()`
4. Import and add it to `src/app/page.tsx` in the appropriate position
5. Run `npm run build` to verify
