import { Marquee } from "@/components/ui/marquee";

const items = [
  "� Same-day harvested",
  "🌿 100% pesticide-free",
  "♻️ Compostable packaging",
  "🚚 Farm-to-fork in 24hrs",
  "📍 Delivering across India",
  "💚 Locally grown in Rajasthan",
];

export function MarqueeStrip() {
  return (
    <Marquee>
      {items.map((item) => (
        <span key={item} className="mx-8 text-sm font-medium">
          {item}
        </span>
      ))}
    </Marquee>
  );
}
