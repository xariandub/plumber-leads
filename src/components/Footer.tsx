import { business } from "@/config/business";

export function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white">{business.name}</p>
            <p className="mt-2 text-sm">{business.insured}</p>
            <p className="mt-1 text-sm">{business.license}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Contact
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="hover:text-white"
                >
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-white"
                >
                  {business.email}
                </a>
              </li>
              <li>{business.area}</li>
              <li>{business.hours}</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Get started
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-white">
                  Request a quote
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
