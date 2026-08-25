"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, urgencyValues, type LeadInput } from "@/lib/validation";
import { business } from "@/config/business";

const URGENCY_LABELS: Record<(typeof urgencyValues)[number], string> = {
  emergency: "Emergency — now",
  today: "Today",
  this_week: "This week",
  quote: "Just a quote",
};

export function LeadForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      urgency: undefined,
      address: "",
      message: "",
      consent: false as unknown as true, // rhf + zod: keep boolean in state, narrow on submit
    },
    mode: "onBlur",
  });

  async function onSubmit(values: LeadInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok: boolean; id?: string; error?: string; fieldErrors?: Record<string, string> } = await res
        .json()
        .catch(() => ({ ok: false, error: "Unexpected server response" }));

      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please call us instead.");
        return;
      }
      router.push("/thank-you");
    } catch {
      setServerError("Network error. Please call us instead.");
    }
  }

  const fieldClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-ink-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200";

  return (
    <section id="lead-form" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-card sm:p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Get a fast quote
            </h2>
            <p className="mt-3 text-slate-600">
              Tell us what&apos;s going on. A real human from {business.name} will reach out
              shortly — usually within 15 minutes during business hours.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink-900">
                  Your name <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  className={fieldClass}
                  placeholder="Jane Smith"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink-900">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                  className={fieldClass}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-900">
                Email <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
                className={fieldClass}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-ink-900">
                  What do you need? <span className="text-red-600">*</span>
                </label>
                <select
                  id="service"
                  aria-invalid={!!errors.service}
                  {...register("service")}
                  className={fieldClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a service…
                  </option>
                  {business.services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="Other">Other / not sure</option>
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-ink-900">
                  Service address <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id="address"
                  type="text"
                  autoComplete="street-address"
                  {...register("address")}
                  className={fieldClass}
                  placeholder="123 Main St"
                />
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-ink-900">
                How urgent? <span className="text-red-600">*</span>
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {urgencyValues.map((u) => (
                  <label
                    key={u}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-ink-900 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
                  >
                    <input
                      type="radio"
                      value={u}
                      {...register("urgency")}
                      className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600"
                    />
                    {URGENCY_LABELS[u]}
                  </label>
                ))}
              </div>
              {errors.urgency && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.urgency.message as string}
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink-900">
                Tell us more <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                className={fieldClass}
                placeholder="What happened, when it started, anything we should know…"
              />
            </div>

            <div>
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  aria-invalid={!!errors.consent}
                  {...register("consent")}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                />
                <span>
                  I agree to be contacted by {business.name} about my request. We never sell
                  your information.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.consent.message as string}
                </p>
              )}
            </div>

            {serverError && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {serverError}{" "}
                <a
                  href={`tel:${business.phoneTel}`}
                  className="font-semibold underline hover:text-red-900"
                >
                  Call {business.phone}
                </a>
                .
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Sending…" : "Request my quote"}
              {!isSubmitting && (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              )}
            </button>
            <p className="text-center text-xs text-slate-500">
              Or skip the form and{" "}
              <a href={`tel:${business.phoneTel}`} className="font-semibold text-brand-700 hover:text-brand-800">
                call {business.phone}
              </a>{" "}
              right now.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
