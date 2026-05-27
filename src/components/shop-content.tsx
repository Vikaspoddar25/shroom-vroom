"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { ShopGrid } from "@/components/shop-grid";
import { useLang } from "@/lib/lang";
import type { Product } from "@/data/products";

export function ShopContent({ products }: { products: Product[] }) {
  const { t } = useLang();

  return (
    <Section className="pt-28">
      <Container>
        <div className="mb-10">
          <h1 className="font-serif text-display-md font-bold text-forest">{t("shop.title")}</h1>
          <p className="mt-2 max-w-xl text-char/60">
            {t("shop.subtitle")}
          </p>
        </div>

        <ShopGrid products={products} />
      </Container>
    </Section>
  );
}
