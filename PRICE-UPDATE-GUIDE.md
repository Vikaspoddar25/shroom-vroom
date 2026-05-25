# How to Update Prices & Products (Without a Developer)

## Quick Reference

All product data lives in **one file**: `src/data/products.ts`

---

## Changing Prices

1. Open `src/data/products.ts` in VS Code (or GitHub web editor)
2. Find the product you want to update
3. Change the `price` value (in ₹):

```ts
// Example: Change Oyster Mushroom price from ₹200 to ₹250
price: 250,          // retail price
wholesalePrice: 150, // wholesale price (optional)
```

4. Save the file
5. Run `/github-commit` in Copilot chat — it auto-deploys

---

## Changing Product Weight/Quantity

Same file, change the `weight` field:

```ts
weight: "500 g",  // was "1 kg"
```

---

## Changing Delivery Charges

Open `src/lib/content.ts` and edit `DELIVERY_CONFIG`:

```ts
export const DELIVERY_CONFIG = {
  freeAbove: 5000,  // Free delivery on orders above this amount (₹)
  charge: 50,       // Delivery fee (₹) for orders below freeAbove
  areas: ["All India"],
} as const;
```

---

## Adding a New Product

Add a new object to the `products` array in `src/data/products.ts`:

```ts
{
  id: "3",
  name: "Your New Product",
  hindiName: "हिंदी नाम",
  slug: "your-product-slug",   // URL-friendly, lowercase, hyphens
  price: 500,
  wholesalePrice: 300,         // optional
  weight: "250 g",
  description: "Product description here...",
  benefits: "Health benefits here...",
  imageUrl: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
  tags: ["fresh", "cooking"],  // used for shop filters
  featured: true,              // shows on homepage
  inStock: true,
  form: "fresh",               // "fresh" | "dried" | "powder"
},
```

---

## Marking a Product Out of Stock

Change `inStock: true` to `inStock: false` — the product will show a "Notify on WhatsApp" button instead of "Add to cart".

---

## Using GitHub Web Editor (No VS Code Needed)

1. Go to https://github.com/Vikaspoddar25/shroom-vroom
2. Navigate to the file you want to edit (e.g., `src/data/products.ts`)
3. Click the pencil icon (Edit this file)
4. Make your change
5. Click "Commit changes" → write a message → Commit
6. Vercel auto-deploys in ~60 seconds

---

## Important Rules

- **Never hardcode ₹ symbol in components** — always use `formatPrice()` from `src/lib/content.ts`
- **Image URLs**: Use Pexels (`images.pexels.com`) or Unsplash (`images.unsplash.com`) — both are configured in `next.config.js`
- **Slug must be unique** — it becomes the product URL: `shroomvroom.com/shop/your-slug`
- **Tags for filters**: Available tags are `fresh`, `cooking`, `wellness`, `powder`
- **After any edit**: Changes go live automatically when committed to the `main` branch
