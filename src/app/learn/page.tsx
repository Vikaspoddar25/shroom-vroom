import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { LearnArticles } from "@/components/learn-articles";

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
    image: "https://images.pexels.com/photos/12669168/pexels-photo-12669168.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Recipe",
    date: "2025",
  },
  {
    slug: "oyster-mushroom-65",
    title: "Crispy Mushroom 65 — Better Than Chicken",
    excerpt:
      "Spicy, crunchy, and 100% plant-based. A South Indian classic reimagined with fresh oyster mushrooms.",
    image: "https://images.pexels.com/photos/5644975/pexels-photo-5644975.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Recipe",
    date: "2025",
  },
  {
    slug: "health-benefits-oyster-mushrooms",
    title: "Why Oyster Mushrooms Are a Superfood",
    excerpt:
      "Immune support, cholesterol management, high protein — discover why oyster mushrooms should be a staple in your diet.",
    image: "https://images.pexels.com/photos/6805771/pexels-photo-6805771.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Health",
    date: "2025",
  },
  {
    slug: "mushroom-curry-recipe",
    title: "Creamy Mushroom Curry — Everyday Dal Alternative",
    excerpt:
      "A rich, coconut-milk based curry that pairs perfectly with roti or rice. Ready in 20 minutes.",
    image: "https://images.pexels.com/photos/35041661/pexels-photo-35041661.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Recipe",
    date: "2025",
  },
  {
    slug: "cordyceps-benefits",
    title: "Cordyceps: The Energy Mushroom",
    excerpt:
      "How cordyceps can boost your stamina, support your lungs, and improve athletic performance naturally.",
    image: "https://images.pexels.com/photos/14772118/pexels-photo-14772118.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Health",
    date: "2025",
  },
  {
    slug: "storing-fresh-mushrooms",
    title: "How to Store Fresh Mushrooms at Home",
    excerpt:
      "Simple tips to keep your oyster mushrooms fresh for longer — paper bags, ventilation, and what to avoid.",
    image: "https://images.pexels.com/photos/6805771/pexels-photo-6805771.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
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

        <LearnArticles articles={articles} />
      </Container>
    </Section>
  );
}
