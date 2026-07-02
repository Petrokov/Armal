-- Migrate existing team_members to row-based O nama layout
-- Run once in Supabase SQL Editor after setup-team-members.sql

create table if not exists public.team_rows (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  columns_lg integer not null default 3 check (columns_lg in (3, 4, 5)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members
  add column if not exists row_id uuid references public.team_rows(id) on delete set null;

alter table public.team_members
  add column if not exists position_in_row integer not null default 0;

create index if not exists team_members_row_idx
  on public.team_members (row_id, position_in_row asc);

create index if not exists team_rows_sort_idx
  on public.team_rows (sort_order asc);

alter table public.team_rows enable row level security;

drop policy if exists "Public can read team rows" on public.team_rows;
create policy "Public can read team rows"
  on public.team_rows for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can manage team rows" on public.team_rows;
create policy "Admins can manage team rows"
  on public.team_rows for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

do $$
declare
  row1_id uuid;
  row2_id uuid;
  row3_id uuid;
begin
  if exists (select 1 from public.team_rows limit 1) then
    return;
  end if;

  insert into public.team_rows (sort_order, columns_lg)
  values (1, 3)
  returning id into row1_id;

  insert into public.team_rows (sort_order, columns_lg)
  values (2, 4)
  returning id into row2_id;

  insert into public.team_rows (sort_order, columns_lg)
  values (3, 3)
  returning id into row3_id;

  update public.team_members as tm
  set row_id = row1_id, position_in_row = v.position_in_row, updated_at = now()
  from (values
    ('Simona Zavratnik', 0),
    ('Suzana Mahović', 1),
    ('Marko Hrgetić', 2)
  ) as v(name, position_in_row)
  where tm.name = v.name;

  update public.team_members as tm
  set row_id = row2_id, position_in_row = v.position_in_row, updated_at = now()
  from (values
    ('Aleksandar Franolić', 0),
    ('Miroslav Salopek', 1),
    ('Saša Čačić', 2),
    ('Marko Čović', 3)
  ) as v(name, position_in_row)
  where tm.name = v.name;

  update public.team_members as tm
  set row_id = row3_id, position_in_row = v.position_in_row, updated_at = now()
  from (values
    ('Anja Križanić', 0),
    ('Sandra Miklec', 1),
    ('Natalija Jović', 2),
    ('Marija Pršir', 3),
    ('Morena Sršen', 4),
    ('Mladen Luketić', 5)
  ) as v(name, position_in_row)
  where tm.name = v.name;
end $$;
