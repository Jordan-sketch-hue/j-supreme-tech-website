import { NextResponse } from "next/server";
import { admin, TABLE } from "@/lib/newsletter";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const site = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";
  if (!token) return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=invalid`);

  const db = admin();
  if (!db) return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=error`);

  const { data: sub } = await db.from(TABLE).select("id").eq("unsubscribe_token", token).maybeSingle();
  if (!sub) return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=invalid`);

  await db
    .from(TABLE)
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token);

  return NextResponse.redirect(`${site}/newsletter/unsubscribed?status=ok`);
}
