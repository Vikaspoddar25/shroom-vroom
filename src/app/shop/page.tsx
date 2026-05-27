import type { Metadata } from "next";
import { getAllProducts } from "@/lib/content";
import { ShopContent } from "@/components/shop-content";

export const metadata: Metadata = {
  title: "Shop Fresh Mushrooms",
  description:
    "Browse our full selection of farm-fresh gourmet and exotic mushrooms. Lion's Mane, Oyster, Shiitake, Maitake, King Trumpet, and more.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return <ShopContent products={products} />;
}
