"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

export function StoryTeaser() {
  return (
    <Section aria-labelledby="story-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-organic">
              <Image
                src="https://images.pexels.com/photos/2478421/pexels-photo-2478421.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Hands harvesting fresh oyster mushrooms from substrate in indoor farm"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={0.15}>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
              Our Story
            </span>
            <h2
              id="story-heading"
              className="mt-3 font-serif text-display-md font-bold text-forest"
            >
              From our farm to your kitchen in 24 hours
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-char/70">
              Three friends — Jai, Amit & Vikas — started Shroom Vroom in Kishangarh, Rajasthan,
              with a mission: bring truly fresh, pesticide-free mushrooms to Indian kitchens.
            </p>
            <p className="mt-4 leading-relaxed text-char/60">
              Most mushrooms you buy sit in cold storage for days. Ours are harvested the same
              morning you order, packed in compostable material, and delivered within 24 hours
              across India.
            </p>
            <Button variant="outline" className="mt-8" asChild>
              <Link href="/our-story">Read our full story →</Link>
            </Button>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
