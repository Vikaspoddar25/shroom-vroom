"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

const testimonials = [
  {
    quote:
      "The freshness is unmatched. I've been buying mushrooms from local markets for years, but Shroom Vroom's oyster mushrooms are on another level.",
    author: "Coming soon",
    role: "Jaipur customer",
  },
  {
    quote:
      "Same-day harvest means I get the best texture for my mushroom dishes. My family can't stop eating the mushroom curry now!",
    author: "Coming soon",
    role: "Ajmer customer",
  },
  {
    quote:
      "Love the compostable packaging and the WhatsApp ordering — so convenient! Will definitely recommend to friends.",
    author: "Coming soon",
    role: "Kishangarh customer",
  },
];

export function Testimonials() {
  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <FadeIn>
          <h2
            id="testimonials-heading"
            className="text-center font-serif text-display-sm font-bold text-forest"
          >
            What our people say
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <blockquote className="flex h-full flex-col rounded-organic border border-mist bg-white/50 p-6">
                <p className="flex-1 font-serif text-lg italic leading-relaxed text-forest/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-mist pt-4">
                  <cite className="not-italic">
                    <span className="block text-sm font-semibold text-char">{t.author}</span>
                    <span className="text-xs text-char/50">{t.role}</span>
                  </cite>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
