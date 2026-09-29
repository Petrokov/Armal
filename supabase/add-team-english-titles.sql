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
  when 'Voditelj odjela postprodaje' then 'Head of After-Sales'
  when 'Suradnik u prodaji' then 'Sales Associate'
  when 'Voditelj prodaje' then 'Head of Sales'
  when 'Voditeljica prodaje' then 'Head of Sales'
  when 'Serviser i montažer' then 'Service and Installation Technician'
  when 'Koordinator prodaje za RH' then 'Sales Coordinator for Croatia'
  when 'Terenski komercijalist' then 'Field Sales Representative'
  when 'Export menager' then 'Export Manager'
  when 'Administrator u odjelu prodaje' then 'Sales Department Administrator'
  when 'Referent nabave' then 'Procurement Officer'
  when 'Administrator nabave' then 'Procurement Administrator'
  else title_eng
end
where nullif(trim(title_eng), '') is null
  and title in (
    'Direktorica',
    'COO – operativni direktor',
    'COO - operativni direktor',
    'Voditelj nabave',
    'Voditelj odjela postprodaje',
    'Suradnik u prodaji',
    'Voditelj prodaje',
    'Voditeljica prodaje',
    'Serviser i montažer',
    'Koordinator prodaje za RH',
    'Terenski komercijalist',
    'Export menager',
    'Administrator u odjelu prodaje',
    'Referent nabave',
    'Administrator nabave'
  );

notify pgrst, 'reload schema';

commit;
