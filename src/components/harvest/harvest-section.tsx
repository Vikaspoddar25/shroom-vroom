"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { useLang } from "@/lib/lang";

const STAGES = [
  { key: "k1", start: 0 },
  { key: "k2", start: 0.2 },
  { key: "k3", start: 0.4 },
  { key: "k4", start: 0.62 },
] as const;
const CTA_START = 0.9;

function getActiveStage(progress: number) {
  return progress >= CTA_START
    ? STAGES.length
    : STAGES.reduce((current, item, index) => (progress >= item.start ? index : current), 0);
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pointer-events-none absolute inset-5 flex flex-col justify-center lg:inset-9"
    >
      {children}
    </motion.div>
  );
}

const HARVEST_IMAGE =
  "https://images.pexels.com/photos/2478421/pexels-photo-2478421.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop";

/** Static version for visitors who prefer reduced motion. */
function HarvestStatic() {
  const { t } = useLang();
  return (
    <section
      className="bg-gradient-to-b from-mist to-cream py-20 lg:py-28"
      aria-labelledby="harvest-heading"
    >
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <div className="relative aspect-[4/3] overflow-hidden rounded-organic shadow-2xl">
            <Image
              src={HARVEST_IMAGE}
              alt={t("harvest.alt")}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <div className="space-y-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              {t("harvest.k1.kicker")}
            </p>
            <h2
              id="harvest-heading"
              className="mt-1 font-serif text-display-md font-bold text-forest"
            >
              {t("harvest.k1.title")}
            </h2>
            <p className="mt-2 max-w-md text-char/70">{t("harvest.k1.text")}</p>
          </FadeIn>
          {STAGES.slice(1).map(({ key }) => (
            <FadeIn key={key}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                {t(`harvest.${key}.kicker`)}
              </p>
              <h3 className="mt-1 font-serif text-display-sm text-forest">
                {t(`harvest.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-md text-char/70">{t(`harvest.${key}.text`)}</p>
            </FadeIn>
          ))}
          <Button size="lg" asChild>
            <Link href="/shop">{t("harvest.k5.cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HarvestStory() {
  const { t } = useLang();
  const [reduceMotion, setReduceMotion] = useState(false);
  const section = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = scrollYProgress;

  useEffect(() => {
    const updateStage = (value: number) => setActiveStage(getActiveStage(value));
    updateStage(progress.get());
    return progress.on("change", updateStage);
  }, [progress]);

  const photoY = useTransform(progress, [0, 1], ["0%", "-2%"]);
  const photoScale = useTransform(progress, [0, 1], [1.04, 1.12]);
  const railScale = useTransform(progress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  if (reduceMotion) return <HarvestStatic />;

  return (
    <section
      ref={section}
      className="relative h-[360vh] md:h-[430vh]"
      aria-label={t("harvest.alt")}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-mist/80 via-cream to-cream">
        <div className="container-wide relative h-full">
          <div className="absolute inset-x-0 top-20 h-[38%] overflow-hidden rounded-organic shadow-2xl lg:inset-y-8 lg:left-8 lg:right-[40%] lg:h-auto">
            <motion.div style={{ y: photoY, scale: photoScale }} className="absolute inset-[-3%]">
              <Image
                src={HARVEST_IMAGE}
                alt={t("harvest.alt")}
                fill
                sizes="(min-width:1024px) 60vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char/20 via-transparent to-char/10" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-16 top-[calc(5rem_+_38%_+_1rem)] lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[37%]">
            <div className="relative h-full w-full rounded-organic bg-cream/95 shadow-xl ring-1 ring-forest/10 backdrop-blur-md lg:flex lg:min-h-[60%] lg:items-center">
              <AnimatePresence mode="wait" initial={false}>
                {activeStage === STAGES.length ? (
                  <motion.div
                    key="shop-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="pointer-events-auto absolute inset-5 flex flex-col justify-center lg:inset-9"
                  >
                    <h2 className="text-balance font-serif text-display-md font-bold text-forest">
                      {t("harvest.k5.title")}
                    </h2>
                    <Button size="lg" className="mt-5" asChild>
                      <Link href="/shop">{t("harvest.k5.cta")}</Link>
                    </Button>
                  </motion.div>
                ) : (
                  <Caption key={STAGES[activeStage].key}>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                      {t(`harvest.${STAGES[activeStage].key}.kicker`)}
                    </p>
                    <h2 className="mt-3 text-balance font-serif text-display-md font-bold text-forest">
                      {t(`harvest.${STAGES[activeStage].key}.title`)}
                    </h2>
                    <p className="mt-3 max-w-sm text-lg leading-relaxed text-char/75">
                      {t(`harvest.${STAGES[activeStage].key}.text`)}
                    </p>
                  </Caption>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="rounded-full bg-cream/75 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-char/60 backdrop-blur-sm">
            {t("harvest.scroll")}
          </span>
        </motion.div>
        <div className="pointer-events-none absolute left-5 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-char/15 md:block">
          <motion.div
            style={{ scaleY: railScale }}
            className="h-full w-px origin-top bg-terracotta"
          />
        </div>
      </div>
    </section>
  );
}
