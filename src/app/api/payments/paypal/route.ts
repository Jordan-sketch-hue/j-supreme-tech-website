import { NextRequest, NextResponse } from "next/server";
import { getPackage } from "@/lib/serviceOffers";
import { newOrderId } from "@/lib/wipay";
import { paypalCreateOrder, paypalReady, jmdToUsd } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { slug?: string; pkg?: string };
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

  const orderId = newOrderId();
  const description = `J Supreme Tech — ${pkg.name}`;

  try {
    const order = await paypalCreateOrder({ amountJmd: pkg.amount, description, orderId });
    return NextResponse.json({
      ok: true,
      paypalOrderId: order.id,
      orderId,
      amountJmd: pkg.amount,
      amountUsd: jmdToUsd(pkg.amount),
      slug,
      pkg: pkgId,
      planName: pkg.name,
    });
  } catch (e: any) {
    console.error("[paypal] create order error:", e.message);
    return NextResponse.json(
      { ok: false, error: "paypal_error", message: "PayPal checkout unavailable. Message us on WhatsApp." },
      { status: 502 },
    );
  }
}
