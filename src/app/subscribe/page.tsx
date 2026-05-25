import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Subscribe — Coming Soon",
  description:
    "Weekly mushroom subscription boxes coming soon to Jaipur, Ajmer & Kishangarh.",
};

export default function SubscribePage() {
  return (
    <Section className="pt-28">
      <Container className="max-w-2xl text-center">
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            Coming Soon
          </span>
          <h1 className="mt-3 font-serif text-display-lg font-bold text-forest">
            Weekly Mushroom Box
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-char/70">
            We&apos;re working on a weekly subscription that delivers fresh mushrooms right to
            your door every week. Stay tuned!
          </p>
          <p className="mt-4 text-char/60">
            Want to be the first to know when we launch? Drop us a message on WhatsApp.
          </p>
          <Button className="mt-8" asChild>
            <a href="https://wa.me/919928901003?text=I%27m%20interested%20in%20the%20weekly%20mushroom%20box%20subscription!" target="_blank" rel="noopener noreferrer">
              Notify me on WhatsApp
            </a>
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
