import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import crypto from "crypto";

interface TrialRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
  productSlugs: string[];
  useCases?: Record<string, string>;
  agreeToTerms: boolean;
}

function validate(body: TrialRequestBody) {
  const errors: { field: string; message: string }[] = [];
  if (!body.firstName?.trim()) errors.push({ field: "firstName", message: "First name required" });
  if (!body.lastName?.trim()) errors.push({ field: "lastName", message: "Last name required" });
  if (!body.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push({ field: "email", message: "Valid email required" });
  if (!body.company?.trim()) errors.push({ field: "company", message: "Company required" });
  if (!body.industry) errors.push({ field: "industry", message: "Industry required" });
  if (!Array.isArray(body.productSlugs) || !body.productSlugs.length) errors.push({ field: "products", message: "At least one product required" });
  if (!body.agreeToTerms) errors.push({ field: "terms", message: "Terms agreement required" });
  return errors;
}

function supabase() {
  const url = process.env.JST_SUPABASE_URL;
  const key = process.env.JST_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  const body: TrialRequestBody = await request.json();

  const errors = validate(body);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const trialId = `trial_${Date.now()}_${crypto.randomBytes(8).toString("hex")}`;
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  // Save to DB
  const db = supabase();
  if (db) {
    // Log analytics event alongside the trial record (fire-and-forget)
    void db.from("jst_analytics_events").insert({
      event: "trial_signup",
      page: "/free-trial",
      props: { products: body.productSlugs, industry: body.industry, company: body.company },
    });

    await db.from("jst_trial_requests").insert({
      id: trialId,
      email: body.email,
      first_name: body.firstName,
      last_name: body.lastName,
      company: body.company,
      industry: body.industry,
      product_slugs: body.productSlugs,
      use_cases: body.useCases ?? {},
      status: "active",
      expires_at: expiresAt.toISOString(),
      agreed_to_terms: body.agreeToTerms,
    });
  }

  // Email notification
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.NEWSLETTER_FROM_EMAIL ?? "J Supreme Tech <hello@jsupremetech.online>";
    const products = body.productSlugs.join(", ");

    await Promise.allSettled([
      resend.emails.send({
        from,
        to: ["jordanmorrisr@gmail.com", "global.jsuprememarketing@gmail.com"],
        replyTo: body.email,
        subject: `New Trial: ${body.firstName} ${body.lastName} — ${body.company}`,
        html: `
<div style="font-family:monospace;max-width:600px;background:#0a0a0a;color:#fff;padding:28px;border-radius:12px">
  <p style="margin:0 0 4px;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.2em">Supreme Suite</p>
  <h2 style="margin:0 0 20px;font-size:18px">New 14-Day Trial Started</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:5px 0;color:#888;font-size:11px;width:140px">Name</td><td style="padding:5px 0;font-size:13px">${body.firstName} ${body.lastName}</td></tr>
    <tr><td style="padding:5px 0;color:#888;font-size:11px">Email</td><td style="padding:5px 0;font-size:13px">${body.email}</td></tr>
    <tr><td style="padding:5px 0;color:#888;font-size:11px">Company</td><td style="padding:5px 0;font-size:13px">${body.company}</td></tr>
    <tr><td style="padding:5px 0;color:#888;font-size:11px">Industry</td><td style="padding:5px 0;font-size:13px">${body.industry}</td></tr>
    <tr><td style="padding:5px 0;color:#888;font-size:11px">Products</td><td style="padding:5px 0;font-size:13px">${products}</td></tr>
    <tr><td style="padding:5px 0;color:#888;font-size:11px">Trial ID</td><td style="padding:5px 0;font-size:11px;color:#555">${trialId}</td></tr>
    <tr><td style="padding:5px 0;color:#888;font-size:11px">Expires</td><td style="padding:5px 0;font-size:13px">${expiresAt.toDateString()}</td></tr>
  </table>
</div>`,
      }),
      resend.emails.send({
        from,
        to: body.email,
        subject: "Your Supreme Suite trial is active — J Supreme Tech",
        html: `
<div style="font-family:monospace;max-width:600px;background:#0a0a0a;color:#fff;padding:28px;border-radius:12px">
  <p style="margin:0 0 4px;font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.2em">J Supreme Tech</p>
  <h2 style="margin:0 0 16px;font-size:18px">Hi ${body.firstName}, your trial is live.</h2>
  <p style="font-size:13px;line-height:1.7;color:#ccc">You have 14 days to explore <strong style="color:#fff">${products}</strong>. Jordan will reach out personally to walk you through the system.</p>
  <p style="margin-top:16px;font-size:13px;line-height:1.7;color:#ccc">Need help sooner? WhatsApp: <a href="https://wa.me/16582182282" style="color:#fff">(658) 218-2282</a></p>
  <p style="margin-top:20px;font-size:10px;color:#444;text-transform:uppercase;letter-spacing:0.15em">J Supreme Tech · jsupremetech.online</p>
</div>`,
      }),
    ]);
  }

  return NextResponse.json(
    { success: true, trialId, email: body.email, expiresAt },
    { status: 201 },
  );
}

export async function GET(request: NextRequest) {
  const db = supabase();
  if (!db) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const trialId = request.nextUrl.searchParams.get("trialId");
  const email = request.nextUrl.searchParams.get("email");

  if (trialId) {
    const { data } = await db.from("jst_trial_requests").select("*").eq("id", trialId).maybeSingle();
    if (!data) return NextResponse.json({ error: "Trial not found" }, { status: 404 });
    return NextResponse.json(data);
  }

  if (email) {
    const { data } = await db.from("jst_trial_requests").select("*").eq("email", email);
    return NextResponse.json(data ?? []);
  }

  return NextResponse.json({ error: "Provide trialId or email" }, { status: 400 });
}
