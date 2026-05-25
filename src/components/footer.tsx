import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Fresh Mushrooms", href: "/shop?tag=fresh" },
    { label: "Wellness", href: "/shop?tag=wellness" },
    { label: "Wholesale", href: "/wholesale" },
  ],
  learn: [
    { label: "Recipes", href: "/learn" },
    { label: "Health Benefits", href: "/learn" },
  ],
  company: [
    { label: "Our Story", href: "/our-story" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-mist bg-forest text-cream" role="contentinfo">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo className="mb-4 text-cream" />
            <p className="max-w-sm text-sm leading-relaxed text-cream/70">
              Farm-fresh mushrooms, harvested same-day and delivered within 24 hours.
              Pesticide-free. Compostable packaging.
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
              Shop
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/50">
              Learn
            </h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/50">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} Shroom Vroom. All rights reserved.</p>
          <p className="text-xs text-cream/50">
            Delivering across India
          </p>
        </div>
      </Container>
    </footer>
  );
}
