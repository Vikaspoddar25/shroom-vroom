import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fade-in";
import { WholesaleForm } from "@/components/wholesale-form";

export const metadata: Metadata = {
  title: "Wholesale — Bulk Orders",
  description:
    "Bulk mushroom orders for restaurants, caterers, and hotels. Minimum 25kg. Custom pricing based on quantity.",
};

const pricingTiers = [
  { range: "25–50 kg", price: "₹110/kg" },
  { range: "50–100 kg", price: "₹100/kg" },
  { range: "100+ kg", price: "Custom quote" },
];

export default function WholesalePage() {
  return (
    <Section className="pt-28">
      <Container className="max-w-3xl">
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            For Businesses
          </span>
          <h1 className="mt-3 font-serif text-display-md font-bold text-forest">
            Bulk & Wholesale Orders
          </h1>
          <p className="mt-4 max-w-xl text-lg text-char/60">
            Fresh oyster mushrooms for restaurants, caterers, hotels, and cloud kitchens.
            Same-day harvest, reliable supply, competitive pricing.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-organic border border-mist">
            <table className="w-full text-left">
              <thead className="bg-forest/5">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-forest">Quantity</th>
                  <th className="px-6 py-3 text-sm font-semibold text-forest">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {pricingTiers.map((tier) => (
                  <tr key={tier.range}>
                    <td className="px-6 py-3 text-sm text-char/70">{tier.range}</td>
                    <td className="px-6 py-3 text-sm font-medium text-char">{tier.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-char/40">
            * Prices for Fresh Oyster Mushroom. Cordyceps Powder pricing available on request.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h2 className="mt-12 font-serif text-xl font-bold text-forest">
            Enquire for bulk pricing
          </h2>
          <p className="mt-2 text-sm text-char/60">
            Fill in your details and we&apos;ll get back to you on WhatsApp within a few hours.
          </p>
          <WholesaleForm />
        </FadeIn>
      </Container>
    </Section>
  );
}
