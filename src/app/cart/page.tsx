import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart-page-content";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your Shroom Vroom cart before checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}
