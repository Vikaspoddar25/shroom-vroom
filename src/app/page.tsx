import { HeroSection } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { ValueProps } from "@/components/sections/value-props";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { StoryTeaser } from "@/components/sections/story-teaser";
import { LearnTeaser } from "@/components/sections/learn-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ValueProps />
      <FeaturedProducts />
      <StoryTeaser />
      <LearnTeaser />
      <Testimonials />
      <Newsletter />
    </>
  );
}
