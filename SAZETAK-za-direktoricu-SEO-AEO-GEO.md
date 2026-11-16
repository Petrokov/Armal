# Armal.hr: stanje vidljivosti na internetu (SEO / AEO / GEO)

Datum: 27. 10. 2026. Pripremljeno za: direktoricu.

## Ukratko

Tehnički temelji weba sada su ispravni. Ono što je ranije bilo najveći problem (tražilice i AI alati vidjeli su svaku podstranicu kao kopiju naslovnice) **popravljeno je i provjereno na živoj stranici**. Preostaje ono što se ne rješava programiranjem nego sadržajem i prisutnošću izvan weba: **ljudi i AI alati još ne znaju pouzdano tko je Armal.**

| Područje | Što znači | Ocjena prije popravaka | Ocjena sada |
|---|---|---|---|
| SEO | Pojavljujemo li se u Googleu | 5/10 | **7/10** |
| AEO | Uzimaju li tražilice naše odgovore (izdvojeni odgovori, AI sažeci) | 3/10 | **5/10** |
| GEO | Spominju li nas ChatGPT, Gemini, Perplexity, Claude | 2/10 | **4/10** |
| Prepoznatljivost brenda | Pojavljuje li se Armal pri pretrazi imena | 2/10 | **2/10** (nije mjereno nakon popravaka) |

Ocjene su stručna procjena iz javno vidljivih signala, ne mjerenje prometa.

## Što je riješeno (provjereno 27. 10. 2026.)

1. **Svaka stranica ima vlastiti naslov, opis i adresu.** Prije su sve podstranice (npr. kolekcija Rubi) strojevima izgledale kao naslovnica. Sada imaju svoj naslov ("Rubi | Miješalice za vodu | Armal") i ispravnu adresu.
2. **Nepostojeće stranice sada ispravno javljaju grešku 404.** Prije su vraćale naslovnicu kao da je sve u redu, što zbunjuje Google.
3. **Jedna službena adresa.** armal.hr automatski preusmjerava na www.armal.hr, pa se ugled ne dijeli na dvije kopije weba.
4. **Datoteka llms.txt postoji.** To je "vizitka" za AI alate: tko je Armal, kontakt, popis proizvoda, hrvatski i engleski, uz napomenu da nismo talijanski Armal.
5. **Strukturirani podaci** (strojno čitljiv opis stranice): tvrtka s adresom i kontaktima, opis stranice kolekcije (WebPage; Product shema nije moguća jer cijene nisu javne), navigacijski put (BreadcrumbList), blog članci (Article).
6. **Višejezičnost ispravno označena** (hrvatski, slovenski, srpski, engleski), stranice /slo i /eng imaju vlastite naslove.
7. **Karta stranice (sitemap)** ima 112 adresa s realnim datumima izmjene.

## Što još nedostaje

### Na webu (manji posao, mogu se napraviti odmah)
- **Nema FAQ blokova** (često postavljana pitanja s oznakom za tražilice). To je najjači način da nas Google i AI citiraju. Treba ih dodati na blog članke, stranicu jamstva/servisa i kolekcije.
- **Blog je malen**: 6 članaka, od čega je jedan obavijest veleprodajnim kupcima. Nema članaka tipa "Kako odabrati slavinu" ili "Kako ukloniti kamenac".
- **Nema tablica specifikacija po kolekciji** (materijal, protok, jamstvo, certifikati). AI alati ih rado citiraju.
- **Nema datoteke llms-full.txt** s opširnijim opisom (nije kritično).
- Meta opisi na nekim stranicama su kratki i generični.
- Dvije telefonske brojke bez objašnjenja čemu služe (važno za lokalnu vidljivost).

### Izvan weba (najveći utjecaj, zahtijeva ljude, ne programiranje)
- **Google Business Profile** za Mrkšina 52D (besplatno): pojavljivanje na Google karti i pri pretrazi "Armal Zagreb".
- **Zbunjivanje s drugim "Armalima".** U ručnim pretragama prije popravaka armal.hr se nije pojavio; izlazili su talijanski Armal S.p.A. (prijenosni sanitarni uređaji) i obrt iz Šibenika. AI alati to mogu pomiješati.
- **Malo vanjskih poveznica i spomena.** Najbrži put: 215 prodajnih mjesta (partneri) neka na svojim stranicama poveznicom upućuju na armal.hr, plus stručni portali, imenici i recenzije.
- **Wikidata unos** za Armal (besplatno, pomaže AI alatima da prepoznaju tvrtku).

## Što ne znamo (ograničenje analize)

Nemamo pristup Google Search Consoleu ni Google Analyticsu, pa **ne možemo reći koliko posjeta dolazi preko tražilica, na koje upite se pojavljujemo, ni na kojim pozicijama**. Ocjene gore su tehničke. Prvi sljedeći korak je spojiti Search Console, nakon čega se uvjerljivo može mjeriti učinak.

## Priložen plan

**Ovaj tjedan (bez troška):**
1. Spojiti Google Search Console i predati sitemap; provjeriti koliko je od 112 stranica indeksirano.
2. Otvoriti Google Business Profile i Bing Places.
3. Zamoliti 10 do 20 najvećih partnera za poveznicu na armal.hr.

**Idućih 2 do 4 tjedna:**
4. Dodati FAQ blokove (jamstvo 10 godina, servis, gdje kupiti, održavanje) s odgovarajućim oznakama.
5. Dopuniti meta opise i dodati tablice specifikacija na stranice kolekcija.
6. Wikidata unos.

**Mjesec 2 do 3:**
7. Pisati 8 do 10 novih članaka na stvarne upite kupaca i instalatera (iz Search Consolea).
8. Mjesečni test: 20 do 30 pitanja u ChatGPT/Gemini/Perplexity ("Tko je Armal?", "Gdje kupiti Armal slavine?") i bilježenje točnih odgovora.

## Pokazatelji za praćenje

- Broj indeksiranih stranica naspram 112.
- Prikazi i klikovi iz Googlea za upite s imenom Armal i bez njega.
- Broj različitih stranica koje vode poveznicu na armal.hr.
- Postotak AI odgovora koji ispravno prepoznaju Armal.

## Napomena o prethodnom izvještaju

Datoteka `IZVJESTAJ-vidljivost-armal.hr.md` (isti dan, detaljna tehnička verzija) opisuje stanje **prije** popravaka u zadnja dva commita. Točke 3.1 do 3.4 u njoj (podstranice dijele naslov, apex/www, soft 404, llms.txt) više ne vrijede.
