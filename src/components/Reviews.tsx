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
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < count ? "fill-amber-400" : "fill-slate-200"}`}
          aria-hidden
        >
          <path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Neighbors we&apos;ve helped
            </h2>
            <p className="mt-3 text-slate-600">A few words from real customers.</p>
          </div>
          <a
            href="#lead-form"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            See if we can help you →
          </a>
        </div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.name} className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-6">
              <Stars count={r.rating} />
              <p className="mt-3 flex-1 text-slate-700">&ldquo;{r.body}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-ink-900">
                {r.name} <span className="font-normal text-slate-500">• {r.location}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-slate-500">
          Reviews shown are illustrative. Replace with verified testimonials before launch.
        </p>
      </div>
    </section>
  );
}
