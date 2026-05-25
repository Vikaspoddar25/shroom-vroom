import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Learn — Recipes & Health Tips",
  description:
    "Indian mushroom recipes, health benefits, and tips on cooking with fresh oyster mushrooms and cordyceps.",
};

const articles = [
  {
    slug: "mushroom-biryani",
    title: "Mushroom Biryani with Oyster Mushrooms",
    excerpt:
      "A fragrant, layered biryani that showcases the meaty texture of fresh oyster mushrooms. Perfect for Sunday lunch.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=500&fit=crop",
    category: "Recipe",
    date: "2025",
  },
  {
    slug: "oyster-mushroom-65",
    title: "Crispy Mushroom 65 — Better Than Chicken",
    excerpt:
      "Spicy, crunchy, and 100% plant-based. A South Indian classic reimagined with fresh oyster mushrooms.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop",
    category: "Recipe",
    date: "2025",
  },
  {
    slug: "health-benefits-oyster-mushrooms",
    title: "Why Oyster Mushrooms Are a Superfood",
    excerpt:
      "Immune support, cholesterol management, high protein — discover why oyster mushrooms should be a staple in your diet.",
    image: "https://images.unsplash.com/photo-1590864916822-6d30b38e23e0?w=800&h=500&fit=crop",
    category: "Health",
    date: "2025",
  },
  {
    slug: "mushroom-curry-recipe",
    title: "Creamy Mushroom Curry — Everyday Dal Alternative",
    excerpt:
      "A rich, coconut-milk based curry that pairs perfectly with roti or rice. Ready in 20 minutes.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=500&fit=crop",
    category: "Recipe",
    date: "2025",
  },
  {
    slug: "cordyceps-benefits",
    title: "Cordyceps: The Energy Mushroom",
    excerpt:
      "How cordyceps can boost your stamina, support your lungs, and improve athletic performance naturally.",
    image: "https://images.unsplash.com/photo-1552825897-bb2e4e190e70?w=800&h=500&fit=crop",
    category: "Health",
    date: "2025",
  },
  {
    slug: "storing-fresh-mushrooms",
    title: "How to Store Fresh Mushrooms at Home",
    excerpt:
      "Simple tips to keep your oyster mushrooms fresh for longer — paper bags, ventilation, and what to avoid.",
    image: "https://images.unsplash.com/photo-1504700610630-ac6bc8db4da2?w=800&h=500&fit=crop",
    category: "Guide",
    date: "2025",
  },
];

export default function LearnPage() {
  return (
    <Section className="pt-28">
      <Container>
        <FadeIn>
          <h1 className="font-serif text-display-md font-bold text-forest">
            Recipes & Health Tips
          </h1>
          <p className="mt-3 max-w-xl text-lg text-char/60">
            Indian recipes, health benefits, and tips for cooking with fresh mushrooms.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 0.05}>
              <Link
                href={`/learn/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-organic border border-mist bg-white/60 transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[8/5] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-terracotta">
                      {article.category}
                    </span>
                    <span className="text-xs text-char/40">{article.date}</span>
                  </div>
                  <h2 className="mt-2 font-serif text-lg font-semibold text-forest transition-colors group-hover:text-terracotta">
                    {article.title}
                  </h2>
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
