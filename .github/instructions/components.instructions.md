---
description: "Use when creating or editing React components, pages, or UI elements. Covers component structure, Tailwind usage, animations, and Next.js App Router patterns for Shroom Vroom."
applyTo: "src/**/*.tsx"
---

# Component & UI Guidelines

## Structure
- Server Components by default; add `"use client"` only for hooks/events/browser APIs
- Page files: wrap content in `<Section>` + `<Container>` from `@/components/ui/`
- Use `<FadeIn delay={0.X}>` (increment by 0.1) for staggered scroll-triggered animations

## Tailwind
- Colors: use tokens — `text-forest`, `bg-cream`, `text-terracotta`, `bg-moss`, `text-char`, `bg-mist`
- Opacity: use slash modifier — `bg-forest/20`, `text-char/60` (works because CSS vars are RGB space-separated)
- Rounded: prefer `rounded-organic` (`rounded-[2rem]`) for cards and images
- Never hardcode hex colors inline — always use Tailwind tokens

## Typography
- Headings: `font-serif` (Fraunces) — e.g. `font-serif text-display-md font-bold text-forest`
- Body: default `font-sans` (Inter)
- Display sizes: `text-display-lg`, `text-display-md`, `text-display-sm` (defined in tailwind.config.ts)

## Imports
- Always use `@/` alias: `import { Button } from "@/components/ui/button"`
- Icons from `lucide-react` only
- Never import from relative paths like `../../components`

## Pricing
- Always use `formatPrice(amount)` from `@/lib/content` — never `$` or `.toFixed(2)`
- Import delivery helpers: `getDeliveryCharge`, `DELIVERY_CONFIG` from `@/lib/content`

## WhatsApp Links
- Always: `https://wa.me/919928901003`
- Add `target="_blank" rel="noopener noreferrer"` on all external links
