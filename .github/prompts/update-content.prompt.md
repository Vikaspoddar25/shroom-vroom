---
description: "Update website copy, page content, or business details on Shroom Vroom"
name: "Update Content"
argument-hint: "What content to update (e.g. hero headline, about page, contact details...)"
agent: "agent"
---

Update content on the Shroom Vroom website.

What to update: $input

Steps:
1. Identify the relevant file(s) — check:
   - Homepage sections: `src/components/sections/`
   - Pages: `src/app/*/page.tsx`
   - Business constants: `src/lib/content.ts`
   - Products: `src/data/products.ts`
2. Read the current content of the identified file(s)
3. Make the requested copy/content changes
4. Keep brand voice: warm, direct, Indian-context, no Western idioms
5. Ensure INR pricing uses `formatPrice()`, WhatsApp links use `wa.me/919928901003`
6. Run `npm run build` to verify no errors
