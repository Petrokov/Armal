-- Newsletter PDF datoteke
-- Pokreni jednom u Supabase SQL Editoru.
-- PDF-ovi su javno dostupni preko https://www.armal.hr/pdf/<slug>,
-- ali se ne prikazuju nigdje na webu.

create table if not exists public.newsletter_files (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  storage_path text not null,
  file_size bigint,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_files_created_idx
  on public.newsletter_files (created_at desc);

alter table public.newsletter_files enable row level security;

drop policy if exists "Admins can manage newsletter files" on public.newsletter_files;
create policy "Admins can manage newsletter files"
  on public.newsletter_files for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('armal-newsletter', 'armal-newsletter', true, 20971520, array['application/pdf'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read Armal storage" on storage.objects;
create policy "Public can read Armal storage"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('armal-media', 'armal-catalogs', 'armal-newsletter'));

drop policy if exists "Admins can upload Armal storage" on storage.objects;
create policy "Admins can upload Armal storage"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('armal-media', 'armal-catalogs', 'armal-newsletter') and public.is_admin());

drop policy if exists "Admins can update Armal storage" on storage.objects;
create policy "Admins can update Armal storage"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('armal-media', 'armal-catalogs', 'armal-newsletter') and public.is_admin())
  with check (bucket_id in ('armal-media', 'armal-catalogs', 'armal-newsletter') and public.is_admin());

drop policy if exists "Admins can delete Armal storage" on storage.objects;
create policy "Admins can delete Armal storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('armal-media', 'armal-catalogs', 'armal-newsletter') and public.is_admin());
