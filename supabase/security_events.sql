create table if not exists public.security_events (
  id uuid primary key default gen_random_uuid(),
  project text not null,
  url text not null,
  event_type text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  message text not null,
  ip_hash text not null,
  user_agent text,
  encrypted_payload text not null,
  created_at timestamptz not null default now()
);

create index if not exists security_events_created_at_idx on public.security_events (created_at desc);
create index if not exists security_events_project_idx on public.security_events (project);
create index if not exists security_events_severity_idx on public.security_events (severity);

create table if not exists public.visitor_events (
  id uuid primary key default gen_random_uuid(),
  project text not null,
  path text not null,
  referrer text,
  ip_hash text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists visitor_events_created_at_idx on public.visitor_events (created_at desc);
create index if not exists visitor_events_project_idx on public.visitor_events (project);
