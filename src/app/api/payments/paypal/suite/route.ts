import { NextRequest, NextResponse } from "next/server";
import { suiteSystem, suiteTiers } from "@/lib/supremeSuite";
import { paypalReady } from "@/lib/paypal";
import { newOrderId } from "@/lib/wipay";

export const runtime = "nodejs";

async function getToken(): Promise<string> {
  const base =
    (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  return (await res.json()).access_token;
}

export async function POST(req: NextRequest) {
  let body: { systemSlug?: string; tier?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const systemSlug = String(body.systemSlug ?? "").trim();
  const tierName = String(body.tier ?? "").trim().toLowerCase();

  const sys = suiteSystem(systemSlug);
  if (!sys) return NextResponse.json({ ok: false, error: "unknown_system" }, { status: 404 });

  const tiers = suiteTiers(sys.fromUsd);
  const tier = tiers.find((t) => t.tier.toLowerCase() === tierName);
  if (!tier) return NextResponse.json({ ok: false, error: "unknown_tier" }, { status: 404 });

  if (!paypalReady()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const orderId = newOrderId();
  const amountUsd = tier.monthly.toFixed(2);
  const description = `Supreme Suite — ${sys.name} ${tier.tier} (first month)`;

  const base =
    (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

  try {
    const token = await getToken();
    const res = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "PayPal-Request-Id": orderId,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          custom_id: orderId,
          description: description.slice(0, 127),
          amount: { currency_code: "USD", value: amountUsd },
        }],
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`create ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = await res.json();

    return NextResponse.json({
      ok: true,
      paypalOrderId: data.id,
      orderId,
      systemSlug,
      tier: tier.tier,
      amountUsd,
      planName: `${sys.name} ${tier.tier}`,
    });
  } catch (e: any) {
    console.error("[paypal/suite]", e.message);
    return NextResponse.json({ ok: false, error: "paypal_error", message: "PayPal checkout unavailable." }, { status: 502 });
  }
}
