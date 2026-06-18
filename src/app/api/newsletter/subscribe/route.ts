import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { admin, isEmail, normalizeEmail, sendConfirmEmail, sendWelcomeEmail, TABLE } from "@/lib/newsletter";

export async function POST(request: Request) {
  let payload: { email?: string; name?: string; topics?: string[]; source?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = normalizeEmail(payload.email ?? "");
  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const db = admin();
  if (!db) {
    return NextResponse.json(
      { error: "The subscriber database is not connected yet. Add Supabase keys in Vercel and redeploy." },
      { status: 503 },
    );
  }

  const name = (payload.name ?? "").toString().slice(0, 120) || null;
  const topics = Array.isArray(payload.topics) && payload.topics.length ? payload.topics.slice(0, 8) : ["all"];
  const source = (payload.source ?? "website").toString().slice(0, 60);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = request.headers.get("user-agent")?.slice(0, 300) || null;

  // Look up existing subscriber.
  const { data: existing } = await db.from(TABLE).select("id,status,unsubscribe_token").eq("email", email).maybeSingle();

  if (existing?.status === "confirmed") {
    return NextResponse.json({ ok: true, status: "already-subscribed", message: "You're already on the list — check your inbox for the latest Debrief." });
  }

  const confirmToken = crypto.randomUUID();
  const unsubscribeToken = existing?.unsubscribe_token ?? crypto.randomUUID();

  const row = {
    email,
    name,
    topics,
    source,
    status: "pending",
    confirm_token: confirmToken,
    unsubscribe_token: unsubscribeToken,
    ip,
    user_agent: userAgent,
    consent_at: new Date().toISOString(),
  };

  const { error } = await db.from(TABLE).upsert(row, { onConflict: "email" });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Double opt-in: send confirmation. If Resend isn't configured, auto-confirm so
  // the list still grows (clearly logged), but prefer the confirm flow in prod.
  const confirm = await sendConfirmEmail(email, confirmToken, unsubscribeToken);
  if (!confirm.sent && confirm.reason === "resend-not-configured") {
    await db.from(TABLE).update({ status: "confirmed", confirmed_at: new Date().toISOString() }).eq("email", email);
    await sendWelcomeEmail(email, unsubscribeToken);
    return NextResponse.json({ ok: true, status: "subscribed", message: "You're subscribed. Welcome to the Debrief." });
  }

  return NextResponse.json({
    ok: true,
    status: "pending",
    message: "Almost there — check your inbox and confirm your subscription.",
  });
}
