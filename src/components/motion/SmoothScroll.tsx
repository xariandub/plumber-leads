"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Wraps the app in a Lenis smooth-scroll instance. Disabled on touch
 * devices (native scroll is already great there) and when
 * prefers-reduced-motion is on.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduce) return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch handled above; default would disable wheel here.
    });
    ref.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ref.current = null;
    };
  }, [reduce]);

  return null;
}
