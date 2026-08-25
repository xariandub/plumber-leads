import { business } from "@/config/business";

const AREAS = [
  "Downtown",
  "North Park",
  "Eastside",
  "Westend",
  "Riverside",
  "Hillcrest",
  "Southport",
  "Lakeview",
  "Midtown",
  "Suburban Heights",
];

export function ServiceArea() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Serving the {business.area}
          </h2>
          <p className="mt-3 text-slate-600">
            If you&apos;re nearby, we can usually be at your door fast. Not sure? Call and ask.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <li
              key={a}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
