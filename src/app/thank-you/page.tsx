import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Thanks — we got your request",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:py-28">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          We got your request.
        </h1>
        <p className="mt-4 text-slate-600">
          A real person from {business.name} will reach out shortly. Usually within 15 minutes
          during business hours.
        </p>
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
          <p className="font-semibold">Need help right now?</p>
          <p className="mt-1">
            If this is an emergency — burst pipe, active leak, no water — don&apos;t wait for us
            to call back. Tap below.
          </p>
          <a
            href={`tel:${business.phoneTel}`}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            Call {business.phone}
          </a>
        </div>
        <div className="mt-8 text-sm text-slate-500">
          <Link href="/" className="font-semibold text-brand-700 hover:text-brand-800">
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
