import { NextResponse } from "next/server";
import { admin, sendWelcomeEmail, TABLE } from "@/lib/newsletter";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const site = process.env.NEXT_PUBLIC_APP_URL || "https://jsupremetech.online";
  if (!token) return NextResponse.redirect(`${site}/newsletter/confirmed?status=invalid`);

  const db = admin();
  if (!db) return NextResponse.redirect(`${site}/newsletter/confirmed?status=error`);

  const { data: sub } = await db.from(TABLE).select("email,status,unsubscribe_token").eq("confirm_token", token).maybeSingle();
  if (!sub) return NextResponse.redirect(`${site}/newsletter/confirmed?status=invalid`);

  if (sub.status !== "confirmed") {
    await db
      .from(TABLE)
      .update({ status: "confirmed", confirmed_at: new Date().toISOString(), confirm_token: null })
      .eq("confirm_token", token);
    await sendWelcomeEmail(sub.email, sub.unsubscribe_token);
  }

  return NextResponse.redirect(`${site}/newsletter/confirmed?status=ok`);
}
