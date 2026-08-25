"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { leadSchema, urgencyValues, type LeadInput } from "@/lib/validation";
import { business } from "@/config/business";
import { Magnetic } from "@/components/motion/Magnetic";

const URGENCY_LABELS: Record<(typeof urgencyValues)[number], string> = {
  emergency: "Emergency — now",
  today: "Today",
  this_week: "This week",
  quote: "Just a quote",
};

export function LeadForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const reduce = useReducedMotion();

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
      consent: false as unknown as true,
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

  return (
    <section id="lead-form" className="relative bg-ink-950 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-900 to-transparent"
      />
      <div className="relative mx-auto max-w-3xl px-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-copper-300">
            / Tell us what&apos;s going on
          </p>
          <h2 className="mt-4 text-center font-display text-5xl leading-[0.95] tracking-editorial text-bone-50 sm:text-6xl">
            Get a real human
            <br />
            <span className="italic text-copper-300">on the phone.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-bone-200/75">
            Fill this out and someone from {business.name} will reach out —
            usually within 15 minutes during business hours. Or skip it and
            call {business.phone}.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
                Your name <span className="text-copper-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                data-error={!!errors.name}
                {...register("name")}
                className="field-input mt-2 block w-full rounded-lg px-4 py-3.5 text-base"
                placeholder="Jane Smith"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-copper-300" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
                Phone <span className="text-copper-400">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                data-error={!!errors.phone}
                {...register("phone")}
                className="field-input mt-2 block w-full rounded-lg px-4 py-3.5 text-base font-mono"
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-copper-300" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
              Email <span className="text-bone-200/30">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              data-error={!!errors.email}
              {...register("email")}
              className="field-input mt-2 block w-full rounded-lg px-4 py-3.5 text-base"
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-copper-300" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
                What do you need? <span className="text-copper-400">*</span>
              </label>
              <select
                id="service"
                aria-invalid={!!errors.service}
                data-error={!!errors.service}
                {...register("service")}
                className="field-input mt-2 block w-full rounded-lg px-4 py-3.5 text-base"
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
                <p className="mt-1 text-sm text-copper-300" role="alert">
                  {errors.service.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="address" className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
                Service address <span className="text-bone-200/30">(optional)</span>
              </label>
              <input
                id="address"
                type="text"
                autoComplete="street-address"
                {...register("address")}
                className="field-input mt-2 block w-full rounded-lg px-4 py-3.5 text-base"
                placeholder="123 Main St"
              />
            </div>
          </div>

          <fieldset>
            <legend className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
              How urgent? <span className="text-copper-400">*</span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {urgencyValues.map((u) => (
                <label
                  key={u}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-bone-100/10 bg-ink-800 px-4 py-3.5 text-sm text-bone-100 transition has-[:checked]:border-copper-400 has-[:checked]:bg-copper-400/[0.08] hover:border-bone-100/25"
                >
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-bone-100/30 group-has-[:checked]:border-copper-400">
                    <span className="h-2 w-2 rounded-full bg-copper-400 opacity-0 transition group-has-[:checked]:opacity-100" />
                  </span>
                  <input
                    type="radio"
                    value={u}
                    {...register("urgency")}
                    className="sr-only"
                  />
                  {URGENCY_LABELS[u]}
                </label>
              ))}
            </div>
            {errors.urgency && (
              <p className="mt-1 text-sm text-copper-300" role="alert">
                {errors.urgency.message as string}
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-[0.22em] text-bone-200/70">
              Tell us more <span className="text-bone-200/30">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message")}
              className="field-input mt-2 block w-full rounded-lg px-4 py-3.5 text-base"
              placeholder="What happened, when it started, anything we should know…"
            />
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-bone-200/80">
              <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border border-bone-100/30 transition has-[:checked]:border-copper-400 has-[:checked]:bg-copper-400/15">
                <input
                  type="checkbox"
                  aria-invalid={!!errors.consent}
                  {...register("consent")}
                  className="peer sr-only"
                />
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-copper-300 opacity-0 transition peer-checked:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>
                I agree to be contacted by {business.name} about my request. We
                never sell your information.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-sm text-copper-300" role="alert">
                {errors.consent.message as string}
              </p>
            )}
          </div>

          {serverError && (
            <div
              className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {serverError}{" "}
              <a
                href={`tel:${business.phoneTel}`}
                className="font-semibold underline hover:text-red-100"
              >
                Call {business.phone}
              </a>
              .
            </div>
          )}

          <Magnetic strength={8} className="w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-copper-400 px-7 py-4 text-base font-semibold text-ink-950 shadow-copper-glow transition hover:bg-copper-300 disabled:cursor-not-allowed disabled:bg-ink-700 disabled:text-bone-200/40 disabled:shadow-none"
              data-cursor="hover"
            >
              {isSubmitting ? "Sending…" : "Request my quote"}
              {!isSubmitting && (
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-950/15 transition group-hover:translate-x-1">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>
          </Magnetic>
          <p className="text-center text-xs text-bone-200/50">
            Or skip the form and{" "}
            <a
              href={`tel:${business.phoneTel}`}
              className="link-sweep font-mono font-semibold text-copper-300"
            >
              call {business.phone}
            </a>{" "}
            right now.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
