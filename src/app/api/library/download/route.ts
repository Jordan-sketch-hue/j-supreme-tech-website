import fs from "node:fs";
import path from "node:path";
import { ORDERS_TABLE, ordersAdmin, verifyDownloadToken } from "@/lib/library-orders";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const payload = verifyDownloadToken(token);
  if (!payload) return new Response("This download link is invalid or has expired.", { status: 403 });

  const { ref, slug } = payload;

  // Defense in depth: the token is signed, but also confirm the order is still good.
  const db = ordersAdmin();
  if (db) {
    const { data: order } = await db.from(ORDERS_TABLE).select("status,slug").eq("ref", ref).maybeSingle();
    if (!order || order.slug !== slug || (order.status !== "paid" && order.status !== "delivered")) {
      return new Response("This download is no longer available.", { status: 403 });
    }
  }

  const file = path.join(process.cwd(), "private", "library", `${slug}.pdf`);
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return new Response("That file could not be found. Please contact us.", { status: 404 });
  }

  // Fire-and-forget: count the download.
  if (db) {
    db.from(ORDERS_TABLE)
      .update({ status: "delivered", last_download_at: new Date().toISOString() })
      .eq("ref", ref)
      .then(() => {}, () => {});
  }

  return new Response(new Uint8Array(buf), {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${slug}.pdf"`,
      "content-length": String(buf.length),
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex",
    },
  });
}
