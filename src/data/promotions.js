import blackWeekLong from '../assets/akcije/black-week-long.jpg'
import blackWeekSmall from '../assets/akcije/black-week-small.jpg'

/**
 * Akcije (promocije) za carousel na naslovnici, stranicu Blog i stranice akcija.
 *
 * Kako dodati novu akciju:
 *  1. Dodaj novi objekt u PROMOTIONS (kopiraj Black Week kao predložak).
 *  2. `slug` postaje URL stranice akcije: /blog/<slug> (i /eng/blog/<slug>, ...).
 *  3. `banner` = gotova grafika (desktop široka + mobile manja) – prikazuje se cijela, bez teksta preko.
 *     Bez `banner` slajd se slaže iz teksta na gradijentu (`theme`).
 *  4. `startsAt` / `endsAt` (ISO datum) skrivaju akciju s naslovnice izvan perioda.
 *     Na stranici Blog akcija ostaje i nakon isteka (stranica tada piše da je akcija završila).
 *  5. Redoslijed u nizu = redoslijed slajdova (zadnji slajd je uvijek standardni hero).
 *
 * Tekstovi su po jezicima: hr, eng, rs, slo. Ako prijevod nedostaje, koristi se hr.
 */

export const B2B_URL = 'https://b2b.armal.hr/'

