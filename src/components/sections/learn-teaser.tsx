"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

const articles = [
  {
    slug: "mushroom-biryani",
    title: "Mushroom Biryani with Oyster Mushrooms",
    excerpt: "A fragrant, layered biryani that'll make you forget about paneer.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
    category: "Recipe",
  },
  {
    slug: "oyster-mushroom-65",
    title: "Crispy Mushroom 65 — Better Than Chicken",
    excerpt: "Spicy, crunchy, and 100% plant-based. Perfect with chai.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    category: "Recipe",
  },
  {
    slug: "health-benefits-oyster-mushrooms",
    title: "Why Oyster Mushrooms Are a Superfood",
    excerpt: "Immune support, cholesterol management, and protein — all in one.",
    image: "https://images.unsplash.com/photo-1590864916822-6d30b38e23e0?w=600&h=400&fit=crop",
    category: "Health",
  },
];

export function LearnTeaser() {
  return (
    <Section className="bg-mist/30" aria-labelledby="learn-heading">
      <Container>
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            Learn
          </span>
          <h2 id="learn-heading" className="mt-3 font-serif text-display-sm font-bold text-forest">
            Recipes & Health Tips
          </h2>
          <p className="mt-2 max-w-xl text-char/60">
            Indian recipes, health benefits, and everything you need to make mushrooms a part of
            your daily diet.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 0.1}>
              <Link
                href={`/learn/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-organic border border-mist bg-white/60 transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
                    {article.category}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-forest group-hover:text-terracotta">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-char/60">{article.excerpt}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
