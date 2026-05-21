-- Armal Supabase CMS setup
-- 1. Create Auth user in Supabase Dashboard > Authentication > Users:
--    tin.lojen@petrokov.hr with your chosen password.
-- 2. Run this SQL in Supabase SQL Editor.
-- 3. Replace the admin email below if needed.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('hr', 'slo', 'rs')),
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  cover_image_url text,
  gallery_image_urls jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug)
);

create table if not exists public.catalogs (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('hr', 'slo', 'rs')),
  title text not null,
  slug text not null,
  subtitle text,
  cover_image_url text,
  pdf_url text,
  file_size text,
  year integer,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug)
);

create index if not exists blog_posts_public_idx
  on public.blog_posts (locale, status, published_at desc);

create index if not exists catalogs_public_idx
  on public.catalogs (locale, status, sort_order asc, published_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

alter table public.admin_users enable row level security;
alter table public.blog_posts enable row level security;
alter table public.catalogs enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
  on public.admin_users for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins can manage blog posts" on public.blog_posts;
create policy "Admins can manage blog posts"
  on public.blog_posts for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read published catalogs" on public.catalogs;
create policy "Public can read published catalogs"
  on public.catalogs for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins can manage catalogs" on public.catalogs;
create policy "Admins can manage catalogs"
  on public.catalogs for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('armal-media', 'armal-media', true),
  ('armal-catalogs', 'armal-catalogs', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read Armal storage" on storage.objects;
create policy "Public can read Armal storage"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('armal-media', 'armal-catalogs'));

drop policy if exists "Admins can upload Armal storage" on storage.objects;
create policy "Admins can upload Armal storage"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('armal-media', 'armal-catalogs') and public.is_admin());

drop policy if exists "Admins can update Armal storage" on storage.objects;
create policy "Admins can update Armal storage"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('armal-media', 'armal-catalogs') and public.is_admin())
  with check (bucket_id in ('armal-media', 'armal-catalogs') and public.is_admin());

drop policy if exists "Admins can delete Armal storage" on storage.objects;
create policy "Admins can delete Armal storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('armal-media', 'armal-catalogs') and public.is_admin());

insert into public.admin_users (user_id, email, role)
select id, email, 'admin'
from auth.users
where email = 'tin.lojen@petrokov.hr'
on conflict (user_id) do update
set email = excluded.email,
    role = 'admin';
