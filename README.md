# plumber-leads

A Next.js 15 (App Router) lead-generation website for a plumbing business.
Single landing page with a validated lead form, server-side persistence, and a
mobile-friendly tap-to-call bar.

## Stack

- Next.js 15 + React 19, App Router, TypeScript
- Tailwind CSS
- `react-hook-form` + `zod` for the form (the same zod schema validates on the server)
- Persistence: appends to `data/leads.json` (default) — swap to email/DB in one file

## Run

```bash
cd plumber-leads
npm install
npm run dev
# open http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Edit the business info

Open **`src/config/business.ts`** and replace the placeholder name, phone, email,
service area, hours, license, and service list. Every component on the site reads
from this file.

## Edit copy

Each section of the page is its own component under `src/components/`:

- `Header.tsx` — top bar with logo and call CTA
- `Hero.tsx` — above-the-fold pitch, stats, emergency callout
- `Services.tsx` — service list (driven by `business.services`)
- `WhyUs.tsx` — trust/reasons block
- `Reviews.tsx` — testimonial cards
- `ServiceArea.tsx` — service-area chips
- `LeadForm.tsx` — the lead form
- `Footer.tsx` — bottom links
- `PhoneCTA.tsx` — sticky mobile call bar

The page composition lives in `src/app/page.tsx`.

## Submit a lead

`POST /api/leads` with JSON body:

```json
{
  "name": "Jane Smith",
  "phone": "(555) 123-4567",
  "email": "jane@example.com",
  "service": "Burst pipes",
  "urgency": "emergency",
  "address": "123 Main St",
  "message": "Pipe under kitchen sink is leaking fast.",
  "consent": true
}
```

Responses:

- `201 { "ok": true, "id": "<uuid>" }` on success
- `400 { "ok": false, "error": "Validation failed", "fieldErrors": { "phone": "..." } }` on bad input
- `500 { "ok": false, "error": "..." }` on persistence failure

`urgency` must be one of `emergency`, `today`, `this_week`, `quote`.
`service` is free text but should match one of `business.services` (or `Other`).

## Where do leads go?

By default, every submission is appended to `data/leads.json`. The file is
created on first submit; the directory is created automatically. Writes go
through a temp file + rename so an interrupted write cannot corrupt the file.

> ⚠️ `data/leads.json` contains customer PII and is gitignored. Do not commit it.

## Swap the persistence layer

All persistence lives in **`src/lib/leads.ts`** behind a single function,
`saveLead(input, context)`. To switch to Resend, Supabase, a Zapier webhook, or
anything else, replace the body of that function. The route, form, and types
do not change.

Example — send to Resend and skip the local file:

```ts
// src/lib/leads.ts
import { Resend } from "resend";
import type { Lead } from "@/types/lead";
import type { LeadParsed } from "./validation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function saveLead(input: LeadParsed): Promise<Lead> {
  const lead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
    consent: true,
  };

  await resend.emails.send({
    from: process.env.LEAD_NOTIFICATION_FROM!,
    to: process.env.LEAD_NOTIFICATION_TO!,
    subject: `New lead: ${lead.name} (${lead.urgency})`,
    html: `<h2>New lead</h2><pre>${JSON.stringify(lead, null, 2)}</pre>`,
  });

  return lead;
}
```

## Customize the form fields

The form's fields and validation live in **`src/lib/validation.ts`** (zod). The
client form (`LeadForm.tsx`) and the server route (`/api/leads/route.ts`) both
use that schema, so changing it in one place updates both.

## Deploy

The site is a standard Next.js app — `vercel deploy` works out of the box.
Note: the default `data/leads.json` persistence will not work on serverless
platforms with a read-only filesystem; swap to Resend/Supabase first (see
above).

## File tree

```
plumber-leads/
├── data/                      # leads.json is created here on first submit
├── public/                    # static assets (empty — site is image-free)
├── src/
│   ├── app/
│   │   ├── api/leads/route.ts
│   │   ├── thank-you/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/            # one component per section
│   ├── config/business.ts     # EDIT THIS to rebrand
│   ├── lib/
│   │   ├── leads.ts           # EDIT THIS to change persistence
│   │   └── validation.ts      # EDIT THIS to change form fields
│   └── types/lead.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
