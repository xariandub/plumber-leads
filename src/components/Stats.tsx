"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

const STATS = [
  {
    n: business.responseMinutes,
    suffix: " min",
    label: "Average response",
    sub: "across the metro area",
  },
  {
    n: business.yearsInBusiness,
    suffix: "+",
    label: "Years in the field",
    sub: "family-owned & operated",
  },
  {
    n: 0,
    suffix: "",
    label: "Surprise bills",
    sub: "quoted before we start",
  },
];

export function Stats() {
  const reduce = useReducedMotion();
  // The wrapper is tall, the inner element is sticky so the numbers pin
  // while the user scrolls past — the counter animates once on enter.
  return (
    <section className="relative bg-ink-950 py-20 sm:py-32" id="stats">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-12 md:min-h-[80vh] md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
                / The promise
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl lg:text-7xl">
                Three numbers.
                <br />
                <span className="italic text-copper-300">Zero surprises.</span>
              </h2>
              <p className="mt-6 max-w-md text-bone-200/75">
                We've built our reputation on the boring stuff: showing up
                on time, doing the work we said we'd do, and writing the
                quote before we touch a pipe.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <ul className="space-y-12 sm:space-y-20">
              {STATS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-t border-bone-100/10 pt-6"
                >
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-bone-200/60">
                        0{i + 1} — {s.label}
                      </p>
                      <p className="mt-2 font-display text-[clamp(4.5rem,11vw,9rem)] font-normal leading-[0.9] tracking-tightest text-bone-50">
                        <Counter to={s.n} suffix={s.suffix} />
                      </p>
                    </div>
                    <p className="hidden max-w-[12rem] text-right text-sm text-bone-200/60 sm:block">
                      {s.sub}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
