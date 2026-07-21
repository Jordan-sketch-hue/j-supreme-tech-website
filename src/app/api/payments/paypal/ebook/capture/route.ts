import { NextRequest, NextResponse } from "next/server";
import { sendDeliveryEmail, sendAdminNotification, ordersAdmin, ORDERS_TABLE } from "@/lib/library-orders";
import { getEbook } from "@/lib/ebooks";

export const runtime = "nodejs";

async function captureOrder(paypalOrderId: string): Promise<{
  ok: boolean;
  customId?: string;
  captureId?: string;
  payerEmail?: string;
  payerName?: string;
  amountUsd?: string;
  error?: string;
}> {
  const base =
    (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;

  const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!tokenRes.ok) return { ok: false, error: "token_failed" };
  const { access_token } = await tokenRes.json();

  const res = await fetch(`${base}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok || data.status !== "COMPLETED") {
    return { ok: false, error: data.message ?? "capture_failed" };
  }

  const unit = data.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  const payer = data.payer;

  return {
    ok: true,
    customId: unit?.custom_id,
    captureId: capture?.id,
    payerEmail: payer?.email_address,
    payerName: `${payer?.name?.given_name ?? ""} ${payer?.name?.surname ?? ""}`.trim(),
    amountUsd: capture?.amount?.value,
  };
}

export async function POST(req: NextRequest) {
  let body: {
    paypalOrderId?: string;
    orderRef?: string;
    slug?: string;
    email?: string;
    name?: string;
    title?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const paypalOrderId = String(body.paypalOrderId ?? "").trim();
  const orderRef = String(body.orderRef ?? "").trim();
  const slug = String(body.slug ?? "").trim();
  const email = String(body.email ?? "").trim();
  const name = String(body.name ?? "").trim();

  if (!paypalOrderId || !orderRef || !slug || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const book = getEbook(slug);
  if (!book) return NextResponse.json({ ok: false, error: "unknown_book" }, { status: 404 });

  const result = await captureOrder(paypalOrderId);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 402 });
  }

  // Persist to Supabase as already-paid
  const db = ordersAdmin();
  if (db) {
    await db.from(ORDERS_TABLE).upsert({
      ref: orderRef,
      slug: book.slug,
      title: book.title,
      email,
      name: name || null,
      amount_cents: Math.round(book.price * 100),
      currency: "USD",
      status: "paid",
      paid_via: "paypal",
      paypal_capture_id: result.captureId ?? null,
    });
  }

  // Send download link to buyer immediately
  await sendDeliveryEmail({ ref: orderRef, email, title: book.title, slug: book.slug });

  // Notify Jordan
  sendAdminNotification({
    ref: orderRef,
    email,
    name: name || (result.payerName ?? undefined),
    title: `[PayPal PAID] ${book.title}`,
    amount: book.price,
  }).catch(() => {});

  return NextResponse.json({
    ok: true,
    orderRef,
    captureId: result.captureId,
    title: book.title,
    email,
  });
}
