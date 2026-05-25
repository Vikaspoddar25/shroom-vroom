import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Shroom Vroom order. We'll confirm via WhatsApp.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
