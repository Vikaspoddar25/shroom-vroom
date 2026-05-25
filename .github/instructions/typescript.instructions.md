---
description: "Use when writing or editing TypeScript files, API routes, Zustand stores, or utility functions for Shroom Vroom."
applyTo: "src/**/*.ts"
---

# TypeScript Guidelines

## General
- Strict TypeScript — no `any`, no `@ts-ignore` without comment
- Export types/interfaces from the file that owns them
- Prefer `type` for unions/intersections, `interface` for object shapes

## Next.js App Router
- Server components fetch data directly (no useEffect for data)
- Use `generateStaticParams` for dynamic routes with known slugs
- `generateMetadata` for page-level SEO — use `en_IN` locale in OG tags

## Zustand Stores
- Pattern: `useXxxStore` with `(s) => s.field` selectors to avoid re-renders
- Cart store: `src/store/cart.ts` — `addItem`, `removeItem`, `updateQuantity`, `subtotal`, `clearCart`
- Cart drawer: `src/store/cart-drawer.ts` — `open`, `close`, `isOpen`

## Forms
- Always use `react-hook-form` + `zod` for validation
- Define zod schema first, derive `FormData` type with `z.infer<typeof schema>`
- Use `zodResolver` from `@hookform/resolvers/zod`

## Analytics
- Use `track(event, properties)` from `@/lib/analytics` for important user actions
- Key events: `add_to_cart`, `checkout_complete`, `view_product`
