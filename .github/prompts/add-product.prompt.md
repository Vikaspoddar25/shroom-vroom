---
description: "Add a new product to the Shroom Vroom catalog"
name: "Add Product"
argument-hint: "Describe the new product (name, price, description...)"
agent: "agent"
---

Add a new product to the Shroom Vroom catalog at `src/data/products.ts`.

Use the argument as the product description: $input

Follow this checklist:
1. Read `src/data/products.ts` to understand the current `Product` interface and existing products
2. Generate a new product object with ALL required fields:
   - `id`: kebab-case unique string
   - `name`: English product name
   - `hindiName`: Hindi name
   - `slug`: URL-friendly, matches `id`
   - `description`: 1–2 sentence marketing description
   - `benefits`: Health benefits paragraph (2–3 sentences)
   - `price`: INR amount (whole number, no paise)
   - `wholesalePrice`: optional, per kg for bulk
   - `weight`: display string e.g. `"per kg"` or `"per 100g"`
   - `form`: one of `"fresh"` | `"powder"` | `"dried"` | `"capsule"`
   - `imageUrl`: use a relevant Unsplash URL with ?w=800&h=900&fit=crop
   - `tags`: array from `["fresh", "cooking", "wellness", "powder"]`
   - `inStock`: `true`
3. Add it to the `products` array in `src/data/products.ts`
4. Run `npm run build` to verify no type errors
