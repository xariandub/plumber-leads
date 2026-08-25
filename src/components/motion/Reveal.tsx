"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in pixels. Default 24. */
  y?: number;
  /** Delay in seconds. Default 0. */
  delay?: number;
  /** Stagger children by this many seconds. */
  stagger?: number;
  /** Animate as a group of children (parent) rather than a single block. */
  as?: ElementType;
  /** Optional override of duration. */
  duration?: number;
  /** Once only (default true) — re-running on re-entering is annoying. */
  once?: boolean;
};

export function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
  stagger = 0,
  as = "div",
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as as "div"] as typeof motion.div;

  if (reduce) {
    // Still apply the class so layout is preserved, but no movement.
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { delayChildren: delay, staggerChildren: stagger },
        },
      }}
    >
      {stagger > 0 ? (
        // When staggering, each child needs to be a <RevealItem>.
        <RevealInner y={y} duration={duration}>
          {children}
        </RevealInner>
      ) : (
        <motion.div
          variants={{
            hidden: { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </Comp>
  );
}

/**
 * A child element that participates in the parent's stagger.
 * Use inside <Reveal stagger={...}> for child reveal.
 */
export function RevealItem({
  children,
  className,
  y = 24,
  duration = 0.7,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as as "div"] as typeof motion.div;
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/** Internal helper — walks children, wrapping each in a stagger child. */
function RevealInner({
  children,
  y,
  duration,
}: {
  children: ReactNode;
  y: number;
  duration: number;
}) {
  // We don't try to be clever about non-element children — we just wrap them.
  // Fragments and strings will become single items, which is fine.
  const arr = Array.isArray(children) ? children : [children];
  return (
    <>
      {arr.map((child, i) => (
        <motion.div
          key={(child as { key?: string })?.key ?? i}
          variants={{
            hidden: { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}
