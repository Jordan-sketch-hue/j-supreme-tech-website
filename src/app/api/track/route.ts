import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, x-analytics-token",
  "access-control-max-age": "86400",
};

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, { ...init, headers: { ...CORS, ...(init?.headers ?? {}) } });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

function db() {
  const url = process.env.JST_SUPABASE_URL;
  const key = process.env.JST_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function ipHash(headers: Headers) {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown";
  return crypto
    .createHash("sha256")
    .update(`${process.env.SECURITY_HASH_SALT || "jst-salt"}:${ip}`)
    .digest("hex")
    .slice(0, 16);
}

// POST — ingest a tracking event from the JST website
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const supabase = db();
  if (!supabase) return json({ ok: false, reason: "not configured" }, { status: 503 });

  const visitor = ipHash(request.headers);
  const ua = request.headers.get("user-agent") || "";

  await supabase.from("jst_analytics_events").insert({
    event: String(body.event ?? "page_view"),
    page: String(body.page ?? "/"),
    utm_source: body.utm?.source ?? null,
    utm_medium: body.utm?.medium ?? null,
    utm_campaign: body.utm?.campaign ?? null,
    utm_content: body.utm?.content ?? null,
    utm_term: body.utm?.term ?? null,
    props: body.props ?? {},
    visitor_hash: visitor,
    user_agent: ua.slice(0, 300),
  });

  return json({ ok: true });
}

// GET — dashboard read (protected by ANALYTICS_READ_TOKEN)
export async function GET(request: Request) {
  const token =
    request.headers.get("x-analytics-token") ??
    new URL(request.url).searchParams.get("token");
  if (!token || token !== process.env.ANALYTICS_READ_TOKEN) {
    return new NextResponse(null, { status: 401 });
  }

  const supabase = db();
  if (!supabase) return json({ error: "not configured" }, { status: 503 });

  const range = (new URL(request.url).searchParams.get("range") as "7d" | "30d" | "today") ?? "7d";
  const since = new Date(
    Date.now() -
      (range === "today" ? 0 : range === "7d" ? 7 : 30) * 24 * 60 * 60 * 1000,
  );
  if (range === "today") {
    since.setHours(0, 0, 0, 0);
  }

  const [events, topPages, utmSources, eventTypes] = await Promise.all([
    supabase
      .from("jst_analytics_events")
      .select("*")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false })
      .limit(500),

    supabase.rpc("jst_top_pages", { since_ts: since.toISOString(), row_limit: 10 }),

    supabase.rpc("jst_utm_sources", { since_ts: since.toISOString(), row_limit: 10 }),

    supabase.rpc("jst_event_counts", { since_ts: since.toISOString() }),
  ]);

  // Build daily series from raw events
  const rawEvents = events.data ?? [];
  const dailySeries: Record<string, number> = {};
  for (const e of rawEvents) {
    if (e.event !== "page_view") continue;
    const day = e.created_at.slice(0, 10);
    dailySeries[day] = (dailySeries[day] ?? 0) + 1;
  }

  const uniqueVisitorsToday = new Set(
    rawEvents
      .filter((e) => {
        const t = new Date(e.created_at).getTime();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        return t >= start.getTime();
      })
      .map((e) => e.visitor_hash),
  ).size;

  return json({
    range,
    totalEvents: rawEvents.length,
    uniqueVisitorsToday,
    pageViews: rawEvents.filter((e) => e.event === "page_view").length,
    ctaClicks: rawEvents.filter((e) => e.event === "cta_click").length,
    formStarts: rawEvents.filter((e) => e.event === "form_start").length,
    formSubmits: rawEvents.filter((e) => e.event === "form_submit").length,
    newsletterSignups: rawEvents.filter((e) => e.event === "newsletter_signup").length,
    trialSignups: rawEvents.filter((e) => e.event === "trial_signup").length,
    intakeSubmissions: rawEvents.filter((e) => e.event === "intake_submit").length,
    dailySeries: Object.entries(dailySeries)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, views]) => ({ date, views })),
    topPages: topPages.data ?? [],
    utmSources: utmSources.data ?? [],
    eventCounts: eventTypes.data ?? [],
    recentEvents: rawEvents.slice(0, 50),
  });
}
