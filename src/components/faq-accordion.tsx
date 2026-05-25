"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How fresh are your mushrooms?",
    a: "Every mushroom we deliver was growing less than 24 hours before it reaches your door. We harvest daily at dawn and ship immediately — no cold storage, no warehousing.",
  },
  {
    q: "What areas do you deliver to?",
    a: "Same-day delivery is available in the Portland, Seattle, and Vancouver metro areas. Nationwide overnight shipping is available for all other US addresses.",
  },
  {
    q: "How should I store my mushrooms?",
    a: "Keep them in the paper bag they arrive in, in your refrigerator. Most varieties stay fresh for 5–7 days. Never store mushrooms in plastic — they need to breathe.",
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes! We work with 200+ restaurants and retailers. Contact us with your business details and typical weekly volume, and we'll set up a wholesale account.",
  },
  {
    q: "Can I subscribe for weekly deliveries?",
    a: "Absolutely. Our weekly mushroom box includes a rotating selection of 4–5 varieties based on what's at peak freshness. You can customize preferences and skip weeks anytime.",
  },
  {
    q: "Are your mushrooms organic?",
    a: "We use zero pesticides, herbicides, or synthetic fertilizers. Our substrates are sourced from local, sustainably managed forests. We're in the process of formal organic certification.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="mt-8 space-y-3">
      {faqs.map((faq, i) => (
        <Accordion.Item
          key={i}
          value={`faq-${i}`}
          className="overflow-hidden rounded-lg border border-mist bg-white/50"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between p-4 text-left text-sm font-medium text-char hover:text-forest">
              {faq.q}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-char/40 transition-transform duration-200",
                  "group-data-[state=open]:rotate-180"
                )}
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="px-4 pb-4 text-sm leading-relaxed text-char/60">{faq.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
