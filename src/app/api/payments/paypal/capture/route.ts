import { NextRequest, NextResponse } from "next/server";
import { paypalCaptureOrder } from "@/lib/paypal";
import { sendWhatsApp } from "@/lib/whatsapp";
import { redeemCoupon } from "@/lib/coupons";
import { provisionTenant } from "@/lib/provision";

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
    customerName?: string;
    customerPhone?: string;
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

  // Auto-provision a Supreme Suite workspace immediately on verified PayPal payment.
  let workspaceUrl: string | undefined;
  let provisionedSlug: string | undefined;

  if (body.slug === "supreme-suite" && body.pkg) {
    const customerName = body.customerName ?? result.payerName ?? "New Customer";
    const customerEmail = (result.payerEmail ?? "").toLowerCase().trim();

    if (customerEmail) {
      try {
        const provisioned = await provisionTenant({
          orderId: result.orderId,
          transactionId: result.captureId ?? result.orderId,
          serviceSlug: "supreme-suite",
          packageId: body.pkg,
          planName: plan || body.pkg,
          amountJmd: body.amountJmd ?? 0,
          customerName,
          customerEmail,
          customerPhone: body.customerPhone,
          paymentEnv: "live",
        });
        workspaceUrl = provisioned.workspaceUrl;
        provisionedSlug = provisioned.slug;
      } catch (e: any) {
        // Provisioning failed — payment is confirmed, flag for manual follow-up.
        console.error("[provision] FAILED for PayPal order", result.orderId, ":", e.message);
        sendWhatsApp({
          to: OWNER_WA,
          body: `ACTION NEEDED: PayPal payment confirmed but auto-provision FAILED.\nOrder: ${result.orderId}\nCustomer: ${customerName} <${customerEmail}>\nPlan: ${plan}\nError: ${e.message}`,
        }).catch(() => {});
      }
    }
  }

  return NextResponse.json({
    ok: true,
    orderId: result.orderId,
    captureId: result.captureId,
    slug: body.slug,
    pkg: body.pkg,
    planName: plan,
    ...(workspaceUrl && { workspaceUrl, workspaceSlug: provisionedSlug }),
  });
}
