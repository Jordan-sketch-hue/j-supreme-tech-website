create table if not exists public.project_intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text,
  email text not null,
  whatsapp text not null,
  service_needed text,
  budget_range text,
  project_stage text,
  timeline text,
  sop_category text,
  discovery_requirements jsonb,
  integrations jsonb,
  goals_audience text,
  references text,
  project_description text not null,
  quality_control_notes text,
  pipeline_stage text not null default 'new_lead',
  lead_status text not null default 'needs_review',
  lead_source text not null default 'website_intake_form',
  assigned_to text,
  follow_up_at timestamptz,
  reviewed_at timestamptz,
  internal_notes text,
  source text not null default 'website'
);

create index if not exists project_intake_submissions_pipeline_stage_idx
on public.project_intake_submissions (pipeline_stage);

create index if not exists project_intake_submissions_lead_status_idx
on public.project_intake_submissions (lead_status);

create index if not exists project_intake_submissions_created_at_idx
on public.project_intake_submissions (created_at desc);

alter table public.project_intake_submissions enable row level security;

create policy "Service role can manage intake submissions"
on public.project_intake_submissions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
