/**
 * wipay.ts — WiPay Caribbean (Jamaica) hosted-page payments. SERVER ONLY.
 *
 * Flow:
 *   1. POST form params to the JM endpoint → { url, transaction_id }.
 *   2. Redirect the customer to `url` (WiPay Secure Hosted Page).
 *   3. WiPay GET-redirects back to our response_url with the result in the query:
 *      status, transaction_id, order_id, total (FINAL, incl. fee), message, card,
 *      date, and — success only — hash = md5(transaction_id + ORIGINAL total + key).
 *
 * Environments:
 *   live    → merchant account (WIPAY_ACCOUNT_NUMBER / WIPAY_API_KEY)
 *   sandbox → WiPay's shared test account 1234567890 / key "123" (test card 4111…)
 *
 * Because this site keeps no order DB for service payments, the order context
 * (amount, service, package, env) travels in a SIGNED TOKEN baked into the
 * response_url path: /api/payments/wipay/response/<token>. We verify our own
 * HMAC (anti-tamper) before trusting WiPay's hash, so the client can never set
 * its own price.
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const JM_ENDPOINT = "https://jm.wipayfinancial.com/plugins/payments/request";
const SANDBOX_ACCOUNT = "1234567890";
const SANDBOX_KEY = "123";

export type WipayEnvironment = "live" | "sandbox";
export type WipayFeeStructure = "customer_pay" | "merchant_absorb" | "split";

/** Live needs real creds; otherwise we fall back to sandbox so checkout is testable. */
export function wipayLiveConfigured(): boolean {
  return Boolean(process.env.WIPAY_ACCOUNT_NUMBER && process.env.WIPAY_API_KEY);
}

/** Resolved environment: WIPAY_ENV wins; defaults to live when creds exist, else sandbox. */
export function wipayEnvironment(): WipayEnvironment {
  const explicit = (process.env.WIPAY_ENV || "").toLowerCase();
  if (explicit === "live" || explicit === "sandbox") return explicit;
  return wipayLiveConfigured() ? "live" : "sandbox";
}

/**
 * Whether online checkout should be offered at all. Prevents an UNconfigured
 * production site from silently sending real customers to the sandbox: we only
 * go live when real creds exist, and only allow sandbox when it's opt-in via
 * WIPAY_ENV=sandbox (for testing). Otherwise the UI degrades to "pay via WhatsApp".
 */
export function wipayReady(): boolean {
  return wipayLiveConfigured() || (process.env.WIPAY_ENV || "").toLowerCase() === "sandbox";
}

export function wipayFeeStructure(): WipayFeeStructure {
  const v = (process.env.WIPAY_FEE_STRUCTURE || "customer_pay").toLowerCase();
  return v === "merchant_absorb" || v === "split" ? v : "customer_pay";
}

function credentials(env: WipayEnvironment): { account: string; key: string } {
  if (env === "sandbox") return { account: SANDBOX_ACCOUNT, key: SANDBOX_KEY };
  return {
    account: process.env.WIPAY_ACCOUNT_NUMBER || SANDBOX_ACCOUNT,
    key: process.env.WIPAY_API_KEY || SANDBOX_KEY,
  };
}

/** Format a JMD amount exactly as WiPay expects (2 decimals, no separators). */
export function wipayTotalString(amount: number): string {
  return (Math.round(amount * 100) / 100).toFixed(2);
}

/** Unique, ≤16-char, alphanumeric order id. */
export function newOrderId(): string {
  return `JST${Date.now().toString(36)}`.slice(0, 16).toUpperCase();
}

/* --------------------------- signed context token --------------------------- */
// Secret for our own anti-tamper HMAC. Reuses the WiPay key (server-only) with a
// fallback so dev/sandbox still works without extra config.
function tokenSecret(): string {
  return process.env.WIPAY_API_KEY || process.env.PAYMENT_TOKEN_SECRET || "jst-dev-secret";
}

export type PaymentContext = {
  slug: string;
  pkg: string;
  amount: number; // JMD — the ORIGINAL total that signs WiPay's response hash
  env: WipayEnvironment;
  order: string;
  // Optional: carried through for post-payment provisioning (base64url encoded)
  customerName?: string;
  customerEmail?: string;
};

// Compact, signed token — kept short because WiPay caps response_url at 255 chars.
// Format v1: slug~pkg~amount~env(s|l)~order~sig16
// Format v2: slug~pkg~amount~env(s|l)~order~b64name~b64email~sig16  (≤ ~200 chars total)
function sign(body: string): string {
  return createHmac("sha256", tokenSecret()).update(body).digest("hex").slice(0, 16);
}

