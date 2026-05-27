"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { LearnArticles } from "@/components/learn-articles";
import { useLang } from "@/lib/lang";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export function LearnContent({ articles }: { articles: Article[] }) {
  const { t } = useLang();

  return (
    <Section className="pt-28">
      <Container>
        <FadeIn>
          <h1 className="font-serif text-display-md font-bold text-forest">
            {t("learn.title")}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-char/60">
            {t("learn.subtitle")}
          </p>
        </FadeIn>

        <LearnArticles articles={articles} />
      </Container>
    </Section>
  );
}
