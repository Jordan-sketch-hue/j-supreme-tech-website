import { NextRequest, NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/whatsapp";
import { provisionTenant } from "@/lib/provision";

export const runtime = "nodejs";

const OWNER_WA = process.env.OWNER_WHATSAPP ?? "+16582182282";

async function capturePayPal(paypalOrderId: string) {
  const base =
    (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

  const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!tokenRes.ok) return { ok: false as const, error: "token_failed" };
  const { access_token } = await tokenRes.json();

  const res = await fetch(`${base}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok || data.status !== "COMPLETED") return { ok: false as const, error: data.message ?? "capture_failed" };

  const unit = data.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  const payer = data.payer;

  return {
    ok: true as const,
    captureId: capture?.id as string,
    orderId: unit?.custom_id as string,
    payerEmail: payer?.email_address as string,
    payerName: `${payer?.name?.given_name ?? ""} ${payer?.name?.surname ?? ""}`.trim(),
    amountUsd: capture?.amount?.value as string,
  };
}

export async function POST(req: NextRequest) {
  let body: {
    paypalOrderId?: string;
    orderId?: string;
    systemSlug?: string;
    tier?: string;
    planName?: string;
    amountUsd?: string;
  };
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { paypalOrderId, orderId, systemSlug, tier, planName, amountUsd } = body;
  if (!paypalOrderId) return NextResponse.json({ ok: false, error: "missing_order_id" }, { status: 400 });

  const result = await capturePayPal(paypalOrderId);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 402 });

  const plan = planName ?? `${systemSlug} ${tier}`;
  const amount = amountUsd ? `US$${amountUsd}/mo` : "";
  const customerEmail = (result.payerEmail ?? "").toLowerCase().trim();
  const customerName = result.payerName || "New Customer";

  // WhatsApp receipt to Jordan — non-blocking
  sendWhatsApp({
    to: OWNER_WA,
    body: `SUITE PAYMENT via PayPal\nPlan: ${plan}\nAmount: ${amount}\nCapture: ${result.captureId}\nPayer: ${customerName} <${customerEmail}>`,
  }).catch(() => {});

  // Auto-provision the workspace immediately
  if (!customerEmail) {
    return NextResponse.json({ ok: false, error: "no_payer_email" }, { status: 422 });
  }

  try {
    const provisioned = await provisionTenant({
      orderId: orderId ?? result.orderId ?? paypalOrderId,
      transactionId: result.captureId,
      serviceSlug: "supreme-suite",
      systemSlug: systemSlug,
      packageId: tier ?? "starter",
      planName: plan,
      amountJmd: 0,
      customerName,
      customerEmail,
      paymentEnv: (process.env.PAYPAL_ENV ?? "").toLowerCase() === "sandbox" ? "sandbox" : "live",
    });

    return NextResponse.json({
      ok: true,
      captureId: result.captureId,
      planName: plan,
      workspaceUrl: provisioned.workspaceUrl,
      workspaceSlug: provisioned.slug,
    });
  } catch (e: any) {
    console.error("[provision] FAILED for PayPal suite order", orderId, ":", e.message);
    // Payment confirmed — flag for manual follow-up
    sendWhatsApp({
      to: OWNER_WA,
      body: `ACTION NEEDED: Suite PayPal payment confirmed but auto-provision FAILED.\nOrder: ${orderId}\nCustomer: ${customerName} <${customerEmail}>\nPlan: ${plan}\nError: ${e.message}`,
    }).catch(() => {});
    return NextResponse.json({
      ok: true,
      captureId: result.captureId,
      planName: plan,
      provision: "failed",
    });
  }
}
