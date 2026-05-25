import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Shroom Vroom started — three friends in Rajasthan on a mission to bring fresh, pesticide-free mushrooms to Indian kitchens.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-28">
        <Container>
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
              Our Story
            </span>
            <h1 className="mt-3 max-w-3xl font-serif text-display-lg font-bold text-forest">
              Fresh mushrooms deserve better
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-char/70">
              Most mushrooms you find in Indian markets have been sitting around for days —
              losing freshness, flavor, and nutrition. We started Shroom Vroom to fix that.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Full-bleed image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&h=800&fit=crop"
          alt="Inside the Shroom Vroom growing facility — rows of oyster mushrooms on shelves"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Origin */}
      <Section>
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-display-sm font-bold text-forest">
              Three friends, one farm
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-char/70">
              <p>
                In 2024, Jai, Amit, and Vikas — three friends from Rajasthan — came together
                with a shared passion for health-conscious food and sustainable farming.
              </p>
              <p>
                Vikas had been experimenting with mushroom cultivation for years. Jai brought
                the business mind. Amit handled operations and delivery logistics. Together,
                they set up a mushroom farm in Kishangarh, Ajmer.
              </p>
              <p>
                The mission was simple: grow the freshest, cleanest mushrooms possible and
                deliver them to kitchens the same day they&apos;re harvested. No cold storage,
                no chemicals, no middlemen.
              </p>
              <p>
                Today, Shroom Vroom delivers fresh Oyster Mushrooms and Cordyceps Powder
                across Jaipur, Ajmer, and Kishangarh — with plans to expand across Rajasthan
                and beyond.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-mist/30">
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-display-sm font-bold text-forest">What we stand for</h2>
            <ul className="mt-8 space-y-6">
              {[
                {
                  title: "Same-day freshness",
                  text: "Every mushroom is harvested the same day it's delivered. No cold storage, no exceptions.",
                },
                {
                  title: "Pesticide-free & natural",
                  text: "We grow on natural substrates without any chemicals. What you eat is as clean as it gets.",
                },
                {
                  title: "Compostable packaging",
                  text: "No plastic touches your mushrooms. All packaging is eco-friendly and compostable.",
                },
                {
                  title: "Direct from farm",
                  text: "No middlemen, no markups. You get farm-fresh quality at honest prices.",
                },
              ].map((value) => (
                <li key={value.title} className="border-l-2 border-terracotta pl-6">
                  <h3 className="font-serif text-lg font-semibold text-forest">{value.title}</h3>
                  <p className="mt-1 text-char/60">{value.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
