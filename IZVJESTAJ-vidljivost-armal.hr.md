# Izvještaj o prisutnosti armal.hr na internetu (SEO / AEO / GEO)

Datum: 27. 10. 2026.

## 0. Opseg i ograničenja (pročitati prvo)

Ovo je audit temeljen na javno dostupnim signalima: dohvat HTML-a, robots.txt, sitemap.xml, llms.txt, HTTP zaglavlja, izvorni kod projekta i ručne pretrage weba.

**Nisam imao pristup:** Google Search Consoleu, GA4, Semrush/Ahrefs/Sistrix, stvarnim upitima u ChatGPT/Perplexity/Gemini/Claude. Alat za pretragu vraća rezultate za SAD i slabo pokriva hrvatski SERP. PageSpeed API nije odgovorio (404), pa nema Lighthouse brojki.

Zato:
- Sve što je "činjenica" dolazi iz izravne provjere (označeno **[provjereno]**).
- Sve što je procjena označeno je **[procjena]** i treba ga potvrditi u GSC-u / alatima.
- Usporedba s konkurentima je **tehnička** (što stranice signaliziraju strojevima), ne mjerenje stvarnog prometa ili pozicija.

## 1. Sažetak

| Područje | Ocjena (procjena) | Ukratko |
|---|---|---|
| Tehnički SEO | 5/10 | Dobar temelj (sitemap, hreflang, GTM), ali podstranice u sirovom HTML-u dijele naslov, opis i canonical s naslovnicom |
| On-page / sadržaj | 5/10 | Struktura OK (1 H1, 9 H2, svi `alt` ispunjeni), blog postoji, ali kratki meta opisi, nema strukturiranih podataka po tipu stranice |
| AEO (answer engines) | 3/10 | Nema FAQ/Article/Product sheme, nema potvrđene strukture "izravan odgovor" |
| GEO (generativna tražilica / LLM) | 2/10 | Nema llms.txt (vraća HTML), metapodaci tek nakon JS-a, slab entitet brenda |
| Vidljivost brenda | 2/10 | U ručnim pretragama armal.hr se nije pojavio; brend se miješa s drugim "Armal" tvrtkama |

Glavni zaključak: stranica je sadržajno i vizualno dobro postavljena, ali **strojevi vide drugačije nego ljudi**. Ključne informacije (naslov, opis, canonical, shema) dolaze tek izvršavanjem JavaScripta, a dio njih je pogrešan u početnom HTML-u.

## 2. Što je provjereno i što je dobro

- **[provjereno]** `lang="hr"`, HTTPS, `robots: index,follow`, GTM + GA4 + Meta pixel.
- **[provjereno]** robots.txt: `Allow: /`, `Disallow: /pdf/`, navodi sitemap.
- **[provjereno]** sitemap.xml: 112 URL-ova, uključuje proizvode (Rubi, Topaz, Violet, Start, Opal, Safir, Beril, Lapis...), blog i jezične verzije (`/slo`, `/rs`, `/eng`).
- **[provjereno]** hreflang za hr-HR, sl-SI, sr-RS, en i x-default (ubacuje se JS-om).
- **[provjereno]** Organization JSON-LD s `sameAs` (Facebook, Instagram, LinkedIn) i `areaServed` HR/SI/RS/BA.
- **[provjereno]** 19 slika na naslovnici, 0 bez `alt`; jedan H1.
- **[provjereno]** Jasne informacije o tvrtki: Zagreb, Mrkšina 52D, kontakti, tim s imenima (dobar E-E-A-T signal), 10 godina jamstva, 215 prodajnih mjesta.
- Redirect `http://armal.hr` → `https://armal.hr` (301).

## 3. Problemi (po težini)

### Kritično

