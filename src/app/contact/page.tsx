import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { ContactForm } from "@/components/contact-form";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about your order, our mushrooms, or wholesale partnerships? Get in touch with the Shroom Vroom team.",
};

export default function ContactPage() {
  return (
    <Section className="pt-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <FadeIn>
            <h1 className="font-serif text-display-md font-bold text-forest">Get in touch</h1>
            <p className="mt-3 text-char/60">
              Questions about your order, wholesale partnerships, or just want to talk mushrooms?
              We&apos;re here.
            </p>
            <ContactForm />
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-display-sm font-bold text-forest">Reach us directly</h2>
            <div className="mt-6 space-y-6">
              <a
                href="https://wa.me/919928901003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-organic border border-mist bg-white/50 p-5 transition-shadow hover:shadow-md"
              >
                <MessageCircle className="mt-0.5 h-6 w-6 text-moss" />
                <div>
                  <p className="font-medium text-char">WhatsApp</p>
                  <p className="text-sm text-char/60">+91 99289 01003</p>
                  <p className="mt-1 text-xs text-char/40">Fastest way to reach us</p>
                </div>
              </a>

              <a
                href="mailto:vikaspodda@gmail.com"
                className="flex items-start gap-4 rounded-organic border border-mist bg-white/50 p-5 transition-shadow hover:shadow-md"
              >
                <Mail className="mt-0.5 h-6 w-6 text-moss" />
                <div>
                  <p className="font-medium text-char">Email</p>
                  <p className="text-sm text-char/60">vikaspodda@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919928901003"
                className="flex items-start gap-4 rounded-organic border border-mist bg-white/50 p-5 transition-shadow hover:shadow-md"
              >
                <Phone className="mt-0.5 h-6 w-6 text-moss" />
                <div>
                  <p className="font-medium text-char">Phone</p>
                  <p className="text-sm text-char/60">+91 99289 01003</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-organic border border-mist bg-white/50 p-5">
                <MapPin className="mt-0.5 h-6 w-6 text-moss" />
                <div>
                  <p className="font-medium text-char">Farm Location</p>
                  <p className="text-sm text-char/60">Kishangarh, Ajmer, Rajasthan</p>
                  <p className="mt-1 text-xs text-char/40">Delivering across India</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
