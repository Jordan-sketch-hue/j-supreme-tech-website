import { NextRequest, NextResponse } from "next/server";
import { getOffer, getPackage } from "@/lib/serviceOffers";
import { parseWipayResponse, verifyContext, wipayVerifyHash } from "@/lib/wipay";
import { provisionTenant } from "@/lib/provision";

export const runtime = "nodejs";

/**
 * WiPay redirects the customer here after the hosted page. The compact signed
 * token in the path carries the order context (amount/service/env); WiPay's
 * result is in the query. We verify our HMAC, then WiPay's hash, then route to
 * /start. For supreme-suite purchases, we auto-provision the workspace first.
 */
export async function GET(req: NextRequest, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const back = (qs: string) => NextResponse.redirect(new URL(`/start?${qs}`, req.url), 303);

  const context = verifyContext(token);
  if (!context) {
    console.error("[wipay] response with invalid/forged token");
    return back("pay=error");
  }

  const p = parseWipayResponse(req.nextUrl.searchParams);
  const offer = getOffer(context.slug);
  const pkg = getPackage(context.slug, context.pkg);
  const svcQuery = `service=${encodeURIComponent(context.slug)}&pkg=${encodeURIComponent(context.pkg)}`;

  if (p.status !== "success") {
    return back(`pay=failed&${svcQuery}`);
  }

  // Verify the cryptographic hash against the amount WE signed — can't be forged.
  const verified = wipayVerifyHash({
    transactionId: p.transactionId,
    originalTotal: context.amount,
    hash: p.hash,
    environment: context.env,
  });

  if (!verified) {
    console.error(`[wipay] HASH MISMATCH order=${context.order} tx=${p.transactionId}`);
    return back(`pay=unverified&ref=${encodeURIComponent(p.transactionId)}&${svcQuery}`);
  }

  const plan = pkg && offer ? pkg.name : "";

  // Auto-provision a live Supreme Suite workspace immediately on verified payment.
  if (context.slug === "supreme-suite" && pkg) {
    try {
      // Customer info is carried in the signed context token (not WiPay's response).
      const customerName = context.customerName ?? "New Customer";
      const customerEmail = context.customerEmail ?? "";
      const customerPhone = undefined; // phone isn't in the WiPay flow currently

      const result = await provisionTenant({
        orderId: context.order,
        transactionId: p.transactionId,
        serviceSlug: context.slug,
        packageId: context.pkg,
        planName: pkg.name,
        amountJmd: context.amount,
        customerName,
        customerEmail,
        customerPhone,
        paymentEnv: context.env,
      });

      return back(
        `pay=provisioned` +
          `&ref=${encodeURIComponent(context.order)}` +
          `&${svcQuery}` +
          `&plan=${encodeURIComponent(plan)}` +
          `&ws=${encodeURIComponent(result.slug)}`,
      );
    } catch (e: any) {
      // Provisioning failed — still show success but flag for manual follow-up.
      console.error("[provision] FAILED for order", context.order, ":", e.message);
      return back(
        `pay=success&provision=failed` +
          `&ref=${encodeURIComponent(context.order)}` +
          `&${svcQuery}` +
          `&plan=${encodeURIComponent(plan)}`,
      );
    }
  }

  return back(`pay=success&ref=${encodeURIComponent(context.order)}&${svcQuery}&plan=${encodeURIComponent(plan)}`);
}
