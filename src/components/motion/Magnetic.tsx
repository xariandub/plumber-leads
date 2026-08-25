"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type CSSProperties } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Pull strength in pixels — how far the element can move toward the pointer. */
  strength?: number;
  style?: CSSProperties;
  as?: "div" | "span" | "a" | "button";
  /** Disable the magnetic pull (still gets the smoother transition). */
  disabled?: boolean;
};

/**
 * Wraps a child in a magnetic hover effect. On fine-pointer devices only.
 * The wrapper tracks the pointer, the child shifts up to `strength`px
 * toward it, and springs back when the pointer leaves.
 */
export function Magnetic({
  children,
  className,
  strength = 14,
  style,
  as = "div",
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (disabled || reduce) return;
    if (e.pointerType !== "mouse") return; // ignore touch / pen
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    // Scale pointer distance to a -strength..strength range.
    const nx = (x / (r.width / 2)) * strength;
    const ny = (y / (r.height / 2)) * strength;
    setPos({ x: nx, y: ny });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      animate={pos}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.6 }}
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      {children}
    </Tag>
  );
}
