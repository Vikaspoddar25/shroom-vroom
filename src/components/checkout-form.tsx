"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice, getDeliveryCharge, DELIVERY_CONFIG } from "@/lib/content";
import { track } from "@/lib/analytics";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919928901003";
const ORDER_EMAIL = "vikaspodda@gmail.com";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  address: z.string().min(10, "Full delivery address is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

/** Build a WhatsApp-friendly order message */
function buildOrderMessage(data: FormData, items: ReturnType<typeof useCartStore.getState>["items"], subtotal: number, delivery: number) {
  const itemLines = items
    .map((item) => `• ${item.product.name} × ${item.quantity} = ${formatPrice(item.product.price * item.quantity)}`)
    .join("\n");

  return `🍄 *New Order — Shroom Vroom*

*Customer:* ${data.name}
*Phone:* ${data.phone}
${data.email ? `*Email:* ${data.email}\n` : ""}
*Delivery Address:*
${data.address}
${data.city} — ${data.pincode}

*Order Items:*
${itemLines}

*Subtotal:* ${formatPrice(subtotal)}
*Delivery:* ${delivery === 0 ? "FREE" : formatPrice(delivery)}
*Total:* ${formatPrice(subtotal + delivery)}

${data.notes ? `*Notes:* ${data.notes}` : ""}`;
}

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCartStore();
  const sub = subtotal();
  const delivery = getDeliveryCharge(sub);
  const total = sub + delivery;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const message = buildOrderMessage(data, items, sub, delivery);

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Also open mailto link as backup
    const subject = `New Order from ${data.name} — Shroom Vroom`;
    const mailtoUrl = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    // Small delay so WhatsApp opens first
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);

    track("checkout_complete", { total, itemCount: items.length });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <Section className="pt-28">
        <Container className="max-w-2xl text-center">
          <h1 className="font-serif text-display-md font-bold text-forest">Checkout</h1>
          <p className="mt-4 text-char/60">Your cart is empty. Add some products first!</p>
          <Button className="mt-6" asChild>
            <a href="/shop">Browse products</a>
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-28">
      <Container className="max-w-4xl">
        <h1 className="font-serif text-display-md font-bold text-forest">Checkout</h1>
        <p className="mt-2 text-char/60">
          Fill in your details and we&apos;ll confirm your order via WhatsApp.
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:col-span-3" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-medium text-char">
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  {...register("name")}
                  className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                />
                {errors.name && <p className="mt-1 text-xs text-terracotta">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-medium text-char">
                  Phone (WhatsApp) *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  placeholder="9XXXXXXXXX"
                  {...register("phone")}
                  className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                />
                {errors.phone && <p className="mt-1 text-xs text-terracotta">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-medium text-char">
                Email (optional)
              </label>
              <input
                id="checkout-email"
                type="email"
                {...register("email")}
                className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
              />
              {errors.email && <p className="mt-1 text-xs text-terracotta">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="checkout-address" className="mb-1.5 block text-sm font-medium text-char">
                Delivery Address *
              </label>
              <textarea
                id="checkout-address"
                rows={3}
                placeholder="House/Flat No., Street, Landmark..."
                {...register("address")}
                className="w-full rounded-lg border border-mist bg-white p-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
              />
              {errors.address && <p className="mt-1 text-xs text-terracotta">{errors.address.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-city" className="mb-1.5 block text-sm font-medium text-char">
                  City *
                </label>
                <select
                  id="checkout-city"
                  {...register("city")}
                  className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                >
                  <option value="">Select city</option>
                  {DELIVERY_CONFIG.areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="mt-1 text-xs text-terracotta">{errors.city.message}</p>}
              </div>

              <div>
                <label htmlFor="checkout-pincode" className="mb-1.5 block text-sm font-medium text-char">
                  Pincode *
                </label>
                <input
                  id="checkout-pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  {...register("pincode")}
                  className="h-11 w-full rounded-lg border border-mist bg-white px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
                />
                {errors.pincode && <p className="mt-1 text-xs text-terracotta">{errors.pincode.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="checkout-notes" className="mb-1.5 block text-sm font-medium text-char">
                Order Notes (optional)
              </label>
              <textarea
                id="checkout-notes"
                rows={2}
                placeholder="Any special instructions..."
                {...register("notes")}
                className="w-full rounded-lg border border-mist bg-white p-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
              />
            </div>

            <div className="rounded-lg border border-moss/30 bg-moss/5 p-4">
              <p className="text-sm text-char/70">
                <strong>How it works:</strong> After submitting, your order summary will be sent to
                us via WhatsApp. We&apos;ll confirm availability and arrange payment (UPI/Cash on
                Delivery).
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <MessageCircle className="h-5 w-5" />
              Place Order via WhatsApp
            </Button>
          </form>

          {/* Order Summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-28 rounded-organic border border-mist bg-white/50 p-6">
              <h2 className="font-serif text-lg font-bold text-forest">Order Summary</h2>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-char">{item.product.name}</p>
                        <p className="text-xs text-char/50">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-2 border-t border-mist pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-char/70">Subtotal</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-char/70">Delivery</span>
                  <span>{delivery === 0 ? <span className="text-moss">FREE</span> : formatPrice(delivery)}</span>
                </div>
                <div className="flex justify-between border-t border-mist pt-2 font-serif text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-char/50">
                Payment: UPI / Cash on Delivery
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
