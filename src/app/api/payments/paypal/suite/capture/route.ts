import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/newsletter";
import { sendWhatsApp } from "@/lib/whatsapp";

export const runtime = "nodejs";

const FROM = process.env.NEWSLETTER_FROM_EMAIL ?? "J Supreme Tech <hello@jsupremetech.online>";
const ADMIN_EMAIL = process.env.LIBRARY_ADMIN_EMAIL ?? "global.jsuprememarketing@gmail.com";
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
  if (!tokenRes.ok) return { ok: false, error: "token_failed" };
  const { access_token } = await tokenRes.json();

  const res = await fetch(`${base}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok || data.status !== "COMPLETED") return { ok: false, error: data.message ?? "capture_failed" };

  const unit = data.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  const payer = data.payer;

  return {
    ok: true,
    captureId: capture?.id as string,
    payerEmail: payer?.email_address as string,
    payerName: `${payer?.name?.given_name ?? ""} ${payer?.name?.surname ?? ""}`.trim(),
    amountUsd: capture?.amount?.value as string,
  };
}

export async function POST(req: NextRequest) {
  let body: { paypalOrderId?: string; orderId?: string; systemSlug?: string; tier?: string; planName?: string; amountUsd?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const { paypalOrderId, orderId, systemSlug, tier, planName, amountUsd } = body;
  if (!paypalOrderId) return NextResponse.json({ ok: false, error: "missing_order_id" }, { status: 400 });

  const result = await capturePayPal(paypalOrderId);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 402 });

  const plan = planName ?? `${systemSlug} ${tier}`;
  const amount = amountUsd ? `US$${amountUsd}/mo` : "";

  // Email Jordan
  const r = resend();
  if (r) {
    r.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      replyTo: result.payerEmail ?? ADMIN_EMAIL,
      subject: `Suite payment received — ${plan} ${amount}`,
      html: `<p><strong>Plan:</strong> ${plan}</p>
             <p><strong>Amount:</strong> ${amount}</p>
             <p><strong>Order:</strong> ${orderId ?? "—"}</p>
             <p><strong>Capture:</strong> ${result.captureId}</p>
             <p><strong>Payer:</strong> ${result.payerName} &lt;${result.payerEmail}&gt;</p>
             <p>Provision their account on Supreme Suite and send them access.</p>`,
    }).catch(() => {});
  }

  // WhatsApp receipt
  sendWhatsApp({
    to: OWNER_WA,
    body: `SUITE PAYMENT via PayPal\nPlan: ${plan}\nAmount: ${amount}\nCapture: ${result.captureId}\nPayer: ${result.payerName} <${result.payerEmail}>`,
  }).catch(() => {});

  return NextResponse.json({ ok: true, orderId, captureId: result.captureId, planName: plan });
}
