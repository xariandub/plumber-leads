import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Thanks — we got your request",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="relative min-h-[calc(100vh-160px)] overflow-hidden bg-ink-900 mesh-bg">
      <div className="vignette" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-160px)] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:py-28">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-copper-400/40 bg-copper-400/10">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-copper-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
          / Request received
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl">
          We got it.
          <br />
          <span className="italic text-copper-300">We're on it.</span>
        </h1>
        <p className="mt-6 max-w-md text-bone-200/80">
          A real person from {business.name} will reach out shortly. Usually
          within 15 minutes during business hours. If you don't hear from
          us — call directly. We pick up.
        </p>
        <div className="mt-10 w-full max-w-md rounded-2xl border border-copper-400/30 bg-copper-400/[0.08] p-5 text-left">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-copper-300">
            / Emergency?
          </p>
          <p className="mt-2 text-bone-100">
            Burst pipe, active leak, no water — don't wait. Tap below.
          </p>
          <a
            href={`tel:${business.phoneTel}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-copper-400 px-5 py-3 text-sm font-semibold text-ink-950 shadow-copper-glow"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span className="font-mono tabular-nums">{business.phone}</span>
          </a>
        </div>
        <div className="mt-10 text-sm">
          <Link
            href="/"
            className="link-sweep font-mono text-xs uppercase tracking-[0.22em] text-bone-200/60 hover:text-bone-100"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
