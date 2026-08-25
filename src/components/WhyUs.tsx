import { business } from "@/config/business";

const REASONS = [
  {
    title: "Fast response",
    body: `Average arrival within ${business.responseMinutes} minutes for emergencies in the ${business.area}.`,
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10M12 6v6l4 2" />
    ),
  },
  {
    title: "Upfront pricing",
    body: "We diagnose first, quote second. You approve the price before any work starts — no surprise bills.",
    icon: (
      <>
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
  {
    title: `${business.yearsInBusiness}+ years local`,
    body: "Family-owned, locally operated. Our reputation is built one job at a time.",
    icon: (
      <path d="M3 9.5 12 3l9 6.5V21H3zM9 21v-6h6v6" />
    ),
  },
  {
    title: "Warranty on every job",
    body: "Parts and labor backed by written warranty. If something we did goes wrong, we make it right.",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

export function WhyUs() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Why homeowners call us first
          </h2>
          <p className="mt-3 text-slate-600">
            {business.insured}. {business.license}. Background-checked techs.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <li
              key={r.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {r.icon}
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-ink-900">{r.title}</h3>
              </div>
              <p className="mt-3 text-slate-600">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
