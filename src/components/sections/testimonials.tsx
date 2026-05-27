"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { testimonials } from "@/data/testimonials";
import { useLang } from "@/lib/lang";

export function Testimonials() {
  const { t } = useLang();

  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <FadeIn>
          <h2
            id="testimonials-heading"
            className="text-center font-serif text-display-sm font-bold text-forest"
          >
            {t("testimonials.heading")}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <blockquote className="flex h-full flex-col rounded-organic border border-mist bg-white/50 dark:bg-[#2a2c2a] dark:border-[#3a3c3a] p-6">
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
