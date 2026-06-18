/**
 * provision.ts — Supreme Suite tenant auto-provisioning. SERVER ONLY.
 *
 * Called immediately after a verified WiPay payment for a supreme-suite plan.
 * Creates the Supabase tenant record, sends email via Resend REST, and optionally
 * sends WhatsApp via Twilio.
 *
 * Password hashing: PBKDF2-HMAC-SHA256 (Node.js crypto, no extra deps).
 * Format: pbkdf2v1:{hex_salt}:{hex_hash}  (100k iterations, 32-byte output).
 */

import crypto from "node:crypto";
import { sendWhatsApp } from "./whatsapp";

const SUITE_URL =
  process.env.NEXT_PUBLIC_SUPREME_SUITE_URL ?? "https://supreme-suite.vercel.app";

// ── Supabase helpers (REST API, no SDK needed) ─────────────────────────────

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("[provision] SUPABASE_SERVICE_ROLE_KEY not set");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
}

async function sbInsert(table: string, row: Record<string, unknown>): Promise<void> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) throw new Error("[provision] NEXT_PUBLIC_SUPABASE_URL not set");
  const res = await fetch(`${base}/rest/v1/${table}`, {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[provision] ${table} insert ${res.status}: ${text.slice(0, 300)}`);
  }
}

// ── Password hashing ───────────────────────────────────────────────────────

function generatePassword(): string {
  // 12 printable alphanumeric chars, no ambiguous (0/O/l/1/I)
  const chars = "abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  return Array.from(crypto.randomBytes(12))
    .map((b) => chars[b % chars.length])
    .join("");
}

export function hashPassword(plain: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(plain, salt, 100_000, 32, "sha256").toString("hex");
  return `pbkdf2v1:${salt}:${hash}`;
}

// ── Slug generation ────────────────────────────────────────────────────────

function makeSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 18)
    .replace(/-+$/, "") || "biz";
  const suffix = crypto.randomBytes(3).toString("hex"); // 6 hex chars
  return `${base}-${suffix}`;
}

// ── Resend email (REST, no SDK) ────────────────────────────────────────────

async function sendCredentialEmail(opts: {
  email: string;
  firstName: string;
  planName: string;
  workspaceUrl: string;
  tempPassword: string;
  orderId: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[provision] RESEND_API_KEY not set — skipping credential email");
    return;
  }
  const from =
    process.env.SUITE_FROM_EMAIL ?? "hello@jsupremetech.online";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Supreme Suite <${from}>`,
      to: opts.email,
      subject: `Your Supreme Suite ${opts.planName} workspace is ready`,
      html: credentialHtml(opts),
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error("[provision] resend error:", res.status, t.slice(0, 200));
  }
}

function credentialHtml(opts: {
  firstName: string;
  planName: string;
  workspaceUrl: string;
  email: string;
  tempPassword: string;
  orderId: string;
}): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:20px">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0">
  <div style="background:#0f0f0f;padding:28px 36px">
    <p style="color:#fff;font-size:20px;font-weight:700;margin:0">Supreme Suite</p>
    <p style="color:#666;font-size:12px;margin:4px 0 0">by J Supreme Tech</p>
  </div>
  <div style="padding:36px">
    <h1 style="font-size:21px;color:#0f0f0f;margin:0 0 8px">Your workspace is ready, ${opts.firstName}!</h1>
    <p style="color:#555;margin:0 0 24px;line-height:1.6">Your <strong>${opts.planName}</strong> plan is now active. Here are your login credentials — keep them safe.</p>
    <div style="background:#f8f8f8;border:1px solid #e0e0e0;border-radius:8px;padding:20px;margin-bottom:24px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:5px 0;color:#888;font-size:13px;width:130px">Workspace</td>
            <td style="padding:5px 0"><a href="${opts.workspaceUrl}" style="color:#0f0f0f;font-weight:600;font-size:14px">${opts.workspaceUrl}</a></td></tr>
        <tr><td style="padding:5px 0;color:#888;font-size:13px">Login email</td>
            <td style="padding:5px 0;font-weight:600;color:#0f0f0f;font-size:14px">${opts.email}</td></tr>
        <tr><td style="padding:5px 0;color:#888;font-size:13px">Password</td>
            <td style="padding:5px 0"><code style="background:#0f0f0f;color:#fff;padding:3px 10px;border-radius:4px;font-size:14px;letter-spacing:1px">${opts.tempPassword}</code></td></tr>
      </table>
    </div>
    <a href="${opts.workspaceUrl}" style="display:inline-block;background:#0f0f0f;color:#fff;padding:13px 26px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">Open My Workspace →</a>
    <p style="color:#999;font-size:12px;margin:24px 0 0;line-height:1.7">
      Order ref: <code style="background:#f0f0f0;padding:2px 6px;border-radius:3px">${opts.orderId}</code><br>
      Need help? WhatsApp <strong>(658) 218-2282</strong> or reply to this email.
    </p>
  </div>
