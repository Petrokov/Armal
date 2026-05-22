-- Import hardcoded Armal HR blog posts into Supabase CMS as drafts.
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
    'hr',
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
    'hr',
    'Moderne tuš kabine: Trendovi i inovacije 2025',
    'moderne-tus-kabine-trendovi-i-inovacije-2025',
    'Istražite najnovije trendove u dizajnu tuš kabina i kako stvoriti luksuzno iskustvo kupanja u vašem domu.',
    'Tuš kabine su postale sve popularnije u modernim kupaonicama, nudeći praktičnost i stil u jednom paketu.

Trenutni trendovi u 2025. godini uključuju minimalistički dizajn s čistim linijama, bez okvira kabine koje stvaraju prostraniji dojam. Staklene stijene i vrata postaju standard, omogućavajući više svjetlosti i moderniji izgled.

Inovacije u tehnologiji također mijenjaju način na koji doživljavamo tuširanje. Poboljšani sustavi protoka vode, LED rasvjeta i integrirani zvučnici samo su neki od primjera kako se tuš kabine razvijaju.

Prilikom planiranja nove tuš kabine, važno je razmotriti veličinu prostora, tip vrata (klizna, otvorena, kutna) i materijale koji će se koristiti. Svaki izbor utječe na konačni izgled i funkcionalnost vaše kupaonice.',
    null,
    'draft',
    null,
    'Moderne tuš kabine: Trendovi i inovacije 2025',
    'Istražite najnovije trendove u dizajnu tuš kabina i kako stvoriti luksuzno iskustvo kupanja u vašem domu.'
  ),
  (
    'hr',
    'Energetska učinkovitost u kupaonici: Praktični savjeti',
    'energetska-ucinkovitost-u-kupaonici-prakticni-savjeti',
    'Saznajte kako smanjiti potrošnju vode i energije u vašoj kupaonici uz održavanje visoke razine komfora.',
    'Energetska učinkovitost u kupaonici nije samo dobra za okoliš, već i za vaš novčanik. Postoji nekoliko jednostavnih načina kako možete smanjiti potrošnju bez žrtvovanja komfora.

Zamjena starih slavina novim, vodouštednim modelima može smanjiti potrošnju vode za do 30%. Aeratori i ograničivači protoka su jednostavni dodaci koji mogu napraviti veliku razliku.

Tuš glave s niskim protokom također su odličan izbor. One mogu smanjiti potrošnju vode tijekom tuširanja za gotovo polovicu, a osjećaj kupanja ostaje isti.

Za grijanje vode, razmislite o solarnim sustavima ili toplinskim pumpama. Iako zahtijevaju početnu investiciju, dugoročno mogu značajno smanjiti račune za energiju.',
    null,
    'draft',
    null,
    'Energetska učinkovitost u kupaonici: Praktični savjeti',
    'Saznajte kako smanjiti potrošnju vode i energije u vašoj kupaonici uz održavanje visoke razine komfora.'
  ),
  (
    'hr',
    'Minimalistički dizajn kupaonice: Vodič za početnike',
    'minimalisticki-dizajn-kupaonice-vodic-za-pocetnike',
    'Kako stvoriti čist i funkcionalan prostor koji odiše elegancijom i jednostavnošću.',
    'Minimalistički dizajn kupaonice postaje sve popularniji zbog svoje čistoće, jednostavnosti i vremenske otpornosti.

Ključ minimalističkog dizajna leži u principu ''manje je više''. Umjesto preopterećenja prostora različitim elementima, fokusirajte se na kvalitetne, funkcionalne komade koji imaju jasnu svrhu.

Boje su također važne. Bijela, siva i neutralne nijanse stvaraju osjećaj prostranosti i čistoće. Dodajte akcentne boje kroz male detalje poput ručnika ili dekorativnih elemenata.

Pohrana je kritična u minimalističkom dizajnu. Skrivene police, ugradbeni ormari i jednostavni organizacijski sustavi pomažu održati prostor čistim i organiziranim.',
    null,
    'draft',
    null,
    'Minimalistički dizajn kupaonice: Vodič za početnike',
    'Kako stvoriti čist i funkcionalan prostor koji odiše elegancijom i jednostavnošću.'
  ),
  (
    'hr',
    'Održavanje i čišćenje kupaonice: Najbolje prakse',
    'odrzavanje-i-ciscenje-kupaonice-najbolje-prakse',
    'Praktični savjeti za održavanje vaše kupaonice u besprijekornom stanju i produženje vijeka trajanja opreme.',
    'Redovito održavanje kupaonice ne samo da održava prostor čistim i zdravim, već i produžava vijek trajanja opreme.

Za sanitariju, koristite blage čistače koji neće oštetiti površine. Izbjegavajte agresivne kemikalije koje mogu oštetiti završne slojeve i uzrokovati koroziju.

Slavine i tuš glave trebaju redovito čišćenje kako bi se spriječilo nakupljanje kamenca. Koristite octeni otopinu ili specijalizirane proizvode za uklanjanje kamenca.

Za podove i zidove, redovito čišćenje sprječava nakupljanje plijesni i bakterija. Provjerite ventilaciju kako biste osigurali dobru cirkulaciju zraka.',
    null,
    'draft',
    null,
    'Održavanje i čišćenje kupaonice: Najbolje prakse',
    'Praktični savjeti za održavanje vaše kupaonice u besprijekornom stanju i produženje vijeka trajanja opreme.'
  ),
  (
    'hr',
    'Pristupačna renovacija kupaonice: Korak po korak',
    'pristupacna-renovacija-kupaonice-korak-po-korak',
    'Kako renovirati kupaonicu uz ograničen budžet bez kompromisa u kvaliteti i funkcionalnosti.',
    'Renovacija kupaonice ne mora koštati bogatstvo. S pažljivim planiranjem i pravim pristupom, možete stvoriti prekrasan prostor unutar svog budžeta.

Počnite s planiranjem. Odredite prioritete - što je najvažnije za vas? Možda je to nova kada ili modernije slavine. Fokusirajte se na elemente koji će imati najveći utjecaj na izgled i funkcionalnost.

Razmislite o refacingu umjesto potpune zamjene. Ako su vaše pločice u dobrom stanju, možete ih jednostavno obnoviti. Isto vrijedi i za kadu - umjesto nove, razmislite o obnovi postojeće.

DIY projekti mogu uštedjeti značajne iznose. Jednostavne stvari poput bojanja zidova, zamjene slavina ili dodavanja novih svjetiljki možete napraviti sami.',
    null,
    'draft',
    null,
    'Pristupačna renovacija kupaonice: Korak po korak',
    'Kako renovirati kupaonicu uz ograničen budžet bez kompromisa u kvaliteti i funkcionalnosti.'
  )
on conflict (locale, slug) do nothing;
