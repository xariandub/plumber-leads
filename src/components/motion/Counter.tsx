"use client";

import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  /** The value to count to. */
  to: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Suffix appended to the displayed number (e.g. "+", "min", "%"). */
  suffix?: string;
  /** Prefix prepended to the displayed number. */
  prefix?: string;
  /** Decimal places. Default 0. */
  decimals?: number;
  className?: string;
};

/**
 * Counts up to `to` when scrolled into view. Respects prefers-reduced-motion
 * (renders the final value immediately).
 */
export function Counter({
  to,
  duration = 1.8,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CounterProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => {
    const factor = Math.pow(10, decimals);
    return (Math.round(v * factor) / factor).toFixed(decimals);
  });
  const [display, setDisplay] = useState(reduce ? to.toFixed(decimals) : "0");

  useEffect(() => {
    if (reduce) return;
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, duration, value, rounded, reduce]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
