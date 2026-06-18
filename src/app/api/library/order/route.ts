import { NextResponse } from "next/server";
import { getEbook } from "@/lib/ebooks";
import { isEmail, normalizeEmail } from "@/lib/newsletter";
import {
  ORDERS_TABLE,
  bankDetails,
  newOrderRef,
  ordersAdmin,
  sendAdminNotification,
  sendOrderInstructions,
} from "@/lib/library-orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: { slug?: string; email?: string; name?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const slug = String(payload.slug ?? "").replace(/[^a-z0-9-]/gi, "").slice(0, 80);
  const email = normalizeEmail(payload.email ?? "");
  const name = String(payload.name ?? "").trim().slice(0, 120) || null;

  if (!email || !isEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  // Price + title are resolved SERVER-SIDE — the client never sends an amount.
  const book = getEbook(slug);
  if (!book) return NextResponse.json({ error: "That book isn't available." }, { status: 404 });

  const db = ordersAdmin();
  if (!db) {
    return NextResponse.json(
      { error: "Orders aren't connected yet. Message us on WhatsApp and we'll take it from there." },
      { status: 503 },
    );
  }

  const ref = newOrderRef();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

  const { error } = await db.from(ORDERS_TABLE).insert({
    ref,
    slug: book.slug,
    title: book.title,
    email,
    name,
    amount_cents: Math.round(book.price * 100),
    currency: "USD",
    status: "pending",
    ip,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fire both emails (buyer instructions + admin notification). Don't fail the
  // order if mail hiccups — the order is recorded and recoverable.
  await Promise.allSettled([
    sendOrderInstructions({ ref, email, name: name ?? undefined, title: book.title, amount: book.price }),
    sendAdminNotification({ ref, email, name: name ?? undefined, title: book.title, amount: book.price }),
  ]);

  const bd = bankDetails();
  return NextResponse.json({
    ok: true,
    ref,
    title: book.title,
    amount: book.price,
    bank: { configured: bd.configured, rows: bd.rows, whatsapp: bd.whatsapp },
    message: "Order placed — check your email for the bank-transfer details.",
  });
}
