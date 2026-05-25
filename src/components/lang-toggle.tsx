"use client";

import { useLang } from "@/lib/lang";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
      aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
      className="rounded-full px-2 py-1 text-xs font-semibold text-char/70 transition-colors hover:bg-mist hover:text-char"
    >
      {lang === "en" ? "हिं" : "EN"}
    </button>
  );
}
