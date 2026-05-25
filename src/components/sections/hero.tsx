"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLang } from "@/lib/lang";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20" aria-labelledby="hero-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-mist" />

      <Container className="relative z-10 flex min-h-[80vh] items-center">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              id="hero-heading"
              className="font-serif text-display-lg font-bold tracking-tight text-forest"
            >
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
              <br />
              <span className="italic text-terracotta">{t("hero.title3")}</span> {t("hero.title4")}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-char/70">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">{t("hero.orderNow")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/919928901003" target="_blank" rel="noopener noreferrer">
                  {t("hero.whatsapp")}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Hero imagery — layered mushroom photos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden aspect-square lg:block"
          >
            <div className="absolute right-0 top-0 h-[80%] w-[75%] overflow-hidden rounded-organic shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=800&h=900&fit=crop"
                alt="Fresh oyster mushrooms arranged on a wooden surface"
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 h-[55%] w-[55%] overflow-hidden rounded-organic border-4 border-cream shadow-xl">
              <Image
                src="https://images.pexels.com/photos/2478421/pexels-photo-2478421.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                alt="Hands harvesting fresh oyster mushrooms from substrate in indoor farm"
                fill
                className="object-cover"
                sizes="25vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
