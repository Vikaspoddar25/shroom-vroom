import type { Metadata } from "next";
import { OurStoryContent } from "@/components/our-story-content";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Shroom Vroom started — three friends in Rajasthan on a mission to bring fresh, pesticide-free mushrooms to Indian kitchens.",
};

export default function OurStoryPage() {
  return <OurStoryContent />;
}
