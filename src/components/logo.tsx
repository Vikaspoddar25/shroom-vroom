import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** Inline SVG wordmark with a stylized mushroom glyph */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-auto", className)}
      aria-label="Shroom Vroom"
      role="img"
    >
      {/* Mushroom cap */}
      <path
        d="M6 22C6 14.268 12.268 8 20 8C27.732 8 34 14.268 34 22H6Z"
        fill="currentColor"
      />
      {/* Cap details - gill lines */}
      <path
        d="M12 22C12 17.582 15.582 14 20 14C24.418 14 28 17.582 28 22"
        stroke="#F5EFE2"
        strokeWidth="0.5"
        opacity="0.3"
        fill="none"
      />
      {/* Stem */}
      <path
        d="M16 22H24V34C24 36.209 22.209 38 20 38C17.791 38 16 36.209 16 34V22Z"
        fill="currentColor"
        opacity="0.75"
      />
      {/* Cap spots */}
      <circle cx="14" cy="17" r="1.5" fill="#F5EFE2" opacity="0.4" />
      <circle cx="20" cy="13" r="1.8" fill="#F5EFE2" opacity="0.35" />
      <circle cx="26" cy="17" r="1.2" fill="#F5EFE2" opacity="0.3" />
      <circle cx="17" cy="20" r="1" fill="#F5EFE2" opacity="0.25" />
      <circle cx="23" cy="19" r="1.3" fill="#F5EFE2" opacity="0.3" />
      {/* Speed lines (vroom effect) */}
      <line x1="35" y1="16" x2="40" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="36" y1="20" x2="42" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="35" y1="24" x2="39" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Wordmark */}
      <text
        x="48"
        y="29"
        fontFamily="var(--font-fraunces), serif"
        fontWeight="700"
        fontSize="19"
        fill="currentColor"
      >
        Shroom Vroom
      </text>
    </svg>
  );
}
