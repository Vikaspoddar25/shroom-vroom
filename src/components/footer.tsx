"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { useLang } from "@/lib/lang";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-mist bg-forest text-cream" role="contentinfo">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo className="mb-4 text-cream" />
            <p className="max-w-sm text-sm leading-relaxed text-cream/70">
              {t("footer.description")}
            </p>
            <div className="mt-4 space-y-2 text-sm text-cream/70">
              <a
                href="https://wa.me/919928901003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cream"
              >
                <MessageCircle className="h-4 w-4" />
                +91 99289 01003
              </a>
              <a
                href="mailto:vikaspodda@gmail.com"
                className="flex items-center gap-2 hover:text-cream"
              >
                <Mail className="h-4 w-4" />
                vikaspodda@gmail.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Kishangarh, Ajmer, Rajasthan
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t("footer.shop")}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.allProducts")}</Link></li>
              <li><Link href="/shop?tag=fresh" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.freshMushrooms")}</Link></li>
              <li><Link href="/shop?tag=wellness" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.wellness")}</Link></li>
              <li><Link href="/wholesale" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.wholesale")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t("footer.learn")}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.recipes")}</Link></li>
              <li><Link href="/learn" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.healthBenefits")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t("footer.company")}
            </h3>
            <ul className="space-y-2">
              <li><Link href="/our-story" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.ourStory")}</Link></li>
              <li><Link href="/contact" className="text-sm text-cream/70 transition-colors hover:text-cream">{t("footer.contact")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} Shroom Vroom. {t("footer.copyright")}</p>
          <p className="text-xs text-cream/50">
            {t("footer.delivering")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
