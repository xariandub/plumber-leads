"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const REVIEWS = [
  {
    name: "Maya R.",
    location: "Eastside",
    body: "They were at my door 25 minutes after I called for a burst pipe. Fixed it clean, quoted upfront, no mess. Lifesavers.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    location: "North Park",
    body: "Replaced our water heater the same day. Tech explained every option and the price matched the quote exactly.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Downtown",
    body: "Honest about what didn't need fixing. That's rare. Will absolutely use again for our remodel.",
    rating: 5,
  },
  {
    name: "Theo M.",
    location: "Riverside",
    body: "Called at 11pm on a Sunday. They picked up. Tech was here before midnight. Quote held, work was tidy.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < count ? "fill-copper-400" : "fill-bone-100/15"}`}
          aria-hidden
        >
          <path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 56 40"
      className="h-12 w-16 text-copper-400/30"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0 40V20C0 8.95 8.95 0 20 0v8c-6.63 0-12 5.37-12 12h12v20H0zm36 0V20C36 8.95 44.95 0 56 0v8c-6.63 0-12 5.37-12 12h12v20H36z" />
    </svg>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 5500);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const review = REVIEWS[i];

  return (
    <section className="relative bg-ink-950 py-24 sm:py-32" id="reviews">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
              / Stories
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl">
              Neighbors we've{" "}
              <span className="italic text-copper-300">helped.</span>
            </h2>
          </div>
        </Reveal>

        <div
          className="relative mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <QuoteMark />
          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4"
              >
                <p className="max-w-3xl font-display text-2xl italic leading-snug tracking-editorial text-bone-100 sm:text-4xl">
                  &ldquo;{review.body}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Stars count={review.rating} />
                  <span className="h-px w-12 bg-bone-100/20" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-200/70">
                    {review.name} · {review.location}
                  </span>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show review ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={
                    "h-1.5 rounded-full transition-all " +
                    (idx === i
                      ? "w-10 bg-copper-400"
                      : "w-4 bg-bone-100/15 hover:bg-bone-100/30")
                  }
                />
              ))}
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone-200/40">
              0{i + 1} / 0{REVIEWS.length}
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-bone-200/40">
          Reviews are illustrative until verified testimonials replace them.
        </p>
      </div>
    </section>
  );
}
