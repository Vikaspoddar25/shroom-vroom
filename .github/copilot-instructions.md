# Shroom Vroom — Copilot Instructions

## Project Overview
Next.js 14 (App Router) e-commerce site for Shroom Vroom — a farm-fresh mushroom business based in Kishangarh, Ajmer, Rajasthan, India. Delivers to Jaipur, Ajmer & Kishangarh.

## Tech Stack
- **Framework**: Next.js 14.2 — App Router, TypeScript, Server Components by default
- **Styling**: Tailwind CSS with custom CSS variables (RGB space-separated format)
- **Animation**: Framer Motion (scroll-triggered via `<FadeIn>` component)
- **State**: Zustand — cart in `src/store/cart.ts`, cart drawer in `src/store/cart-drawer.ts`
- **Forms**: react-hook-form + zod validation
- **Icons**: lucide-react

## Build & Dev Commands
```bash
npm run dev      # dev server (usually port 3001)
npm run build    # production build — MUST pass before pushing
npm run lint     # ESLint check
```

## Color Palette (CSS Variables — RGB Space-Separated)
All colors defined in `src/app/globals.css` and `tailwind.config.ts`:
| Token | Hex | Tailwind Class |
|-------|-----|----------------|
| forest | #1F3A2E | `bg-forest`, `text-forest` |
| moss | #5C8A6B | `bg-moss`, `text-moss` |
| cream | #F5EFE2 | `bg-cream`, `text-cream` |
| terracotta | #C76B4A | `bg-terracotta`, `text-terracotta` |
| char | #1A1715 | `text-char` |
| mist | #E8E2D3 | `bg-mist`, `border-mist` |

CSS vars use **RGB space-separated format**: `--forest: 31 58 46;` so that opacity modifiers like `bg-forest/20` work.

## Currency & Pricing — Always INR
- Use `formatPrice(amount)` from `src/lib/content.ts` — never hardcode `₹` or use `.toFixed(2)` directly
- Delivery: `getDeliveryCharge(subtotal)` — free above ₹1,000, else ₹50
- Config: `DELIVERY_CONFIG` in `src/lib/content.ts`

## Business Details
- **WhatsApp**: 9928901003 — links use `https://wa.me/919928901003`
- **Email**: vikaspodda@gmail.com
- **Farm**: Kishangarh, Ajmer, Rajasthan
- **Delivery areas**: Jaipur, Ajmer, Kishangarh
- **Founders**: Jai, Amit & Vikas
- **Payment**: UPI / Cash on Delivery — no payment gateway

## Products (src/data/products.ts)
Only 2 products:
1. Fresh Oyster Mushroom — ₹200/kg retail, ₹120/kg wholesale, slug: `oyster-mushroom`
2. Cordyceps Powder — ₹10,000/100g, slug: `cordyceps-powder`

Product interface includes: `hindiName`, `benefits`, `form`, `wholesalePrice` (no `latinName`, no `growingTips`).

## Checkout Flow
No payment processing. Checkout generates a WhatsApp message with the full order summary and opens `wa.me/919928901003`. See `src/components/checkout-form.tsx`.

## Key File Locations
| File | Purpose |
|------|---------|
| `src/data/products.ts` | Product catalog |
| `src/lib/content.ts` | `formatPrice`, `getDeliveryCharge`, `DELIVERY_CONFIG` |
| `src/components/checkout-form.tsx` | WhatsApp order flow |
| `src/components/sections/` | Homepage sections |
| `src/app/layout.tsx` | Metadata (`en_IN` locale) |

## Conventions
- Fonts: `Fraunces` (serif, headings via `font-serif`) + `Inter` (sans, body)
- Rounded corners: use `rounded-organic` (custom class = `rounded-[2rem]`)
- Page wrappers: use `<Section>` + `<Container>` from `src/components/ui/`
- Animations: wrap in `<FadeIn delay={0.1}>` for staggered entrance
- Client components: add `"use client"` only when using hooks/events
- Imports: always use `@/` alias (e.g. `@/components/ui/button`)
