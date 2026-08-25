"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";

const STEPS = [
  {
    n: "01",
    title: "You call",
    body: "A real person picks up. We talk through what you&apos;re seeing, give you a quick self-help step if there is one, and confirm an arrival window.",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    ),
  },
  {
    n: "02",
    title: "We dispatch",
    body: `Closest tech gets the call. Average arrival in ${business.responseMinutes} minutes across the ${business.area} — sooner for emergencies, always with a confirmed ETA.`,
    icon: (
      <path d="M3 12h13l-3-3M21 12H8l3 3M3 6h18M3 18h18" />
    ),
  },
  {
    n: "03",
    title: "We fix",
    body: "Tech diagnoses, writes a written quote, waits for your nod, and gets to work. Parts and labor carry a written warranty. Boot covers and drop cloths are standard.",
    icon: (
      <>
        <path d="M14 7a3 3 0 0 0-3 3v3l-5 5a2.121 2.121 0 0 0 3 3l5-5h3a3 3 0 0 0 3-3V9l-3 3h-2V10l3-3z" />
      </>
    ),
  },
];

function Step({ step, idx, total }: { step: typeof STEPS[number]; idx: number; total: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 sm:gap-x-10"
    >
      <div className="flex flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-bone-100/20 bg-ink-800 text-copper-300 sm:h-14 sm:w-14">
          <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {step.icon}
          </svg>
        </span>
        {idx < total - 1 && (
          <span
            aria-hidden
            className="mt-2 w-px flex-1 bg-gradient-to-b from-bone-100/20 to-transparent"
            style={{ minHeight: "3rem" }}
          />
        )}
      </div>
      <div className="pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper-300">
          {step.n}
        </p>
        <h3 className="mt-2 font-display text-3xl italic tracking-editorial text-bone-50 sm:text-4xl">
          {step.title}.
        </h3>
        <p className="mt-3 max-w-md text-bone-200/75">{step.body}</p>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <section className="relative bg-ink-900 py-24 sm:py-36" id="process">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
            / How we work
          </p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl">
            From your first call
            <br />
            <span className="italic text-copper-300">to clean pipes.</span>
          </h2>
        </motion.div>
        <div>
          {STEPS.map((step, i) => (
            <Step key={step.n} step={step} idx={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
