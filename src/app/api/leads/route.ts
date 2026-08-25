import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { saveLead } from "@/lib/leads";

// Force the route to run on the Node.js runtime so we can use the file
// system. (Edge runtime does not allow fs writes.)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Validation failed", fieldErrors },
      { status: 400 }
    );
  }

  try {
    const lead = await saveLead(parsed.data, {
      userAgent: request.headers.get("user-agent") ?? undefined,
      referer: request.headers.get("referer") ?? undefined,
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/leads] failed to save lead", err);
    return NextResponse.json(
      { ok: false, error: "Could not save lead. Please call us instead." },
      { status: 500 }
    );
  }
}

// Reject other methods explicitly so the route is predictable.
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
