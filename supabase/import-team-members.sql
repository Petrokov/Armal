-- Seed existing team members from hardcoded TeamSection.jsx
-- Run after schema.sql in Supabase SQL Editor.
-- Safe to re-run: skips insert if team_members already has rows.

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
