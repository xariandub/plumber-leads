"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";

const AREAS = [
  "Downtown",
  "North Park",
  "Eastside",
  "Westend",
  "Riverside",
  "Hillcrest",
  "Southport",
  "Lakeview",
  "Midtown",
  "Suburban Heights",
  "Old Town",
  "Bay Marina",
];

export function ServiceArea() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32" id="area">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 0%, rgba(58,107,107,0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.28em] text-copper-300"
            >
              / Where we go
            </motion.p>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl"
            >
              The {business.area},
              <br />
              <span className="italic text-copper-300">end to end.</span>
            </motion.h2>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-md text-bone-200/75"
            >
              Twelve neighborhoods and counting. If you&apos;re nearby we can
              usually be at your door fast. Not sure? Call and ask.
            </motion.p>
          </div>
          <ul className="md:col-span-7 md:pl-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone-100/10 bg-bone-100/[0.06] sm:grid-cols-3">
              {AREAS.map((a, idx) => (
                <motion.li
                  key={a}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  className="group relative bg-ink-900 p-5 transition hover:bg-ink-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.65rem] text-copper-400/70">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-bone-100/10" />
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-bone-200/30 transition group-hover:translate-x-0.5 group-hover:text-copper-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="mt-3 font-display text-2xl italic tracking-editorial text-bone-100">
                    {a}
                  </p>
                </motion.li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
}
