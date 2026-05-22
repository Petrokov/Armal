-- Import hardcoded Armal RS blog posts into Supabase CMS as drafts.
-- Run this in Supabase Dashboard > SQL Editor.
-- Nothing becomes public because every row is saved with status = 'draft'.

insert into public.blog_posts (
  locale,
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  status,
  published_at,
  seo_title,
  seo_description
)
values
  (
    'rs',
    'Armal obavijest veleprodajnim kupcima',
    'armal-obavijest-veleprodajnim-kupcima',
    'OBAVIJEST ZA VELEPRODAJNE KUPCE',
    'OBAVIJEST ZA VELEPRODAJNE KUPCE

Poštovani partneri,

uslijed kontinuiranog rasta cijena repromaterijala i energenata primorani smo izvršiti korekciju Armal cjenika.

Svjesni smo izazova koje navedeni porast troškova donosi poslovanju te smo veći dio povećanja nastojali apsorbirati kako bismo zadržali stabilnost cijena za naše kupce. Nažalost, manji dio povećanja troškova primorani smo prenijeti na tržište.Ovim putem najavljujemo porast cijena u prosjeku od 4,5%, koji neće biti linearno primijenjen na sve proizvode.

Novi cjenik bit će vam dostavljen oko 15. travnja 2026. godine.

Zahvaljujemo na razumijevanju i dosadašnjoj suradnji.

Srdačan pozdrav,
Armal d.o.o',
    null,
    'draft',
    null,
    'Armal obavijest veleprodajnim kupcima',
    'OBAVIJEST ZA VELEPRODAJNE KUPCE'
  ),
  (
    'rs',
    'Moderne tuš kabine: Trendovi i inovacije 2025',
    'moderne-tus-kabine-trendovi-i-inovacije-2025',
    'Istražite najnovije trendove u dizajnu tuš kabina i kako stvoriti luksuzno iskustvo kupanja u vašem domu.',
    '',
    null,
    'draft',
    null,
    'Moderne tuš kabine: Trendovi i inovacije 2025',
    'Istražite najnovije trendove u dizajnu tuš kabina i kako stvoriti luksuzno iskustvo kupanja u vašem domu.'
  ),
  (
    'rs',
    'Energetska efikasnost u kupaonici: Praktični saveti',
    'energetska-efikasnost-u-kupaonici-prakticni-saveti',
    'Saznajte kako smanjiti potrošnju vode i energije u vašoj kupaonici uz održavanje visoke razine komfora.',
    '',
    null,
    'draft',
    null,
    'Energetska efikasnost u kupaonici: Praktični saveti',
    'Saznajte kako smanjiti potrošnju vode i energije u vašoj kupaonici uz održavanje visoke razine komfora.'
  ),
  (
    'rs',
    'Minimalistički dizajn kupaonice: Vodič za početnike',
    'minimalisticki-dizajn-kupaonice-vodic-za-pocetnike',
    'Kako stvoriti čist i funkcionalan prostor koji odiše elegancijom i jednostavnošću.',
    '',
    null,
    'draft',
    null,
    'Minimalistički dizajn kupaonice: Vodič za početnike',
    'Kako stvoriti čist i funkcionalan prostor koji odiše elegancijom i jednostavnošću.'
  ),
  (
    'rs',
    'Održavanje i čišćenje kupaonice: Najbolje prakse',
    'odrzavanje-i-ciscenje-kupaonice-najbolje-prakse',
    'Praktični saveti za održavanje vaše kupaonice u besprekornom stanju i produženje veka trajanja opreme.',
    '',
    null,
    'draft',
    null,
    'Održavanje i čišćenje kupaonice: Najbolje prakse',
    'Praktični saveti za održavanje vaše kupaonice u besprekornom stanju i produženje veka trajanja opreme.'
  ),
  (
    'rs',
    'Pristupačna renovacija kupaonice: Korak po korak',
    'pristupacna-renovacija-kupaonice-korak-po-korak',
    'Kako renovirati kupaonicu uz ograničen budžet bez kompromisa u kvalitetu i funkcionalnosti.',
    '',
    null,
    'draft',
    null,
    'Pristupačna renovacija kupaonice: Korak po korak',
    'Kako renovirati kupaonicu uz ograničen budžet bez kompromisa u kvalitetu i funkcionalnosti.'
  )
on conflict (locale, slug) do nothing;
