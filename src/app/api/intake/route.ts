import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function databaseConfig() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export async function GET() {
  const { supabaseUrl, supabaseServiceRoleKey } = databaseConfig();

  return NextResponse.json({
    databaseConnected: Boolean(supabaseUrl && supabaseServiceRoleKey),
    pipelineTable: "project_intake_submissions",
  });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as IntakePayload;

  if (!payload.name || !payload.email || !payload.whatsapp || !payload.projectDescription) {
    return NextResponse.json({ error: "Name, email, WhatsApp number, and project description are required." }, { status: 400 });
  }

  const { supabaseUrl, supabaseServiceRoleKey } = databaseConfig();

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      {
        error:
          "The project intake database is not connected yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel, then redeploy.",
      },
      { status: 503 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { error } = await supabase.from("project_intake_submissions").insert({
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
    references: payload.references,
    project_description: payload.projectDescription,
    quality_control_notes: payload.qualityControlNotes,
    pipeline_stage: "new_lead",
    lead_status: "needs_review",
    lead_source: "website_intake_form",
    source: "website",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Project inquiry received. J Supreme Tech will follow up shortly." });
}