export const PROMOTIONS = [
  {
    slug: 'black-friday',
    startsAt: null,
    endsAt: '2026-11-29T00:00:00+01:00',
    theme: 'dark',
    banner: { desktop: blackWeekLong, mobile: blackWeekSmall },
    // PDF s detaljima akcije (link ili putanja u public/). null = gumb se ne prikazuje.
    pdf: 'https://www.armal.hr/pdf/black-friday-armal',
    orderEmail: 'prodaja@armal.hr',
    orderSubject: 'Količinska akcija',
    // Kategorije s grafike (prikazuju se kao popis, bez linkova).
    categories: [
      'sanitaryElement',
      'sanitaryCeramics',
      'rotoChannels',
      'harmonyTrays',
      'bathsScreens',
      'showerCabins',
      'furniture',
      'bathroomMixers',
      'showerAccessories',
      'kitchenMixers',
      'accessories',
    ],
    content: {
      hr: {
        eyebrow: 'Armal B2B internet trgovina · 23.11. – 28.11.',
        title: 'Black Week',
        highlight: 'do -60%',
        subtitle: 'Black Week u Armal B2B internet trgovini: od 23. do 28. studenog ili do isteka zaliha, popusti do -60%.',
        cta: 'Saznaj više',
        postTitle: 'Black Week u Armal B2B internet trgovini',
        postDate: '2026-11-16',
        postIntro:
          'Od 23. do 28. studenog (ili do isteka zaliha) u Armal B2B internet trgovini vrijede popusti do -60% na odabrane kategorije proizvoda.',
        postBody:
          'Akcija je namijenjena poslovnim partnerima. Kliknite na „Pogledaj popuste” za popis kategorija na akciji i uvjete narudžbe.',
        conditions: [
          'Za sve informacije i realizaciju ponude obratite se svome prodajnom predstavniku.',
          'Rabat vrijedi za jednokratnu narudžbu navedene minimalne količine ili više u jednoj isporuci (ograničena količina).',
          'Narudžbu pošaljite na e-mail prodaja@armal.hr i navedite „količinska akcija”.',
        ],
        categoryLabels: {
          sanitaryElement: 'Sanitarni element',
          sanitaryCeramics: 'Sanitarna keramika',
          rotoChannels: 'Tuš kanalice Roto',
          harmonyTrays: 'Tuš kade Harmony',
          bathsScreens: 'Kade i tuš paravani',
          showerCabins: 'Tuš kabine',
          furniture: 'Kupaonski namještaj, ogledala i umivaonici',
          bathroomMixers: 'Kupaonske miješalice',
          showerAccessories: 'Pribor za tuširanje',
          kitchenMixers: 'Kuhinjske miješalice',
          accessories: 'Kupaonska galanterija',
        },
      },
      eng: {
        eyebrow: 'Armal B2B online store · 23 – 28 Nov',
        title: 'Black Week',
        highlight: 'up to -60%',
        subtitle: 'Black Week in the Armal B2B online store: 23 to 28 November or while stocks last, discounts up to -60%.',
        cta: 'Learn more',
        postTitle: 'Black Week in the Armal B2B online store',
        postDate: '2026-11-16',
        postIntro:
          'From 23 to 28 November (or while stocks last), the Armal B2B online store offers discounts of up to -60% on selected product categories.',
        postBody:
          'The promotion is intended for business partners. Click “View discounts” for the list of categories on sale and the ordering terms.',
        conditions: [
          'For all information and to place an offer, contact your sales representative.',
          'The discount applies to a single order of the stated minimum quantity or more in one delivery (limited quantity).',
          'Send your order to prodaja@armal.hr and mention “količinska akcija” (quantity promotion).',
        ],
        categoryLabels: {
          sanitaryElement: 'Concealed WC frames',
          sanitaryCeramics: 'Sanitary ceramics',
          rotoChannels: 'Roto shower channels',
          harmonyTrays: 'Harmony shower trays',
          bathsScreens: 'Baths and shower screens',
          showerCabins: 'Shower cabins',
          furniture: 'Bathroom furniture, mirrors and washbasins',
          bathroomMixers: 'Bathroom mixers',
          showerAccessories: 'Shower accessories',
          kitchenMixers: 'Kitchen mixers',
          accessories: 'Bathroom accessories',
        },
      },
      rs: {
        eyebrow: 'Armal B2B internet prodavnica · 23.11. – 28.11.',
        title: 'Black Week',
        highlight: 'do -60%',
        subtitle: 'Black Week u Armal B2B internet prodavnici: od 23. do 28. novembra ili do isteka zaliha, popusti do -60%.',
        cta: 'Saznaj više',
        postTitle: 'Black Week u Armal B2B internet prodavnici',
        postDate: '2026-11-16',
        postIntro:
          'Od 23. do 28. novembra (ili do isteka zaliha) u Armal B2B internet prodavnici važe popusti do -60% na odabrane kategorije proizvoda.',
        postBody:
          'Akcija je namenjena poslovnim partnerima. Kliknite na „Pogledaj popuste” za spisak kategorija na akciji i uslove porudžbine.',
        conditions: [
          'Za sve informacije i realizaciju ponude obratite se svom prodajnom predstavniku.',
          'Rabat važi za jednokratnu porudžbinu navedene minimalne količine ili više u jednoj isporuci (ograničena količina).',
          'Porudžbinu pošaljite na e-mail prodaja@armal.hr i navedite „količinska akcija”.',
        ],
        categoryLabels: {
          sanitaryElement: 'Sanitarni element',
          sanitaryCeramics: 'Sanitarna keramika',
          rotoChannels: 'Tuš kanalice Roto',
          harmonyTrays: 'Tuš kade Harmony',
          bathsScreens: 'Kade i tuš paravani',
          showerCabins: 'Tuš kabine',
          furniture: 'Kupatilski nameštaj, ogledala i lavaboi',
          bathroomMixers: 'Kupatilske mešalice',
          showerAccessories: 'Pribor za tuširanje',
          kitchenMixers: 'Kuhinjske mešalice',
          accessories: 'Kupatilska galanterija',
        },
      },
      slo: {
        eyebrow: 'Armal B2B spletna trgovina · 23.11. – 28.11.',
        title: 'Black Week',
        highlight: 'do -60%',
        subtitle: 'Black Week v spletni trgovini Armal B2B: od 23. do 28. novembra oziroma do razprodaje zalog, popusti do -60%.',
        cta: 'Več o tem',
        postTitle: 'Black Week v spletni trgovini Armal B2B',
        postDate: '2026-11-16',
        postIntro:
          'Od 23. do 28. novembra (oziroma do razprodaje zalog) v spletni trgovini Armal B2B veljajo popusti do -60% na izbrane kategorije izdelkov.',
        postBody:
          'Akcija je namenjena poslovnim partnerjem. Kliknite „Poglej popuste” za seznam kategorij v akciji in pogoje naročila.',
        conditions: [
          'Za vse informacije in izvedbo ponudbe se obrnite na svojega prodajnega predstavnika.',
          'Rabat velja za enkratno naročilo navedene minimalne količine ali več v eni dobavi (omejena količina).',
          'Naročilo pošljite na e-pošto prodaja@armal.hr in navedite „količinska akcija”.',
        ],
        categoryLabels: {
          sanitaryElement: 'Podometni elementi',
          sanitaryCeramics: 'Sanitarna keramika',
          rotoChannels: 'Tuš kanalete Roto',
          harmonyTrays: 'Tuš kadi Harmony',
          bathsScreens: 'Kadi in tuš stene',
          showerCabins: 'Tuš kabine',
          furniture: 'Kopalniško pohištvo, ogledala in umivalniki',
          bathroomMixers: 'Kopalniške armature',
          showerAccessories: 'Pribor za prhanje',
          kitchenMixers: 'Kuhinjske armature',
          accessories: 'Kopalniška galanterija',
        },
      },
    },
  },
]

const isActive = (promo, now) => {
  const start = promo.startsAt ? new Date(promo.startsAt) : null
  const end = promo.endsAt ? new Date(promo.endsAt) : null
  return (!start || now >= start) && (!end || now < end)
}

export const getActivePromotions = (now = new Date()) => PROMOTIONS.filter((promo) => isActive(promo, now))

export const getPromotionBySlug = (slug) => PROMOTIONS.find((promo) => promo.slug === slug) || null

export const getPromotionContent = (promo, language) => promo.content[language] || promo.content.hr

export const isPromotionExpired = (promo, now = new Date()) => Boolean(promo.endsAt && now >= new Date(promo.endsAt))
