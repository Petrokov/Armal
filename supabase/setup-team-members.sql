-- Setup team_members table + seed hardcoded employees
-- Run once in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ivwjymibzozjvcticaqm/sql/new

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  image_url text,
  email text,
  linkedin_url text,
  sort_order integer not null default 0,
  show_on_homepage boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_public_idx
  on public.team_members (status, sort_order asc, published_at desc);

alter table public.team_members enable row level security;

drop policy if exists "Public can read published team members" on public.team_members;
create policy "Public can read published team members"
  on public.team_members for select
  to anon, authenticated
  using (status = 'published' and (published_at is null or published_at <= now()));

drop policy if exists "Admins can manage team members" on public.team_members;
create policy "Admins can manage team members"
  on public.team_members for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into public.team_members (
  name,
  title,
  image_url,
  email,
  linkedin_url,
  sort_order,
  show_on_homepage,
  status,
  published_at
)
select *
from (
  values
    ('Simona Zavratnik', 'Direktorica', '/slike_team/simona_zavratnik_2.png', 'simona.zavratnik@armal.hr', '#', 1, true, 'published', now()),
    ('Suzana Mahović', 'COO – operativni direktor', '/slike_team/Suzana-Mahovic-2.webp', 'suzana.mahovic@armal.hr', '#', 2, true, 'published', now()),
    ('Marko Hrgetić', 'Voditelj nabave', '/slike_team/Marko-Hrgetic.webp', 'marko.hrgetic@armal.hr', '#', 3, true, 'published', now()),
    ('Aleksandar Franolić', 'Export menager', '/slike_team/Aleksandar-Franolic.webp', 'aleksandar.franolic@armal.hr', '#', 4, false, 'published', now()),
    ('Miroslav Salopek', 'Terenski komercijalist', '/slike_team/Miro-Salopek.webp', 'miroslav.salopek@armal.hr', '#', 5, false, 'published', now()),
    ('Saša Čačić', 'Terenski komercijalist', '/slike_team/Sasa-Cacic.webp', 'sasa.cacic@armal.hr', '#', 6, false, 'published', now()),
    ('Marko Čović', 'Terenski komercijalist', '/slike_team/Marko-Covic.webp', 'marko.covic@armal.hr', '#', 7, false, 'published', now()),
    ('Anja Križanić', 'Koordinator prodaje za RH', '/slike_team/anonimno.jpg', 'anja.krizanic@armal.hr', '#', 8, false, 'published', now()),
    ('Sandra Miklec', 'Administrator u odjelu prodaje', '/slike_team/Sandra-Miklec.webp', 'sandra.miklec@armal.hr', '#', 9, false, 'published', now()),
    ('Natalija Jović', 'Referent nabave', '/slike_team/Natalija-Jovic.webp', 'natalija.jovic@armal.hr', '#', 10, false, 'published', now()),
    ('Marija Pršir', 'Administrator nabave', '/slike_team/Marija-Prsir.webp', 'marija.prsir@armal.hr', '#', 11, false, 'published', now()),
    ('Morena Sršen', 'Voditelj odjela postprodaje', '/slike_team/Morena-Srsen.webp', 'morena.srsen@armal.hr', '#', 12, false, 'published', now()),
    ('Mladen Luketić', 'Serviser i montažer', '/slike_team/Mladen-Luketic.webp', 'mladen.luketic@armal.hr', '#', 13, false, 'published', now())
) as seed(name, title, image_url, email, linkedin_url, sort_order, show_on_homepage, status, published_at)
where not exists (select 1 from public.team_members limit 1);
