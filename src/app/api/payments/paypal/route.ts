import { NextRequest, NextResponse } from "next/server";
import { getPackage } from "@/lib/serviceOffers";
import { newOrderId } from "@/lib/wipay";
import { paypalCreateOrder, paypalReady, jmdToUsd } from "@/lib/paypal";
import { checkCoupon } from "@/lib/coupons";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { slug?: string; pkg?: string; couponCode?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim();
  const pkgId = String(body.pkg ?? "").trim();

  const pkg = getPackage(slug, pkgId);
  if (!pkg) {
    return NextResponse.json({ ok: false, error: "unknown_package" }, { status: 404 });
  }

  if (!paypalReady()) {
    return NextResponse.json(
      { ok: false, error: "not_configured", message: "PayPal checkout is not yet configured." },
      { status: 503 },
    );
  }

  const couponCode = String(body.couponCode ?? "").trim();
  const coupon = couponCode ? await checkCoupon(couponCode) : null;
  const discountPercent = coupon?.discountPercent ?? 0;
  const amountJmd = discountPercent ? Math.round(pkg.amount * (1 - discountPercent / 100)) : pkg.amount;

  const orderId = newOrderId();
  const description = discountPercent
    ? `J Supreme Tech — ${pkg.name} (${discountPercent}% off, ${couponCode.toUpperCase()})`
    : `J Supreme Tech — ${pkg.name}`;

  try {
    const order = await paypalCreateOrder({ amountJmd, description, orderId });
    return NextResponse.json({
      ok: true,
      paypalOrderId: order.id,
      orderId,
      amountJmd,
      amountUsd: jmdToUsd(amountJmd),
      slug,
      pkg: pkgId,
      planName: pkg.name,
      couponCode: discountPercent ? couponCode.toUpperCase() : undefined,
      discountPercent: discountPercent || undefined,
    });
  } catch (e: any) {
    console.error("[paypal] create order error:", e.message);
    return NextResponse.json(
      { ok: false, error: "paypal_error", message: "PayPal checkout unavailable. Message us on WhatsApp." },
      { status: 502 },
    );
  }
}
