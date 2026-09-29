-- Run once in Supabase Dashboard > SQL Editor.

begin;

alter table public.team_members
add column if not exists title_eng text;

update public.team_members
set title_eng = case title
  when 'Direktorica' then 'Managing Director'
  when 'COO – operativni direktor' then 'COO – Chief Operating Officer'
  when 'COO - operativni direktor' then 'COO – Chief Operating Officer'
  when 'Voditelj nabave' then 'Head of Procurement'
  else title_eng
end
where nullif(trim(title_eng), '') is null
  and title in (
    'Direktorica',
    'COO – operativni direktor',
    'COO - operativni direktor',
    'Voditelj nabave'
  );

notify pgrst, 'reload schema';

commit;
