// The Lead type, shared by the client form and the server route.
// Source of truth is the zod schema in src/lib/validation.ts.

export type Urgency = "emergency" | "today" | "this_week" | "quote";

export interface Lead {
  id: string;
  createdAt: string; // ISO timestamp
  name: string;
  phone: string;
  email?: string;
  service: string;
  urgency: Urgency;
  address?: string;
  message?: string;
  consent: true;
  // Best-effort context for follow-up. Not validated.
  userAgent?: string;
  referer?: string;
}
