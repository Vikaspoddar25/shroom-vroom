"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
}

export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden bg-forest py-3 text-cream", className)}
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}
