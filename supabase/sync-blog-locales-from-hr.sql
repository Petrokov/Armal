-- Copies all HR blog posts to SLO and RS with translated text.
-- Cover image URLs, gallery image URLs, status, publish date and author are copied from HR.
--
-- Run this in Supabase Dashboard > SQL Editor.

begin;

delete from public.blog_posts target
where target.locale in ('slo', 'rs')
  and not exists (
    select 1
    from public.blog_posts hr
    where hr.locale = 'hr'
      and hr.slug = target.slug
  );

with translations(locale, slug, title, excerpt, content, seo_title, seo_description) as (
  values
    (
      'slo',
      'armal-obavijest-veleprodajnim-kupcima',
      'Armal obvestilo veleprodajnim kupcem',
      'OBVESTILO ZA VELEPRODAJNE KUPCE',
      'OBVESTILO ZA VELEPRODAJNE KUPCE

Spoštovani partnerji,

zaradi stalne rasti cen reprodukcijskih materialov in energentov smo primorani prilagoditi Armal cenik.

Zavedamo se izzivov, ki jih navedeno povišanje stroškov prinaša poslovanju, zato smo večji del povišanja poskušali absorbirati, da bi ohranili stabilnost cen za naše kupce. Žal smo manjši del povišanja stroškov primorani prenesti na trg. S tem obvestilom napovedujemo povprečno povišanje cen za 4,5 %, ki ne bo linearno uporabljeno za vse izdelke.

Novi cenik vam bo dostavljen okoli 15. aprila 2026.

Zahvaljujemo se vam za razumevanje in dosedanje sodelovanje.

Lep pozdrav,
Armal d.o.o.',
      'Armal obvestilo veleprodajnim kupcem',
      'OBVESTILO ZA VELEPRODAJNE KUPCE'
    ),
    (
      'slo',
      'minimalisticki-dizajn-kupaonice-vodic-za-pocetnike',
      'Minimalistična zasnova kopalnice: Vodnik za začetnike',
      'Kako ustvariti čist in funkcionalen prostor, ki izžareva eleganco in preprostost.',
      'Minimalistična zasnova kopalnice postaja vse bolj priljubljena zaradi svoje čistosti, preprostosti in brezčasnosti.

Ključ minimalistične zasnove je v načelu ''manj je več''. Namesto da prostor preobremenite z različnimi elementi, se osredotočite na kakovostne, funkcionalne kose, ki imajo jasen namen.

Pomembne so tudi barve. Bela, siva in nevtralni odtenki ustvarjajo občutek prostornosti in čistoče. Akcentne barve dodajte z majhnimi detajli, kot so brisače ali dekorativni elementi.

Shranjevanje je pri minimalistični zasnovi ključnega pomena. Skrite police, vgradne omare in preprosti organizacijski sistemi pomagajo ohranjati prostor čist in urejen.',
      'Minimalistična zasnova kopalnice: Vodnik za začetnike',
      'Kako ustvariti čist in funkcionalen prostor, ki izžareva eleganco in preprostost.'
    ),
    (
      'slo',
      'energetska-ucinkovitost-u-kupaonici-prakticni-savjeti',
      'Energetska učinkovitost v kopalnici: Praktični nasveti',
      'Preverite, kako zmanjšati porabo vode in energije v svoji kopalnici ter hkrati ohraniti visoko raven udobja.',
      'Energetska učinkovitost v kopalnici ni dobra le za okolje, temveč tudi za vašo denarnico. Obstaja več preprostih načinov, kako lahko zmanjšate porabo brez žrtvovanja udobja.

Zamenjava starih armatur z novimi, varčnimi modeli lahko zmanjša porabo vode do 30 %. Perlatorji in omejevalniki pretoka so preprosti dodatki, ki lahko naredijo veliko razliko.

Prhe z nizkim pretokom so prav tako odlična izbira. Med prhanjem lahko zmanjšajo porabo vode skoraj za polovico, občutek prhanja pa ostane enak.

Pri ogrevanju vode razmislite o solarnih sistemih ali toplotnih črpalkah. Čeprav zahtevajo začetno investicijo, lahko dolgoročno občutno zmanjšajo stroške energije.',
      'Energetska učinkovitost v kopalnici: Praktični nasveti',
      'Preverite, kako zmanjšati porabo vode in energije v svoji kopalnici ter hkrati ohraniti visoko raven udobja.'
    ),
    (
      'slo',
      'odrzavanje-i-ciscenje-kupaonice-najbolje-prakse',
      'Vzdrževanje in čiščenje kopalnice: Najboljše prakse',
      'Praktični nasveti za vzdrževanje kopalnice v brezhibnem stanju in podaljšanje življenjske dobe opreme.',
      'Redno vzdrževanje kopalnice ne ohranja prostora le čistega in zdravega, temveč tudi podaljšuje življenjsko dobo opreme.

Za sanitarno keramiko uporabljajte blaga čistila, ki ne poškodujejo površin. Izogibajte se agresivnim kemikalijam, ki lahko poškodujejo zaključne sloje in povzročijo korozijo.

Armature in pršne glave je treba redno čistiti, da preprečite nabiranje vodnega kamna. Uporabite raztopino kisa ali specializirane izdelke za odstranjevanje vodnega kamna.

Pri tleh in stenah redno čiščenje preprečuje nabiranje plesni in bakterij. Preverite prezračevanje, da zagotovite dobro kroženje zraka.',
      'Vzdrževanje in čiščenje kopalnice: Najboljše prakse',
      'Praktični nasveti za vzdrževanje kopalnice v brezhibnem stanju in podaljšanje življenjske dobe opreme.'
    ),
    (
      'slo',
      'pristupacna-renovacija-kupaonice-korak-po-korak',
      'Dostopna prenova kopalnice: Korak za korakom',
      'Kako prenoviti kopalnico z omejenim proračunom brez kompromisov pri kakovosti in funkcionalnosti.',
      'Prenova kopalnice ne stane nujno bogastva. S skrbnim načrtovanjem in pravim pristopom lahko ustvarite čudovit prostor znotraj svojega proračuna.

Začnite z načrtovanjem. Določite prioritete - kaj je za vas najpomembnejše? Morda je to nova kad ali sodobnejše armature. Osredotočite se na elemente, ki bodo imeli največji vpliv na videz in funkcionalnost.

Razmislite o osvežitvi namesto popolne zamenjave. Če so vaše ploščice v dobrem stanju, jih lahko preprosto obnovite. Enako velja za kad - namesto nove razmislite o obnovi obstoječe.

Projekti, ki jih izvedete sami, lahko prihranijo znatne zneske. Preprosta opravila, kot so pleskanje sten, menjava armatur ali dodajanje novih svetil, lahko opravite sami.',
      'Dostopna prenova kopalnice: Korak za korakom',
      'Kako prenoviti kopalnico z omejenim proračunom brez kompromisov pri kakovosti in funkcionalnosti.'
    ),
    (
      'slo',
      'moderne-tus-kabine-trendovi-i-inovacije-2025',
      'Moderne tuš kabine: Trendi in inovacije 2025',
      'Raziščite najnovejše trende pri oblikovanju tuš kabin in kako ustvariti razkošno izkušnjo prhanja v svojem domu.',
      'Tuš kabine so v sodobnih kopalnicah vse bolj priljubljene, saj združujejo praktičnost in slog v enem.

Trenutni trendi v letu 2025 vključujejo minimalistično zasnovo s čistimi linijami in brezzokvirne kabine, ki ustvarjajo občutek večjega prostora. Steklene stene in vrata postajajo standard, saj omogočajo več svetlobe in sodobnejši videz.

Tudi tehnološke inovacije spreminjajo način, kako doživljamo prhanje. Izboljšani sistemi pretoka vode, LED osvetlitev in vgrajeni zvočniki so le nekateri primeri razvoja tuš kabin.

Pri načrtovanju nove tuš kabine je pomembno razmisliti o velikosti prostora, tipu vrat (drsna, odprta, kotna) in materialih, ki bodo uporabljeni. Vsaka izbira vpliva na končni videz in funkcionalnost vaše kopalnice.',
      'Moderne tuš kabine: Trendi in inovacije 2025',
      'Raziščite najnovejše trende pri oblikovanju tuš kabin in kako ustvariti razkošno izkušnjo prhanja v svojem domu.'
    ),
    (
      'rs',
      'armal-obavijest-veleprodajnim-kupcima',
      'Armal obaveštenje veleprodajnim kupcima',
      'OBAVEŠTENJE ZA VELEPRODAJNE KUPCE',
      'OBAVEŠTENJE ZA VELEPRODAJNE KUPCE

Poštovani partneri,

usled kontinuiranog rasta cena repromaterijala i energenata primorani smo da izvršimo korekciju Armal cenovnika.

Svesni smo izazova koje navedeni porast troškova donosi poslovanju, pa smo veći deo povećanja nastojali da apsorbujemo kako bismo zadržali stabilnost cena za naše kupce. Nažalost, manji deo povećanja troškova primorani smo da prenesemo na tržište. Ovim putem najavljujemo porast cena u proseku od 4,5 %, koji neće biti linearno primenjen na sve proizvode.

Novi cenovnik biće vam dostavljen oko 15. aprila 2026. godine.

Zahvaljujemo na razumevanju i dosadašnjoj saradnji.

Srdačan pozdrav,
Armal d.o.o.',
      'Armal obaveštenje veleprodajnim kupcima',
      'OBAVEŠTENJE ZA VELEPRODAJNE KUPCE'
    ),
    (
      'rs',
      'minimalisticki-dizajn-kupaonice-vodic-za-pocetnike',
      'Minimalistički dizajn kupatila: Vodič za početnike',
      'Kako stvoriti čist i funkcionalan prostor koji odiše elegancijom i jednostavnošću.',
      'Minimalistički dizajn kupatila postaje sve popularniji zbog svoje čistoće, jednostavnosti i bezvremenosti.

Ključ minimalističkog dizajna leži u principu ''manje je više''. Umesto preopterećenja prostora različitim elementima, fokusirajte se na kvalitetne, funkcionalne komade koji imaju jasnu svrhu.

Boje su takođe važne. Bela, siva i neutralne nijanse stvaraju osećaj prostranosti i čistoće. Dodajte akcentne boje kroz male detalje poput peškira ili dekorativnih elemenata.

Skladištenje je ključno u minimalističkom dizajnu. Skrivene police, ugradni ormari i jednostavni organizacioni sistemi pomažu da prostor ostane čist i organizovan.',
      'Minimalistički dizajn kupatila: Vodič za početnike',
      'Kako stvoriti čist i funkcionalan prostor koji odiše elegancijom i jednostavnošću.'
    ),
    (
      'rs',
      'energetska-ucinkovitost-u-kupaonici-prakticni-savjeti',
      'Energetska efikasnost u kupatilu: Praktični saveti',
      'Saznajte kako da smanjite potrošnju vode i energije u svom kupatilu uz zadržavanje visokog nivoa komfora.',
      'Energetska efikasnost u kupatilu nije dobra samo za okolinu, već i za vaš novčanik. Postoji nekoliko jednostavnih načina kako možete smanjiti potrošnju bez žrtvovanja komfora.

Zamena starih slavina novim, štedljivim modelima može smanjiti potrošnju vode do 30 %. Aeratori i ograničivači protoka su jednostavni dodaci koji mogu napraviti veliku razliku.

Tuš ruže sa niskim protokom takođe su odličan izbor. One mogu smanjiti potrošnju vode tokom tuširanja gotovo za polovinu, a osećaj tuširanja ostaje isti.

Za grejanje vode razmislite o solarnim sistemima ili toplotnim pumpama. Iako zahtevaju početnu investiciju, dugoročno mogu značajno smanjiti račune za energiju.',
      'Energetska efikasnost u kupatilu: Praktični saveti',
      'Saznajte kako da smanjite potrošnju vode i energije u svom kupatilu uz zadržavanje visokog nivoa komfora.'
    ),
    (
      'rs',
      'odrzavanje-i-ciscenje-kupaonice-najbolje-prakse',
      'Održavanje i čišćenje kupatila: Najbolje prakse',
      'Praktični saveti za održavanje kupatila u besprekornom stanju i produženje veka trajanja opreme.',
      'Redovno održavanje kupatila ne samo da održava prostor čistim i zdravim, već i produžava vek trajanja opreme.

Za sanitarije koristite blaga sredstva za čišćenje koja neće oštetiti površine. Izbegavajte agresivne hemikalije koje mogu oštetiti završne slojeve i izazvati koroziju.

Slavine i tuš ruže treba redovno čistiti kako bi se sprečilo nakupljanje kamenca. Koristite rastvor sirćeta ili specijalizovane proizvode za uklanjanje kamenca.

Za podove i zidove redovno čišćenje sprečava nakupljanje buđi i bakterija. Proverite ventilaciju kako biste obezbedili dobru cirkulaciju vazduha.',
      'Održavanje i čišćenje kupatila: Najbolje prakse',
      'Praktični saveti za održavanje kupatila u besprekornom stanju i produženje veka trajanja opreme.'
    ),
    (
      'rs',
      'pristupacna-renovacija-kupaonice-korak-po-korak',
      'Pristupačna renovacija kupatila: Korak po korak',
      'Kako renovirati kupatilo uz ograničen budžet bez kompromisa u kvalitetu i funkcionalnosti.',
      'Renovacija kupatila ne mora da košta bogatstvo. Uz pažljivo planiranje i pravi pristup možete stvoriti prelep prostor u okviru svog budžeta.

Počnite od planiranja. Odredite prioritete - šta je vama najvažnije? Možda je to nova kada ili modernije slavine. Fokusirajte se na elemente koji će imati najveći uticaj na izgled i funkcionalnost.

Razmislite o osvežavanju umesto potpune zamene. Ako su vaše pločice u dobrom stanju, možete ih jednostavno obnoviti. Isto važi i za kadu - umesto nove, razmislite o obnovi postojeće.

DIY projekti mogu uštedeti značajne iznose. Jednostavne stvari poput krečenja zidova, zamene slavina ili dodavanja novih svetiljki možete uraditi sami.',
      'Pristupačna renovacija kupatila: Korak po korak',
      'Kako renovirati kupatilo uz ograničen budžet bez kompromisa u kvalitetu i funkcionalnosti.'
    ),
    (
      'rs',
      'moderne-tus-kabine-trendovi-i-inovacije-2025',
      'Moderne tuš kabine: Trendovi i inovacije 2025',
      'Istražite najnovije trendove u dizajnu tuš kabina i kako da stvorite luksuzno iskustvo tuširanja u svom domu.',
      'Tuš kabine su postale sve popularnije u modernim kupatilima, nudeći praktičnost i stil u jednom paketu.

Trenutni trendovi u 2025. godini uključuju minimalistički dizajn sa čistim linijama i kabine bez okvira koje stvaraju prostraniji utisak. Staklene stene i vrata postaju standard, omogućavajući više svetlosti i moderniji izgled.

Inovacije u tehnologiji takođe menjaju način na koji doživljavamo tuširanje. Poboljšani sistemi protoka vode, LED rasveta i integrisani zvučnici samo su neki od primera kako se tuš kabine razvijaju.

Prilikom planiranja nove tuš kabine važno je razmotriti veličinu prostora, tip vrata (klizna, otvorena, ugaona) i materijale koji će se koristiti. Svaki izbor utiče na konačni izgled i funkcionalnost vašeg kupatila.',
      'Moderne tuš kabine: Trendovi i inovacije 2025',
      'Istražite najnovije trendove u dizajnu tuš kabina i kako da stvorite luksuzno iskustvo tuširanja u svom domu.'
    )
),
source_rows as (
  select
    translations.locale,
    translations.slug,
    translations.title,
    translations.excerpt,
    translations.content,
    hr.cover_image_url,
    hr.gallery_image_urls,
    hr.status,
    hr.published_at,
    translations.seo_title,
    translations.seo_description,
    hr.author_id
  from translations
  join public.blog_posts hr
    on hr.locale = 'hr'
   and hr.slug = translations.slug
)
insert into public.blog_posts (
  locale,
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  gallery_image_urls,
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
  excerpt,
  content,
  cover_image_url,
  gallery_image_urls,
  status,
  published_at,
  seo_title,
  seo_description,
  author_id
from source_rows
on conflict (locale, slug) do update
set title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content,
    cover_image_url = excluded.cover_image_url,
    gallery_image_urls = excluded.gallery_image_urls,
    status = excluded.status,
    published_at = excluded.published_at,
    seo_title = excluded.seo_title,
    seo_description = excluded.seo_description,
    author_id = excluded.author_id,
    updated_at = now();

commit;

notify pgrst, 'reload schema';
