/**
 * Content abstraction layer.
 * Currently reads from co-located data files.
 * Swap this module's internals for Sanity/Contentful fetchers when ready.
 */

import { products, type Product } from "@/data/products";

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

export async function getProductsByTag(tag: string): Promise<Product[]> {
  return products.filter((p) => p.tags.includes(tag));
}

/** Format price in INR */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

/** Delivery fee logic */
export const DELIVERY_CONFIG = {
  freeAbove: 5000,
  charge: 50,
  areas: ["All India"],
} as const;

export function getDeliveryCharge(subtotal: number): number {
  return subtotal >= DELIVERY_CONFIG.freeAbove ? 0 : DELIVERY_CONFIG.charge;
}
