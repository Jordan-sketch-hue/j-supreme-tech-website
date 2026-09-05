import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type IntakePayload = {
  name?: unknown;
  businessName?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  serviceNeeded?: unknown;
  budgetRange?: unknown;
  projectStage?: unknown;
  timeline?: unknown;
  sopCategory?: unknown;
  discoveryRequirements?: unknown;
  integrations?: unknown;
  goalsAudience?: unknown;
  references?: unknown;
  projectDescription?: unknown;
  qualityControlNotes?: unknown;
};

export async function GET() {
  return NextResponse.json({ status: "ok", table: "jst_intake_submissions" });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as IntakePayload;

  if (!payload.name || !payload.email || !payload.whatsapp || !payload.projectDescription) {
    return NextResponse.json(
      { error: "Name, email, WhatsApp number, and project description are required." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.JST_SUPABASE_URL;
  const supabaseKey = process.env.JST_SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  // 1. Save to ibtadbwtrxglujkzqofs (primary shared DB) — this is the lead
  // record of truth. Email below is a notification convenience for Jordan;
  // its failure must never tell the client their inquiry didn't go through
  // when it's already sitting in the database.
  let savedToDb = false;
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await supabase.from("jst_intake_submissions").insert({
      name: payload.name,
      business_name: payload.businessName,
      email: payload.email,
      whatsapp: payload.whatsapp,
      service_needed: payload.serviceNeeded,
      budget_range: payload.budgetRange,
      project_stage: payload.projectStage,
      timeline: payload.timeline,
      sop_category: payload.sopCategory,
      discovery_requirements: payload.discoveryRequirements,
      integrations: payload.integrations,
      goals_audience: payload.goalsAudience,
      project_references: payload.references,
      project_description: payload.projectDescription,
      quality_control_notes: payload.qualityControlNotes,
    });
    if (dbError) {
      console.error("[intake] db insert failed:", dbError.message);
    } else {
      savedToDb = true;
    }
  }

  // 2. Email both addresses via Resend — best-effort notification
  if (!resendKey) {
    if (savedToDb) {
      return NextResponse.json({
        message: "Project inquiry received. J Supreme Tech will follow up shortly.",
      });
    }
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const discovery = Array.isArray(payload.discoveryRequirements)
    ? (payload.discoveryRequirements as string[]).join(", ")
    : String(payload.discoveryRequirements ?? "—");
  const integrations = Array.isArray(payload.integrations)
    ? (payload.integrations as string[]).join(", ")
    : String(payload.integrations ?? "—");

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: "J Supreme Tech Intake <hello@jsupremeconglomerate.online>",
    to: ["jordanmorrisr@gmail.com", "global.jsuprememarketing@gmail.com"],
    subject: `New Lead: ${payload.name} — ${payload.serviceNeeded ?? "Inquiry"}`,
    html: `
<div style="font-family:monospace;max-width:640px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px">
  <div style="border-bottom:1px solid #222;padding-bottom:16px;margin-bottom:24px">
    <p style="margin:0;font-size:10px;letter-spacing:0.2em;color:#666;text-transform:uppercase">J Supreme Tech</p>
    <h1 style="margin:8px 0 0;font-size:20px;font-weight:700">New Project Inquiry</h1>
  </div>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:6px 0;color:#888;font-size:11px;width:160px">Name</td><td style="padding:6px 0;font-size:13px">${payload.name}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">Business</td><td style="padding:6px 0;font-size:13px">${payload.businessName ?? "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">Email</td><td style="padding:6px 0;font-size:13px">${payload.email}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">WhatsApp</td><td style="padding:6px 0;font-size:13px">${payload.whatsapp}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">Service</td><td style="padding:6px 0;font-size:13px">${payload.serviceNeeded ?? "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">Budget</td><td style="padding:6px 0;font-size:13px">${payload.budgetRange ?? "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">Stage</td><td style="padding:6px 0;font-size:13px">${payload.projectStage ?? "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">Timeline</td><td style="padding:6px 0;font-size:13px">${payload.timeline ?? "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#888;font-size:11px">SOP Category</td><td style="padding:6px 0;font-size:13px">${payload.sopCategory ?? "—"}</td></tr>
  </table>
  <div style="margin-top:20px;padding:16px;background:#111;border-radius:8px">
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;color:#666;text-transform:uppercase">Goals & Audience</p>
    <p style="margin:0;font-size:13px;line-height:1.6">${payload.goalsAudience ?? "—"}</p>
  </div>
  <div style="margin-top:12px;padding:16px;background:#111;border-radius:8px">
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;color:#666;text-transform:uppercase">Project Description</p>
    <p style="margin:0;font-size:13px;line-height:1.6">${payload.projectDescription}</p>
  </div>
  ${payload.references ? `<div style="margin-top:12px;padding:16px;background:#111;border-radius:8px"><p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;color:#666;text-transform:uppercase">References</p><p style="margin:0;font-size:13px;line-height:1.6">${payload.references}</p></div>` : ""}
  ${discovery !== "—" ? `<div style="margin-top:12px;padding:16px;background:#111;border-radius:8px"><p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;color:#666;text-transform:uppercase">Discovery Requirements</p><p style="margin:0;font-size:13px;line-height:1.6">${discovery}</p></div>` : ""}
  ${integrations !== "—" ? `<div style="margin-top:12px;padding:16px;background:#111;border-radius:8px"><p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;color:#666;text-transform:uppercase">Integrations Needed</p><p style="margin:0;font-size:13px;line-height:1.6">${integrations}</p></div>` : ""}
  ${payload.qualityControlNotes ? `<div style="margin-top:12px;padding:16px;background:#111;border-radius:8px"><p style="margin:0 0 6px;font-size:10px;letter-spacing:0.15em;color:#666;text-transform:uppercase">Quality Control Notes</p><p style="margin:0;font-size:13px;line-height:1.6">${payload.qualityControlNotes}</p></div>` : ""}
  <p style="margin-top:24px;font-size:10px;color:#444;text-transform:uppercase;letter-spacing:0.15em">J Supreme Tech · jsupremetech.online · (658) 218-2282</p>
</div>`,
  });

  if (error) {
    console.error("[intake] resend send failed:", JSON.stringify(error));
    if (savedToDb) {
      return NextResponse.json({
        message: "Project inquiry received. J Supreme Tech will follow up shortly.",
      });
    }
    return NextResponse.json({ error: "Failed to send inquiry. Contact us at (658) 218-2282." }, { status: 500 });
  }

  return NextResponse.json({
    message: "Project inquiry received. J Supreme Tech will follow up shortly.",
  });
}
