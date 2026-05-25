# Shroom Vroom 🍄

A fast, beautiful, conversion-focused marketing + e-commerce website for Shroom Vroom — a modern fresh gourmet mushroom delivery business.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, TypeScript, Server Components) |
| Styling | Tailwind CSS + CSS variables + shadcn/ui primitives |
| Animation | Framer Motion (scroll-triggered, hover micro-interactions) |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| State | Zustand (cart, persisted to localStorage) |
| Images | next/image with AVIF/WebP, Unsplash placeholders |

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Home page
│   ├── shop/               # Shop grid + [slug] product detail
│   ├── our-story/          # Brand story
│   ├── learn/              # Blog index + [slug] articles
│   ├── subscribe/          # Subscription tiers
│   ├── contact/            # Contact form + FAQ
│   ├── cart/               # Full cart page
│   ├── checkout/           # Stub (Stripe integration TODO)
│   ├── robots.ts           # SEO robots.txt
│   ├── sitemap.ts          # SEO sitemap.xml
│   └── globals.css         # CSS variables, base styles, grain texture
├── components/
│   ├── ui/                 # Primitives (Button, Container, Section, Marquee)
│   ├── sections/           # Home page sections (hero, value props, etc.)
│   ├── header.tsx          # Sticky header + mobile nav
│   ├── footer.tsx          # Multi-column footer
│   ├── product-card.tsx    # Product grid card with add-to-cart
│   ├── product-detail.tsx  # PDP with gallery, tips, JSON-LD
│   ├── cart-drawer.tsx     # Slide-in cart sheet
│   ├── cart-page-content.tsx
│   ├── contact-form.tsx    # Validated contact form
│   ├── faq-accordion.tsx   # Radix accordion
│   ├── fade-in.tsx         # Scroll-triggered animation wrapper
│   └── logo.tsx            # Inline SVG wordmark
├── data/
│   └── products.ts         # 12 seeded products (typed)
├── lib/
│   ├── analytics.ts        # Stub track() function
│   ├── content.ts          # Content abstraction (CMS-ready)
│   └── utils.ts            # cn() helper
└── store/
    ├── cart.ts             # Zustand cart store (persisted)
    └── cart-drawer.ts      # Drawer open/close state
```

## What's Stubbed (TODOs)

- **Payments**: `createCheckoutSession()` in `/checkout` — wire up Stripe Checkout
- **Newsletter**: Email capture in Newsletter component — wire up Mailchimp/ConvertKit/Resend
- **Contact form**: Submission handler — wire up email service
- **Analytics**: `track()` in `lib/analytics.ts` — wire up Segment/PostHog/Plausible
- **Blog content**: `/learn/[slug]` renders placeholder — wire up MDX or headless CMS
- **Images**: Using Unsplash placeholders — replace with actual product photography

## Design Decisions

- **Asymmetric layouts** over centered-everything — magazine-style editorial feel
- **Fraunces serif** for headings gives warmth; Inter for body gives readability
- **Generous whitespace** + large type = premium feel without being stuffy
- **Grain texture overlay** adds organic warmth without being heavy
- **Soft organic border-radius** (1.5rem) on cards for earthy feel
- **Terracotta CTAs** on cream background = strong contrast + warm energy
- **Cart drawer** (not page redirect) for frictionless add-to-cart flow

## Accessibility

- Semantic HTML with proper landmark roles
- Keyboard navigable with visible focus rings
- Color contrast meets WCAG AA
- `prefers-reduced-motion` respected (animations disabled)
- All images have descriptive alt text
- Form inputs have associated labels and error messages
- ARIA attributes on interactive elements

## SEO

- Unique title + description per page via App Router metadata API
- Open Graph + Twitter Card meta tags
- JSON-LD for Organization (layout) and Product (PDP)
- `sitemap.xml` and `robots.txt` generated via App Router conventions
- Canonical URLs via `metadataBase`
