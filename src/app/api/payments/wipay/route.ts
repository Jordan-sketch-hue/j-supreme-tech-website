import { NextRequest, NextResponse } from "next/server";
import { getPackage } from "@/lib/serviceOffers";
import {
  newOrderId,
  signContext,
  wipayEnvironment,
  wipayFeeStructure,
  wipayReady,
  wipayRequestPayment,
} from "@/lib/wipay";

export const runtime = "nodejs";

/** Resolve the public origin WiPay must redirect back to (never localhost in prod). */
function siteOrigin(req: NextRequest): string {
  const env = process.env.SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  return (env || req.nextUrl.origin).replace(/\/+$/, "");
}

export async function POST(req: NextRequest) {
  let body: { slug?: string; pkg?: string; name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim();
  const pkgId = String(body.pkg ?? "").trim();

  // Price is resolved SERVER-SIDE — the client never sends an amount.
  const pkg = getPackage(slug, pkgId);
  if (!pkg) {
    return NextResponse.json({ ok: false, error: "unknown_package" }, { status: 404 });
  }

  // Don't send real customers to a test checkout: stay "coming soon" until configured.
  if (!wipayReady()) {
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        message:
          "Online card payment is launching shortly — message us on WhatsApp and we'll send you a secure payment link.",
      },
      { status: 503 },
    );
  }

  const env = wipayEnvironment();
  const orderId = newOrderId();
  const customerName = String(body.name ?? "").trim();
  const customerEmail = String(body.email ?? "").trim();
  const token = signContext({
    slug, pkg: pkgId, amount: pkg.amount, env, order: orderId,
    customerName: customerName || undefined,
    customerEmail: customerEmail || undefined,
  });
  const responseUrl = `${siteOrigin(req)}/api/pay/${token}`;

  const wipay = await wipayRequestPayment({
    orderId,
    total: pkg.amount,
    responseUrl,
    environment: env,
    feeStructure: wipayFeeStructure(),
    customerName,
    customerEmail,
  });

  if (!wipay.ok) {
    return NextResponse.json(
      { ok: false, error: wipay.error, message: "Card checkout is temporarily unavailable. Please reach us on WhatsApp to pay." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, url: wipay.url, env });
}
