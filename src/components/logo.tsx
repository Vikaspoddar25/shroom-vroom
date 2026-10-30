import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-cream ring-1 ring-forest/10">
        <Image
          src="/shroom-vroom-logo.jpeg"
          alt=""
          fill
          sizes="36px"
          className="scale-[1.15] object-cover"
        />
      </span>
      <span className="font-serif text-lg font-bold tracking-tight">Shroom Vroom</span>
    </span>
  );
}