</div>
</body></html>`;
}

// ── Main export ────────────────────────────────────────────────────────────

export interface ProvisionInput {
  orderId: string;
  transactionId: string;
  serviceSlug: string;    // "supreme-suite"
  packageId: string;      // "starter" | "pro" | "scale"
  planName: string;       // "Starter" | "Pro" | "Scale"
  amountJmd: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  paymentEnv: "live" | "sandbox";
}

export interface ProvisionResult {
  tenantId: string;
  slug: string;
  workspaceUrl: string;
}

export async function provisionTenant(input: ProvisionInput): Promise<ProvisionResult> {
  const tenantId = crypto.randomUUID();
  const slug = makeSlug(input.customerName);
  const tempPassword = generatePassword();
  const passwordHash = hashPassword(tempPassword);
  const firstName = input.customerName.split(" ")[0] ?? "there";
  const workspaceUrl = `${SUITE_URL}/app/${slug}`;

  // 1. Create tenant record
  await sbInsert("ss_tenants", {
    id: tenantId,
    slug,
    business_name: input.customerName,
    system_slug: "courier", // default; changed in settings after login
    owner_name: input.customerName,
    email: input.customerEmail.toLowerCase().trim(),
    phone: input.customerPhone ?? null,
    plan: input.planName.toLowerCase(),
    plan_package: input.packageId,
    password_hash: passwordHash,
    trial_started_at: Date.now(),
    activated_at: new Date().toISOString(),
  });

  // 2. Record the purchase (non-fatal if it fails)
  sbInsert("ss_purchases", {
    id: crypto.randomUUID(),
    tenant_id: tenantId,
    order_id: input.orderId,
    transaction_id: input.transactionId || null,
    service_slug: input.serviceSlug,
    package_slug: input.packageId,
    plan_name: input.planName,
    amount_jmd: input.amountJmd,
    payment_env: input.paymentEnv,
    customer_email: input.customerEmail.toLowerCase().trim(),
    customer_name: input.customerName,
    customer_phone: input.customerPhone ?? null,
  }).catch((e) => console.error("[provision] purchase record failed (non-fatal):", e.message));

  // 3. Send credential email
  await sendCredentialEmail({
    email: input.customerEmail,
    firstName,
    planName: input.planName,
    workspaceUrl,
    tempPassword,
    orderId: input.orderId,
  });

  // 4. WhatsApp notification (non-blocking, optional)
  if (input.customerPhone) {
    sendWhatsApp({
      to: input.customerPhone,
      body:
        `Hi ${firstName}! Your Supreme Suite ${input.planName} workspace is ready 🎉\n\n` +
        `🔗 ${workspaceUrl}\n` +
        `📧 ${input.customerEmail}\n` +
        `🔐 ${tempPassword}\n\n` +
        `Log in and choose your industry in Settings to get started.\n` +
        `Questions? WhatsApp (658) 218-2282.`,
    }).catch((e) => console.error("[provision] whatsapp failed (non-fatal):", e.message));
  }

  return { tenantId, slug, workspaceUrl };
}
