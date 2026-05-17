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
  source text not null default 'website'
);

alter table public.project_intake_submissions enable row level security;

create policy "Service role can manage intake submissions"
on public.project_intake_submissions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
