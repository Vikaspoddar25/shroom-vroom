export interface Product {
  id: string;
  name: string;
  hindiName: string;
  slug: string;
  price: number;
  /** Wholesale price per unit, if applicable */
  wholesalePrice?: number;
  weight: string;
  description: string;
  benefits: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  inStock: boolean;
  form: "fresh" | "dried" | "powder";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Oyster Mushroom",
    hindiName: "ऑयस्टर मशरूम",
    slug: "oyster-mushroom",
    price: 200,
    wholesalePrice: 120,
    weight: "1 kg",
    description:
      "Farm-fresh oyster mushrooms harvested the same day from our Kishangarh facility. Tender, mild-flavored, and incredibly versatile — perfect for Indian curries, stir-fries, pakoras, and biryanis. Rich in protein, low in calories.",
    benefits:
      "High in protein & fiber. Rich in antioxidants and B-vitamins. Supports immunity, lowers cholesterol, and aids digestion. A perfect meat substitute for vegetarians.",
    imageUrl:
      "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=800&h=800&fit=crop",
    tags: ["fresh", "cooking", "protein-rich"],
    featured: true,
    inStock: true,
    form: "fresh",
  },
  {
    id: "2",
    name: "Cordyceps Powder",
    hindiName: "कॉर्डिसेप्स पाउडर",
    slug: "cordyceps-powder",
    price: 10000,
    weight: "100 g",
    description:
      "Premium dried Cordyceps militaris powder, carefully cultivated and processed at our facility in Kishangarh. Known as the 'Himalayan Gold' of traditional medicine. Add to your morning chai, smoothies, or warm milk for a natural energy and immunity boost.",
    benefits:
      "Boosts energy & stamina naturally. Enhances oxygen utilization and athletic performance. Supports respiratory health and kidney function. Powerful adaptogen for stress relief.",
    imageUrl:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop",
    tags: ["wellness", "powder", "immunity"],
    featured: true,
    inStock: true,
    form: "powder",
  },
];
