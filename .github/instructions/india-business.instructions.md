---
description: "Use when adding or editing products, pricing, delivery config, or any business-specific content for Shroom Vroom India. Covers INR, WhatsApp ordering, delivery areas, and product data structure."
applyTo: "src/data/**"
---

# India Business Rules

## Products
Only 2 products exist — do NOT add more without being asked:
- `oyster-mushroom` — Fresh Oyster Mushroom, ₹200/kg retail, ₹120/kg wholesale
- `cordyceps-powder` — Cordyceps Powder, ₹10,000/100g

### Product Interface (src/data/products.ts)
```ts
interface Product {
  id: string;
  name: string;
  hindiName: string;       // Hindi name, e.g. "ढींगरी मशरूम"
  slug: string;
  description: string;
  benefits: string;        // Health benefits paragraph
  price: number;           // in INR (paise-free, whole numbers)
  wholesalePrice?: number; // optional, per kg
  weight: string;          // display string e.g. "per kg"
  form: "fresh" | "powder" | "dried" | "capsule";
  imageUrl: string;
  tags: string[];          // from: fresh, cooking, wellness, powder
  inStock: boolean;
}
```
No `latinName`, no `growingTips` — those were removed.

## Pricing
- Currency: INR only
- Use `formatPrice(n)` from `src/lib/content.ts` everywhere
- Free delivery above ₹1,000; ₹50 charge below — defined in `DELIVERY_CONFIG`

## Delivery Areas
Jaipur, Ajmer, Kishangarh only. Do not add other cities without being asked.

## Contact
- WhatsApp: `https://wa.me/919928901003`
- Email: `vikaspodda@gmail.com`
- Farm: Kishangarh, Ajmer, Rajasthan
- Founders: Jai, Amit & Vikas

## Checkout
No Stripe, no payment gateway. Orders go via WhatsApp message to 9928901003.
Payment accepted: UPI / Cash on Delivery — mention this where relevant.
