"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice, getDeliveryCharge, DELIVERY_CONFIG } from "@/lib/content";

export function CartPageContent() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const sub = subtotal();
  const delivery = getDeliveryCharge(sub);
  const total = sub + delivery;

  return (
    <Section className="pt-28">
      <Container className="max-w-4xl">
        <h1 className="font-serif text-display-md font-bold text-forest">Your cart</h1>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-mist" />
            <p className="text-lg text-char/60">Nothing here yet.</p>
            <Button asChild>
              <Link href="/shop">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8">
            {/* Items */}
            <ul className="divide-y divide-mist">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 py-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-forest">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-char/50">{item.product.weight}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-char/40 hover:text-terracotta"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-mist hover:bg-mist"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[2rem] text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-mist hover:bg-mist"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-serif text-lg font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-8 rounded-organic border border-mist bg-white/50 p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-char/70">Subtotal</span>
                  <span className="font-medium">{formatPrice(sub)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-char/70">Delivery</span>
                  <span className="font-medium">
                    {delivery === 0 ? (
                      <span className="text-moss">FREE</span>
                    ) : (
                      formatPrice(delivery)
                    )}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-moss">
                    Add {formatPrice(DELIVERY_CONFIG.freeAbove - sub)} more for free delivery
                  </p>
                )}
                <div className="flex items-center justify-between border-t border-mist pt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-2xl font-bold">{formatPrice(total)}</span>
                </div>
              </div>
              <Button size="lg" className="mt-6 w-full" asChild>
                <Link href="/checkout">Proceed to order</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
