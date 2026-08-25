import { z } from "zod";

// Phone: accept any input with 10+ digits, then normalize to digits-only.
const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone is required")
  .transform((raw) => raw.replace(/[^\d+]/g, ""))
  .refine((digits) => digits.replace(/\D/g, "").length >= 10, {
    message: "Phone must have at least 10 digits",
  });

export const urgencyValues = ["emergency", "today", "this_week", "quote"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: phoneSchema,
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  service: z.string().trim().min(1, "Choose a service").max(100),
  urgency: z.enum(urgencyValues, {
    errorMap: () => ({ message: "Pick an urgency" }),
  }),
  address: z.string().trim().max(200).optional().or(z.literal("").transform(() => undefined)),
  message: z.string().trim().max(1000).optional().or(z.literal("").transform(() => undefined)),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadParsed = z.output<typeof leadSchema>;
