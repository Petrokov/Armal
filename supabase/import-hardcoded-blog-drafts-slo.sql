-- Import hardcoded Armal SLO blog posts into Supabase CMS as drafts.
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
    'slo',
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
    'slo',
    'Moderne tuš kabine: Trendi in inovacije 2025',
    'moderne-tus-kabine-trendi-in-inovacije-2025',
    'Raziščite najnovejše trende v dizajnu tuš kabin in kako ustvariti luksuzno izkušnjo kopanja v vašem domu.',
    '',
    null,
    'draft',
    null,
    'Moderne tuš kabine: Trendi in inovacije 2025',
    'Raziščite najnovejše trende v dizajnu tuš kabin in kako ustvariti luksuzno izkušnjo kopanja v vašem domu.'
  ),
  (
    'slo',
    'Energetska učinkovitost v kopalnici: Praktični nasveti',
    'energetska-ucinkovitost-v-kopalnici-prakticni-nasveti',
    'Izvedite, kako zmanjšati porabo vode in energije v vaši kopalnici ob ohranjanju visoke ravni udobja.',
    '',
    null,
    'draft',
    null,
    'Energetska učinkovitost v kopalnici: Praktični nasveti',
    'Izvedite, kako zmanjšati porabo vode in energije v vaši kopalnici ob ohranjanju visoke ravni udobja.'
  ),
  (
    'slo',
    'Minimalistični dizajn kopalnice: Vodnik za začetnike',
    'minimalisticni-dizajn-kopalnice-vodnik-za-zacetnike',
    'Kako ustvariti čist in funkcionalen prostor, ki diši z eleganco in preprostostjo.',
    '',
    null,
    'draft',
    null,
    'Minimalistični dizajn kopalnice: Vodnik za začetnike',
    'Kako ustvariti čist in funkcionalen prostor, ki diši z eleganco in preprostostjo.'
  ),
  (
    'slo',
    'Vzdrževanje in čiščenje kopalnice: Najboljše prakse',
    'vzdrzevanje-in-ciscenje-kopalnice-najboljse-prakse',
    'Praktični nasveti za vzdrževanje vaše kopalnice v brezhibnem stanju in podaljšanje življenjske dobe opreme.',
    '',
    null,
    'draft',
    null,
    'Vzdrževanje in čiščenje kopalnice: Najboljše prakse',
    'Praktični nasveti za vzdrževanje vaše kopalnice v brezhibnem stanju in podaljšanje življenjske dobe opreme.'
  ),
  (
    'slo',
    'Dostopna prenova kopalnice: Korak za korakom',
    'dostopna-prenova-kopalnice-korak-za-korakom',
    'Kako prenoviti kopalnico z omejenim proračunom brez kompromisov v kakovosti in funkcionalnosti.',
    '',
    null,
    'draft',
    null,
    'Dostopna prenova kopalnice: Korak za korakom',
    'Kako prenoviti kopalnico z omejenim proračunom brez kompromisov v kakovosti in funkcionalnosti.'
  )
on conflict (locale, slug) do nothing;
