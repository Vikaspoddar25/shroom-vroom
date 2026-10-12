"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { useLang } from "@/lib/lang";
import { useIsDark, useQuality } from "./use-quality";

// Heavy 3D chunk: only fetched once the section is about to scroll into view.
const HarvestScene = dynamic(() => import("./harvest-scene"), { ssr: false });

const STAGES = [
  { key: "k1", from: -0.05, to: 0.17 },
  { key: "k2", from: 0.2, to: 0.4 },
  { key: "k3", from: 0.42, to: 0.6 },
  { key: "k4", from: 0.63, to: 0.88 },
] as const;

function Caption({
  progress,
  from,
  to,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [from, from + 0.04, to - 0.04, to], [0, 1, 1, 0]);
  const y = useTransform(progress, [from, from + 0.04, to - 0.04, to], [24, 0, 0, -24]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
    >
      {children}
    </motion.div>
  );
}

function Poster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-mist to-cream">
      <div className="relative h-[55vh] w-[min(80vw,640px)] opacity-60 blur-[2px]">
        <Image
          src="/oyster-mushroom.png"
          alt=""
          fill
          sizes="640px"
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}

/** Static version for reduced motion, low-power devices and WebGL failure. */
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
              src="/oyster-mushroom.png"
              alt={t("harvest.alt")}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
        <div className="space-y-8">
          <h2 id="harvest-heading" className="font-serif text-display-md font-bold text-forest">
            {t("harvest.k1.title")}
          </h2>
          {STAGES.map(({ key }) => (
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
  const quality = useQuality();
  const dark = useIsDark();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  // gentle spring so the 3D scene glides through fast flicks instead of snapping
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.5 });

  // mount the canvas one screen early; run the render loop only while visible
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const early = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: "100% 0px",
    });
    const live = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "10% 0px",
    });
    early.observe(el);
    live.observe(el);
    return () => {
      early.disconnect();
      live.disconnect();
    };
  }, []);

  const railScale = useTransform(progress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const ctaOpacity = useTransform(progress, [0.9, 0.96], [0, 1]);
  const ctaY = useTransform(progress, [0.9, 0.96], [24, 0]);
  const ctaEvents = useTransform(ctaOpacity, (v) => (v > 0.5 ? "auto" : "none"));

  if (quality === "fallback" || failed) return <HarvestStatic />;

  return (
    <section
      ref={section}
      className="relative h-[430vh] md:h-[540vh]"
      aria-label={t("harvest.alt")}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Poster />

        {quality && near && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          >
            <HarvestScene
              progress={progress}
              quality={quality}
              dark={dark}
              active={visible}
              onReady={() => setReady(true)}
              onFail={() => setFailed(true)}
            />
          </div>
        )}

        {/* legibility scrim behind copy */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-cream/70 lg:via-cream/0 lg:to-transparent" />

        <div className="container-wide pointer-events-none relative h-full pb-16 pt-28 lg:pb-0 lg:pt-0">
          <div className="relative h-full lg:ml-auto lg:max-w-md">
            {STAGES.map(({ key, from, to }) => (
              <Caption key={key} progress={progress} from={from} to={to}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                  {t(`harvest.${key}.kicker`)}
                </p>
                <h2 className="mt-3 text-balance font-serif text-display-md font-bold text-forest">
                  {t(`harvest.${key}.title`)}
                </h2>
                <p className="mt-3 max-w-sm text-lg leading-relaxed text-char/75">
                  {t(`harvest.${key}.text`)}
                </p>
              </Caption>
            ))}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaEvents }}
              className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:items-start lg:text-left"
            >
              <h2 className="text-balance font-serif text-display-md font-bold text-forest">
                {t("harvest.k5.title")}
              </h2>
              <Button size="lg" className="mt-5" asChild>
                <Link href="/shop">{t("harvest.k5.cta")}</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* scroll hint + progress rail */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-char/60">
            {t("harvest.scroll")}
          </span>
          <span className="mx-auto mt-2 block h-8 w-px animate-pulse bg-char/40" />
        </motion.div>
        <div className="pointer-events-none absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-char/15 md:block">
          <motion.div
            style={{ scaleY: railScale }}
            className="h-full w-px origin-top bg-terracotta"
          />
        </div>
      </div>
    </section>
  );
}
