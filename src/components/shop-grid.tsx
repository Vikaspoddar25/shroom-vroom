"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ShopGridProps {
  products: Product[];
}

const filterTags = ["all", "fresh", "cooking", "wellness", "powder"];

export function ShopGrid({ products }: ShopGridProps) {
  const [activeTag, setActiveTag] = useState("all");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = products;
    if (activeTag !== "all") {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (showInStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    return result;
  }, [products, activeTag, showInStockOnly]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors",
              activeTag === tag
                ? "bg-forest text-cream"
                : "border border-mist bg-white/50 text-char hover:bg-mist"
            )}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-char/60">
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={(e) => setShowInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-mist text-terracotta focus:ring-terracotta"
          />
          In stock only
        </label>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-char/50">
          No products match those filters. Try adjusting your selection.
        </p>
      )}
    </div>
  );
}
