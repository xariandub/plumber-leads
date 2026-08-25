"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  /** Seconds for one full loop. Default 40. */
  duration?: number;
  /** Optional secondary copy, repeated between primary items. */
  separator?: string;
  /** Reverse direction. */
  reverse?: boolean;
  className?: string;
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
};

/**
 * Infinite horizontal marquee. Pure CSS-driven via the `.marquee-track`
 * keyframes; we duplicate the content twice so the loop is seamless.
 * Respects prefers-reduced-motion (animation is killed by the global
 * reduced-motion guard in globals.css).
 */
export function Marquee({
  items,
  duration = 40,
  separator = "✦",
  reverse = false,
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  if (reduce) {
    return (
      <div className={`marquee-mask overflow-hidden ${className ?? ""}`}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 text-bone-300 font-mono text-sm">
          {items.map((it, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>{it}</span>
              <span className="text-copper-400">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  const animationStyle: React.CSSProperties = {
    animation: `${reverse ? "marquee-rev" : "marquee"} ${duration}s linear infinite`,
  };

  return (
    <div
      className={`marquee-mask overflow-hidden ${className ?? ""}`}
      onMouseEnter={(e) => {
        if (!pauseOnHover) return;
        const el = trackRef.current;
        if (el) el.style.animationPlayState = "paused";
        e.currentTarget.dataset.hover = "1";
      }}
      onMouseLeave={(e) => {
        const el = trackRef.current;
        if (el) el.style.animationPlayState = "running";
        delete e.currentTarget.dataset.hover;
      }}
    >
      <div ref={trackRef} className="marquee-track" style={animationStyle}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-12 pr-12">
            {items.map((it, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-12 whitespace-nowrap text-bone-300 font-mono text-xs uppercase tracking-[0.2em]"
              >
                <span>{it}</span>
                <span className="text-copper-400">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
