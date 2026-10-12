"use client";

import { useEffect, useState } from "react";

/** high: desktop GPU. medium: phones/tablets (no shadows, dpr 1). fallback: no 3D at all. */
export type Quality = "high" | "medium" | "fallback";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function detect(reducedMotion: boolean): Quality {
  if (reducedMotion || !hasWebGL()) return "fallback";
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "fallback";
  if ((nav.deviceMemory ?? 8) <= 2 || (nav.hardwareConcurrency ?? 8) <= 2) return "fallback";
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return small || coarse ? "medium" : "high";
}

/** null until the client has measured, so SSR and first paint stay identical. */
export function useQuality(): Quality | null {
  const [q, setQ] = useState<Quality | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const run = () => setQ(detect(mq.matches));
    run();
    mq.addEventListener("change", run);
    return () => mq.removeEventListener("change", run);
  }, []);
  return q;
}

/** Tracks the site's `.dark` class on <html>. */
export function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setDark(el.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}
