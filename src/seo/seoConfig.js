const FALLBACK_LANG = 'hr'

export const SEO_ROUTE_KEYS = {
  HOME: 'home',
  ABOUT: 'about',
  SERVICE: 'service',
  PRODUCTS: 'products',
  FAUCETS: 'faucets',
  BLOG: 'blog',
  BATHING: 'bathing',
  SANITARY: 'sanitary',
  CATALOGS: 'catalogs',
  NOT_FOUND: 'notFound',
}

const seoConfig = {
  [SEO_ROUTE_KEYS.HOME]: {
    hr: {
      title: 'Armal - Vrhunski kupaonski namještaj i slavine',
      description: 'Armal iz Zagreba: slavine, tuš sustavi, sanitarije i kupaonski namještaj za Hrvatsku, Sloveniju, Srbiju i BiH. 10 godina jamstva na odabrane proizvode.',
      ogType: 'website',
    },
    slo: {
      title: 'Armal - Vrhunski kopalniski izdelki in armature',
      description: 'Armal iz Zagreba: armature, tuš sistemi, sanitarije in kopalniško pohištvo za Hrvaško, Slovenijo, Srbijo in BiH. 10 let garancije na izbrane izdelke.',
      ogType: 'website',
    },
    rs: {
      title: 'Armal - Vrhunski kupatilski namestaj i slavine',
      description: 'Armal iz Zagreba: slavine, tuš sistemi, sanitarije i kupatilski nameštaj za Hrvatsku, Sloveniju, Srbiju i BiH. 10 godina garancije na odabrane proizvode.',
      ogType: 'website',
    },
    eng: {
      title: 'Armal - Premium bathroom furniture and faucets',
      description: 'Armal from Zagreb: faucets, shower systems, sanitary ware and bathroom furniture for Croatia, Slovenia, Serbia and Bosnia. 10-year warranty on selected items.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.ABOUT]: {
    hr: {
      title: 'O nama | Armal',
      description: 'Upoznajte Armal d.o.o. iz Zagreba: našu priču, vrijednosti i tim koji stoji iza slavina, tuš sustava i kupaonskih rješenja za Hrvatsku i regiju.',
      ogType: 'website',
    },
    slo: {
      title: 'O nas | Armal',
      description: 'Spoznajte Armal d.o.o. iz Zagreba: našo zgodbo, vrednote in ekipo, ki stoji za armaturami, tuš sistemi in kopalniškimi rešitvami za Hrvaško in regijo.',
      ogType: 'website',
    },
    rs: {
      title: 'O nama | Armal',
      description: 'Upoznajte Armal d.o.o. iz Zagreba: našu priču, vrednosti i tim koji stoji iza slavina, tuš sistema i kupatilskih rešenja za Hrvatsku i region.',
      ogType: 'website',
    },
    eng: {
      title: 'About us | Armal',
      description: 'Meet Armal d.o.o. from Zagreb: our story, values and the team behind the faucets, shower systems and bathroom solutions we supply across Croatia and the region.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.SERVICE]: {
    hr: {
      title: 'Servis | Armal',
      description: 'Servis za Armal proizvode: prijavite servisni zahtjev putem obrasca ili na servis@armal.hr. Podrška za slavine, tuš sustave i sanitarije nakon kupnje.',
      ogType: 'website',
    },
    slo: {
      title: 'Servis | Armal',
      description: 'Servis za izdelke Armal: oddajte servisni zahtevek prek obrazca ali na servis@armal.hr. Podpora za armature, tuš sisteme in sanitarije po nakupu.',
      ogType: 'website',
    },
    rs: {
      title: 'Servis | Armal',
      description: 'Servis za Armal proizvode: prijavite servisni zahtev putem obrasca ili na servis@armal.hr. Podrška za slavine, tuš sisteme i sanitarije nakon kupovine.',
      ogType: 'website',
    },
    eng: {
      title: 'Service | Armal',
      description: 'Armal product service: submit a service request through the form or at servis@armal.hr. After-sales support for faucets, shower systems and sanitary ware.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.PRODUCTS]: {
    hr: {
      title: 'Proizvodi | Armal',
      description: 'Pregledajte Armal proizvode: slavine, kade i tuš kabine, sanitarije i kupaonski namještaj. Pronađite kolekciju za svoju kupaonicu i preuzmite kataloge.',
      ogType: 'website',
    },
    slo: {
      title: 'Izdelki | Armal',
      description: 'Oglejte si izdelke Armal: armature, kadi in tuš kabine, sanitarije in kopalniško pohištvo. Poiščite kolekcijo za svojo kopalnico in prenesite kataloge.',
      ogType: 'website',
    },
    rs: {
      title: 'Proizvodi | Armal',
      description: 'Pogledajte Armal proizvode: slavine, kade i tuš kabine, sanitarije i kupatilski nameštaj. Pronađite kolekciju za svoje kupatilo i preuzmite kataloge.',
      ogType: 'website',
    },
    eng: {
      title: 'Products | Armal',
      description: 'Browse Armal products: faucets, bathtubs and shower enclosures, sanitary ware and bathroom furniture. Find the right collection and download the catalogues.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.FAUCETS]: {
    hr: {
      title: 'Slavine | Armal',
      description: 'Armal slavine i miješalice za vodu: kolekcije Rubi, Topaz, Violet, Start, Opal, Safir, Beril, Lapis, Ana i Jana. Odaberite model za umivaonik, tuš ili kadu.',
      ogType: 'website',
    },
    slo: {
      title: 'Armature | Armal',
      description: 'Armal armature in mešalne baterije: kolekcije Rubi, Topaz, Violet, Start, Opal, Safir, Beril, Lapis, Ana in Jana. Izberite model za umivalnik, tuš ali kad.',
      ogType: 'website',
    },
    rs: {
      title: 'Slavine | Armal',
      description: 'Armal slavine i mešalice za vodu: kolekcije Rubi, Topaz, Violet, Start, Opal, Safir, Beril, Lapis, Ana i Jana. Izaberite model za lavabo, tuš ili kadu.',
      ogType: 'website',
    },
    eng: {
      title: 'Faucets | Armal',
      description: 'Armal faucets and water mixers: Rubi, Topaz, Violet, Start, Opal, Safir, Beril, Lapis, Ana and Jana collections. Choose a model for basin, shower or bath.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.BLOG]: {
    hr: {
      title: 'Blog | Armal',
      description: 'Armal blog: praktični savjeti za održavanje i čišćenje kupaonice, renovaciju, energetsku učinkovitost i dizajn, te novosti za kupce i instalatere.',
      ogType: 'website',
    },
    slo: {
      title: 'Blog | Armal',
      description: 'Blog Armal: nasveti za vzdrževanje in čiščenje kopalnice, prenovo, energetsko učinkovitost in oblikovanje ter novice za kupce in inštalaterje.',
      ogType: 'website',
    },
    rs: {
      title: 'Blog | Armal',
      description: 'Armal blog: praktični saveti za održavanje i čišćenje kupatila, renovaciju, energetsku efikasnost i dizajn, te novosti za kupce i instalatere.',
      ogType: 'website',
    },
    eng: {
      title: 'Blog | Armal',
      description: 'Armal blog: practical tips on bathroom care and cleaning, renovation, energy efficiency and design, plus news for customers and trade installers.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.BATHING]: {
    hr: {
      title: 'Kupanje i tuširanje | Armal',
      description: 'Armal kade, tuš kabine, walk-in stijenke i tuš sustavi za moderne kupaonice svih veličina. Pregledajte asortiman, preuzmite kataloge i odaberite model.',
      ogType: 'website',
    },
    slo: {
      title: 'Kopanje in tuširanje | Armal',
      description: 'Armal kadi, tuš kabine, walk-in stene in tuš sistemi za sodobne kopalnice vseh velikosti. Oglejte si ponudbo, prenesite kataloge in izberite model.',
      ogType: 'website',
    },
    rs: {
      title: 'Kupanje i tuširanje | Armal',
      description: 'Armal kade, tuš kabine, walk-in stakla i tuš sistemi za moderna kupatila svih veličina. Pogledajte asortiman, preuzmite kataloge i izaberite model.',
      ogType: 'website',
    },
    eng: {
      title: 'Bathing and showering | Armal',
      description: 'Armal bathtubs, shower enclosures, walk-in screens and shower systems for contemporary bathrooms of every size. Browse the range and download catalogues.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.SANITARY]: {
    hr: {
      title: 'Sanitarije | Armal',
      description: 'Armal WC školjke, umivaonici i sanitarna keramika za kupaonice svih veličina. Pregledajte asortiman, preuzmite kataloge proizvoda i odaberite model.',
      ogType: 'website',
    },
    slo: {
      title: 'Sanitarna keramika | Armal',
      description: 'Armal WC školjke, umivalniki in sanitarna keramika za kopalnice vseh velikosti. Oglejte si ponudbo, prenesite kataloge izdelkov in izberite model.',
      ogType: 'website',
    },
    rs: {
      title: 'Sanitarije | Armal',
      description: 'Armal WC šolje, lavaboi i sanitarna keramika za kupatila svih veličina. Pogledajte asortiman, preuzmite kataloge proizvoda i izaberite model.',
      ogType: 'website',
    },
    eng: {
      title: 'Sanitary ware | Armal',
      description: 'Armal toilets, washbasins and sanitary ceramics for bathrooms of every size. Browse the range, download the product catalogues and choose a model.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.CATALOGS]: {
    hr: {
      title: 'Katalozi | Armal',
      description: 'Preuzmite Armal kataloge: slavine, tuš sustavi, walk-in stijenke, sanitarije i kupaonski namještaj. Tehničke informacije i izgled proizvoda na jednom mjestu.',
      ogType: 'website',
    },
    slo: {
      title: 'Katalogi | Armal',
      description: 'Prenesite kataloge Armal: armature, tuš sistemi, walk-in stene, sanitarije in kopalniško pohištvo. Tehnične informacije in videz izdelkov na enem mestu.',
      ogType: 'website',
    },
    rs: {
      title: 'Katalozi | Armal',
      description: 'Preuzmite Armal kataloge: slavine, tuš sistemi, walk-in stakla, sanitarije i kupatilski nameštaj. Tehničke informacije i izgled proizvoda na jednom mestu.',
      ogType: 'website',
    },
    eng: {
      title: 'Catalogues | Armal',
      description: 'Download Armal catalogues: faucets, shower systems, walk-in screens, sanitary ware and bathroom furniture. Technical information in one place.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.NOT_FOUND]: {
    hr: { title: 'Stranica nije pronađena | Armal', description: 'Tražena stranica ne postoji.', ogType: 'website' },
    slo: { title: 'Stran ni najdena | Armal', description: 'Iskana stran ne obstaja.', ogType: 'website' },
    rs: { title: 'Stranica nije pronađena | Armal', description: 'Tražena stranica ne postoji.', ogType: 'website' },
    eng: { title: 'Page not found | Armal', description: 'The requested page does not exist.', ogType: 'website' },
  },
}

export const getSeoData = (routeKey, language = FALLBACK_LANG) => {
  const byRoute = seoConfig[routeKey] || seoConfig[SEO_ROUTE_KEYS.HOME]
  return byRoute[language] || byRoute[FALLBACK_LANG]
}

export default seoConfig

