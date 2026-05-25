# GitHub Copilot Prompt — "Shroom Vroom" Website

> Copy everything below the line into GitHub Copilot Chat (or paste it as a top-level `README.md` / `PROMPT.md` in an empty repo and ask Copilot to "scaffold the project from this spec"). Adjust the bracketed `[CHOOSE...]` items first.

---

## 🧠 Role

You are a **senior full-stack engineer and product designer** with deep expertise in modern React/Next.js, accessible UI, conversion-focused marketing sites, and e-commerce. You write production-grade, typed, well-structured code with thoughtful comments. You make confident design decisions and explain trade-offs briefly.

## 🍄 Project: "Shroom Vroom"

Build a fast, beautiful, conversion-focused marketing + e-commerce website for **Shroom Vroom**, a modern mushroom business.

**Business angle (pick one — default: A):**
- **A.** Fresh gourmet & exotic mushrooms (Lion's Mane, Oyster, Shiitake, Maitake, King Trumpet) with home delivery.
- **B.** Mushroom grow-at-home kits for hobbyists and foodies.
- **C.** Functional mushroom wellness products (coffee blends, tinctures, capsules — Lion's Mane, Reishi, Cordyceps, Chaga).

**Brand personality:** earthy but energetic, playful, premium-but-approachable. The "Vroom" implies fast delivery and a fun, modern vibe — think *Liquid Death meets Whole Foods meets a forest*.

## 🎨 Brand & Design System

- **Logo treatment:** wordmark "Shroom Vroom" with a small stylized mushroom glyph. Generate an inline SVG placeholder.
- **Color palette:**
  - `--forest`: `#1F3A2E` (primary deep green)
  - `--moss`: `#5C8A6B` (secondary)
  - `--cream`: `#F5EFE2` (background warm)
  - `--terracotta`: `#C76B4A` (accent / CTAs)
  - `--char`: `#1A1715` (text)
  - `--mist`: `#E8E2D3` (surface)
- **Typography:**
  - Headings: `"Fraunces"` (serif, expressive) via Google Fonts
  - Body: `"Inter"` (sans, readable)
  - Display weight for hero: Fraunces 700, italic optional
- **Vibe rules:**
  - Generous whitespace, large editorial type, soft organic shapes, subtle grain/noise texture overlays.
  - Micro-interactions on hover (scale, color shift, cursor parallax on hero).
  - Avoid generic "AI-looking" gradients, glassmorphism, and centered-everything layouts. Lean into asymmetry, magazine-style grids, and confident typography.
  - Smooth scroll, scroll-triggered fade-ins (respect `prefers-reduced-motion`).

## 🛠️ Tech Stack (use exactly this)

- **Framework:** Next.js 14+ (App Router, TypeScript, Server Components by default)
- **Styling:** Tailwind CSS + CSS variables for the palette above. Use `shadcn/ui` for primitives (Button, Dialog, Sheet, Accordion, Form).
- **Animation:** Framer Motion (subtle — never gratuitous)
- **Icons:** `lucide-react`
- **Forms & validation:** `react-hook-form` + `zod`
- **State:** Zustand for cart state, persisted to `localStorage`
- **Images:** `next/image` with proper `sizes` and AVIF/WebP
- **Content:** Co-locate product data in `/data/products.ts` (typed). Make it trivial to swap in a CMS (Sanity/Contentful) later — abstract via a `lib/content.ts` module.
- **SEO:** `next-seo` or App Router metadata API, full Open Graph + Twitter cards, JSON-LD for `Product` and `Organization`.
- **Analytics:** Stub a `lib/analytics.ts` with `track(event, props)` — no real SDK wired up yet.
- **Linting:** ESLint + Prettier + Tailwind plugin, strict TS.

## 🗺️ Site Architecture

```
/                    Home (hero, value props, featured products, story teaser, testimonials, CTA)
/shop                Product grid with filters (type, price, in-stock)
/shop/[slug]         Product detail (gallery, description, growing/usage tips, related)
/our-story           Brand story, farm/sourcing, founders, sustainability
/learn               Blog/recipes/guides index
/learn/[slug]        Article page (MDX-ready)
/subscribe           Subscription box CTA (weekly mushroom box)
/contact             Contact form + FAQ accordion
/cart                Cart drawer + full cart page
/checkout            Stub page (no real payment — mark TODO: Stripe)
```

Add a **persistent cart drawer** (Sheet from shadcn) accessible from the header.

## 🧩 Required Sections & Components

### Header
- Transparent over hero, solid on scroll.
- Logo, nav (Shop, Our Story, Learn, Subscribe), cart icon with count badge, mobile hamburger → slide-in menu.

### Hero (home)
- Big editorial headline: *"Mushrooms, delivered at the speed of fresh."* (or business-angle-appropriate)
- Subhead + two CTAs ("Shop the harvest" / "How it works")
- Right side: layered mushroom imagery with subtle parallax. Use Unsplash placeholders (`https://images.unsplash.com/...`) with `next/image`.
- Marquee strip below: "🌱 Family-farmed · 🚚 Same-day delivery · 🍄 12+ varieties · ♻️ Plastic-free packaging"

### Value props
3–4 cards explaining freshness, sourcing, sustainability, flavor. Use icons + short copy.

### Featured products
Horizontal scroll on mobile, 3-col grid on desktop. Each card: image, name, Latin name (small italic), price, "Add to cart" with optimistic UI.

### Our Story teaser
Two-column: full-bleed image + editorial paragraph + link to `/our-story`.

### Recipes / Learn teaser
3 article cards.

### Testimonials
Quote-driven, large pull-quotes, with chef/customer attribution.

### Newsletter
"Get the harvest report — weekly drops, recipes, and 10% off your first order." Email input + zod validation.

### Footer
Multi-column: shop, learn, company, social. Newsletter again (compact). Legal links. © Shroom Vroom 2026.

## 🛒 E-Commerce Behavior

- 8–12 seeded products with realistic data (name, Latin name, price, weight, description, growing tips, image URL, tags).
- Cart: add, remove, update qty, subtotal, shipping placeholder.
- Persist cart to `localStorage`.
- Checkout page: render order summary + `TODO: integrate Stripe Checkout` comment with stub `createCheckoutSession()` function.

## ♿ Quality Bar (non-negotiable)

- **Lighthouse target:** 95+ on Performance, Accessibility, Best Practices, SEO.
- **Accessibility:** semantic HTML, proper landmark roles, keyboard nav, focus rings, `aria-*` where needed, color contrast AA minimum, alt text on every image, `prefers-reduced-motion` respected.
- **Responsive:** mobile-first, tested at 375px / 768px / 1024px / 1440px.
- **SEO:** unique title + description per page, sitemap.xml, robots.txt, canonical URLs, JSON-LD.
- **Performance:** lazy-load below-the-fold imagery, font-display: swap, no layout shift.
- **Code quality:** strict TS, no `any`, small focused components, clear file structure, JSDoc on non-obvious functions.

## 📁 Deliverables (in this order)

1. Project scaffold with `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, ESLint/Prettier configs.
2. `app/layout.tsx` with fonts, metadata, providers (cart, theme).
3. Global styles + Tailwind theme extending the CSS variables above.
4. Reusable components: `Header`, `Footer`, `ProductCard`, `Button`, `Container`, `Section`, `Marquee`, `CartDrawer`.
5. Home page composed from sections.
6. `/shop` + `/shop/[slug]` with seeded data.
7. `/our-story`, `/learn`, `/contact`.
8. Cart store + cart drawer + cart page.
9. SEO metadata + JSON-LD.
10. README explaining how to run, structure, and what's stubbed for future work.

## 🧭 How to work

- After the scaffold, generate **one route or component at a time**, in the order above.
- Pause after each major step to show what was built and ask if I want changes before moving on.
- When making a design choice (e.g., layout, motion timing, copy), state the choice in one sentence and proceed — don't over-ask.
- Use realistic, evocative copy — no lorem ipsum. Channel a real brand voice: confident, slightly witty, food-loving.
- Mark anything you intentionally stub with `// TODO(shroom-vroom):` comments.

## ✅ Done means

A locally runnable Next.js app (`npm run dev`) where I can browse the home page, view the shop, open a product, add to cart, see the cart drawer update, and read the brand story — all polished, fast, and on-brand.

Begin by confirming the business angle (A/B/C), then scaffold the project.
