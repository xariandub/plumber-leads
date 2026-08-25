"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";
import { Magnetic } from "@/components/motion/Magnetic";

const TICKER_LINES = [
  "Currently 3 trucks in the field",
  "Avg. arrival tonight: 22 min",
  "Last job closed: 7 min ago",
  "Now dispatching in Eastside",
  "Quote-ready: 4 incoming",
];

function Ticker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TICKER_LINES.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-5 min-w-[14rem] items-center overflow-hidden text-bone-200/80">
      {TICKER_LINES.map((line, idx) => (
        <motion.span
          key={line}
          initial={false}
          animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 font-mono text-xs uppercase tracking-[0.18em]"
        >
          {line}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const anim = reduce
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

  return (
    <section
      className="mesh-bg relative isolate overflow-hidden pt-28 pb-20 sm:pt-40 sm:pb-32"
    >
      <div className="vignette" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-copper-300"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em]">
            {business.insured} · {business.area}
          </span>
        </motion.div>

        <motion.h1
          {...anim}
          transition={{ ...(anim.transition ?? {}), delay: 0.05 }}
          className="mt-6 max-w-5xl font-display text-[clamp(3rem,11vw,11rem)] font-normal leading-[0.92] tracking-tightest text-bone-50"
        >
          When water
          <br />
          misbehaves,&nbsp;
          <span className="font-display italic text-copper-300">we arrive.</span>
        </motion.h1>

        <motion.p
          {...anim}
          transition={{ ...(anim.transition ?? {}), delay: 0.18 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-200/85 sm:text-xl"
        >
          {business.responseMinutes}-minute response across the {business.area}. Upfront
          quote before any work begins. No mess left behind — just working pipes
          and a receipt you can read.
        </motion.p>

        <motion.div
          {...anim}
          transition={{ ...(anim.transition ?? {}), delay: 0.32 }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Magnetic strength={10}>
            <a
              href={`tel:${business.phoneTel}`}
              className="group inline-flex items-center gap-3 rounded-full bg-copper-400 px-7 py-4 text-base font-semibold text-ink-950 shadow-copper-glow transition hover:bg-copper-300"
              data-cursor="hover"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-950/15">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              Call {business.phone}
              <span className="ml-1 grid h-6 w-6 place-items-center rounded-full bg-ink-950/15 transition group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={6}>
            <a
              href="#lead-form"
              className="group inline-flex items-center gap-2 rounded-full border border-bone-100/15 bg-bone-100/[0.04] px-6 py-4 text-base font-medium text-bone-100 backdrop-blur-sm transition hover:border-bone-100/30 hover:bg-bone-100/[0.08]"
              data-cursor="hover"
            >
              Request a quote
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          {...anim}
          transition={{ ...(anim.transition ?? {}), delay: 0.45 }}
          className="mt-16 flex flex-col items-start gap-3 border-t border-bone-100/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-cursor-pulse rounded-full bg-copper-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-copper-400" />
            </span>
            <Ticker />
          </div>
          <div className="flex items-center gap-2 text-bone-200/60">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.39 7.36H22l-6.18 4.5L18.21 22 12 17.27 5.79 22l2.39-8.14L2 9.36h7.61z" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-[0.18em]">
              {business.yearsInBusiness}+ years · {business.license}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating water-drop motif */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[18%] hidden h-32 w-32 text-copper-400/15 lg:block"
        animate={reduce ? undefined : { y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 140" fill="currentColor">
          <path d="M50 0 C 50 35 90 60 90 95 a40 40 0 0 1 -80 0 C 10 60 50 35 50 0 Z" />
        </svg>
      </motion.div>
    </section>
  );
}
