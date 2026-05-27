"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { useLang } from "@/lib/lang";

export function OurStoryContent() {
  const { t } = useLang();

  const values = [
    { titleKey: "story.v1.title", textKey: "story.v1.text" },
    { titleKey: "story.v2.title", textKey: "story.v2.text" },
    { titleKey: "story.v3.title", textKey: "story.v3.text" },
    { titleKey: "story.v4.title", textKey: "story.v4.text" },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-28">
        <Container>
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
              {t("story.label")}
            </span>
            <h1 className="mt-3 max-w-3xl font-serif text-display-lg font-bold text-forest">
              {t("story.heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-char/70">
              {t("story.intro")}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Full-bleed image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.pexels.com/photos/2478421/pexels-photo-2478421.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop"
          alt="Hands harvesting fresh oyster mushrooms from substrate in indoor farm"
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
              {t("story.threeTitle")}
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-char/70">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
              <p>{t("story.p4")}</p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-mist/30">
        <Container className="max-w-3xl">
          <FadeIn>
            <h2 className="font-serif text-display-sm font-bold text-forest">
              {t("story.valuesTitle")}
            </h2>
            <ul className="mt-8 space-y-6">
              {values.map((value) => (
                <li key={value.titleKey} className="border-l-2 border-terracotta pl-6">
                  <h3 className="font-serif text-lg font-semibold text-forest">
                    {t(value.titleKey)}
                  </h3>
                  <p className="mt-1 text-char/60">{t(value.textKey)}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
