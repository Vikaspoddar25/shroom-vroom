export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * Add new testimonials here. They will automatically appear on the homepage.
 * Example:
 *   { quote: "Amazing mushrooms!", author: "Priya S.", role: "Jaipur customer" }
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "The freshness is unmatched. I've been buying mushrooms from local markets for years, but Shroom Vroom's oyster mushrooms are on another level.",
    author: "Coming soon",
    role: "Jaipur customer",
  },
  {
    quote:
      "Same-day harvest means I get the best texture for my mushroom dishes. My family can't stop eating the mushroom curry now!",
    author: "Coming soon",
    role: "Ajmer customer",
  },
  {
    quote:
      "Love the compostable packaging and the WhatsApp ordering — so convenient! Will definitely recommend to friends.",
    author: "Coming soon",
    role: "Kishangarh customer",
  },
];
