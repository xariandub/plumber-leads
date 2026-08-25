import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Lead } from "@/types/lead";
import type { LeadParsed } from "./validation";

// Default path can be overridden by the LEADS_FILE_PATH env var.
const DEFAULT_PATH = path.join(process.cwd(), "data", "leads.json");

// A small in-process mutex so concurrent POSTs do not race on the file.
// (Next dev runs handlers on the same node process; this is enough for that
// environment. A real deployment would use a queue or a database.)
let chain: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = chain.then(fn, fn);
  chain = next.catch(() => undefined);
  return next;
}

async function readLeads(filePath: string): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeLeads(filePath: string, leads: Lead[]): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  // Write to a temp file then rename, so a crash mid-write cannot corrupt
  // the existing leads.json.
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

export interface SaveContext {
  userAgent?: string;
  referer?: string;
}

/**
 * Persist a new lead. The ONLY function that touches the storage layer.
 *
 * To swap the backend (Resend, Supabase, Zapier webhook, etc.), replace the
 * body of this function — the route, form, and types do not change.
 */
export async function saveLead(input: LeadParsed, context: SaveContext = {}): Promise<Lead> {
  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: input.name,
    phone: input.phone,
    email: input.email,
    service: input.service,
    urgency: input.urgency,
    address: input.address,
    message: input.message,
    consent: true,
    userAgent: context.userAgent,
    referer: context.referer,
  };

  return withLock(async () => {
    const filePath = process.env.LEADS_FILE_PATH ?? DEFAULT_PATH;
    const existing = await readLeads(filePath);
    existing.push(lead);
    await writeLeads(filePath, existing);
    return lead;
  });
}

/** Read all stored leads. Used by future admin tools; not exposed via a route. */
export async function getLeads(): Promise<Lead[]> {
  const filePath = process.env.LEADS_FILE_PATH ?? DEFAULT_PATH;
  return readLeads(filePath);
}
