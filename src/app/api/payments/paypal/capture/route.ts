import { NextRequest, NextResponse } from "next/server";
import { paypalCaptureOrder } from "@/lib/paypal";
import { sendWhatsApp } from "@/lib/whatsapp";
import { redeemCoupon } from "@/lib/coupons";

export const runtime = "nodejs";

const OWNER_WA = process.env.OWNER_WHATSAPP ?? "+16582182282";

export async function POST(req: NextRequest) {
  let body: {
    paypalOrderId?: string;
    orderId?: string;
    slug?: string;
    pkg?: string;
    planName?: string;
    amountJmd?: number;
    amountUsd?: string;
    couponCode?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const paypalOrderId = String(body.paypalOrderId ?? "").trim();
  if (!paypalOrderId) {
    return NextResponse.json({ ok: false, error: "missing_order_id" }, { status: 400 });
  }

  const result = await paypalCaptureOrder(paypalOrderId);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "capture_failed" },
      { status: 402 },
    );
  }

  if (body.couponCode) {
    await redeemCoupon(body.couponCode, result.orderId);
  }

  // Fire WhatsApp receipt to Jordan — non-blocking.
  const jmd = body.amountJmd ? `J$${Number(body.amountJmd).toLocaleString()}` : "";
  const usd = body.amountUsd ? `US$${body.amountUsd}` : "";
  const amount = [jmd, usd].filter(Boolean).join(" / ");
  const plan = body.planName ?? body.pkg ?? "";
  const payer = result.payerName ? ` from ${result.payerName}` : "";
  const email = result.payerEmail ? `\nEmail: ${result.payerEmail}` : "";

  sendWhatsApp({
    to: OWNER_WA,
    body:
      `PAYMENT RECEIVED via PayPal\n` +
      `Order: ${result.orderId}\n` +
      `Capture: ${result.captureId}\n` +
      `Plan: ${plan}${payer}\n` +
      `Amount: ${amount}${email}\n` +
      `Service: ${body.slug ?? ""}`,
  }).catch((e) => console.error("[paypal] whatsapp receipt error:", e));

  return NextResponse.json({
    ok: true,
    orderId: result.orderId,
    captureId: result.captureId,
    slug: body.slug,
    pkg: body.pkg,
    planName: plan,
  });
}
