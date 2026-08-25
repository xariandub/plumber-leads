"use client";

import { business } from "@/config/business";
import { Magnetic } from "@/components/motion/Magnetic";

export function Footer() {
  return (
    <footer className="relative bg-ink-950 text-bone-200/80">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
              / {business.name}
            </p>
            <h2 className="mt-4 max-w-lg font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl">
              When water misbehaves,
              <br />
              <span className="italic text-copper-300">we arrive.</span>
            </h2>
            <Magnetic strength={10} className="mt-8 inline-block">
              <a
                href={`tel:${business.phoneTel}`}
                className="group inline-flex items-center gap-3 rounded-full border border-copper-400/30 bg-copper-400/[0.08] px-6 py-3.5 text-base font-medium text-copper-200 transition hover:border-copper-400 hover:bg-copper-400/15"
                data-cursor="hover"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-copper-400/20">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-copper-200" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>
                <span className="font-mono tabular-nums">{business.phone}</span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-copper-300/80">
                  · 24/7
                </span>
              </a>
            </Magnetic>
          </div>
          <div className="grid grid-cols-2 gap-10 md:col-span-6 md:grid-cols-3 md:gap-8">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-bone-200/40">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={`tel:${business.phoneTel}`} className="link-sweep font-mono tabular-nums">
                    {business.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${business.email}`} className="link-sweep">
                    {business.email}
                  </a>
                </li>
                <li>{business.area}</li>
                <li>{business.hours}</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-bone-200/40">
                Services
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {business.services.slice(0, 5).map((s) => (
                  <li key={s}>
                    <a href="#services" className="link-sweep">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-bone-200/40">
                Trust
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>{business.insured}</li>
                <li className="font-mono">{business.license}</li>
                <li>{business.yearsInBusiness}+ years in the field</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-bone-100/10 pt-6 text-xs text-bone-200/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">
            Built with care · {business.area}
          </p>
        </div>
      </div>
    </footer>
  );
}
