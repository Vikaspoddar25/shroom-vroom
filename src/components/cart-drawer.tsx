"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useCartDrawerStore } from "@/store/cart-drawer";
import { formatPrice, getDeliveryCharge, DELIVERY_CONFIG } from "@/lib/content";

export function CartDrawer() {
  const { isOpen, close } = useCartDrawerStore();
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const sub = subtotal();
  const delivery = getDeliveryCharge(sub);
  const total = sub + delivery;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-char/40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-mist p-6">
              <h2 className="font-serif text-xl font-bold text-forest">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={close} aria-label="Close cart">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <ShoppingBag className="h-12 w-12 text-mist" />
                  <p className="text-char/60">Your cart is empty</p>
                  <Button variant="secondary" onClick={close} asChild>
                    <Link href="/shop">Browse products</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex gap-4 rounded-lg border border-mist bg-white/50 p-3"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-char">{item.product.name}</h3>
                          <p className="text-xs text-char/50">{item.product.weight}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-mist hover:bg-mist"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-mist hover:bg-mist"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-char/40 hover:text-terracotta"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-mist p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-char/70">Subtotal</span>
                    <span className="font-medium">{formatPrice(sub)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
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
                    <span className="font-medium text-char">Total</span>
                    <span className="font-serif text-lg font-bold">{formatPrice(total)}</span>
                  </div>
                </div>
                <Button className="mt-4 w-full" asChild>
                  <Link href="/checkout" onClick={close}>
                    Proceed to order
                  </Link>
                </Button>
                <Button variant="ghost" className="mt-2 w-full" onClick={close}>
                  Continue shopping
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
