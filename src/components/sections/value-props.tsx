"use client";

import { Leaf, Truck, Sprout, ChefHat } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

const props = [
  {
    icon: Sprout,
    title: "Same-Day Harvested",
    description:
      "No cold storage. Picked the same morning your order comes in. Maximum freshness guaranteed.",
  },
  {
    icon: Leaf,
    title: "Pesticide-Free",
    description:
      "Grown on natural substrates without any chemicals. Safe for your family, safe for the planet.",
  },
  {
    icon: Truck,
    title: "Farm-to-Fork in 24hrs",
    description:
      "Free delivery across India on orders above ₹5,000. Local delivery in Jaipur, Ajmer & Kishangarh.",
  },
  {
    icon: ChefHat,
    title: "Compostable Packaging",
    description:
      "We use eco-friendly, fully compostable packaging. No plastic touches your mushrooms.",
  },
];

export function ValueProps() {
  return (
    <Section aria-labelledby="value-heading">
      <Container>
        <FadeIn>
          <h2 id="value-heading" className="font-serif text-display-sm font-bold text-forest">
            Why fresh matters
          </h2>
          <p className="mt-3 max-w-xl text-char/60">
            Supermarket mushrooms sit for days. Ours go from farm to your kitchen in under 24
            hours.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {props.map((prop, i) => (
            <FadeIn key={prop.title} delay={i * 0.1}>
              <div className="rounded-organic border border-mist bg-white/50 p-6 transition-shadow hover:shadow-md">
                <prop.icon className="h-8 w-8 text-terracotta" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-lg font-semibold text-forest">{prop.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-char/60">{prop.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
