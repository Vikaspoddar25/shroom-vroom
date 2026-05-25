"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCartStore } from "@/store/cart";
import { useCartDrawerStore } from "@/store/cart-drawer";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/our-story", label: "Our Story" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartDrawerStore((s) => s.open);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20" aria-label="Main navigation">
          <Link href="/" className="relative z-10">
            <Logo className={cn(scrolled ? "text-forest" : "text-forest")} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-char transition-colors hover:text-terracotta"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* WhatsApp CTA */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden text-moss hover:text-terracotta sm:flex"
            >
              <a
                href="https://wa.me/919928901003"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>

            <ThemeToggle />
            <LangToggle />

            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              aria-label={`Open cart, ${totalItems} items`}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </Container>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-cream shadow-xl md:hidden"
          >
            <nav className="flex flex-col gap-4 p-8 pt-24" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-2xl font-medium text-forest transition-colors hover:text-terracotta"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-char/40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
