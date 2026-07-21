import { NextRequest, NextResponse } from "next/server";
import { resend, admin as sbAdmin } from "@/lib/newsletter";

export const runtime = "nodejs";

const FROM = process.env.NEWSLETTER_FROM_EMAIL ?? "J Supreme Tech <hello@jsupremetech.online>";
const ADMIN_EMAIL = process.env.LIBRARY_ADMIN_EMAIL ?? "global.jsuprememarketing@gmail.com";

export async function POST(req: NextRequest) {
  let body: { trialId?: string; email?: string; firstName?: string; company?: string; productSlugs?: string[] };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const { trialId, email, firstName, company, productSlugs } = body;

  const r = resend();
  if (r && email) {
    const products = (productSlugs ?? []).join(", ") || "—";
    await Promise.allSettled([
      // Notify Jordan
      r.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `Trial upgrade intent — ${company ?? email}`,
        html: `<p><strong>Trial ID:</strong> ${trialId ?? "—"}</p>
               <p><strong>Name:</strong> ${firstName ?? "—"}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Company:</strong> ${company ?? "—"}</p>
               <p><strong>Products:</strong> ${products}</p>
               <p>They clicked the upgrade button from the trial dashboard. Follow up to close.</p>`,
      }),
      // Confirm to user
      r.emails.send({
        from: FROM,
        to: email,
        subject: "We'll get you set up — J Supreme Tech",
        html: `<p>Hi ${firstName ?? "there"},</p>
               <p>Thanks for your interest in upgrading your Supreme Suite trial. Jordan will reach out shortly to get you set up on a paid plan.</p>
               <p>In a hurry? WhatsApp directly: <a href="https://wa.me/16582182282">658-218-2282</a></p>
               <p>— J Supreme Tech</p>`,
      }),
    ]);
  }

  return NextResponse.json({ ok: true });
}
