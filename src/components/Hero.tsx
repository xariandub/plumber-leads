import { business } from "@/config/business";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
            <span className="h-2 w-2 rounded-full bg-brand-600" />
            {business.hours}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            {business.tagline}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Trusted local plumbers serving the {business.area}. {business.insured}.
            We arrive fast, quote upfront, and stand behind every job.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${business.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              Call {business.phone}
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-ink-900 transition hover:border-brand-600 hover:text-brand-700"
            >
              Request a quote online
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-4 text-center sm:max-w-md sm:text-left">
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Response</dt>
              <dd className="mt-1 text-2xl font-bold text-ink-900">≤ {business.responseMinutes}m</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Experience</dt>
              <dd className="mt-1 text-2xl font-bold text-ink-900">{business.yearsInBusiness}+ yrs</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-slate-500">Upfront</dt>
              <dd className="mt-1 text-2xl font-bold text-ink-900">Quotes</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-start gap-3">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </span>
              <div>
                <h2 className="text-base font-semibold text-ink-900">Burst pipe? Overflowing drain?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Call now for emergency dispatch. We talk you through shutting it off while a tech is on the way.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {[
                "No-surprise pricing — quote before work starts",
                "Background-checked, drug-tested technicians",
                "Clean work, boot covers, drop cloths, every job",
                `${business.license}`,
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
