import { business } from "@/config/business";

// Inline SVG icons keyed by service keyword. Falls back to a wrench.
const ICONS: Record<string, React.ReactNode> = {
  "burst pipes": (
    <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" />
  ),
  "drain cleaning": (
    <path d="M4 21V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v13M4 21h16M9 13h6" />
  ),
  "water heater repair & install": (
    <path d="M6 3h12v14a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V3ZM6 7h12M10 11h4" />
  ),
  "sewer line service": (
    <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0M3 18c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
  ),
  "fixture installs": (
    <>
      <path d="M5 12V5a2 2 0 0 1 2-2h2v6" />
      <path d="M3 12h14a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5Z" />
    </>
  ),
  "leak detection": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
};

function iconFor(service: string) {
  const key = service.toLowerCase();
  const node = ICONS[key] ?? (
    <path d="M14 7a3 3 0 0 0-3 3v3l-5 5a2.121 2.121 0 0 0 3 3l5-5h3a3 3 0 0 0 3-3V9l-3 3h-2V10l3-3z" />
  );
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {node}
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Services we handle
          </h2>
          <p className="mt-3 text-slate-600">
            From dripping faucets to full re-pipes — if water runs through it, we fix it.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service) => (
            <li
              key={service}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-card"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100">
                {iconFor(service)}
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink-900">{service}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Same-day diagnosis. Upfront quote before any work begins.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
