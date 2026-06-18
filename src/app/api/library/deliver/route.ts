import { ORDERS_TABLE, ordersAdmin, sendDeliveryEmail, verifyDeliver, formatUSD } from "@/lib/library-orders";

export const runtime = "nodejs";

function page(title: string, message: string, ok = true): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;color:#141414;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
.card{max-width:440px;background:#fff;border:1px solid #e6e6e6;border-radius:18px;padding:36px;text-align:center}
.badge{width:56px;height:56px;border-radius:14px;background:${ok ? "#141414" : "#fafafa"};color:${ok ? "#fff" : "#737373"};border:1px solid #e6e6e6;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:26px}
h1{font-size:22px;letter-spacing:-0.02em;margin:0 0 8px}p{color:#525252;line-height:1.6;font-size:15px;margin:0}
.mono{font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#a3a3a3;margin-top:22px}</style></head>
<body><div class="card"><div class="badge">${ok ? "✓" : "!"}</div><h1>${title}</h1><p>${message}</p><div class="mono">J Supreme Tech · The Library</div></div></body></html>`;
  return new Response(html, { status: ok ? 200 : 403, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ref = (url.searchParams.get("ref") || "").trim();
  const sig = (url.searchParams.get("sig") || "").trim();

  if (!verifyDeliver(ref, sig)) return page("Invalid link", "This delivery link is invalid or has been tampered with.", false);

  const db = ordersAdmin();
  if (!db) return page("Not connected", "The orders database isn't connected.", false);

  const { data: order } = await db.from(ORDERS_TABLE).select("ref,slug,title,email,amount_cents,status").eq("ref", ref).maybeSingle();
  if (!order) return page("Order not found", `No order matches reference ${ref}.`, false);

  const already = order.status === "delivered";
  if (order.status !== "paid" && order.status !== "delivered") {
    await db.from(ORDERS_TABLE).update({ status: "delivered", paid_at: new Date().toISOString() }).eq("ref", ref);
  } else if (order.status === "paid") {
    await db.from(ORDERS_TABLE).update({ status: "delivered" }).eq("ref", ref);
  }

  const sent = await sendDeliveryEmail({ ref: order.ref, email: order.email, title: order.title, slug: order.slug });
  const amount = formatUSD((order.amount_cents || 0) / 100);

  if (!sent.sent) {
    return page(
      "Marked paid — email pending",
      `Order ${ref} (${order.title}, ${amount}) is marked delivered, but the download email to ${order.email} couldn't send (check Resend config). Re-open this link to retry.`,
      false,
    );
  }

  return page(
    already ? "Download re-sent ✓" : "Delivered ✓",
    `Order ${ref} (${order.title}, ${amount}) is confirmed and the secure download link is on its way to ${order.email}.`,
  );
}
