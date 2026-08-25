"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom cursor: a small dot that snaps to the pointer, and a larger
 * ring that lerps behind it. Both hide on touch / coarse-pointer devices
 * and when prefers-reduced-motion is on.
 *
 * Adds `has-custom-cursor` to <html> so globals.css can hide the native
 * cursor via @media (hover: hover) and (pointer: fine).
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    // Detect fine pointer
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setEnabled(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
      );
      document.documentElement.toggleAttribute("data-cursor-hover", !!interactive);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
      document.documentElement.removeAttribute("data-cursor-hover");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#E8A05A",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(246, 242, 232, 0.6)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
        animate={{
          scale: typeof document !== "undefined" &&
            document.documentElement.hasAttribute("data-cursor-hover")
            ? 1.6
            : 1,
          opacity:
            typeof document !== "undefined" &&
            document.documentElement.hasAttribute("data-cursor-hover")
            ? 0.6
            : 0.9,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}