1. **Podstranice u sirovom HTML-u imaju metapodatke naslovnice.** **[provjereno]** Dohvat `/proizvodi/slavine/rubi` (bez izvršavanja JS-a) vraća naslov i opis naslovnice, a `canonical` pokazuje na `https://www.armal.hr/`. Uzrok: `SEOHead.jsx` i `JsonLd.jsx` postavljaju meta/canonical/shemu tek u `useEffect` na klijentu.
   - Google obično izvrši JS, ali s odgodom; konfliktan canonical u prvom odgovoru može dovesti do toga da se podstranice tretiraju kao duplikati naslovnice.
   - Bing, DuckDuckGo i većina AI crawlera **ne izvršavaju JS pouzdano** i vide samo naslovnicu.
   - Preporuka: prerender/SSR po ruti (npr. `vite-plugin-ssr`, `react-snap`/`prerender`, ili Express koji ubacuje `<title>`, `<meta>`, canonical i JSON-LD po ruti prije slanja).

2. **Apex i www oba vraćaju 200.** **[provjereno]** `https://armal.hr/` i `https://www.armal.hr/` isti sadržaj (isti ETag), canonical je www. Treba trajni 301 s apex na www (ili obrnuto) na razini domene/hostinga.

### Visoko

3. **llms.txt vraća HTML naslovnice sa statusom 200 (soft 404).** **[provjereno]** SPA fallback hvata sve nepoznate putanje. Isto vjerojatno vrijedi za svaku nepostojeću URL adresu, što znači da nema pravih 404 odgovora (provjeriti).

4. **Sitemap je nediferenciran.** **[provjereno]** Sve stavke imaju `priority 0.8`, `changefreq weekly` i `lastmod 2026-10-23`. Google ignorira `priority`/`changefreq`; lažan, identičan `lastmod` smanjuje povjerenje u taj signal. Postavite stvarne datume zadnje izmjene.

5. **Strukturirani podaci minimalni.** **[provjereno]** Samo Organization. Nedostaju: `LocalBusiness`/`Organization` s `address`, `telephone`, `email`, `logo`; `WebSite`; `BreadcrumbList`; `Product` (kolekcije slavina); `Article`/`BlogPosting`; `FAQPage`.

6. **Anomalija u poslužiteljskom HTML-u naslovnice.** **[provjereno]** U odgovoru za `https://armal.hr/` nalazi se Meta (Facebook) skripta s parametrom `domain=127.0.0.1` i skripte koje GTM ubacuje. To znači da je poslužena verzija vjerojatno snimka DOM-a iz lokalnog okruženja. Provjeriti build/deploy proces jer to može zbuniti praćenje i povećava veličinu HTML-a (172 KB).

### Srednje

7. **Meta opisi su kratki i generični**, npr. "Armal nudi vrhunske slavine i kupaonska rjesenja za moderan interijer." (bez dijakritika u statičnom HTML-u: "rjesenja", "namjestaj").
8. **Nazivi blog članaka u sitemapu na `/eng/blog/...` imaju hrvatske slugove** (npr. `minimalisticki-dizajn-kupaonice...`): jezična verzija nije stvarno prevedena ili je slug nepromijenjen.
9. **Dvije telefonske brojke** (+385 1 7777 707 i +385 91 3375 730) bez označavanja svrhe; za lokalni SEO trebaju biti dosljedne (NAP) na webu, Google Business Profileu i imenicima.
10. **Duplicirani sadržaj u legal stranicama** (`privacy-policy`, `terms-of-service`, `cookie-policy` na engleskim URL-ovima na hrvatskom sajtu): nije kritično, ali URL-ovi bi trebali biti na hrvatskom i s `noindex` za nevažne.

## 4. AEO (Answer Engine Optimization)

Cilj: da Google AI Overviews, featured snippeti i glasovni asistenti izvuku Armalov odgovor.

Stanje:
- Blog postoji s temama koje odgovaraju stvarnim upitima (održavanje i čišćenje kupaonice, pristupačna renovacija, energetska učinkovitost, tuš kabine 2025, minimalistički dizajn). Dobra baza.
- **[provjereno]** Nema `FAQPage`/`HowTo`/`Article` sheme.
- **[procjena]** Članci vjerojatno nisu strukturirani kao "pitanje → izravni odgovor od 40-60 riječi → detalji".
- Nema stranica "Kako odabrati slavinu", "Razlika između keramičke i običnog ulošća", "Kako očistiti kamenac s slavine" kao samostalnih odgovora s tablicama.
- Nema usporednih tablica specifikacija po kolekciji (materijal, protok, jamstvo, certifikati), što AI sustavi vole citirati.

