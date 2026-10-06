-- Contact requests sent from the landing form (spec 001, R8).
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 160),
  phone text not null check (char_length(phone) between 7 and 30),
  company text not null default '' check (char_length(company) <= 160),
  role text not null default '' check (char_length(role) <= 120),
  need text not null default '' check (char_length(need) <= 2000),
  locale text not null default 'es' check (locale in ('es', 'en')),
  source text not null default 'landing'
);

comment on table public.contact_requests is 'Leads from operanta.com.co. Written only by the server with the secret key.';

create index if not exists contact_requests_created_at_idx on public.contact_requests (created_at desc);

-- RLS on with no policies: anon and authenticated roles cannot read or write.
-- The service role bypasses RLS, so only the Nitro endpoint can insert.
alter table public.contact_requests enable row level security;
