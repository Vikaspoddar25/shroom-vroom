import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/content";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function FeaturedProducts() {
  const featured = await getFeaturedProducts();

  return (
    <Section className="bg-mist/30" aria-labelledby="featured-heading">
      <Container>
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <h2
                id="featured-heading"
                className="font-serif text-display-sm font-bold text-forest"
              >
                This week&apos;s harvest
              </h2>
              <p className="mt-2 text-char/60">Fresh picks, limited quantities.</p>
            </div>
            <Button variant="link" asChild className="hidden md:inline-flex">
              <Link href="/shop">View all →</Link>
            </Button>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/shop">View all mushrooms</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