Preporuke:
1. Svaki blog članak: H2 kao pitanje, odmah ispod 2-3 rečenice odgovora, zatim detalji, na kraju FAQ blok + `FAQPage` JSON-LD.
2. Na stranicama kolekcija: tablica specifikacija + `Product` shema (`brand`, `sku`/`mpn`, `material`, `offers` ili `isRelatedTo` ako nema cijene).
3. Stranica "Servis i jamstvo": `FAQPage` (kako ostvariti 10 godina jamstva, gdje poslati reklamaciju).
4. Stranica "Gdje kupiti": izbaciti iz interaktivne karte i tekstualno navesti gradove/prodajna mjesta (karta se ne može indeksirati).

## 5. GEO (Generative Engine Optimization)

Cilj: da ChatGPT, Gemini, Perplexity, Claude i Copilot znaju što je Armal i da ga citiraju.

Stanje:
- **[provjereno]** `llms.txt` ne postoji (soft 404). Nema pravila za AI botove u robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended...). To nije nužno loše (default je dopušteno), ali nema ni namjerne politike.
- **[provjereno]** Metapodaci i shema dolaze iz JS-a, pa većina AI crawlera vidi samo naslovnicu.
- **[provjereno, alat s ograničenjem]** Pretrage "Armal armal.hr", "armal.hr kupaonica", "Armal Zagreb Mrkšina 52D" nisu vratile armal.hr. Vratile su: Armal S.p.A. (talijanska tvrtka za prijenosnu sanitaciju, izvozi u 130+ zemalja), Armal vodoinstalaterski obrt u Šibeniku, a Slovenski trgovac (mimovrste.com) pokazao je Armal proizvode. **Rizik entitetske zabune:** model može pomiješati hrvatski Armal s talijanskim ili šibenskim.
- **[procjena]** Slab ekosustav izvan vlastite domene: nema potvrđenog Wikidata/Wikipedia unosa, Google Knowledge Panela, recenzija, ni stručnih citata.

Preporuke:
1. Dodati `llms.txt` (kratak opis tvrtke, popis ključnih URL-ova, kontakt) i `llms-full.txt`; osigurati da ne vraća HTML.
2. Jasna rečenica entiteta na naslovnici i u shemi: "Armal d.o.o., Zagreb, hrvatski distributer slavina, tuš sustava i sanitarija" + `legalName`, `foundingDate`, `vatID`/OIB (javno dostupno), `address`, `contactPoint`, `sameAs` + Wikidata unos.
3. Kreirati i popuniti Google Business Profile (Mrkšina 52D), dosljedan NAP.
4. Dobiti spomene na vanjskim domenama: Uredi dom, B2B partneri, arhitektonski i instalaterski portali, imenici (Poslovni.hr, Fininfo), recenzije.
5. Prerender (vidi 3.1) jer je to preduvjet da AI crawleri uopće čitaju sadržaj.

## 6. Vidljivost u odnosu na konkurente

Metodologija: tehnički signali koje strojevi vide kad dohvate početnu stranicu bez JS-a.

| Domena | Što je dostupno | Shema (JSON-LD u sirovom HTML-u) | Napomena |
|---|---|---|---|
| armal.hr | 200, 172 KB | 1 (Organization, ubačen JS-om u posluženoj snimci) | Podstranice dijele naslov/canonical naslovnice |
| geberit.hr | 200, 556 KB | 2 | Služben HR sajt, jaka struktura |
| grohe.hr | 200 → grohe.com/hr-HR, 616 KB | 0 u sirovom HTML-u | Globalna domena autoriteta |
| kolpasan.si | 200, 176 KB | 1 | Regionalni (SI) proizvođač |
| hansgrohe.hr, idealstandard.hr, duravit.hr, kludi.com | 403 za automatizirani upit | n/a | Aktivno blokiraju botove (WAF) |
| roca.hr | 200 | 0 | Naslov "Auto centar Roca": ta domena nije sanitarni Roca, bez signala |

