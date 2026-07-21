/**
 * paypal.ts — PayPal Orders API v2. SERVER ONLY.
 *
 * Flow:
 *   1. POST /api/payments/paypal        → create order → return { orderId }
 *   2. Client renders PayPal JS SDK     → customer approves in PayPal popup
 *   3. POST /api/payments/paypal/capture → capture payment → WhatsApp receipt
 *
 * Required env vars:
 *   NEXT_PUBLIC_PAYPAL_CLIENT_ID  — from developer.paypal.com (also used by SDK script)
 *   PAYPAL_CLIENT_SECRET          — server-side only
 *
 * Optional:
 *   PAYPAL_ENV          — "sandbox" | "live"  (defaults: live when secret present)
 *   JMD_TO_USD_RATE     — e.g. "157"          (defaults: 157)
 */

export type PayPalEnv = "sandbox" | "live";

function ppEnv(): PayPalEnv {
  const explicit = (process.env.PAYPAL_ENV ?? "").toLowerCase();
  if (explicit === "sandbox" || explicit === "live") return explicit;
  return process.env.PAYPAL_CLIENT_SECRET ? "live" : "sandbox";
}

function baseUrl(env: PayPalEnv) {
  return env === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";
}

export function paypalReady(): boolean {
  return !!(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

/** JMD → USD using configurable rate (default 157). */
export function jmdToUsd(jmd: number): string {
  const rate = Number(process.env.JMD_TO_USD_RATE ?? 157);
  return (jmd / rate).toFixed(2);
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const env = ppEnv();

  const res = await fetch(`${baseUrl(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[paypal] token error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export interface CreateOrderArgs {
  amountJmd: number;
  description: string;
  /** Passed through in custom_id so we can identify the order on capture. */
  orderId: string;
}

export async function paypalCreateOrder(args: CreateOrderArgs): Promise<{ id: string }> {
  const env = ppEnv();
  const token = await getAccessToken();
  const usd = jmdToUsd(args.amountJmd);

  const res = await fetch(`${baseUrl(env)}/v2/checkout/orders`, {
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
          amount: { currency_code: "USD", value: usd },
        },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[paypal] create order ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  return { id: data.id };
}

export interface CaptureResult {
  ok: boolean;
  orderId: string;
  captureId?: string;
  payerEmail?: string;
  payerName?: string;
  amountUsd?: string;
  error?: string;
}

export async function paypalCaptureOrder(paypalOrderId: string): Promise<CaptureResult> {
  const env = ppEnv();
  const token = await getAccessToken();

  const res = await fetch(`${baseUrl(env)}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || data.status !== "COMPLETED") {
    console.error("[paypal] capture failed:", JSON.stringify(data).slice(0, 300));
    return { ok: false, orderId: paypalOrderId, error: data.message ?? "capture_failed" };
  }

  const unit = data.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  const payer = data.payer;

  return {
    ok: true,
    orderId: unit?.custom_id ?? paypalOrderId,
    captureId: capture?.id,
    payerEmail: payer?.email_address,
    payerName: `${payer?.name?.given_name ?? ""} ${payer?.name?.surname ?? ""}`.trim(),
    amountUsd: capture?.amount?.value,
  };
}
