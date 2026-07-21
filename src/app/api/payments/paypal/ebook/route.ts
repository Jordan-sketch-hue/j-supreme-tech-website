import { NextRequest, NextResponse } from "next/server";
import { getEbook } from "@/lib/ebooks";
import { newOrderRef } from "@/lib/library-orders";
import { paypalReady } from "@/lib/paypal";

export const runtime = "nodejs";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const base =
    (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`token error ${res.status}`);
  const data = await res.json();
  return data.access_token as string;
}

async function createOrder(args: {
  amountUsd: string;
  description: string;
  orderId: string;
}): Promise<{ id: string }> {
  const base =
    (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";
  const token = await getAccessToken();

  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "PayPal-Request-Id": args.orderId,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: args.orderId,
          description: args.description.slice(0, 127),
          amount: { currency_code: "USD", value: args.amountUsd },
        },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`create order ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return { id: data.id };
}

export async function POST(req: NextRequest) {
  let body: { slug?: string; email?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim();
  const email = String(body.email ?? "").trim();
  const name = String(body.name ?? "").trim();

  if (!slug || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const book = getEbook(slug);
  if (!book) {
    return NextResponse.json({ ok: false, error: "unknown_book" }, { status: 404 });
  }

  if (!paypalReady()) {
    return NextResponse.json(
      { ok: false, error: "not_configured", message: "PayPal checkout is not yet configured." },
      { status: 503 },
    );
  }

  const orderRef = newOrderRef();
  const amountUsd = book.price.toFixed(2);

  try {
    const order = await createOrder({
      amountUsd,
      description: `J Supreme Tech — ${book.title}`,
      orderId: orderRef,
    });

    return NextResponse.json({
      ok: true,
      paypalOrderId: order.id,
      orderRef,
      slug,
      email,
      name,
      title: book.title,
      amountUsd,
    });
  } catch (e: any) {
    console.error("[paypal/ebook] create order error:", e.message);
    return NextResponse.json(
      { ok: false, error: "paypal_error", message: "PayPal checkout unavailable. Message us on WhatsApp." },
      { status: 502 },
    );
  }
}
