"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";

export function FeedbackCTA() {
  const message = encodeURIComponent(
    "Hi Shroom Vroom! I'd like to share my feedback: "
  );

  return (
    <Section className="bg-forest/5">
      <Container className="max-w-2xl text-center">
        <FadeIn>
          <MessageCircle className="mx-auto h-10 w-10 text-moss" />
          <h2 className="mt-4 font-serif text-display-sm font-bold text-forest">
            Share your experience
          </h2>
          <p className="mt-3 text-lg text-char/60">
            Loved our mushrooms? Have a suggestion? We&apos;d love to hear from you — your
            feedback helps us grow better.
          </p>
          <Button className="mt-6" asChild>
            <a
              href={`https://wa.me/919928901003?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send feedback on WhatsApp
            </a>
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
