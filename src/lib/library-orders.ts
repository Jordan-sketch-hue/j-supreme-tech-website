import "server-only";
import crypto from "node:crypto";
import { resend, admin as sbAdmin } from "./newsletter";

const SITE = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";
const FROM = process.env.NEWSLETTER_FROM_EMAIL || process.env.SUITE_FROM_EMAIL || "J Supreme Tech <hello@jsupremetech.online>";
const REPLY_TO = process.env.NEWSLETTER_REPLY_TO || "global.jsuprememarketing@gmail.com";
const ADMIN_EMAIL = process.env.LIBRARY_ADMIN_EMAIL || REPLY_TO;
const WHATSAPP = (process.env.LIBRARY_WHATSAPP || "16582182282").replace(/[^0-9]/g, "");

export const ORDERS_TABLE = "jst_ebook_orders";
export const DOWNLOAD_TTL_DAYS = 30;

function secret(): string {
  return (
    process.env.LIBRARY_TOKEN_SECRET ||
    process.env.WIPAY_API_KEY ||
    process.env.JWT_SECRET ||
    "jst-library-dev-secret"
  );
}

function sign(body: string): string {
  return crypto.createHmac("sha256", secret()).update(body).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

/** Human-friendly order reference, e.g. JST-LIB-7Q3K9X. */
export function newOrderRef(): string {
  const raw = crypto.randomBytes(5).toString("hex").toUpperCase().replace(/[^A-Z0-9]/g, "");
  return `JST-LIB-${raw.slice(0, 6)}`;
}

/* ---------------- admin "mark paid & deliver" magic link ---------------- */
export function deliverUrl(ref: string): string {
  const sig = sign(`deliver:${ref}`).slice(0, 24);
  return `${SITE}/api/library/deliver?ref=${encodeURIComponent(ref)}&sig=${sig}`;
}
export function verifyDeliver(ref: string, sig: string): boolean {
  const expected = sign(`deliver:${ref}`).slice(0, 24);
  return Boolean(ref && sig) && safeEqual(sig, expected);
}

/* ---------------- buyer secure download token ---------------- */
function downloadTokenWithExp(ref: string, slug: string, expMs: number): string {
  const body = `${ref}.${slug}.${expMs}`;
  const sig = sign(`download:${body}`).slice(0, 32);
  return Buffer.from(`${body}.${sig}`).toString("base64url");
}
export function makeDownloadToken(ref: string, slug: string): string {
  const exp = Date.now() + DOWNLOAD_TTL_DAYS * 24 * 60 * 60 * 1000;
  return downloadTokenWithExp(ref, slug, exp);
}
export function verifyDownloadToken(token: string): { ref: string; slug: string } | null {
  let decoded = "";
  try {
    decoded = Buffer.from(token, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const parts = decoded.split(".");
  if (parts.length !== 4) return null;
  const [ref, slug, expStr, sig] = parts;
  const body = `${ref}.${slug}.${expStr}`;
  const expected = sign(`download:${body}`).slice(0, 32);
  if (!safeEqual(sig, expected)) return null;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || (exp > 0 && Date.now() > exp)) return null;
  return { ref, slug };
}

export function downloadUrl(ref: string, slug: string): string {
  return `${SITE}/api/library/download?token=${makeDownloadToken(ref, slug)}`;
}

/* ---------------- bank details (env-configurable) ---------------- */
export type BankDetails = { configured: boolean; rows: [string, string][]; whatsapp: string };
export function bankDetails(): BankDetails {
  const rows: [string, string][] = [];
  const add = (label: string, val?: string) => {
    if (val && val.trim()) rows.push([label, val.trim()]);
  };
  add("Bank", process.env.LIBRARY_BANK_NAME);
  add("Account name", process.env.LIBRARY_BANK_ACCOUNT_NAME);
  add("Account number", process.env.LIBRARY_BANK_ACCOUNT_NUMBER);
  add("Account type", process.env.LIBRARY_BANK_ACCOUNT_TYPE);
  add("Branch", process.env.LIBRARY_BANK_BRANCH);
  add("SWIFT / routing", process.env.LIBRARY_BANK_SWIFT);
  add("Notes", process.env.LIBRARY_BANK_EXTRA);
  return { configured: rows.some(([l]) => l === "Account number"), rows, whatsapp: WHATSAPP };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

/* ---------------- emails ---------------- */
function shell(title: string, body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title></head>
<body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif;color:#141414;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #e6e6e6;border-radius:18px;overflow:hidden;">
      <tr><td style="padding:26px 32px;border-bottom:1px solid #e6e6e6;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="width:40px;height:40px;background:#141414;border-radius:9px;text-align:center;vertical-align:middle;color:#fff;font-family:'Courier New',monospace;font-weight:700;font-size:13px;">JST</td>
          <td style="padding-left:12px;"><div style="font-weight:600;font-size:15px;">J Supreme Tech</div><div style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#737373;margin-top:3px;">The Library</div></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:34px 32px;">${body}</td></tr>
      <tr><td style="padding:20px 32px;border-top:1px solid #e6e6e6;background:#fafafa;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;line-height:1.7;">J Supreme Tech · WhatsApp (658) 218-2282 · jsupremetech.online</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}
function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-family:'Courier New',monospace;font-weight:700;font-size:13px;padding:14px 26px;border-radius:999px;">${label}</a>`;
}
function bankBlock(): string {
  const bd = bankDetails();
  if (!bd.configured) {
    return `<p style="margin:0;font-size:14px;color:#525252;">Message us on <a href="https://wa.me/${bd.whatsapp}" style="color:#141414;">WhatsApp</a> with your order reference and we'll send you the bank details.</p>`;
  }
  const rows = bd.rows
    .map(([l, v]) => `<tr><td style="padding:5px 0;font-size:12px;color:#737373;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.08em;">${l}</td><td style="padding:5px 0 5px 16px;font-size:14px;color:#141414;font-weight:600;">${v}</td></tr>`)
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#fafafa;border:1px solid #e6e6e6;border-radius:12px;padding:14px 18px;">${rows}</table>`;
}

export async function sendOrderInstructions(order: { ref: string; email: string; name?: string; title: string; amount: number }) {
  const r = resend();
  if (!r) return { sent: false };
  const body = `
    <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">Order received · ${order.ref}</div>
    <h1 style="margin:10px 0 0;font-size:24px;letter-spacing:-0.02em;">Almost yours — one bank transfer away</h1>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#525252;">Thanks${order.name ? `, ${order.name}` : ""}! You reserved <strong style="color:#141414;">${order.title}</strong> for <strong style="color:#141414;">${formatUSD(order.amount)}</strong>. To complete it, send a bank transfer using the reference below — we'll email your secure download link the moment payment clears (usually within a few hours).</p>
    <p style="margin:18px 0 8px;font-size:12px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.14em;color:#737373;">Payment reference: <strong style="color:#141414;">${order.ref}</strong></p>
    ${bankBlock()}
    <p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#737373;">After paying, reply here or send your receipt to us on <a href="https://wa.me/${WHATSAPP}" style="color:#141414;">WhatsApp</a> with reference <strong style="color:#141414;">${order.ref}</strong>.</p>`;
  const { error } = await r.emails.send({ from: FROM, to: order.email, replyTo: REPLY_TO, subject: `Your order ${order.ref} — complete your bank transfer`, html: shell("Complete your order", body) });
  return { sent: !error };
}

export async function sendAdminNotification(order: { ref: string; email: string; name?: string; title: string; amount: number }) {
  const r = resend();
  if (!r) return { sent: false };
  const body = `
    <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">New e-book order</div>
    <h1 style="margin:10px 0 0;font-size:22px;letter-spacing:-0.02em;">${order.title} — ${formatUSD(order.amount)}</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px;width:100%;">
      <tr><td style="padding:4px 0;font-size:13px;color:#737373;">Reference</td><td style="padding:4px 0;font-size:13px;color:#141414;font-weight:600;">${order.ref}</td></tr>
      <tr><td style="padding:4px 0;font-size:13px;color:#737373;">Buyer</td><td style="padding:4px 0;font-size:13px;color:#141414;font-weight:600;">${order.name || "—"}</td></tr>
      <tr><td style="padding:4px 0;font-size:13px;color:#737373;">Email</td><td style="padding:4px 0;font-size:13px;color:#141414;font-weight:600;">${order.email}</td></tr>
    </table>
    <p style="margin:18px 0 14px;font-size:14px;line-height:1.6;color:#525252;">Once you've confirmed the bank transfer landed, click below to mark it paid and auto-send the buyer their secure download link.</p>
    ${btn(deliverUrl(order.ref), "Mark paid & send download →")}`;
  const { error } = await r.emails.send({ from: FROM, to: ADMIN_EMAIL, replyTo: order.email, subject: `New order ${order.ref} — ${order.title} ${formatUSD(order.amount)}`, html: shell("New order", body) });
  return { sent: !error };
}

export async function sendDeliveryEmail(order: { ref: string; email: string; title: string; slug: string }) {
  const r = resend();
  if (!r) return { sent: false };
  const url = downloadUrl(order.ref, order.slug);
  const body = `
    <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">Payment confirmed · ${order.ref}</div>
    <h1 style="margin:10px 0 0;font-size:24px;letter-spacing:-0.02em;">Your e-book is ready</h1>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#525252;">Thank you — your payment for <strong style="color:#141414;">${order.title}</strong> is confirmed. Download your copy below. This private link is yours; it stays live for ${DOWNLOAD_TTL_DAYS} days.</p>
    <div style="margin:26px 0 8px;">${btn(url, "Download your e-book →")}</div>
    <p style="margin:16px 0 0;font-size:12px;color:#a3a3a3;line-height:1.6;">For your use only — please don't share the link or file. Questions? Reply to this email.</p>`;
  const { error } = await r.emails.send({ from: FROM, to: order.email, replyTo: REPLY_TO, subject: `Your e-book is ready — ${order.title}`, html: shell("Your download", body) });
  return { sent: !error };
}

export function ordersAdmin() {
  return sbAdmin();
}
