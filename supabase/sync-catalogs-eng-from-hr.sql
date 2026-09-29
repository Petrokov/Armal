-- Creates or updates English catalogue records from the matching HR catalogues.
-- PDF files, cover images, file sizes, years, status, publish dates and authors are reused.
--
-- Run supabase/add-english-locale.sql before this script.
-- Run this in Supabase Dashboard > SQL Editor.

begin;

with translations(slug, title, subtitle, seo_title, seo_description) as (
  values
    (
      'armal-walk-in-katalog-2026',
      'Armal shower enclosures and walk-in catalogue 2026',
      'Browse the new Armal walk-in catalogue featuring shower screens for contemporary bathrooms, practical installation and safe everyday use.',
      'Armal shower enclosures and walk-in catalogue 2026',
      'Browse the new Armal walk-in catalogue featuring shower screens for contemporary bathrooms, practical installation and safe everyday use.'
    ),
    (
      'armal-kupaonski-namjestaj-katalog-2026',
      'Armal bathroom furniture catalogue 2026',
      'Browse the Armal bathroom furniture catalogue featuring practical, elegant and functional solutions for contemporary bathrooms.',
      'Armal bathroom furniture catalogue 2026',
      'Browse the Armal bathroom furniture catalogue featuring practical, elegant and functional solutions for contemporary bathrooms.'
    ),
    (
      'armal-usponski-tusevi-katalog-2024',
      'Armal shower systems catalogue 2024',
      'Browse the Armal shower systems catalogue featuring practical solutions for comfortable showering, robust construction and easy installation.',
      'Armal shower systems catalogue 2024',
      'Browse the Armal shower systems catalogue featuring practical solutions for comfortable showering, robust construction and easy installation.'
    ),
    (
      'armal-sanitarije-katalog-2025',
      'Armal sanitary ware catalogue 2025',
      'Browse the Armal sanitary ware catalogue featuring reliable bathroom solutions, easy maintenance and safe everyday use.',
      'Armal sanitary ware catalogue 2025',
      'Browse the Armal sanitary ware catalogue featuring reliable bathroom solutions, easy maintenance and safe everyday use.'
    ),
    (
      'armal-slavine-katalog-2024',
      'Armal faucets catalogue 2024',
      'Browse the Armal faucets catalogue featuring reliable solutions for bathrooms and kitchens, contemporary design and practical everyday use.',
      'Armal faucets catalogue 2024',
      'Browse the Armal faucets catalogue featuring reliable solutions for bathrooms and kitchens, contemporary design and practical everyday use.'
    )
),
source_rows as (
  select
    'eng'::text as locale,
    translations.title,
    hr.slug,
    translations.subtitle,
    hr.cover_image_url,
    hr.pdf_url,
    hr.file_size,
    hr.year,
    hr.sort_order,
    hr.status,
    hr.published_at,
    translations.seo_title,
    translations.seo_description,
    hr.author_id
  from translations
  join public.catalogs hr
    on hr.locale = 'hr'
   and hr.slug = translations.slug
)
insert into public.catalogs (
  locale,
  title,
  slug,
  subtitle,
  cover_image_url,
  pdf_url,
  file_size,
  year,
  sort_order,
  status,
  published_at,
  seo_title,
  seo_description,
  author_id
)
select
  locale,
  title,
  slug,
  subtitle,
  cover_image_url,
  pdf_url,
  file_size,
  year,
  sort_order,
  status,
  published_at,
  seo_title,
  seo_description,
  author_id
from source_rows
on conflict (locale, slug) do update
set title = excluded.title,
    subtitle = excluded.subtitle,
    cover_image_url = excluded.cover_image_url,
    pdf_url = excluded.pdf_url,
    file_size = excluded.file_size,
    year = excluded.year,
    sort_order = excluded.sort_order,
    status = excluded.status,
    published_at = excluded.published_at,
    seo_title = excluded.seo_title,
    seo_description = excluded.seo_description,
    author_id = excluded.author_id,
    updated_at = now();

commit;

notify pgrst, 'reload schema';
