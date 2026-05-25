import type { Metadata } from "next";
import { getAllProducts } from "@/lib/content";
import { ShopGrid } from "@/components/shop-grid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Shop Fresh Mushrooms",
  description:
    "Browse our full selection of farm-fresh gourmet and exotic mushrooms. Lion's Mane, Oyster, Shiitake, Maitake, King Trumpet, and more.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <Section className="pt-28">
      <Container>
        <div className="mb-10">
          <h1 className="font-serif text-display-md font-bold text-forest">The harvest</h1>
          <p className="mt-2 max-w-xl text-char/60">
            Every mushroom on this page was growing less than 48 hours ago. Pick your favorites —
            we&apos;ll handle the rest.
          </p>
        </div>

        <ShopGrid products={products} />
      </Container>
    </Section>
  );
}
