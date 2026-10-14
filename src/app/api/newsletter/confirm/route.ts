import { NextResponse } from "next/server";
import { admin, sendWelcomeEmail } from "@/lib/newsletter";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const site = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";
  if (!token) return NextResponse.redirect(`${site}/newsletter/confirmed?status=invalid`);

  const sql = admin();
  if (!sql) return NextResponse.redirect(`${site}/newsletter/confirmed?status=error`);

  type SubRow = { email: string; status: string; unsubscribe_token: string };
  const [sub] = (await sql`
    SELECT email, status, unsubscribe_token FROM jst_subscribers
    WHERE confirm_token = ${token}
    LIMIT 1
  `) as unknown as SubRow[];
  if (!sub) return NextResponse.redirect(`${site}/newsletter/confirmed?status=invalid`);

  if (sub.status !== "confirmed") {
    await sql`
      UPDATE jst_subscribers
      SET status = 'confirmed', confirmed_at = NOW(), confirm_token = NULL
      WHERE confirm_token = ${token}
    `;
    await sendWelcomeEmail(sub.email, sub.unsubscribe_token);
  }

  return NextResponse.redirect(`${site}/newsletter/confirmed?status=ok`);
}