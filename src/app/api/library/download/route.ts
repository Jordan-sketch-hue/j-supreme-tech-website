import fs from "node:fs";
import path from "node:path";
import { ordersAdmin, verifyDownloadToken } from "@/lib/library-orders";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const payload = verifyDownloadToken(token);
  if (!payload) return new Response("This download link is invalid or has expired.", { status: 403 });

  const { ref, slug } = payload;

  // Defense in depth: the token is signed, but also confirm the order is still good.
  const sql = ordersAdmin();
  if (sql) {
    const [order] = (await sql`SELECT status,slug FROM jst_ebook_orders WHERE ref = ${ref}`) as unknown as { status: string; slug: string }[];
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
  if (sql) {
    sql`UPDATE jst_ebook_orders SET status = 'delivered', last_download_at = ${new Date().toISOString()} WHERE ref = ${ref}`.catch(() => {});
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