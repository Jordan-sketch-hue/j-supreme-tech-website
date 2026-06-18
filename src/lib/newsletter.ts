import "server-only";
import { Resend } from "resend";
import { createSupabaseAdmin } from "./supabase/server";

const SITE = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";
// Default sender uses the jsupremetech.online brand. The domain must be verified
// in Resend for delivery — set NEWSLETTER_FROM_EMAIL to a verified sender otherwise.
const FROM = process.env.NEWSLETTER_FROM_EMAIL || process.env.SUITE_FROM_EMAIL || "J Supreme Tech <hello@jsupremetech.online>";
const REPLY_TO = process.env.NEWSLETTER_REPLY_TO || "global.jsuprememarketing@gmail.com";

export const TABLE = "jst_subscribers";
export const TOPICS = ["all", "tech", "marketing", "trading", "studio"] as const;
export type Topic = (typeof TOPICS)[number];

export function resend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.startsWith("re_your")) return null;
  return new Resend(key);
}

export function admin() {
  return createSupabaseAdmin();
}

export function normalizeEmail(raw: string): string {
  return String(raw).trim().toLowerCase();
}

export function isEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}

/* ----------------------------- email shell ----------------------------- */
function shell(title: string, body: string, unsubscribeUrl?: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title></head>
<body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif;color:#141414;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e6e6;border-radius:18px;overflow:hidden;">
        <tr><td style="padding:28px 32px;border-bottom:1px solid #e6e6e6;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="width:40px;height:40px;background:#141414;border-radius:9px;text-align:center;vertical-align:middle;color:#fff;font-family:'Courier New',monospace;font-weight:700;font-size:13px;">JST</td>
            <td style="padding-left:12px;">
              <div style="font-weight:600;font-size:15px;letter-spacing:-0.01em;">J Supreme Tech</div>
              <div style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#737373;margin-top:3px;">Communications Debrief</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:36px 32px;">${body}</td></tr>
        <tr><td style="padding:22px 32px;border-top:1px solid #e6e6e6;background:#fafafa;">
          <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#a3a3a3;line-height:1.7;">
            J Supreme Tech · Jamaica · Caribbean · Worldwide<br/>
            WhatsApp (658) 218-2282 · jsupremetech.online
          </div>
          ${unsubscribeUrl ? `<div style="margin-top:10px;font-size:11px;color:#a3a3a3;">You are receiving this because you subscribed to the Communications Debrief. <a href="${unsubscribeUrl}" style="color:#737373;text-decoration:underline;">Unsubscribe</a> anytime.</div>` : ""}
        </td></tr>
      </table>
      <div style="max-width:560px;margin-top:14px;font-size:10px;color:#cfcfcf;font-family:'Courier New',monospace;letter-spacing:0.08em;">© 2026 J Supreme Tech</div>
    </td></tr>
  </table>
</body></html>`;
}

function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-family:'Courier New',monospace;font-weight:700;font-size:13px;letter-spacing:0.02em;padding:14px 26px;border-radius:999px;">${label}</a>`;
}

export async function sendConfirmEmail(email: string, confirmToken: string, unsubscribeToken: string) {
  const r = resend();
  if (!r) return { sent: false, reason: "resend-not-configured" as const };
  const confirmUrl = `${SITE}/api/newsletter/confirm?token=${confirmToken}`;
  const unsubscribeUrl = `${SITE}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
  const body = `
    <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">One last step</div>
    <h1 style="margin:10px 0 0;font-size:26px;letter-spacing:-0.02em;line-height:1.2;">Confirm your subscription</h1>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#525252;">You asked to join the <strong style="color:#141414;">Communications Debrief</strong> — field notes on building software, marketing systems and the markets, straight from the J Supreme Tech studio. Confirm below and you are in.</p>
    <div style="margin:28px 0 8px;">${btn(confirmUrl, "Confirm subscription →")}</div>
    <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#a3a3a3;">If you did not request this, ignore this email and nothing happens. The link confirms double opt-in consent.</p>`;
  const { error } = await r.emails.send({
    from: FROM,
    to: email,
    replyTo: REPLY_TO,
    subject: "Confirm your subscription — J Supreme Tech",
    html: shell("Confirm your subscription", body, unsubscribeUrl),
  });
  return { sent: !error, reason: error?.message };
}

export async function sendWelcomeEmail(email: string, unsubscribeToken: string) {
  const r = resend();
  if (!r) return { sent: false };
  const unsubscribeUrl = `${SITE}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
  const body = `
    <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">You're in</div>
    <h1 style="margin:10px 0 0;font-size:26px;letter-spacing:-0.02em;line-height:1.2;">Welcome to the Debrief</h1>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#525252;">Every dispatch is signal over noise — what we shipped, the problems and fixes behind it, and the moves in tech, marketing and the markets worth your attention. No filler.</p>
    <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#525252;">Start here:</p>
    <ul style="margin:10px 0 0;padding-left:18px;font-size:15px;line-height:1.9;color:#525252;">
      <li><a href="${SITE}/blog" style="color:#141414;">The Signal — the studio publication</a></li>
      <li><a href="${SITE}/library" style="color:#141414;">The Library — free e-books</a></li>
      <li><a href="${SITE}/products" style="color:#141414;">Supreme Suite — the systems we ship</a></li>
    </ul>
    <div style="margin:28px 0 8px;">${btn(`${SITE}/blog`, "Read the latest →")}</div>`;
  const { error } = await r.emails.send({
    from: FROM,
    to: email,
    replyTo: REPLY_TO,
    subject: "Welcome to the Communications Debrief",
    html: shell("Welcome", body, unsubscribeUrl),
  });
  return { sent: !error };
}
