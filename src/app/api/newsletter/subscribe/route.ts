import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { admin, isEmail, normalizeEmail, sendWelcomeEmail } from "@/lib/newsletter";
import { issueCoupon } from "@/lib/coupons";

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

  const sql = admin();
  if (!sql) {
    return NextResponse.json(
      { error: "The subscriber database is not connected yet. Add NEON_DATABASE_URL in Vercel and redeploy." },
      { status: 503 },
    );
  }

  const name = (payload.name ?? "").toString().slice(0, 120) || null;
  const topics = Array.isArray(payload.topics) && payload.topics.length ? payload.topics.slice(0, 8) : ["all"];
  const source = (payload.source ?? "website").toString().slice(0, 60);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = request.headers.get("user-agent")?.slice(0, 300) || null;

  const existing = await sql`
    SELECT id, status, unsubscribe_token FROM jst_subscribers
    WHERE email = ${email}
    LIMIT 1
  `;
  const existingRow = existing[0] ?? null;

  if (existingRow?.status === "confirmed") {
    const coupon = await issueCoupon(email, source);
    return NextResponse.json({
      ok: true,
      status: "already-subscribed",
      message: "You're already on the list — In Today's World: lands every weekday morning.",
      coupon,
    });
  }

  const unsubscribeToken = existingRow?.unsubscribe_token ?? crypto.randomUUID();
  const now = new Date().toISOString();

  try {
    await sql`
      INSERT INTO jst_subscribers (email, name, topics, source, status, confirmed_at, unsubscribe_token, ip, user_agent, consent_at)
      VALUES (${email}, ${name}, ${topics}, ${source}, 'confirmed', ${now}, ${unsubscribeToken}, ${ip}, ${userAgent}, ${now})
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        topics = EXCLUDED.topics,
        source = EXCLUDED.source,
        status = 'confirmed',
        confirmed_at = EXCLUDED.confirmed_at,
        unsubscribe_token = EXCLUDED.unsubscribe_token,
        ip = EXCLUDED.ip,
        user_agent = EXCLUDED.user_agent,
        consent_at = EXCLUDED.consent_at,
        updated_at = NOW()
    `;
  } catch (err) {
    console.error("[newsletter] upsert failed:", err);
    return NextResponse.json({ error: "Failed to save subscription." }, { status: 500 });
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
