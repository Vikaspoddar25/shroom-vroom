"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { useLang } from "@/lib/lang";

const articles = [
  {
    slug: "mushroom-biryani",
    title: "Mushroom Biryani with Oyster Mushrooms",
    excerpt: "A fragrant, layered biryani that'll make you forget about paneer.",
    image: "https://images.pexels.com/photos/12669168/pexels-photo-12669168.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    category: "Recipe",
  },
  {
    slug: "oyster-mushroom-65",
    title: "Crispy Mushroom 65 — Better Than Chicken",
    excerpt: "Spicy, crunchy, and 100% plant-based. Perfect with chai.",
    image: "https://images.pexels.com/photos/5644975/pexels-photo-5644975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    category: "Recipe",
  },
  {
    slug: "health-benefits-oyster-mushrooms",
    title: "Why Oyster Mushrooms Are a Superfood",
    excerpt: "Immune support, cholesterol management, and protein — all in one.",
    image: "https://images.pexels.com/photos/6805771/pexels-photo-6805771.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    category: "Health",
  },
];

export function LearnTeaser() {
  const { t } = useLang();

  return (
    <Section className="bg-mist/30" aria-labelledby="learn-heading">
      <Container>
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            {t("learn.label")}
          </span>
          <h2 id="learn-heading" className="mt-3 font-serif text-display-sm font-bold text-forest">
            {t("learn.heading")}
          </h2>
          <p className="mt-2 max-w-xl text-char/60">
            {t("learn.subheading")}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 0.1}>
              <Link
                href={`/learn/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-organic border border-mist bg-white/60 dark:bg-[#2a2c2a] transition-shadow hover:shadow-md"
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
