import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import ProductGallery from '../components/ProductGallery'
// Glavna slika Rubi galerije (uvijek rubi-prostor.webp). Fallback ako glob ne nađe nijednu sliku.
import rubiProstor from '../assets/slavine/rubi-compresed/rubi-prostor.webp'
// Glavna slika Safir galerije
import safirMain from '../assets/slavine/safir/glavna-slika.webp'
// Glavna slika Beril galerije
import berilMain from '../assets/slavine/beril/glavna-slika-beril.webp'
// Glavna slika Lapis galerije
import lapisMain from '../assets/slavine/lapis/lapis-glavna-slika.webp'
// Glavna slika Violet galerije
import violetMain from '../assets/slavine/violet/Violet glavna.webp'
// Glavna slika Jana galerije
import janaMain from '../assets/slavine/jana/Slavina Jana naslovna.webp'
// Glavna slika Ana galerije
import anaMain from '../assets/slavine/ana/glavna-slika.webp'
// Glavna slika Start galerije
import startMain from '../assets/slavine/start/Start-glavna-slika.webp'

// Automatsko učitavanje svih slika iz src/assets/slavine/rubi-compresed (uključujući podfoldere).
// Održavanje: dodaj novu sliku u folder → automatski se pojavi u galeriji Rubi. Sortirano po putanji (natural order).
const rubiGlob = import.meta.glob('../assets/slavine/rubi-compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const rubiGalleryImages = Object.entries(rubiGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// ProductGallery prikazuje images[0] kao glavnu – rubi-prostor mora biti prvi u nizu
const rubiImages =
  rubiGalleryImages.length > 0
    ? [rubiProstor, ...rubiGalleryImages.filter((src) => src !== rubiProstor)]
    : [rubiProstor]

// Automatsko učitavanje svih slika iz src/assets/slavine/safir za Safir
const safirGlob = import.meta.glob('../assets/slavine/safir/**/*.{webp,png,jpg,jpeg}', { eager: true })
const safirGalleryImages = Object.entries(safirGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Safir – glavna slika iz assets te sve ostale
const safirImages =
  safirGalleryImages.length > 0
    ? [safirMain, ...safirGalleryImages.filter((src) => src !== safirMain)]
    : [safirMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/beril za Beril
const berilGlob = import.meta.glob('../assets/slavine/beril/**/*.{webp,png,jpg,jpeg}', { eager: true })
const berilGalleryImages = Object.entries(berilGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Beril – glavna slika iz assets te sve ostale
const berilImages =
  berilGalleryImages.length > 0
    ? [berilMain, ...berilGalleryImages.filter((src) => src !== berilMain)]
    : [berilMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/lapis za Lapis
const lapisGlob = import.meta.glob('../assets/slavine/lapis/**/*.{webp,png,jpg,jpeg}', { eager: true })
const lapisGalleryImages = Object.entries(lapisGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Lapis – glavna slika iz assets te sve ostale
const lapisImages =
  lapisGalleryImages.length > 0
    ? [lapisMain, ...lapisGalleryImages.filter((src) => src !== lapisMain)]
    : [lapisMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/violet za Violet
const violetGlob = import.meta.glob('../assets/slavine/violet/**/*.{webp,png,jpg,jpeg}', { eager: true })
const violetGalleryImages = Object.entries(violetGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Violet – glavna slika iz assets te sve ostale
const violetImages =
  violetGalleryImages.length > 0
    ? [violetMain, ...violetGalleryImages.filter((src) => src !== violetMain)]
    : [violetMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/jana za Jana
const janaGlob = import.meta.glob('../assets/slavine/jana/**/*.{webp,png,jpg,jpeg}', { eager: true })
const janaGalleryImages = Object.entries(janaGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Jana – glavna slika iz assets te sve ostale
const janaImages =
  janaGalleryImages.length > 0
    ? [janaMain, ...janaGalleryImages.filter((src) => src !== janaMain)]
    : [janaMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/ana za Ana
const anaGlob = import.meta.glob('../assets/slavine/ana/**/*.{webp,png,jpg,jpeg}', { eager: true })
const anaGalleryImages = Object.entries(anaGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Ana – glavna slika iz assets te sve ostale
const anaImages =
  anaGalleryImages.length > 0
    ? [anaMain, ...anaGalleryImages.filter((src) => src !== anaMain)]
    : [anaMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/start za Start
const startGlob = import.meta.glob('../assets/slavine/start/**/*.{webp,png,jpg,jpeg}', { eager: true })
const startGalleryImages = Object.entries(startGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// Start – glavna slika iz assets te sve ostale
const startImages =
  startGalleryImages.length > 0
    ? [startMain, ...startGalleryImages.filter((src) => src !== startMain)]
    : [startMain]

// Automatsko učitavanje svih slika iz src/assets/slavine/topaz-compresed za Topaz
const topazGlob = import.meta.glob('../assets/slavine/topaz-compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const topazGalleryImages = Object.entries(topazGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// U galeriji želimo prvo prikazati hero sliku topaz.webp, a zatim sve ostale
const topazImages = ['/slavine/topaz.webp', ...topazGalleryImages]

// Automatsko učitavanje svih slika iz src/assets/slavine/opal compresed za Opal
const opalGlob = import.meta.glob('../assets/slavine/opal compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const opalGalleryImages = Object.entries(opalGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
// U galeriji želimo prvo hero sliku opal.webp, zatim sve opal-compresed slike
const opalImages = ['/slavine/opal.webp', ...opalGalleryImages]

// Mapiranje boja na nazive datoteka za filtriranje po kolekciji (Rubi, Topaz)
const colorFilenameMapByCollection = {
  rubi: {
    chrome: ['bidet-4.webp', 'high-4.webp', 'slavina-4.webp', 'thub-1.webp', 'ug-tus-1.webp', 'ugradbena-5.webp'],
    black: ['bide-3.webp', 'high-5.webp', 'slavina-2.webp', 'thub-2.webp', 'ugradbena-1.webp', 'ug-tus-3.webp', 'zid-tus-4.webp'],
    gunMetal: ['bide-1.webp', 'high-2.webp', 'slavina-3.webp', 'thub-4.webp', 'ugradbena-3.webp', 'ug-tus-5.webp', 'zid-tus-2.webp'],
    brushGold: ['bide-5.webp', 'high-1.webp', 'slavina-1.webp', 'thub-3.webp', 'ugradbena-2.webp', 'ug-tus-4.webp', 'zid-tus-1.webp'],
    brushedNickel: ['bide-2.webp', 'high-3.webp', 'slavina-5.webp', 'thub-5.webp', 'ugradbena-4.webp', 'ug-tus-2.webp', 'zid-tus-5.webp'],
  },
  safir: {
    chrome: [
      'bide-krom.webp',
      'kada-krom.webp',
      'niska-krom.webp',
      'tus-krom.webp',
      'ugr-mjesalica-krom.webp',
      'visoka-krom.webp',
    ],
    black: [
      'bide-crna.webp',
      'kada-crna.webp',
      'niska-crna.webp',
      'tus-crna.webp',
      'ugr-mjesalica-crna.webp',
      'visoka-crna.webp',
    ],
  },
  topaz: {
    // Topaz – boje i datoteke iz src/assets/slavine/topaz-compresed
    brushGold: ['bide-zlatna.webp', 'kada-zlatna.webp', 'slavina-zlatna.webp', 'visoka-zlatna.webp', 'tus-slavina-zlatna.webp'],
    black: ['bide-crna.webp', 'kada-crna.webp', 'slavina-crna.webp', 'visoka-crna.webp', 'tus-slavina-crna.webp'],
    gunMetal: ['bide-gunmetal.webp', 'kada-gunmetal.webp', 'slavina-gunmetal.webp', 'visoka-gunmetal.webp', 'tus-slavina-gunmetal.webp'],
    chrome: ['bide-krom.webp', 'kada-krom.webp', 'slavina-krom.webp', 'visoka-krom.webp', 'tus-slavina-krom.webp'],
  },
  // Opal trenutno nema specifične datoteke po boji – dropdown služi samo za odabir boje bez filtriranja
  opal: {
    // Opal – boje i datoteke iz src/assets/slavine/opal compresed
    black: [
      'bidet-crna.webp',
      'kada-crna.webp',
      'niska-crna.webp',
      'tus-crni.webp',
      'ugr-slavina-crna.webp',
      'ugr-tus-crna.webp',
      'visoka-crna.webp',
    ],
    gunMetal: [
      'bidet-gunmetal.webp',
      'kada-gunmetal.webp',
      'niska-gunmetal.webp',
      'tus-gunmetal.webp',
      'ugr-slavina-gunmetal.webp',
      'ugr-tus-gunmetal.webp',
      'visoka-gunmetal.webp',
    ],
    chrome: [
      'bidet-krom.webp',
      'kada-krom.webp',
      'niska-krom.webp',
      'tus-krom.webp',
      'ugr-slavina-krom.webp',
      'ugr-tus-krom.webp',
      'visoka-krom.webp',
    ],
  },
  beril: {
    chrome: [
      'bidet-krom.webp',
      'kada-krom.webp',
      'slavina-niska-krom.webp',
      'slavina-3-krom.webp',
      'tus-krom.webp',
      'tus-2-krom.webp',
      'ugr-tus-krom.webp',
      'ugr-tus-strop-krom.webp',
      'beril_FH8226A-D111 Picture copy.webp',
    ],
    black: [
      'bidet-crna.webp',
      'kada-crna.webp',
      'slavina-niska-crna.webp',
      'slavina-3-crna.webp',
      'ugr-tus-strop-crni.webp',
      'beril_FH8226A-D111-PB Picture copy.webp',
    ],
  },
  lapis: {
    bronze: [
      'bidet-bronca.webp',
      'kada-bronca.webp',
      'kada-visoka-bronca.webp',
      'mješalica-bronca.webp',
      'mješalica-visoka-bronca.webp',
      'tus-bronca.webp',
      'tus-set-bronca.webp',
      'ugradbeni-tus-bronca.webp',
    ],
    black: [
      'bidet-crna.webp',
      'kada-crna.webp',
      'kada-visoka-crna.webp',
      'mješalica-crna.webp',
      'mješalica-visoka-crna.webp',
      'tus-crna.webp',
      'tus-set-crna.webp',
      'ugradbeni-tus-crna.webp',
    ],
  },
}

// Mapiranje kategorija (bidet, kada, tuš...) na reprezentativne datoteke po kolekciji
const categoryFilenameMapByCollection = {
  rubi: {
    bidet: 'bide-1.webp',
    bathtub: 'thub-1.webp',
    builtInMixer: 'ugradbena-1.webp',
    builtInShower: 'ug-tus-1.webp',
    showerSet: 'zid-tus-1.webp',
  },
  safir: {
    bidet: 'bide-crna.webp',
    bathtub: 'kada-crna.webp',
    builtInMixer: 'ugr-mjesalica-crna.webp',
    builtInShower: 'visoka-crna.webp',
    showerSet: 'tus-crna.webp',
  },
  beril: {
    bidet: 'bidet-crna.webp', // Bidet
    bathtub: 'kada-crna.webp', // Kada
    builtInMixer: 'slavina-3-crna.webp', // Mješalica za vodu
    showerSet: 'tus-2-krom.webp', // Mješalica za tuš
    builtInShower: 'ugr-tus-krom.webp', // Ugradbena mješalica tuša
  },
  lapis: {
    // Lapis: mapiramo folder podstringove da bude neovisno o boji (bronca/crna)
    bidet: 'lapis/bidet/',
    bathtub: 'lapis/kada/',
    builtInMixer: 'lapis/slavina/',
    showerSet: 'lapis/tus/',
    builtInShower: 'lapis/ugradbeni-tus/',
  },
  jana: {
    bidet: 'slavina-bidet-korm.webp',
    bathtub: 'slavina-kada-krom.webp',
    builtInMixer: 'slavina-krom.webp',
    builtInShower: 'slavina-tus-krom.webp',
    showerSet: 'tus-set-krom.webp',
  },
  violet: {
    bidet: 'bidet-krom.webp',
    bathtub: 'kada-krom.webp',
    builtInMixer: 'slavina-krom.webp',
    showerSet: 'tus-krom.webp',
  },
  topaz: {
    bidet: 'bide-crna.webp',
    bathtub: 'kada-crna.webp',
    showerSet: 'tus-slavina-crna.webp', // mješalica za tuš
    builtInShower: 'visoka-crna.webp', // stojeća mješalica
  },
  opal: {
    // Opal – mapiranje kategorija na crne varijante proizvoda
    bidet: 'bidet-crna.webp',
    bathtub: 'kada-crna.webp', // mješalica za kadu
    builtInMixer: 'ugr-slavina-crna.webp', // ugradbena mješalica
    builtInShower: 'visoka-crna.webp', // stojeća mješalica
    showerSet: 'ugr-tus-crna.webp', // mješalica za tuš
  },
  ana: {
    // Ana – mapiranje kategorija na reprezentativne krom varijante
    bathtub: 'kada-krom.webp',
    builtInMixer: 'slavina-krom.webp',
    showerSet: 'tus-krom.webp',
  },
  start: {
    // Start – mapiranje kategorija na krom varijante
    // Napomena: nazivi sadrže razmake pa je potrebno decodeURIComponent u onClick handleru.
    bidet: 'bidet krom.webp',
    bathtub: 'kada-krom.webp',
    builtInMixer: 'slavina-krom.webp',
    showerSet: 'tus-krom.webp',
  },
}
const rubiMainImage = rubiProstor

const ProizvodiSlavine = () => {
  const { t } = useLanguage()
  const productRefs = useRef([])
  const [lightbox, setLightbox] = useState(null) // { images: string[], index: number } | null
  const [activeImageIndexes, setActiveImageIndexes] = useState({}) // po kolekciji: { [key]: index }
  const [colorFilters, setColorFilters] = useState({}) // po kolekciji: { [key]: colorKey }
  const [categoryFilters, setCategoryFilters] = useState({}) // po kolekciji: { [key]: categoryKey }

  // Uvijek ostani na hero sekciji (vrh stranice) nakon mount-a, refresh-a ili vraćanja pozicije.
  // Sprječavamo bilo kakvo automatsko "scroll restoration" ponašanje i forsiramo `scroll` na 0.
  useEffect(() => {
    const prevRestoration = window.history.scrollRestoration
    try {
      window.history.scrollRestoration = 'manual'
    } catch {
      // ignore (neki browseri/edge slučajevi)
    }

    // Odmah + nakon slikanja layout-a (RAF) kako bismo pobijedili browser restore.
    window.scrollTo(0, 0)
    const rafId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => {
      window.cancelAnimationFrame(rafId)
      try {
        window.history.scrollRestoration = prevRestoration
      } catch {
        // ignore
      }
    }
  }, [])

  // Boje obrada za prikaz ispod naslova serije (key za prijevod, hex za swatch)
  const defaultFinishes = [
    { key: 'chrome', color: '#e5e7eb' },
    { key: 'black', color: '#1f2937' },
    { key: 'gunMetal', color: '#4b5563' },
    { key: 'brushGold', color: '#c9a227' },
    { key: 'brushedNickel', color: '#a8a9ad' },
    { key: 'bronze', color: '#cd7f32' },
  ]

  // Kolekcije slavina – image = glavna, images = niz za galeriju, finishes = obrade (opcionalno)
  // Redoslijed prilagođen traženom popisu koristeći postojeće kolekcije:
  // 1. Rubi, 2. Topaz, 3. Violet, 4. Start, potom ostale postojeće kolekcije.
  const collections = [
    {
      key: 'rubi',
      image: rubiMainImage,
      images: rubiImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
        { key: 'gunMetal', color: '#4b5563' },
        { key: 'brushGold', color: '#c9a227' },
        { key: 'brushedNickel', color: '#a8a9ad' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=RUBI',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'topaz',
      // Glavna slika Topaz kolekcije – dizajnirana hero slika iz dist/slavine/topaz.webp
      image: '/slavine/topaz.webp',
      images: topazImages.length ? topazImages : ['/slavine/topaz.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
        { key: 'gunMetal', color: '#4b5563' },
        { key: 'brushGold', color: '#c9a227' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=TOPAZ',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'violet',
      image: violetMain,
      images: violetImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=VIOLET',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'start',
      image: startMain,
      images: startImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=START',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'opal',
      // Glavna slika Opal kolekcije – hero iz dist/slavine/opal.webp
      image: '/slavine/opal.webp',
      images: opalImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
        { key: 'gunMetal', color: '#4b5563' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=OPAL',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'safir',
      image: safirMain,
      images: safirImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=SAFIR',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'beril',
      image: berilMain,
      images: berilImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=BERIL',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'lapis',
      image: lapisMain,
      images: lapisImages,
      finishes: [
        { key: 'black', color: '#1f2937' },
        { key: 'bronze', color: '#cd7f32' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=LAPIS',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'ana',
      image: anaMain,
      images: anaImages.length ? anaImages : [anaMain],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=ANA',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'jana',
      image: janaMain,
      images: janaImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=JANA',
      editHomeLink: 'https://uredidom.hr/',
    },
  ]

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') {
        setLightbox((l) => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length })
      }
      if (e.key === 'ArrowRight') {
        setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  // Fade-in animacija pri skrolanju
  useEffect(() => {
    const observers = productRefs.current.map((ref) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="w-full py-16 text-white"
        style={{ background: 'linear-gradient(to bottom right, #0070CD, #005bb0, #004A8A)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold md:text-5xl">{t('products.faucets')}</h1>
          <p className="mt-4 text-lg text-white/90">{t('products.faucetsDescription')}</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-24 md:space-y-32">
            {collections.map((collection, index) => {
              const isEven = index % 2 === 0
              const imagePosition = isEven ? 'left' : 'right'

              const baseImages = collection.images ?? [collection.image]
              const colorFilenameMap = colorFilenameMapByCollection[collection.key]
              const colorFilter = colorFilters[collection.key] ?? ''
              const categoryFilter = categoryFilters[collection.key] ?? ''

              // 1) Filtriranje po boji (ako kolekcija ima mapu boja)
              const colorFilteredImages =
                colorFilenameMap && colorFilter
                  ? (() => {
                      const filenames = colorFilenameMap[colorFilter] ?? []
                      if (!filenames.length) return baseImages
                      const filtered = baseImages.filter((src) =>
                        filenames.some((fn) => typeof src === 'string' && src.includes(fn))
                      )
                      return filtered.length ? filtered : baseImages
                    })()
                  : baseImages

              // 2) Kategorije: Lapis koristi isti model kao Rubi/Safir (klik samo postavlja aktivni index).
              // Zato nema dodatnog filtriranja images array po kategoriji.
              const imagesForGallery = colorFilteredImages

              if (
                collection.key === 'rubi' ||
                collection.key === 'safir' ||
                collection.key === 'beril' ||
                collection.key === 'lapis' ||
                collection.key === 'violet' ||
                collection.key === 'jana' ||
                collection.key === 'ana' ||
                collection.key === 'start' ||
                collection.key === 'topaz' ||
                collection.key === 'opal'
              ) {
                // Rubi / Safir / Beril / Lapis / Violet / Topaz / Opal kartice – čišći, mirniji dizajn bez obruba i "lift" hover efekata
                return (
                  <div
                    key={collection.key}
                    ref={(el) => (productRefs.current[index] = el)}
                    className={`group relative flex flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-8 ${
                      imagePosition === 'right' ? 'md:flex-row-reverse' : ''
                    } opacity-0 translate-y-8`}
                  >
                    {/* Dekorativni “tag” u gornjem lijevom kutu kartice */}
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#c9a227] via-[#e5e7eb] to-[#111827]" />

                    {/* Lijevo: galerija */}
                    <div className="flex-shrink-0 w-full md:w-1/2 lg:max-w-xl xl:max-w-2xl rounded-2xl p-2">
                      <ProductGallery
                        images={imagesForGallery}
                        alt={t(`collections.${collection.key}.name`)}
                        activeIndexExternal={
                          typeof activeImageIndexes[collection.key] === 'number'
                            ? activeImageIndexes[collection.key]
                            : 0
                        }
                        onImageClick={(_, idx) => {
                          const images = imagesForGallery
                          setActiveImageIndexes((prev) => ({
                            ...prev,
                            [collection.key]: idx,
                          }))
                          setLightbox({ images, index: idx })
                        }}
                      />
                    </div>

                    {/* Desno: sadržaj */}
                    <div className="flex w-full flex-col justify-center gap-5 md:w-1/2">
                      {/* Naslov + kratki opis */}
                      <div className="space-y-2">
                        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <span className="h-1.5 w-6 rounded-full bg-[#c9a227]" />
                          {t('products.faucets')}
                        </p>
                        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                          {t(`collections.${collection.key}.name`)}
                        </h2>
                        <p className="text-sm text-slate-600 md:text-base">
                          {t(`collections.${collection.key}.description`)}
                        </p>
                        {t(`collections.${collection.key}.benefit`) && (
                          <p className="text-sm font-semibold text-[#0070CD] md:text-base">
                            {t(`collections.${collection.key}.benefit`)}
                          </p>
                        )}
                      </div>

                      {/* Boje – krugovi + dropdown */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          {(collection.finishes ?? defaultFinishes).map((finish) => (
                            <span
                              key={finish.key}
                              className="inline-block h-6 w-6 shrink-0 rounded-full border border-slate-300 shadow-sm"
                              style={{
                                background: `
                                  radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6) 0%, transparent 55%),
                                  linear-gradient(150deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(0,0,0,0.25) 100%),
                                  ${finish.color}
                                `.replace(/\s+/g, ' ').trim(),
                              }}
                              title={t(`faucetsPage.finishes.${finish.key}`)}
                              aria-label={t(`faucetsPage.finishes.${finish.key}`)}
                            />
                          ))}
                        </div>

                        {collection.key !== 'jana' && collection.key !== 'ana' && collection.key !== 'start' && (
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {t('faucetsPage.colorLabel') ?? 'BOJA'}
                            </label>
                            <div className="relative inline-flex w-full max-w-xs">
                              <select
                                className="w-full appearance-none rounded-full border border-slate-300 bg-white px-4 pr-10 py-2.5 text-xs font-medium text-slate-900 shadow-sm transition-colors focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/60"
                                value={colorFilters[collection.key] ?? ''}
                                onChange={(e) => {
                                  const next = e.target.value
                                  setColorFilters((prev) => ({ ...prev, [collection.key]: next }))
                                  setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: 0 }))
                                }}
                              >
                                <option value="">{t('faucetsPage.colorAll') ?? 'Svi proizvodi'}</option>
                                {(collection.key === 'safir' || collection.key === 'beril'
                                  ? ['chrome', 'black']
                                  : collection.key === 'violet'
                                  ? ['chrome']
                                  : collection.key === 'lapis'
                                  ? ['black', 'bronze']
                                  : collection.key === 'opal'
                                  ? ['chrome', 'black', 'gunMetal']
                                  : collection.key === 'topaz'
                                  ? ['chrome', 'black', 'gunMetal', 'brushGold']
                                  : ['chrome', 'black', 'gunMetal', 'brushGold', 'brushedNickel']
                                ).map((finishKey) => (
                                  <option key={finishKey} value={finishKey}>
                                    {t(`faucetsPage.finishes.${finishKey}`)}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                                <svg
                                  className="h-3 w-3"
                                  viewBox="0 0 12 8"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M1 1.5L6 6.5L11 1.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Kategorije (bidet, kada, tuš...) */}
                      {(
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {t('faucetsPage.sections.waterMixersTitle')}
                          </p>
                            <div className="flex flex-wrap gap-2">
                            {(collection.key === 'violet'
                              ? ['bidet', 'bathtub', 'builtInMixer', 'showerSet']
                              : collection.key === 'topaz'
                                ? ['bidet', 'bathtub', 'showerSet', 'builtInShower'] // Topaz: bez builtInMixer
                                : collection.key === 'jana'
                                  ? ['bidet', 'bathtub', 'builtInMixer', 'builtInShower', 'showerSet']
                                  : collection.key === 'ana'
                                    ? ['bathtub', 'builtInMixer', 'showerSet']
                                    : collection.key === 'start'
                                      ? ['bidet', 'bathtub', 'builtInMixer', 'showerSet']
                                  : ['bidet', 'bathtub', 'builtInMixer', 'showerSet', 'builtInShower']
                            ).map((key) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  // Rubi/Safir/Lapis: postojeće ponašanje – skok na reprezentativnu sliku
                                  const filenameMap = categoryFilenameMapByCollection[collection.key]
                                  let targetFilename = filenameMap?.[key]

                                  // Lapis: veži točno tražene varijante slika po kategoriji
                                  // (imagesForGallery je već filtriran po boji preko colorFilteredImages).
                                  if (collection.key === 'lapis') {
                                    if (key === 'builtInShower') {
                                      // Default ("" bez odabira) tretiramo kao broncu kako bi prikaz bio dosljedan
                                      targetFilename =
                                        !colorFilter || colorFilter === 'bronze'
                                          ? 'ugradbeni-tus-bronca.webp'
                                          : 'ugradbeni-tus-crna.webp'
                                    }
                                    if (key === 'builtInMixer') {
                                      targetFilename =
                                        !colorFilter || colorFilter === 'bronze'
                                          ? 'mješalica-bronca.webp'
                                          : 'mješalica-crna.webp'
                                    }
                                  }

                                  const images = imagesForGallery
                                  const targetIndex =
                                    targetFilename != null
                                      ? images.findIndex((src) => {
                                          if (typeof src !== 'string') return false
                                          // Lapis nazivi s dijakritikima mogu biti URL-encoded u Vite bundlu.
                                          // Zato dekodiramo samo za Lapis da provjera includes uvijek radi.
                                          const needsDecode =
                                            collection.key === 'lapis' || collection.key === 'start' || collection.key === 'ana'
                                          if (!needsDecode) return src.includes(targetFilename)
                                          try {
                                            return decodeURIComponent(src).includes(targetFilename)
                                          } catch {
                                            return src.includes(targetFilename)
                                          }
                                        })
                                      : -1
                                  const indexToOpen = targetIndex >= 0 ? targetIndex : 0
                                  setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: indexToOpen }))
                                }}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-[#0070CD] hover:bg-slate-50 hover:text-[#0070CD]"
                              >
                                {collection.key === 'ana' && key === 'bathtub'
                                  ? 'kada'
                                  : collection.key === 'ana' && key === 'builtInMixer'
                                    ? 'mješalica'
                                    : collection.key === 'ana' && key === 'showerSet'
                                      ? 'mješalica za tuš'
                                      : collection.key === 'start' && key === 'bidet'
                                        ? 'Bidet'
                                        : collection.key === 'start' && key === 'bathtub'
                                          ? 'kada'
                                          : collection.key === 'start' && key === 'builtInMixer'
                                            ? 'mješalica'
                                            : collection.key === 'start' && key === 'showerSet'
                                              ? 'mješalica za tuš'
                                              : collection.key === 'jana' && key === 'bidet'
                                  ? 'Bidet'
                                  : collection.key === 'jana' && key === 'bathtub'
                                    ? 'kada'
                                    : collection.key === 'jana' && key === 'builtInMixer'
                                      ? 'mješalica'
                                      : collection.key === 'jana' && key === 'builtInShower'
                                        ? 'mješalica za tuš'
                                        : collection.key === 'jana' && key === 'showerSet'
                                          ? 'tuš set'
                                          : collection.key === 'violet' && key === 'bidet'
                                            ? 'Bidet'
                                            : collection.key === 'violet' && key === 'bathtub'
                                              ? 'Kada'
                                              : collection.key === 'violet' && key === 'builtInMixer'
                                                ? 'Mješalica'
                                                : collection.key === 'violet' && key === 'showerSet'
                                                  ? 'Mješalica za tuš'
                                                  : collection.key === 'lapis' && key === 'builtInMixer'
                                                    ? 'Stojeća mješalica'
                                                    : collection.key === 'lapis' && key === 'builtInShower'
                                                      ? 'Ugradbena mješalica za tuš'
                                                      : collection.key === 'beril' && key === 'builtInShower'
                                                        ? 'Ugradbena mješalica tuša'
                                                        : t(`faucetsPage.sections.waterMixers.${key}`)}
                              </button>
                            ))}
                            </div>
                        </div>
                      )}

                      {/* CTA gumbi */}
                      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <a
                          href={collection.b2bLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005bb0]"
                        >
                          {t('navbar.b2b')}
                        </a>
                        <a
                          href={collection.editHomeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-900"
                        >
                          {t('navbar.editHome')}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              }

              // Ostale kolekcije – postojeći dizajn
              return (
                <div
                  key={collection.key}
                  ref={(el) => (productRefs.current[index] = el)}
                  className={`flex flex-col items-center gap-8 opacity-0 translate-y-8 transition-all duration-700 md:flex-row md:gap-12 ${
                    imagePosition === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Responsive galerija: padding da se vidi kompletna sjena kartice */}
                  <div className="flex-shrink-0 w-full md:w-1/2 lg:max-w-xl xl:max-w-2xl rounded-lg overflow-visible p-4">
                    <ProductGallery
                      images={imagesForGallery}
                      alt={t(`collections.${collection.key}.name`)}
                      activeIndexExternal={
                        typeof activeImageIndexes[collection.key] === 'number'
                          ? activeImageIndexes[collection.key]
                          : 0
                      }
                      onImageClick={(_, index) => {
                        const images = imagesForGallery
                        setActiveImageIndexes((prev) => ({
                          ...prev,
                          [collection.key]: index,
                        }))
                        setLightbox({ images, index })
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                    <h2 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                      {t(`collections.${collection.key}.name`)}
                    </h2>
                    {/* Boje obrada – prilagodivo po proizvodu (collection.finishes), inače defaultFinishes */}
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-3 p-2 md:justify-start">
                      {(collection.finishes ?? defaultFinishes).map((finish) => (
                        <span
                          key={finish.key}
                          className="inline-block h-[24px] w-[24px] shrink-0 rounded-full border-[1px] border-black shadow-sm"
                          style={{
                            background: `
                              radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, transparent 55%),
                              linear-gradient(160deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(0,0,0,0.25) 100%),
                              ${finish.color}
                            `.replace(/\s+/g, ' ').trim(),
                          }}
                          title={t(`faucetsPage.finishes.${finish.key}`)}
                          aria-label={t(`faucetsPage.finishes.${finish.key}`)}
                        />
                      ))}
                    </div>
                    {/* Dropdown za filtriranje boje – za kolekcije koje imaju mapu boja (npr. Rubi, Topaz, Opal) */}
                    {colorFilenameMap && (
                      <div className="mb-4 space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {t('faucetsPage.colorLabel') ?? 'Boja proizvoda'}
                        </label>
                        <div className="relative inline-flex w-full max-w-xs">
                          <select
                            className="w-full appearance-none rounded-full border border-slate-300 bg-white px-4 pr-10 py-2.5 text-xs font-medium text-slate-900 shadow-sm transition-colors focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/60"
                            value={colorFilter}
                            onChange={(e) => {
                              const next = e.target.value
                              setColorFilters((prev) => ({
                                ...prev,
                                [collection.key]: next,
                              }))
                              setActiveImageIndexes((prev) => ({
                                ...prev,
                                [collection.key]: 0,
                              }))
                            }}
                          >
                            <option value="">
                              {t('faucetsPage.colorAll') ?? 'Svi proizvodi'}
                            </option>
                            {(collection.key === 'topaz'
                              ? ['chrome', 'black', 'gunMetal', 'brushGold'] // Topaz: bez Nikla
                              : collection.key === 'opal'
                              ? ['chrome', 'black', 'gunMetal'] // Opal: krom, crna, gun metal
                              : ['chrome', 'black', 'gunMetal', 'brushGold', 'brushedNickel']
                            ).map((finishKey) => (
                              <option key={finishKey} value={finishKey}>
                                {t(`faucetsPage.finishes.${finishKey}`)}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 12 8"
                              aria-hidden="true"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Sekcije pregleda mješalica (bidet, kada, tuš...) – za Rubi, Topaz i Opal */}
                    {['topaz', 'opal'].includes(collection.key) && (
                      <div className="mb-4 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {t('faucetsPage.sections.waterMixersTitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                          {(collection.key === 'topaz'
                            ? ['bidet', 'bathtub', 'showerSet', 'builtInShower'] // Topaz
                            : ['bidet', 'bathtub', 'builtInMixer', 'builtInShower', 'showerSet'] // Opal
                          ).map((key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => {
                                const filenameMap =
                                  categoryFilenameMapByCollection[collection.key] ||
                                  categoryFilenameMapByCollection.rubi
                                const targetFilename = filenameMap[key]
                                const images = imagesForGallery
                                const targetIndex = images.findIndex((src) =>
                                  typeof src === 'string' && src.includes(targetFilename)
                                )
                                const indexToOpen = targetIndex >= 0 ? targetIndex : 0

                                setActiveImageIndexes((prev) => ({
                                  ...prev,
                                  [collection.key]: indexToOpen,
                                }))
                              }}
                              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-[#0070CD] hover:text-[#0070CD]"
                            >
                              {t(`faucetsPage.sections.waterMixers.${key}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="mb-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      {t(`collections.${collection.key}.description`)}
                    </p>
                    {t(`collections.${collection.key}.benefit`) && (
                      <p className="mb-6 text-sm font-semibold text-[#0070CD] md:text-base">
                        {t(`collections.${collection.key}.benefit`)}
                      </p>
                    )}
                    {/* Action Buttons – svaki proizvod koristi vlastite linkove */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <a
                        href={collection.b2bLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#005bb0] hover:shadow-lg"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        {t('navbar.b2b')}
                      </a>
                      <a
                        href={collection.editHomeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        {t('navbar.editHome')}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox – galerija proizvoda s listanjem slika */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Galerija slika"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Zatvori"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {lightbox.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length })
                }}
                className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:left-4"
                aria-label="Prethodna slika"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length })
                }}
                className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:right-4"
                aria-label="Sljedeća slika"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt="Povećana slika"
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.images.length > 1 && (
            <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {lightbox.index + 1} / {lightbox.images.length}
            </p>
          )}
        </div>
      )}

      {/* CTA Section */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
            {t('faucetsPage.ctaTitle')}
          </h2>
          <p className="mb-12 text-lg text-slate-600">
            {t('faucetsPage.ctaDescription')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://b2b.armal.hr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#005bb0] hover:shadow-lg"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {t('navbar.b2b')}
            </a>
            <a
              href="https://uredidom.hr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t('navbar.editHome')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProizvodiSlavine

