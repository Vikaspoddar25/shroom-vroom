import { Marquee } from "@/components/ui/marquee";

const items = [
  "� Same-day harvested",
  "🌿 100% pesticide-free",
  "♻️ Compostable packaging",
  "🚚 Farm-to-fork in 24hrs",
  "📍 Jaipur · Ajmer · Kishangarh",
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
