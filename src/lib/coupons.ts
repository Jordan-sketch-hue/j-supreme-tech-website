import "server-only";
import { createSupabaseAdmin } from "./supabase/server";

const MIN_PERCENT = 15;
const MAX_PERCENT = 35;
const EXPIRY_DAYS = 30;
// Excludes visually-confusing characters (0/O, 1/I/L).
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `SIGNAL-${code}`;
}

function randomPercent(): number {
  return Math.floor(Math.random() * (MAX_PERCENT - MIN_PERCENT + 1)) + MIN_PERCENT;
}

export type Coupon = {
  code: string;
  discountPercent: number;
  expiresAt: string;
  alreadyRedeemed: boolean;
};

/** Issues one scratch-off coupon per email, ever — re-opening the popup or
 *  re-subscribing returns the same coupon (redeemed or not) rather than
 *  minting a fresh discount each time. */
export async function issueCoupon(email: string, source = "popup"): Promise<Coupon | null> {
  const db = createSupabaseAdmin();
  if (!db) return null;

  const { data: existing } = await db
    .from("jst_coupons")
    .select("code, discount_percent, expires_at, redeemed_at")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    return {
      code: existing.code,
      discountPercent: existing.discount_percent,
      expiresAt: existing.expires_at,
      alreadyRedeemed: !!existing.redeemed_at,
    };
  }

  const discountPercent = randomPercent();
  const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString();

  // Retry on the rare code collision (unique constraint).
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = randomCode();
    const { error } = await db.from("jst_coupons").insert({
      code,
      email,
      discount_percent: discountPercent,
      source,
      expires_at: expiresAt,
    });
    if (!error) return { code, discountPercent, expiresAt, alreadyRedeemed: false };
    if (!error.message?.includes("duplicate")) {
      console.error("[coupons] issue failed:", error.message);
      return null;
    }
  }
  return null;
}

/** Read-only validity check — used at checkout to compute the discounted
 *  amount before payment is created. Does not mark the coupon redeemed. */
export async function checkCoupon(code: string): Promise<{ discountPercent: number } | null> {
  const db = createSupabaseAdmin();
  if (!db || !code) return null;

  const { data } = await db
    .from("jst_coupons")
    .select("discount_percent, redeemed_at, expires_at")
    .eq("code", code.trim().toUpperCase())
    .maybeSingle();

  if (!data || data.redeemed_at || new Date(data.expires_at) < new Date()) return null;
  return { discountPercent: data.discount_percent };
}

/** Marks a coupon redeemed once a real payment has captured. Idempotent on
 *  a given order id — calling it twice for the same order is harmless. */
export async function redeemCoupon(code: string, orderId: string): Promise<boolean> {
  const db = createSupabaseAdmin();
  if (!db || !code) return false;

  const { error } = await db
    .from("jst_coupons")
    .update({ redeemed_at: new Date().toISOString(), redeemed_order_id: orderId })
    .eq("code", code.trim().toUpperCase())
    .is("redeemed_at", null);

  return !error;
}