function b64u(s: string): string {
  return Buffer.from(s).toString("base64url");
}
function fromb64u(s: string): string {
  return Buffer.from(s, "base64url").toString("utf8");
}

export function signContext(ctx: PaymentContext): string {
  const parts = [ctx.slug, ctx.pkg, String(ctx.amount), ctx.env === "live" ? "l" : "s", ctx.order];
  if (ctx.customerName !== undefined || ctx.customerEmail !== undefined) {
    parts.push(b64u((ctx.customerName ?? "").slice(0, 30)));
    parts.push(b64u((ctx.customerEmail ?? "").slice(0, 50)));
  }
  const body = parts.join("~");
  return `${body}~${sign(body)}`;
}

export function verifyContext(token: string): PaymentContext | null {
  const parts = token.split("~");
  // Accept 6-part (v1, no customer info) or 8-part (v2, with name+email)
  if (parts.length !== 6 && parts.length !== 8) return null;
  const sig = parts.pop() as string;
  const body = parts.join("~");
  const expected = sign(body);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }
  const [slug, pkg, amountStr, envCode, order, b64name, b64email] = parts;
  const amount = Number(amountStr);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return {
    slug, pkg, amount,
    env: envCode === "l" ? "live" : "sandbox",
    order,
    customerName: b64name ? fromb64u(b64name) : undefined,
    customerEmail: b64email ? fromb64u(b64email) : undefined,
  };
}

/* ------------------------------ request payment ----------------------------- */
export interface WipayRequestArgs {
  orderId: string;
  total: number; // JMD
  responseUrl: string; // must carry NO querystring of its own
  environment: WipayEnvironment;
  feeStructure: WipayFeeStructure;
  customerName?: string;
  customerEmail?: string;
}

export type WipayRequestResult =
  | { ok: true; url: string; transactionId: string }
  | { ok: false; error: string };

export async function wipayRequestPayment(args: WipayRequestArgs): Promise<WipayRequestResult> {
  const creds = credentials(args.environment);
  const params = new URLSearchParams({
    account_number: creds.account,
    avs: "0",
    country_code: "JM",
    currency: "JMD",
    environment: args.environment,
    fee_structure: args.feeStructure,
    method: "credit_card",
    order_id: args.orderId,
    origin: "JSupremeTech",
    response_url: args.responseUrl,
    total: wipayTotalString(args.total),
  });
  const name = (args.customerName ?? "").trim();
  const email = (args.customerEmail ?? "").trim();
  if (name.length >= 2) params.set("name", name.slice(0, 60));
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) params.set("email", email.slice(0, 50));

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20_000);
    const res = await fetch(JM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      cache: "no-store",
      signal: ctrl.signal,
    });
    clearTimeout(timer);

    const text = await res.text();
    let json: { url?: string; message?: string; transaction_id?: string } = {};
    try {
      json = JSON.parse(text);
    } catch {
      /* non-JSON error body */
    }
    if (!res.ok || !json.url) {
      console.error(`[wipay] request failed ${res.status}: ${json.message ?? text.slice(0, 300)}`);
      return { ok: false, error: json.message || `wipay_http_${res.status}` };
    }
    return { ok: true, url: json.url, transactionId: json.transaction_id ?? "" };
  } catch (e) {
    console.error("[wipay] request error:", e);
    return { ok: false, error: "wipay_unreachable" };
  }
}

/* ------------------------------ response parsing ---------------------------- */
export interface WipayResponseParams {
  status: string;
  transactionId: string;
  orderId: string;
  total: string;
  message: string;
  card: string;
  hash: string;
}

export function parseWipayResponse(searchParams: URLSearchParams): WipayResponseParams {
  const get = (k: string) => (searchParams.get(k) ?? "").trim();
  return {
    status: get("status").toLowerCase(),
    transactionId: get("transaction_id"),
    orderId: get("order_id"),
    total: get("total"),
    message: get("message"),
    card: get("card"),
    hash: get("hash").toLowerCase(),
  };
}

/** Verify success-response hash: md5(transaction_id + ORIGINAL total + API key). */
export function wipayVerifyHash(args: {
  transactionId: string;
  originalTotal: number;
  hash: string;
  environment: WipayEnvironment;
}): boolean {
  const creds = credentials(args.environment);
  if (!args.transactionId || !args.hash) return false;
  const expected = createHash("md5")
    .update(`${args.transactionId}${wipayTotalString(args.originalTotal)}${creds.key}`)
    .digest("hex")
    .toLowerCase();
  return expected === args.hash.toLowerCase();
}
