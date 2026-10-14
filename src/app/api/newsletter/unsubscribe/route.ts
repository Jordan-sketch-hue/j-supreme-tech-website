import { NextResponse } from "next/server";
import { admin } from "@/lib/newsletter";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const site = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";
  if (!token) return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=invalid`);

  const sql = admin();
  if (!sql) return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=error`);

  const [row] = (await sql`
    SELECT id FROM jst_subscribers
    WHERE unsubscribe_token = ${token}
    LIMIT 1
  `) as unknown as { id: string }[];
  if (!row) return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=invalid`);

  await sql`
    UPDATE jst_subscribers
    SET status = 'unsubscribed', unsubscribed_at = NOW()
    WHERE unsubscribe_token = ${token}
  `;

  return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=ok`);
}