Što to znači:
- Za generičke upite ("najbolje slavine za kupaonicu Hrvatska") u mojoj pretrazi dominiraju Hansgrohe, Grohe, Rosan, Nord, Laufen, Geberit te agregatori **nabava.net, mall.hr, jeftinije.hr, merkur.si, emajstor.hr**. Armal se nije pojavio.
- Armal je distributerski/B2B brend; njegova je prirodna publika instalateri, trgovci i arhitekti, a ne krajnji kupci. Zato je borba za generički upit manje važna od **brendiranih i hiper-specifičnih** upita (npr. "Armal slavina Rubi", "Armal jamstvo 10 godina", "Armal servis Zagreb").
- Veliki konkurenti (Hansgrohe, Ideal Standard, Duravit) blokiraju botove. To je za Armal prilika: otvoreno, dobro strukturirano web-mjesto može biti lakše citirano u AI odgovorima za niše (regionalni distributer, servis u HR).
- Armal je u Sloveniji već prisutan kod trgovaca (mimovrste.com), što je pozitivan signal za SI/RS tržišta koja pokrivaju `/slo` i `/rs`.

**Ograničenje:** bez Semrush/Ahrefs/GSC ne mogu dati broj organskih posjeta, ključnih riječi, backlinkova ili stvarne pozicije. Ako dobijete pristup GSC-u i/ili alatu za backlinkove, ovaj odjeljak se može zamijeniti stvarnim brojkama.

## 7. Plan akcija

### Tjedan 1 (brzi dobici)
1. 301 redirect apex → www (ili obrnuto) na razini hostinga.
2. Pravi 404 za nepostojeće URL-ove; ukloniti soft 404 (llms.txt itd.).
3. Ispraviti sitemap: stvarni `lastmod`, ukloniti `priority`/`changefreq`.
4. Dodati `llms.txt`.
5. Prepraviti meta opise (140-160 znakova, s dijakriticima, jedinstveni po stranici).
6. Provjeriti zašto poslužena naslovnica sadrži snimku s `127.0.0.1`.

### Tjedan 2-4
7. Prerender/SSR po ruti: točan `<title>`, `<meta description>`, `canonical`, `hreflang`, JSON-LD u sirovom HTML-u.
8. Shema: `Organization` (potpun NAP), `WebSite`, `BreadcrumbList`, `Product` po kolekciji, `BlogPosting`, `FAQPage`.
9. Prevesti `/eng` slugove i sadržaj ili ukloniti iz sitemapa dok nisu prevedeni.
10. Google Business Profile + Bing Places, Wikidata unos.

### Mjesec 2-3
11. Preoblikovati blog u format pitanje→odgovor; dodati 8-10 novih članaka na upite iz GSC-a.
12. Stranice kolekcija s tablicama specifikacija, certifikatima, priručnicima (PDF trenutno `Disallow: /pdf/`; razmotriti indeksiranje ključnih tehničkih listova ili HTML ekvivalent).
13. Link building: partneri s karte (215 prodajnih mjesta) → backlink na armal.hr s opisom brenda; stručni portali.
14. Mjerenje: GSC (po stranici/upitu), GA4, redoviti test od 20-30 upita u ChatGPT/Perplexity/Gemini ("Tko je Armal?", "Gdje kupiti Armal slavine?") i bilježenje citata.

## 8. KPI-ji za praćenje

- Indeksirane stranice (GSC) naspram 112 u sitemapu.
- Prikazi/klikovi za brendirane i nebrendirane upite.
- Broj unikatnih referring domena.
- Udio AI odgovora koji ispravno identificiraju Armal (ručni test mjesečno).
- Core Web Vitals (CrUX) kad bude dovoljno prometa.
