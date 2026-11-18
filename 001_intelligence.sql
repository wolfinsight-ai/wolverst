begin;
create table public.policies (id uuid primary key default gen_random_uuid(), title text not null, summary text, description text, source text, sector text, date date not null, source_url text);
create table public.diffs (id uuid primary key default gen_random_uuid(), title text not null, summary text, changes jsonb not null default '[]', sector text, date date not null);
create table public.portals (id uuid primary key default gen_random_uuid(), name text not null, description text, status text not null default 'Inactive', url text);
create table public.memos (id uuid primary key default gen_random_uuid(), title text not null, content text not null, date date not null);
-- These tables contain only published, publicly readable intelligence; ingestion must use a trusted writer.
do $$ declare t text; begin foreach t in array array['policies','diffs','portals','memos'] loop
 execute format('alter table public.%I enable row level security', t);
 execute format('revoke all on public.%I from public, anon, authenticated',t);
 execute format('grant select on public.%I to anon, authenticated',t);
 execute format('create policy read_published on public.%I for select to anon, authenticated using (true)',t);
end loop; end $$;
create index on public.policies(date desc);
commit;
