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
      description: 'Armal iz Zagreba nudi slavine, tuš sustave, sanitarije i kupaonski namještaj s 10 godina jamstva na odabrane proizvode.',
      ogType: 'website',
    },
    slo: {
      title: 'Armal - Vrhunski kopalniski izdelki in armature',
      description: 'Armal ponuja vrhunske armature in kopalniske resitve za sodoben interier.',
      ogType: 'website',
    },
    rs: {
      title: 'Armal - Vrhunski kupatilski namestaj i slavine',
      description: 'Armal nudi vrhunske slavine i kupatilska resenja za moderan enterijer.',
      ogType: 'website',
    },
    eng: {
      title: 'Armal - Premium bathroom furniture and faucets',
      description: 'Armal offers premium faucets and bathroom solutions for contemporary interiors.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.ABOUT]: {
    hr: {
      title: 'O nama | Armal',
      description: 'Saznajte vise o Armal tradiciji, vrijednostima i timu koji stoji iza brenda.',
      ogType: 'website',
    },
    slo: {
      title: 'O nas | Armal',
      description: 'Preberite vec o tradiciji Armala, vrednotah in ekipi za blagovno znamko.',
      ogType: 'website',
    },
    rs: {
      title: 'O nama | Armal',
      description: 'Saznajte vise o Armal tradiciji, vrednostima i timu koji stoji iza brenda.',
      ogType: 'website',
    },
    eng: {
      title: 'About us | Armal',
      description: 'Learn more about Armal\'s tradition, values and the team behind the brand.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.SERVICE]: {
    hr: {
      title: 'Servis | Armal',
      description: 'Prijavite servisni zahtjev za Armal proizvode brzo i jednostavno.',
      ogType: 'website',
    },
    slo: {
      title: 'Servis | Armal',
      description: 'Oddajte servisni zahtevek za Armal izdelke hitro in enostavno.',
      ogType: 'website',
    },
    rs: {
      title: 'Servis | Armal',
      description: 'Prijavite servisni zahtev za Armal proizvode brzo i jednostavno.',
      ogType: 'website',
    },
    eng: {
      title: 'Service | Armal',
      description: 'Submit a service request for Armal products quickly and easily.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.PRODUCTS]: {
    hr: {
      title: 'Proizvodi | Armal',
      description: 'Pregledajte Armal kolekcije proizvoda za kupaonicu i interijer.',
      ogType: 'website',
    },
    slo: {
      title: 'Izdelki | Armal',
      description: 'Preverite kolekcije izdelkov Armal za kopalnico in interier.',
      ogType: 'website',
    },
    rs: {
      title: 'Proizvodi | Armal',
      description: 'Pogledajte Armal kolekcije proizvoda za kupatilo i enterijer.',
      ogType: 'website',
    },
    eng: {
      title: 'Products | Armal',
      description: 'Explore Armal product collections for bathrooms and contemporary interiors.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.FAUCETS]: {
    hr: {
      title: 'Slavine | Armal',
      description: 'Istrazite Armal kolekcije slavina i odaberite model za svoju kupaonicu.',
      ogType: 'website',
    },
    slo: {
      title: 'Armature | Armal',
      description: 'Raziščite kolekcije armatur Armal in izberite model za svojo kopalnico.',
      ogType: 'website',
    },
    rs: {
      title: 'Slavine | Armal',
      description: 'Istrazite Armal kolekcije slavina i izaberite model za svoje kupatilo.',
      ogType: 'website',
    },
    eng: {
      title: 'Faucets | Armal',
      description: 'Explore Armal faucet collections and choose the right model for your bathroom.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.BLOG]: {
    hr: {
      title: 'Blog | Armal',
      description: 'Novosti, savjeti i inspiracija iz svijeta Armal kupaonskih rjesenja.',
      ogType: 'website',
    },
    slo: {
      title: 'Blog | Armal',
      description: 'Novice, nasveti in inspiracija iz sveta Armal kopalniskih resitev.',
      ogType: 'website',
    },
    rs: {
      title: 'Blog | Armal',
      description: 'Novosti, saveti i inspiracija iz sveta Armal kupatilskih resenja.',
      ogType: 'website',
    },
    eng: {
      title: 'Blog | Armal',
      description: 'News, advice and inspiration from the world of Armal bathroom solutions.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.BATHING]: {
    hr: {
      title: 'Kupanje i tuširanje | Armal',
      description: 'Armal kade, tuš kabine, walk-in stijenke i tuš sustavi za moderne kupaonice. Pregledajte asortiman i kataloge.',
      ogType: 'website',
    },
    slo: {
      title: 'Kopanje in tuširanje | Armal',
      description: 'Armal kadi, tuš kabine, walk-in stene in tuš sistemi za sodobne kopalnice.',
      ogType: 'website',
    },
    rs: {
      title: 'Kupanje i tuširanje | Armal',
      description: 'Armal kade, tuš kabine, walk-in stakla i tuš sistemi za moderna kupatila.',
      ogType: 'website',
    },
    eng: {
      title: 'Bathing and showering | Armal',
      description: 'Armal bathtubs, shower enclosures, walk-in screens and shower systems for contemporary bathrooms.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.SANITARY]: {
    hr: {
      title: 'Sanitarije | Armal',
      description: 'Armal WC školjke, umivaonici i sanitarna keramika za kupaonice svih veličina. Pregledajte asortiman i kataloge.',
      ogType: 'website',
    },
    slo: {
      title: 'Sanitarna keramika | Armal',
      description: 'Armal WC školjke, umivalniki in sanitarna keramika za kopalnice vseh velikosti.',
      ogType: 'website',
    },
    rs: {
      title: 'Sanitarije | Armal',
      description: 'Armal WC šolje, lavaboi i sanitarna keramika za kupatila svih veličina.',
      ogType: 'website',
    },
    eng: {
      title: 'Sanitary ware | Armal',
      description: 'Armal toilets, washbasins and sanitary ceramics for bathrooms of every size.',
      ogType: 'website',
    },
  },
  [SEO_ROUTE_KEYS.CATALOGS]: {
    hr: {
      title: 'Katalozi | Armal',
      description: 'Preuzmite Armal kataloge: slavine, tuš sustavi, walk-in stijenke, sanitarije i kupaonski namještaj.',
      ogType: 'website',
    },
    slo: {
      title: 'Katalogi | Armal',
      description: 'Prenesite Armal kataloge: armature, tuš sistemi, walk-in stene, sanitarije in kopalniško pohištvo.',
      ogType: 'website',
    },
    rs: {
      title: 'Katalozi | Armal',
      description: 'Preuzmite Armal kataloge: slavine, tuš sistemi, walk-in stakla, sanitarije i kupatilski nameštaj.',
      ogType: 'website',
    },
    eng: {
      title: 'Catalogues | Armal',
      description: 'Download Armal catalogues: faucets, shower systems, walk-in screens, sanitary ware and bathroom furniture.',
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

