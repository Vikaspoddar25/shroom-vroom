"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Heart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/product-card";
import { FadeIn } from "@/components/fade-in";
import { useCartStore } from "@/store/cart";
import { useCartDrawerStore } from "@/store/cart-drawer";
import { formatPrice, DELIVERY_CONFIG } from "@/lib/content";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/products";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartDrawerStore((s) => s.open);

  const handleAdd = () => {
    addItem(product);
    openCart();
    track("add_to_cart", { productId: product.id, productName: product.name });
  };

  return (
    <>
      <Section className="pt-28">
        <Container>
          {/* Back link */}
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-char/60 hover:text-terracotta"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Gallery */}
            <FadeIn>
              <div className="relative aspect-square overflow-hidden rounded-organic">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.form !== "fresh" && (
                  <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold uppercase text-cream">
                    {product.form}
                  </span>
                )}
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col">
                <p className="text-xs font-medium uppercase tracking-wider text-terracotta">
                  {product.tags[0]}
                </p>
                <h1 className="mt-2 font-serif text-display-md font-bold text-forest">
                  {product.name}
                </h1>
                <p className="mt-1 text-sm text-char/50">{product.hindiName}</p>

                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-serif text-3xl font-bold text-char">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-char/50">/ {product.weight}</span>
                </div>

                {product.wholesalePrice && (
                  <p className="mt-2 text-sm text-moss">
                    Wholesale: {formatPrice(product.wholesalePrice)}/kg (bulk orders)
                  </p>
                )}

                <p className="mt-6 leading-relaxed text-char/70">{product.description}</p>

                {product.inStock ? (
                  <Button onClick={handleAdd} size="lg" className="mt-8 w-full gap-2 sm:w-auto">
                    <ShoppingBag className="h-5 w-5" />
                    Add to cart
                  </Button>
                ) : (
                  <p className="mt-8 rounded-organic bg-mist p-4 text-sm text-char/60">
                    Currently out of stock. WhatsApp us to get notified when it&apos;s back.
                  </p>
                )}

                {/* Delivery info */}
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-mist bg-white/50 p-4">
                  <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-moss" aria-hidden="true" />
                  <div className="text-sm text-char/60">
                    <p>
                      Free delivery on orders above {formatPrice(DELIVERY_CONFIG.freeAbove)}.
                      Otherwise {formatPrice(DELIVERY_CONFIG.charge)} delivery charge.
                    </p>
                    <p className="mt-1 font-medium text-char/80">
                      Delivering to: {DELIVERY_CONFIG.areas.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Health Benefits */}
                <div className="mt-6 rounded-organic border border-mist bg-white/50 p-6">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-terracotta" aria-hidden="true" />
                    <h2 className="font-serif text-lg font-semibold text-forest">Health Benefits</h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-char/60">
                    {product.benefits}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      {related.length > 0 && (
        <Section className="bg-mist/30" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="font-serif text-display-sm font-bold text-forest">
              You might also like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* JSON-LD for Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "INR",
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </>
  );
}
