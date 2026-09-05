import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { admin, isEmail, normalizeEmail, sendWelcomeEmail, TABLE } from "@/lib/newsletter";
import { issueCoupon } from "@/lib/coupons";

// The actual daily send lives in a separate app (jst-communications) that
// pulls recipients from its own Resend Audience — this table alone doesn't
// get anyone real issues. Enroll them in the live list too, server-to-server.
const AUDIENCE_ENDPOINT = "https://communications.jsupremetech.online/api/newsletter/subscribe";

async function enrollInTodaysWorld(email: string, name: string | null) {
  try {
    const [firstName, ...rest] = (name ?? "").split(" ").filter(Boolean);
    await fetch(AUDIENCE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName: rest.join(" ") }),
    });
  } catch (err) {
    console.error("[newsletter] In Today's World enroll failed:", err);
  }
}

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

  const { data: existing } = await db.from(TABLE).select("id,status,unsubscribe_token").eq("email", email).maybeSingle();

  if (existing?.status === "confirmed") {
    const coupon = await issueCoupon(email, source);
    return NextResponse.json({
      ok: true,
      status: "already-subscribed",
      message: "You're already on the list — In Today's World: lands every weekday morning.",
      coupon,
    });
  }

  const unsubscribeToken = existing?.unsubscribe_token ?? crypto.randomUUID();

  const row = {
    email,
    name,
    topics,
    source,
    status: "confirmed",
    confirmed_at: new Date().toISOString(),
    unsubscribe_token: unsubscribeToken,
    ip,
    user_agent: userAgent,
    consent_at: new Date().toISOString(),
  };

  const { error } = await db.from(TABLE).upsert(row, { onConflict: "email" });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await enrollInTodaysWorld(email, name);
  await sendWelcomeEmail(email, unsubscribeToken);
  const coupon = await issueCoupon(email, source);

  return NextResponse.json({
    ok: true,
    status: "subscribed",
    message: "You're in — In Today's World: lands in your inbox every weekday morning.",
    coupon,
  });
}
