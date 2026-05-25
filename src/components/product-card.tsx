"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useCartDrawerStore } from "@/store/cart-drawer";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/lang";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartDrawerStore((s) => s.open);
  const { lang, t } = useLang();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openCart();
    track("add_to_cart", { productId: product.id, productName: product.name });
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-organic border border-mist bg-white/60"
    >
      <Link href={`/shop/${product.slug}`} className="flex flex-1 flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-char/40">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium">
                Out of Stock
              </span>
            </div>
          )}
          {product.form !== "fresh" && (
            <span className="absolute left-3 top-3 rounded-full bg-forest px-2 py-0.5 text-[10px] font-semibold uppercase text-cream">
              {product.form}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-lg font-semibold text-forest">
            {lang === "hi" ? product.hindiName : product.name}
          </h3>
          {lang === "en" && <p className="text-xs text-char/50">{product.hindiName}</p>}
          <p className="mt-1 text-xs text-char/60">{product.weight}</p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="font-serif text-lg font-bold text-char">
              {formatPrice(product.price)}
            </span>
            {product.wholesalePrice && (
              <span className="text-xs text-moss">
                Wholesale: {formatPrice(product.wholesalePrice)}/kg
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      {product.inStock && (
        <div className="px-4 pb-4">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full gap-2"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </Button>
        </div>
      )}
    </motion.article>
  );
}
