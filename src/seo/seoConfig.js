const FALLBACK_LANG = 'hr'

export const SEO_ROUTE_KEYS = {
  HOME: 'home',
  ABOUT: 'about',
  SERVICE: 'service',
  PRODUCTS: 'products',
  FAUCETS: 'faucets',
  BLOG: 'blog',
}

const seoConfig = {
  [SEO_ROUTE_KEYS.HOME]: {
    hr: {
      title: 'Armal - Vrhunski kupaonski namjestaj i slavine',
      description: 'Armal nudi vrhunske slavine i kupaonska rjesenja za moderan interijer.',
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
}

export const getSeoData = (routeKey, language = FALLBACK_LANG) => {
  const byRoute = seoConfig[routeKey] || seoConfig[SEO_ROUTE_KEYS.HOME]
  return byRoute[language] || byRoute[FALLBACK_LANG]
}

export default seoConfig

