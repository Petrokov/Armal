import { Link, Navigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { useLanguage } from '../contexts/LanguageContext'
import { buildLocalizedPath } from '../utils/languageRouting'

const UPDATED_AT = '5. svibnja 2026.'

const LEGAL_DOCUMENTS = {
  'privacy-policy': {
    hr: {
      seoTitle: 'Politika privatnosti | Armal',
      seoDescription:
        'Saznajte kako Armal d.o.o. prikuplja, koristi, čuva i štiti osobne podatke korisnika web stranice.',
      eyebrow: 'Zaštita osobnih podataka',
      title: 'Politika privatnosti',
      intro:
        'Ova Politika privatnosti objašnjava kako Armal d.o.o. prikuplja, koristi, čuva i štiti osobne podatke kada koristite web stranicu www.armal.hr, kontaktirate nas ili pošaljete servisni zahtjev.',
      sections: [
        {
          title: 'Voditelj obrade',
          paragraphs: [
            'Voditelj obrade osobnih podataka je Armal d.o.o., Mrkšina 52D, 10000 Zagreb, Hrvatska, OIB: 02300129401.',
            'Za pitanja o obradi osobnih podataka možete nas kontaktirati na info@armal.hr ili servis@armal.hr.',
          ],
        },
        {
          title: 'Koje podatke prikupljamo',
          paragraphs: [
            'Kada koristite web stranicu, možemo obrađivati tehničke podatke poput IP adrese, vrste preglednika, uređaja, jezičnih postavki i podataka potrebnih za sigurnost te pravilno funkcioniranje stranice.',
            'Kada nam se javite putem servisnog obrasca ili e-maila, obrađujemo podatke koje nam sami dostavite, primjerice ime i prezime, e-mail adresu, broj telefona, broj računa, opis upita ili reklamacije te eventualne privitke koje pošaljete.',
          ],
        },
        {
          title: 'Svrhe i pravne osnove obrade',
          paragraphs: [
            'Podatke obrađujemo radi odgovaranja na upite, obrade servisnih i reklamacijskih zahtjeva, komunikacije s korisnicima, poboljšanja sigurnosti web stranice i ispunjavanja zakonskih obveza.',
            'Pravne osnove mogu biti izvršenje ugovora ili postupanje prije sklapanja ugovora, poštivanje zakonskih obveza, legitimni interes za sigurnost i komunikaciju te privola kada je ona potrebna.',
          ],
        },
        {
          title: 'Google Maps i vanjske usluge',
          paragraphs: [
            'Na web stranici koristimo Google Maps za prikaz partnerske mreže i prodajnih mjesta. Prilikom učitavanja karte Google može obrađivati tehničke podatke vašeg preglednika i uređaja te primjenjivati vlastita pravila privatnosti.',
            'Vanjske poveznice, primjerice prema B2B webshopu, Uredi dom webshopu, društvenim mrežama ili Google Maps lokacijama, vode na stranice trećih strana. Za njihovu obradu podataka odgovorni su njihovi upravitelji.',
          ],
        },
        {
          title: 'Primatelji podataka',
          paragraphs: [
            'Osobne podatke mogu obrađivati naši zaposlenici i ovlašteni pružatelji usluga koji nam pomažu u održavanju web stranice, hostingu, e-mail komunikaciji, IT sigurnosti i obradi servisnih zahtjeva.',
            'Podatke ne prodajemo trećim stranama. Podatke dijelimo samo kada je to potrebno za navedene svrhe, kada smo na to obvezani zakonom ili kada ste za to dali valjanu privolu.',
          ],
        },
        {
          title: 'Rokovi čuvanja',
          paragraphs: [
            'Podatke čuvamo onoliko dugo koliko je potrebno za svrhu za koju su prikupljeni, odnosno koliko zahtijevaju primjenjivi propisi.',
            'Podaci iz servisnih i reklamacijskih zahtjeva mogu se čuvati tijekom trajanja obrade zahtjeva i nakon toga u razdoblju potrebnom za dokazivanje ispunjenja obveza, rješavanje sporova ili poštivanje zakonskih rokova.',
          ],
        },
        {
          title: 'Vaša prava',
          paragraphs: [
            'U skladu s GDPR-om možete zatražiti pristup svojim osobnim podacima, ispravak netočnih podataka, brisanje, ograničenje obrade, prijenos podataka, prigovor na obradu te povlačenje privole kada se obrada temelji na privoli.',
            'Za ostvarivanje prava obratite nam se na info@armal.hr. Ako smatrate da obrada nije zakonita, imate pravo podnijeti prigovor nadzornom tijelu za zaštitu osobnih podataka.',
          ],
        },
      ],
    },
    slo: {
      seoTitle: 'Politika zasebnosti | Armal',
      seoDescription:
        'Preberite, kako Armal d.o.o. zbira, uporablja, hrani in varuje osebne podatke uporabnikov spletnega mesta.',
      eyebrow: 'Varstvo osebnih podatkov',
      title: 'Politika zasebnosti',
      intro:
        'Ta Politika zasebnosti pojasnjuje, kako Armal d.o.o. zbira, uporablja, hrani in varuje osebne podatke, ko uporabljate spletno mesto www.armal.hr, nas kontaktirate ali oddate servisni zahtevek.',
      sections: [
        {
          title: 'Upravljavec obdelave',
          paragraphs: [
            'Upravljavec osebnih podatkov je Armal d.o.o., Mrkšina 52D, 10000 Zagreb, Hrvaška, OIB: 02300129401.',
            'Za vprašanja o obdelavi osebnih podatkov nas lahko kontaktirate na info@armal.hr ali servis@armal.hr.',
          ],
        },
        {
          title: 'Katere podatke zbiramo',
          paragraphs: [
            'Pri uporabi spletnega mesta lahko obdelujemo tehnične podatke, kot so IP naslov, vrsta brskalnika, naprava, jezikovne nastavitve in podatki, potrebni za varnost ter pravilno delovanje strani.',
            'Ko nas kontaktirate prek servisnega obrazca ali e-pošte, obdelujemo podatke, ki nam jih sami posredujete, na primer ime in priimek, e-poštni naslov, telefonsko številko, številko računa, opis vprašanja ali reklamacije ter morebitne priloge.',
          ],
        },
        {
          title: 'Nameni in pravne podlage',
          paragraphs: [
            'Podatke obdelujemo za odgovarjanje na vprašanja, obdelavo servisnih in reklamacijskih zahtevkov, komunikacijo z uporabniki, izboljšanje varnosti spletnega mesta in izpolnjevanje zakonskih obveznosti.',
            'Pravne podlage lahko vključujejo izvajanje pogodbe ali ukrepe pred sklenitvijo pogodbe, izpolnjevanje zakonskih obveznosti, zakoniti interes za varnost in komunikacijo ter privolitev, kadar je potrebna.',
          ],
        },
        {
          title: 'Google Maps in zunanje storitve',
          paragraphs: [
            'Na spletnem mestu uporabljamo Google Maps za prikaz partnerske mreže in prodajnih mest. Ob nalaganju zemljevida lahko Google obdeluje tehnične podatke vašega brskalnika in naprave ter uporablja svoja pravila zasebnosti.',
            'Zunanje povezave, na primer do B2B spletne trgovine, Uredi dom spletne trgovine, družbenih omrežij ali Google Maps lokacij, vodijo na strani tretjih oseb. Za njihovo obdelavo podatkov so odgovorni njihovi upravljavci.',
          ],
        },
        {
          title: 'Prejemniki podatkov',
          paragraphs: [
            'Osebne podatke lahko obdelujejo naši zaposleni in pooblaščeni ponudniki storitev, ki nam pomagajo pri vzdrževanju spletnega mesta, gostovanju, e-poštni komunikaciji, IT varnosti in obdelavi servisnih zahtevkov.',
            'Podatkov ne prodajamo tretjim osebam. Delimo jih samo, kadar je to potrebno za navedene namene, kadar to zahteva zakon ali kadar ste za to dali veljavno privolitev.',
          ],
        },
        {
          title: 'Roki hrambe',
          paragraphs: [
            'Podatke hranimo toliko časa, kolikor je potrebno za namen, za katerega so bili zbrani, oziroma kolikor zahtevajo veljavni predpisi.',
            'Podatki iz servisnih in reklamacijskih zahtevkov se lahko hranijo med obdelavo zahtevka in nato v obdobju, potrebnem za dokazovanje izpolnitve obveznosti, reševanje sporov ali spoštovanje zakonskih rokov.',
          ],
        },
        {
          title: 'Vaše pravice',
          paragraphs: [
            'V skladu z GDPR lahko zahtevate dostop do svojih osebnih podatkov, popravek netočnih podatkov, izbris, omejitev obdelave, prenos podatkov, ugovor obdelavi ter preklic privolitve, kadar obdelava temelji na privolitvi.',
            'Za uveljavljanje pravic nam pišite na info@armal.hr. Če menite, da obdelava ni zakonita, imate pravico vložiti pritožbo pri nadzornem organu za varstvo osebnih podatkov.',
          ],
        },
      ],
    },
    rs: {
      seoTitle: 'Politika privatnosti | Armal',
      seoDescription:
        'Saznajte kako Armal d.o.o. prikuplja, koristi, čuva i štiti lične podatke korisnika web sajta.',
      eyebrow: 'Zaštita ličnih podataka',
      title: 'Politika privatnosti',
      intro:
        'Ova Politika privatnosti objašnjava kako Armal d.o.o. prikuplja, koristi, čuva i štiti lične podatke kada koristite web sajt www.armal.hr, kontaktirate nas ili pošaljete servisni zahtev.',
      sections: [
        {
          title: 'Rukovalac podataka',
          paragraphs: [
            'Rukovalac ličnih podataka je Armal d.o.o., Mrkšina 52D, 10000 Zagreb, Hrvatska, OIB: 02300129401.',
            'Za pitanja o obradi ličnih podataka možete nas kontaktirati na info@armal.hr ili servis@armal.hr.',
          ],
        },
        {
          title: 'Koje podatke prikupljamo',
          paragraphs: [
            'Kada koristite web sajt, možemo obrađivati tehničke podatke kao što su IP adresa, tip pregledača, uređaj, jezička podešavanja i podaci potrebni za bezbednost i pravilno funkcionisanje sajta.',
            'Kada nam se javite putem servisnog obrasca ili e-maila, obrađujemo podatke koje nam sami dostavite, na primer ime i prezime, e-mail adresu, broj telefona, broj računa, opis upita ili reklamacije i eventualne priloge.',
          ],
        },
        {
          title: 'Svrhe i pravni osnovi obrade',
          paragraphs: [
            'Podatke obrađujemo radi odgovaranja na upite, obrade servisnih i reklamacionih zahteva, komunikacije s korisnicima, poboljšanja bezbednosti web sajta i ispunjavanja zakonskih obaveza.',
            'Pravni osnovi mogu biti izvršenje ugovora ili radnje pre zaključenja ugovora, poštovanje zakonskih obaveza, legitimni interes za bezbednost i komunikaciju, kao i pristanak kada je potreban.',
          ],
        },
        {
          title: 'Google Maps i spoljne usluge',
          paragraphs: [
            'Na web sajtu koristimo Google Maps za prikaz partnerske mreže i prodajnih mesta. Prilikom učitavanja mape Google može obrađivati tehničke podatke vašeg pregledača i uređaja i primenjivati sopstvena pravila privatnosti.',
            'Spoljne veze, na primer ka B2B webshopu, Uredi dom webshopu, društvenim mrežama ili Google Maps lokacijama, vode na stranice trećih strana. Za njihovu obradu podataka odgovorni su njihovi upravljači.',
          ],
        },
        {
          title: 'Primaoci podataka',
          paragraphs: [
            'Lične podatke mogu obrađivati naši zaposleni i ovlašćeni pružaoci usluga koji nam pomažu u održavanju web sajta, hostingu, e-mail komunikaciji, IT bezbednosti i obradi servisnih zahteva.',
            'Podatke ne prodajemo trećim stranama. Delimo ih samo kada je to potrebno za navedene svrhe, kada smo na to obavezani zakonom ili kada ste za to dali važeći pristanak.',
          ],
        },
        {
          title: 'Rokovi čuvanja',
          paragraphs: [
            'Podatke čuvamo onoliko dugo koliko je potrebno za svrhu za koju su prikupljeni, odnosno koliko zahtevaju primenjivi propisi.',
            'Podaci iz servisnih i reklamacionih zahteva mogu se čuvati tokom obrade zahteva i nakon toga u periodu potrebnom za dokazivanje ispunjenja obaveza, rešavanje sporova ili poštovanje zakonskih rokova.',
          ],
        },
        {
          title: 'Vaša prava',
          paragraphs: [
            'U skladu sa GDPR-om možete zatražiti pristup svojim ličnim podacima, ispravku netačnih podataka, brisanje, ograničenje obrade, prenos podataka, prigovor na obradu i povlačenje pristanka kada se obrada zasniva na pristanku.',
            'Za ostvarivanje prava obratite nam se na info@armal.hr. Ako smatrate da obrada nije zakonita, imate pravo da podnesete prigovor nadzornom organu za zaštitu ličnih podataka.',
          ],
        },
      ],
    },
  },
  'terms-of-service': {
    hr: {
      seoTitle: 'Uvjeti korištenja | Armal',
      seoDescription:
        'Uvjeti korištenja web stranice Armal, informacija o proizvodima, katalozima, vanjskim poveznicama i ogranicenju odgovornosti.',
      eyebrow: 'Uvjeti web stranice',
      title: 'Uvjeti korištenja',
      intro:
        'Ovi Uvjeti korištenja uređuju pristup i korištenje web stranice www.armal.hr. Korištenjem stranice potvrđujete da ste upoznati s ovim uvjetima.',
      sections: [
        {
          title: 'Informativni karakter sadržaja',
          paragraphs: [
            'Sadržaj na web stranici služi za predstavljanje Armal proizvoda, kataloga, inspiracije, servisnih informacija i partnerske mreže.',
            'Nastojimo da informacije budu točne i ažurne, ali prikazi proizvoda, boje, tehnički opisi, dostupnost i cijene mogu se razlikovati od stvarnog stanja ili ponude pojedinog prodajnog mjesta.',
          ],
        },
        {
          title: 'Proizvodi, katalozi i vanjske trgovine',
          paragraphs: [
            'Katalozi i opisi proizvoda dostupni su u informativne svrhe. Za konačne tehničke specifikacije, uvjete kupnje, dostupnost i cijene obratite se ovlaštenom prodajnom mjestu ili službenim prodajnim kanalima.',
            'Poveznice prema B2B webshopu, Uredi dom webshopu i drugim vanjskim stranicama vode na sustave kojima upravljaju treće strane ili povezani partneri. Njihovi uvjeti korištenja primjenjuju se na korištenje tih stranica.',
          ],
        },
        {
          title: 'Servisni zahtjevi',
          paragraphs: [
            'Slanjem servisnog ili reklamacijskog zahtjeva potvrđujete da su dostavljeni podaci točni i da ste ovlašteni poslati dokumentaciju ili fotografije koje prilažete.',
            'Zaprimanje zahtjeva putem web stranice ne znači automatsko prihvaćanje reklamacije. Svaki zahtjev obrađuje se u skladu s primjenjivim propisima, jamstvenim uvjetima i dostavljenom dokumentacijom.',
          ],
        },
        {
          title: 'Intelektualno vlasništvo',
          paragraphs: [
            'Tekstovi, fotografije, grafike, logotipi, katalozi, dizajn i drugi sadržaji na web stranici zaštićeni su pravima intelektualnog vlasništva.',
            'Sadržaj se smije koristiti samo za osobnu i informativnu svrhu, osim ako je Armal d.o.o. izričito odobrio drukčije korištenje.',
          ],
        },
        {
          title: 'Dopušteno korištenje',
          paragraphs: [
            'Zabranjeno je koristiti web stranicu na način koji može narušiti njezinu sigurnost, dostupnost, funkcionalnost ili prava drugih korisnika i trećih osoba.',
            'Ne smijete slati zlonamjerni kod, automatizirano preopterećivati sustav, pokušavati neovlašten pristup ili koristiti obrasce za spam i prijevarne aktivnosti.',
          ],
        },
        {
          title: 'Ograničenje odgovornosti',
          paragraphs: [
            'Armal d.o.o. ne odgovara za štetu nastalu korištenjem ili nemogućnošću korištenja web stranice, osim u mjeri u kojoj je odgovornost propisana primjenjivim pravom.',
            'Ne odgovaramo za sadržaj, dostupnost ili sigurnost vanjskih stranica na koje web stranica upućuje.',
          ],
        },
        {
          title: 'Izmjene uvjeta',
          paragraphs: [
            'Zadržavamo pravo povremeno izmijeniti ove Uvjete korištenja. Važeća verzija bit će objavljena na ovoj stranici s navedenim datumom zadnjeg ažuriranja.',
          ],
        },
      ],
    },
    slo: {
      seoTitle: 'Pogoji uporabe | Armal',
      seoDescription:
        'Pogoji uporabe spletnega mesta Armal, informacij o izdelkih, katalogih, zunanjih povezavah in omejitvi odgovornosti.',
      eyebrow: 'Pogoji spletnega mesta',
      title: 'Pogoji uporabe',
      intro:
        'Ti Pogoji uporabe urejajo dostop do spletnega mesta www.armal.hr in njegovo uporabo. Z uporabo strani potrjujete, da ste seznanjeni s temi pogoji.',
      sections: [
        {
          title: 'Informativna narava vsebine',
          paragraphs: [
            'Vsebina na spletnem mestu je namenjena predstavitvi izdelkov Armal, katalogov, navdiha, servisnih informacij in partnerske mreže.',
            'Prizadevamo si, da so informacije točne in ažurne, vendar se prikazi izdelkov, barve, tehnični opisi, razpoložljivost in cene lahko razlikujejo od dejanskega stanja ali ponudbe posameznega prodajnega mesta.',
          ],
        },
        {
          title: 'Izdelki, katalogi in zunanje trgovine',
          paragraphs: [
            'Katalogi in opisi izdelkov so na voljo v informativne namene. Za končne tehnične specifikacije, pogoje nakupa, razpoložljivost in cene se obrnite na pooblaščeno prodajno mesto ali uradne prodajne kanale.',
            'Povezave do B2B spletne trgovine, Uredi dom spletne trgovine in drugih zunanjih strani vodijo na sisteme, ki jih upravljajo tretje osebe ali povezani partnerji. Za uporabo teh strani veljajo njihovi pogoji uporabe.',
          ],
        },
        {
          title: 'Servisni zahtevki',
          paragraphs: [
            'Z oddajo servisnega ali reklamacijskega zahtevka potrjujete, da so posredovani podatki točni in da ste pooblaščeni poslati dokumentacijo ali fotografije, ki jih prilagate.',
            'Prejem zahtevka prek spletnega mesta ne pomeni samodejnega sprejema reklamacije. Vsak zahtevek se obravnava v skladu z veljavnimi predpisi, garancijskimi pogoji in predloženo dokumentacijo.',
          ],
        },
        {
          title: 'Intelektualna lastnina',
          paragraphs: [
            'Besedila, fotografije, grafike, logotipi, katalogi, oblikovanje in druge vsebine na spletnem mestu so varovani s pravicami intelektualne lastnine.',
            'Vsebina se sme uporabljati samo za osebne in informativne namene, razen če je Armal d.o.o. izrecno dovolil drugačno uporabo.',
          ],
        },
        {
          title: 'Dovoljena uporaba',
          paragraphs: [
            'Spletnega mesta ni dovoljeno uporabljati na način, ki lahko ogrozi njegovo varnost, dostopnost, delovanje ali pravice drugih uporabnikov in tretjih oseb.',
            'Prepovedano je pošiljati zlonamerno kodo, avtomatizirano preobremenjevati sistem, poskušati nepooblaščen dostop ali uporabljati obrazce za spam in goljufive aktivnosti.',
          ],
        },
        {
          title: 'Omejitev odgovornosti',
          paragraphs: [
            'Armal d.o.o. ne odgovarja za škodo, nastalo zaradi uporabe ali nezmožnosti uporabe spletnega mesta, razen v obsegu, ki ga določa veljavno pravo.',
            'Ne odgovarjamo za vsebino, dostopnost ali varnost zunanjih strani, na katere spletno mesto napotuje.',
          ],
        },
        {
          title: 'Spremembe pogojev',
          paragraphs: [
            'Pridržujemo si pravico, da te Pogoje uporabe občasno spremenimo. Veljavna različica bo objavljena na tej strani z datumom zadnje posodobitve.',
          ],
        },
      ],
    },
    rs: {
      seoTitle: 'Uslovi korišćenja | Armal',
      seoDescription:
        'Uslovi korišćenja Armal web sajta, informacija o proizvodima, katalozima, spoljnim linkovima i ograničenju odgovornosti.',
      eyebrow: 'Uslovi web sajta',
      title: 'Uslovi korišćenja',
      intro:
        'Ovi Uslovi korišćenja uređuju pristup i korišćenje web sajta www.armal.hr. Korišćenjem sajta potvrđujete da ste upoznati s ovim uslovima.',
      sections: [
        {
          title: 'Informativni karakter sadržaja',
          paragraphs: [
            'Sadržaj na web sajtu služi za predstavljanje Armal proizvoda, kataloga, inspiracije, servisnih informacija i partnerske mreže.',
            'Nastojimo da informacije budu tačne i ažurne, ali prikazi proizvoda, boje, tehnički opisi, dostupnost i cene mogu se razlikovati od stvarnog stanja ili ponude pojedinačnog prodajnog mesta.',
          ],
        },
        {
          title: 'Proizvodi, katalozi i spoljne prodavnice',
          paragraphs: [
            'Katalozi i opisi proizvoda dostupni su u informativne svrhe. Za konačne tehničke specifikacije, uslove kupovine, dostupnost i cene obratite se ovlašćenom prodajnom mestu ili zvaničnim prodajnim kanalima.',
            'Linkovi ka B2B webshopu, Uredi dom webshopu i drugim spoljnim stranicama vode na sisteme kojima upravljaju treće strane ili povezani partneri. Njihovi uslovi korišćenja primenjuju se na korišćenje tih stranica.',
          ],
        },
        {
          title: 'Servisni zahtevi',
          paragraphs: [
            'Slanjem servisnog ili reklamacionog zahteva potvrđujete da su dostavljeni podaci tačni i da ste ovlašćeni da pošaljete dokumentaciju ili fotografije koje prilažete.',
            'Prijem zahteva putem web sajta ne znači automatsko prihvatanje reklamacije. Svaki zahtev obrađuje se u skladu s primenjivim propisima, garancijskim uslovima i dostavljenom dokumentacijom.',
          ],
        },
        {
          title: 'Intelektualna svojina',
          paragraphs: [
            'Tekstovi, fotografije, grafike, logotipi, katalozi, dizajn i drugi sadržaji na web sajtu zaštićeni su pravima intelektualne svojine.',
            'Sadržaj se sme koristiti samo za ličnu i informativnu svrhu, osim ako je Armal d.o.o. izričito odobrio drugačije korišćenje.',
          ],
        },
        {
          title: 'Dozvoljeno korišćenje',
          paragraphs: [
            'Zabranjeno je koristiti web sajt na način koji može narušiti njegovu bezbednost, dostupnost, funkcionalnost ili prava drugih korisnika i trećih lica.',
            'Ne smete slati zlonamerni kod, automatizovano preopterećivati sistem, pokušavati neovlašćen pristup ili koristiti obrasce za spam i prevarne aktivnosti.',
          ],
        },
        {
          title: 'Ograničenje odgovornosti',
          paragraphs: [
            'Armal d.o.o. ne odgovara za štetu nastalu korišćenjem ili nemogućnošću korišćenja web sajta, osim u meri u kojoj je odgovornost propisana primenjivim pravom.',
            'Ne odgovaramo za sadržaj, dostupnost ili bezbednost spoljnih stranica na koje web sajt upućuje.',
          ],
        },
        {
          title: 'Izmene uslova',
          paragraphs: [
            'Zadržavamo pravo da povremeno izmenimo ove Uslove korišćenja. Važeća verzija biće objavljena na ovoj stranici s navedenim datumom poslednjeg ažuriranja.',
          ],
        },
      ],
    },
  },
  'cookie-policy': {
    hr: {
      seoTitle: 'Politika kolačića | Armal',
      seoDescription:
        'Informacije o tome koje kolačiće i slične tehnologije koristi web stranica Armal i kako njima možete upravljati.',
      eyebrow: 'Kolačići i slične tehnologije',
      title: 'Politika kolačića',
      intro:
        'Ova Politika kolačića objašnjava koje kolačiće i slične tehnologije može koristiti web stranica www.armal.hr te kako njima možete upravljati.',
      sections: [
        {
          title: 'Što su kolačići',
          paragraphs: [
            'Kolačići su male tekstualne datoteke koje web stranica ili vanjska usluga može pohraniti na vaš uređaj. Koriste se kako bi stranica radila pravilno, zapamtila određene postavke ili omogućila vanjske funkcionalnosti.',
          ],
        },
        {
          title: 'Kolačići i pohrana koje koristimo',
          paragraphs: [
            'Web stranica može koristiti nužne tehničke mehanizme potrebne za pravilno prikazivanje, sigurnost, navigaciju i jezične postavke. Odabir jezika može se spremiti u lokalnu pohranu preglednika kako bi se zadržala vaša preferencija.',
            'Ako koristite ugrađenu Google Maps kartu, Google može postaviti kolačiće ili koristiti slične tehnologije radi prikaza karte, sigurnosti, mjerenja performansi i sprječavanja zlouporabe.',
          ],
        },
        {
          title: 'Analitika i marketing',
          paragraphs: [
            'U trenutnoj osnovnoj funkcionalnosti web stranice ne oslanjamo se na vlastite marketinške kolačiće. Ako se naknadno uvedu analitički ili marketinški alati, ova politika treba se ažurirati i po potrebi omogućiti odgovarajuće upravljanje privolama.',
          ],
        },
        {
          title: 'Kako upravljati kolačićima',
          paragraphs: [
            'Kolačiće možete kontrolirati ili izbrisati u postavkama svojeg preglednika. Možete blokirati sve kolačiće ili postaviti upozorenje prije njihova spremanja.',
            'Ako blokirate nužne ili vanjske kolačiće, pojedini dijelovi web stranice, uključujući Google Maps kartu, možda neće raditi ispravno.',
          ],
        },
        {
          title: 'Promjene ove politike',
          paragraphs: [
            'Ovu Politiku kolačića možemo povremeno ažurirati kako bismo odrazili promjene na web stranici, tehnologijama koje koristimo ili primjenjivim pravilima.',
          ],
        },
      ],
    },
    slo: {
      seoTitle: 'Politika piškotkov | Armal',
      seoDescription:
        'Informacije o piškotkih in podobnih tehnologijah, ki jih uporablja spletno mesto Armal, ter kako jih lahko upravljate.',
      eyebrow: 'Piškotki in podobne tehnologije',
      title: 'Politika piškotkov',
      intro:
        'Ta Politika piškotkov pojasnjuje, katere piškotke in podobne tehnologije lahko uporablja spletno mesto www.armal.hr ter kako jih lahko upravljate.',
      sections: [
        {
          title: 'Kaj so piškotki',
          paragraphs: [
            'Piškotki so majhne besedilne datoteke, ki jih lahko spletno mesto ali zunanja storitev shrani na vašo napravo. Uporabljajo se za pravilno delovanje strani, shranjevanje določenih nastavitev ali omogočanje zunanjih funkcionalnosti.',
          ],
        },
        {
          title: 'Piškotki in shranjevanje, ki jih uporabljamo',
          paragraphs: [
            'Spletno mesto lahko uporablja nujne tehnične mehanizme, potrebne za pravilen prikaz, varnost, navigacijo in jezikovne nastavitve. Izbira jezika se lahko shrani v lokalno shrambo brskalnika, da se ohrani vaša nastavitev.',
            'Če uporabljate vgrajen zemljevid Google Maps, lahko Google nastavi piškotke ali uporablja podobne tehnologije za prikaz zemljevida, varnost, merjenje zmogljivosti in preprečevanje zlorab.',
          ],
        },
        {
          title: 'Analitika in marketing',
          paragraphs: [
            'V trenutni osnovni funkcionalnosti spletnega mesta se ne zanašamo na lastne marketinške piškotke. Če bodo kasneje uvedena analitična ali marketinška orodja, je treba to politiko posodobiti in po potrebi omogočiti ustrezno upravljanje privolitev.',
          ],
        },
        {
          title: 'Kako upravljati piškotke',
          paragraphs: [
            'Piškotke lahko nadzorujete ali izbrišete v nastavitvah svojega brskalnika. Lahko blokirate vse piškotke ali nastavite opozorilo pred njihovim shranjevanjem.',
            'Če blokirate nujne ali zunanje piškotke, posamezni deli spletnega mesta, vključno z zemljevidom Google Maps, morda ne bodo delovali pravilno.',
          ],
        },
        {
          title: 'Spremembe te politike',
          paragraphs: [
            'To Politiko piškotkov lahko občasno posodobimo, da odraža spremembe spletnega mesta, tehnologij, ki jih uporabljamo, ali veljavnih pravil.',
          ],
        },
      ],
    },
    rs: {
      seoTitle: 'Politika kolačića | Armal',
      seoDescription:
        'Informacije o tome koje kolačiće i slične tehnologije koristi Armal web sajt i kako njima možete upravljati.',
      eyebrow: 'Kolačići i slične tehnologije',
      title: 'Politika kolačića',
      intro:
        'Ova Politika kolačića objašnjava koje kolačiće i slične tehnologije može koristiti web sajt www.armal.hr i kako njima možete upravljati.',
      sections: [
        {
          title: 'Šta su kolačići',
          paragraphs: [
            'Kolačići su male tekstualne datoteke koje web sajt ili spoljna usluga može sačuvati na vašem uređaju. Koriste se kako bi sajt radio pravilno, zapamtio određena podešavanja ili omogućio spoljne funkcionalnosti.',
          ],
        },
        {
          title: 'Kolačići i skladištenje koje koristimo',
          paragraphs: [
            'Web sajt može koristiti neophodne tehničke mehanizme potrebne za pravilno prikazivanje, bezbednost, navigaciju i jezička podešavanja. Izbor jezika može se sačuvati u lokalnoj memoriji pregledača kako bi se zadržala vaša preferencija.',
            'Ako koristite ugrađenu Google Maps mapu, Google može postaviti kolačiće ili koristiti slične tehnologije radi prikaza mape, bezbednosti, merenja performansi i sprečavanja zloupotrebe.',
          ],
        },
        {
          title: 'Analitika i marketing',
          paragraphs: [
            'U trenutnoj osnovnoj funkcionalnosti web sajta ne oslanjamo se na sopstvene marketinške kolačiće. Ako se naknadno uvedu analitički ili marketinški alati, ovu politiku treba ažurirati i po potrebi omogućiti odgovarajuće upravljanje pristancima.',
          ],
        },
        {
          title: 'Kako upravljati kolačićima',
          paragraphs: [
            'Kolačiće možete kontrolisati ili obrisati u podešavanjima svog pregledača. Možete blokirati sve kolačiće ili podesiti upozorenje pre njihovog čuvanja.',
            'Ako blokirate neophodne ili spoljne kolačiće, pojedini delovi web sajta, uključujući Google Maps mapu, možda neće raditi pravilno.',
          ],
        },
        {
          title: 'Promene ove politike',
          paragraphs: [
            'Ovu Politiku kolačića možemo povremeno ažurirati kako bismo odrazili promene na web sajtu, tehnologijama koje koristimo ili primenjivim pravilima.',
          ],
        },
      ],
    },
  },
}

const RELATED_LINKS = [
  { slug: 'privacy-policy', label: { hr: 'Politika privatnosti', slo: 'Politika zasebnosti', rs: 'Politika privatnosti' } },
  { slug: 'terms-of-service', label: { hr: 'Uvjeti korištenja', slo: 'Pogoji uporabe', rs: 'Uslovi korišćenja' } },
  { slug: 'cookie-policy', label: { hr: 'Politika kolačića', slo: 'Politika piškotkov', rs: 'Politika kolačića' } },
]

const LegalPage = ({ type }) => {
  const { language } = useLanguage()
  const document = LEGAL_DOCUMENTS[type]?.[language] || LEGAL_DOCUMENTS[type]?.hr

  if (!document) {
    return <Navigate to={buildLocalizedPath('/', language)} replace />
  }

  const updatedLabel =
    language === 'slo'
      ? 'Zadnja posodobitev'
      : language === 'rs'
        ? 'Poslednje ažuriranje'
        : 'Zadnje ažuriranje'

  const contactLabel = language === 'slo' ? 'Kontakt' : 'Kontakt'
  const relatedLabel =
    language === 'slo'
      ? 'Povezani dokumenti'
      : language === 'rs'
        ? 'Povezani dokumenti'
        : 'Povezani dokumenti'

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead title={document.seoTitle} description={document.seoDescription} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0070CD]">
            {document.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {document.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            {document.intro}
          </p>
          <p className="mt-6 text-sm font-medium text-slate-500">
            {updatedLabel}: {UPDATED_AT}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1fr_260px]">
        <article className="space-y-8">
          {document.sections.map((section) => (
            <section key={section.title} className="border-b border-slate-200 pb-8 last:border-b-0">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {relatedLabel}
            </h2>
            <nav className="mt-4 flex flex-col gap-2">
              {RELATED_LINKS.map((link) => (
                <Link
                  key={link.slug}
                  to={buildLocalizedPath(`/${link.slug}`, language)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    type === link.slug
                      ? 'bg-[#0070CD]/10 text-[#0070CD]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0070CD]'
                  }`}
                >
                  {link.label[language] || link.label.hr}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {contactLabel}
              </h2>
              <a
                href="mailto:info@armal.hr"
                className="mt-3 block text-sm font-semibold text-slate-700 hover:text-[#0070CD]"
              >
                info@armal.hr
              </a>
              <a
                href="mailto:servis@armal.hr"
                className="mt-2 block text-sm font-semibold text-slate-700 hover:text-[#0070CD]"
              >
                servis@armal.hr
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default LegalPage
