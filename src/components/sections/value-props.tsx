"use client";

import { Leaf, Truck, Sprout, ChefHat } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { useLang } from "@/lib/lang";

const props = [
  {
    icon: Sprout,
    titleKey: "value.sameDay",
    descKey: "value.sameDayDesc",
  },
  {
    icon: Leaf,
    titleKey: "value.pesticide",
    descKey: "value.pesticideDesc",
  },
  {
    icon: Truck,
    titleKey: "value.delivery",
    descKey: "value.deliveryDesc",
  },
  {
    icon: ChefHat,
    titleKey: "value.packaging",
    descKey: "value.packagingDesc",
  },
];

export function ValueProps() {
  const { t } = useLang();

  return (
    <Section aria-labelledby="value-heading">
      <Container>
        <FadeIn>
          <h2 id="value-heading" className="font-serif text-display-sm font-bold text-forest">
            {t("value.heading")}
          </h2>
          <p className="mt-3 max-w-xl text-char/60">
            {t("value.subheading")}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {props.map((prop, i) => (
            <FadeIn key={prop.titleKey} delay={i * 0.1}>
              <div className="rounded-organic border border-mist bg-white/50 dark:bg-[#2a2c2a] p-6 transition-shadow hover:shadow-md">
                <prop.icon className="h-8 w-8 text-terracotta" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-lg font-semibold text-forest">{t(prop.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-char/60">{t(prop.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
