"use client";

import { motion, useReducedMotion } from "framer-motion";
import { business } from "@/config/business";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

type ServiceArt = {
  /** Decorative inline SVG body. Animates on hover. */
  art: React.ReactNode;
  /** Accent color token used to tint the illustration. */
  accent: "copper" | "teal";
  /** Tagline shown on the card. */
  blurb: string;
};

const ART: Record<string, ServiceArt> = {
  "Burst pipes": {
    blurb: "Active leak or ceiling drip — we isolate, repair, and dry in.",
    accent: "copper",
    art: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 10 h60 v20 h-25 v15 h-15 v-15 h-20 z" />
        <path d="M50 30 v25" className="drop-line" />
        <circle cx="50" cy="58" r="3" fill="currentColor" />
        <path d="M50 64 v8" />
        <path d="M50 76 v8" />
        <path d="M50 88 v8" />
        <path d="M14 30 h16 M90 30 h16" strokeDasharray="2 4" />
      </g>
    ),
  },
  "Drain cleaning": {
    blurb: "Slow sinks, gurgling tubs, sewer backups — cleared and inspected.",
    accent: "teal",
    art: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14 h60 v8 a8 8 0 0 1 -8 8 h-44 a8 8 0 0 1 -8 -8 z" />
        <path d="M28 30 v50 a22 22 0 0 0 44 0 v-50" />
        <path d="M38 50 q4 -6 12 0 t12 0" className="wave" />
        <path d="M38 64 q4 -6 12 0 t12 0" className="wave" />
      </g>
    ),
  },
  "Water heater repair & install": {
    blurb: "Tank, tankless, gas, electric — same-day diagnosis, code-compliant install.",
    accent: "copper",
    art: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="34" y="10" width="42" height="70" rx="4" />
        <path d="M40 26 h30 M40 36 h30 M40 46 h30" />
        <circle cx="68" cy="68" r="4" />
        <path d="M34 80 v8 h42 v-8" />
        <path d="M50 88 v8 M60 88 v8" className="drop-line" />
      </g>
    ),
  },
  "Sewer line service": {
    blurb: "Camera inspection, hydro-jet, trenchless replacement when it's needed.",
    accent: "teal",
    art: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 60 h80" />
        <path d="M10 60 c10 -16 20 -16 30 0 s20 16 30 0 s20 -16 30 0" className="wave" />
        <circle cx="50" cy="40" r="6" />
        <path d="M50 34 v-6 M56 30 l4 -4" />
      </g>
    ),
  },
  "Fixture installs": {
    blurb: "Faucets, toilets, disposers, bidets — installed to code, no shortcuts.",
    accent: "copper",
    art: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 14 h12 v14 a4 4 0 0 1 -4 4 h-4 a4 4 0 0 1 -4 -4 z" />
        <path d="M22 32 h24 v6 a8 8 0 0 1 -8 8 h-8 a8 8 0 0 1 -8 -8 z" />
        <path d="M30 46 v8 M38 46 v8" className="drop-line" />
        <path d="M70 22 l16 -4 4 12 -16 4 z" />
        <circle cx="76" cy="36" r="3" fill="currentColor" />
      </g>
    ),
  },
  "Leak detection": {
    blurb: "Thermal imaging, acoustic listening, pressure testing — without tearing up your yard.",
    accent: "teal",
    art: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="24" />
        <circle cx="50" cy="50" r="14" className="pulse-ring" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
        <path d="M68 68 l16 16" />
        <path d="M84 88 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0" />
      </g>
    ),
  },
};

function ServiceArt({ name }: { name: string }) {
  const a = ART[name] ?? ART["Burst pipes"]!;
  const accentClass = a.accent === "copper" ? "text-copper-300" : "text-teal-400";
  return (
    <svg
      viewBox="0 0 120 110"
      className={`h-32 w-full ${accentClass} transition-transform duration-700 ease-out group-hover:scale-110`}
      aria-hidden
    >
      {a.art}
    </svg>
  );
}

export function Services() {
  const reduce = useReducedMotion();
  const services = business.services as unknown as string[];

  // Bento layout: first card spans 2 cols + 2 rows; cards 2-3 are 1-col; cards 4-6 fill below.
  // We'll use a CSS grid for the bento.
  return (
    <section className="relative bg-ink-900 py-24 sm:py-32" id="services">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
                / What we do
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl">
                If water runs through it,
                <br />
                <span className="italic text-copper-300">we fix it.</span>
              </h2>
            </div>
            <p className="max-w-sm text-bone-200/70">
              Six core services cover most of what a home or small business
              will ever need. We're not the cheapest — we're the ones
              you call back.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px]"
          stagger={0.08}
        >
          {services.map((service, i) => {
            const isFeatured = i === 0;
            return (
              <RevealItem
                key={service}
                className={
                  "group relative overflow-hidden rounded-2xl border border-bone-100/[0.08] bg-gradient-to-br from-ink-800 to-ink-900 p-6 transition hover:border-copper-400/40 " +
                  (isFeatured ? "sm:col-span-2 sm:row-span-2 lg:p-8" : "")
                }
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-copper-400/0 blur-3xl transition group-hover:bg-copper-400/10"
                />
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-bone-200/50">
                      / 0{i + 1}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone-200/30">
                      {isFeatured ? "Featured" : "Service"}
                    </span>
                  </div>
                  <ServiceArt name={service} />
                  <h3
                    className={
                      "mt-auto font-display tracking-editorial text-bone-50 " +
                      (isFeatured ? "text-4xl sm:text-5xl" : "text-2xl")
                    }
                  >
                    {service}
                  </h3>
                  <p
                    className={
                      "mt-2 text-bone-200/70 " +
                      (isFeatured ? "max-w-md text-base" : "text-sm")
                    }
                  >
                    {ART[service]?.blurb}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
