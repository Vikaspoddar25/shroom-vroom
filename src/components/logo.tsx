import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** Inline SVG wordmark with a stylized mushroom glyph */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-label="Shroom Vroom"
      role="img"
    >
      {/* Mushroom glyph */}
      <ellipse cx="16" cy="18" rx="10" ry="8" fill="currentColor" opacity="0.9" />
      <rect x="14" y="22" width="4" height="10" rx="2" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="15" r="1.5" fill="#F5EFE2" opacity="0.5" />
      <circle cx="18" cy="13" r="1" fill="#F5EFE2" opacity="0.4" />
      <circle cx="15" cy="17" r="0.8" fill="#F5EFE2" opacity="0.3" />
      {/* Wordmark */}
      <text
        x="32"
        y="27"
        fontFamily="var(--font-fraunces), serif"
        fontWeight="700"
        fontSize="18"
        fill="currentColor"
      >
        Shroom Vroom
      </text>
    </svg>
  );
}
