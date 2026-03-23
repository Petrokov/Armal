import { useParams, Link as RouterLink } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import ProductGallery from '../components/ProductGallery'
import rubiProstor from '../assets/slavine/rubi-compresed/rubi-prostor.webp'
import { useMemo, useState } from 'react'

// Rubi – povuci sve slike iz rubi-compresed foldera (galerija)
const rubiGlob = import.meta.glob('../assets/slavine/rubi-compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const rubiGalleryImages = Object.entries(rubiGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
const rubiImages =
  rubiGalleryImages.length > 0
    ? [rubiProstor, ...rubiGalleryImages.filter((src) => src !== rubiProstor)]
    : [rubiProstor]

// Rubi – mapiranje boja na nazive datoteka za filtriranje
const rubiColorFilenameMap = {
  chrome: ['bidet-4.webp', 'high-4.webp', 'slavina-4.webp', 'thub-1.webp', 'ug-tus-1.webp', 'ugradbena-5.webp'],
  black: ['bide-3.webp', 'high-5.webp', 'slavina-2.webp', 'thub-2.webp', 'ugradbena-1.webp', 'ug-tus-3.webp', 'zid-tus-4.webp'],
  gunMetal: ['bide-1.webp', 'high-2.webp', 'slavina-3.webp', 'thub-4.webp', 'ugradbena-3.webp', 'ug-tus-5.webp', 'zid-tus-2.webp'],
  brushGold: ['bide-5.webp', 'high-1.webp', 'slavina-1.webp', 'thub-3.webp', 'ugradbena-2.webp', 'ug-tus-4.webp', 'zid-tus-1.webp'],
  brushedNickel: ['bide-2.webp', 'high-3.webp', 'slavina-5.webp', 'thub-5.webp', 'ugradbena-4.webp', 'ug-tus-2.webp', 'zid-tus-5.webp'],
}

// Isti popis kolekcija kao na ProizvodiSlavine (pojednostavljeno, fokus na galeriju i linkove)
const collections = [
  {
    key: 'rubi',
    image: rubiProstor,
    images: rubiImages,
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=RUBI',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'topaz',
    image: '/slavine/topaz.webp',
    images: ['/slavine/topaz.webp', '/slavine/topaz.webp', '/slavine/topaz.webp', '/slavine/topaz.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=TOPAZ',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'opal',
    image: '/slavine/opal.webp',
    images: ['/slavine/opal.webp', '/slavine/opal.webp', '/slavine/opal.webp', '/slavine/opal.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=OPAL',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'safir',
    image: '/slavine/safir.webp',
    images: ['/slavine/safir.webp', '/slavine/safir.webp', '/slavine/safir.webp', '/slavine/safir.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=SAFIR',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'beril',
    image: '/slavine/beril.webp',
    images: ['/slavine/beril.webp', '/slavine/beril.webp', '/slavine/beril.webp', '/slavine/beril.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=BERIL',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'lapis',
    image: '/slavine/lapis.webp',
    images: ['/slavine/lapis.webp', '/slavine/lapis.webp', '/slavine/lapis.webp', '/slavine/lapis.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=LAPIS',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'violet',
    image: '/slavine/violet3.webp',
    images: ['/slavine/violet3.webp', '/slavine/violet3.webp', '/slavine/violet3.webp', '/slavine/violet3.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=VIOLET',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'jana',
    image: '/slavine/jana3.webp',
    images: ['/slavine/jana3.webp', '/slavine/jana3.webp', '/slavine/jana3.webp', '/slavine/jana3.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=JANA',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'ana',
    image: '/slavine/ana3.webp',
    images: ['/slavine/ana3.webp', '/slavine/ana3.webp', '/slavine/ana3.webp', '/slavine/ana3.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=ANA',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'start',
    image: '/slavine/start3.webp',
    images: ['/slavine/start3.webp', '/slavine/start3.webp', '/slavine/start3.webp', '/slavine/start3.webp'],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=START',
    editHomeLink: 'https://uredidom.hr/',
  },
]

const ProizvodSlavinaDetalj = () => {
  const { id } = useParams()
  const { t } = useLanguage()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [colorFilter, setColorFilter] = useState('')

  const collection = useMemo(
    () => collections.find((c) => c.key === id),
    [id]
  )

  const baseImages = useMemo(
    () => (collection ? collection.images ?? [collection.image] : []),
    [collection]
  )

  // Filtrirane slike po boji (samo za Rubi; ostale kolekcije koriste sve slike)
  const imagesForGallery = useMemo(() => {
    if (collection?.key !== 'rubi' || !colorFilter) return baseImages
    const filenames = rubiColorFilenameMap[colorFilter] ?? []
    if (!filenames.length) return baseImages
    const filtered = baseImages.filter((src) =>
      filenames.some((fn) => typeof src === 'string' && src.includes(fn))
    )
    return filtered.length ? filtered : baseImages
  }, [collection, baseImages, colorFilter])

  // Mapiranje tipova mješalica na indeks slike u TRENUTNOJ galeriji (respektira filter boje)
  const waterMixerImageMap = useMemo(() => {
    // samo za Rubi koristimo precizno mapiranje po imenu datoteke
    if (collection?.key === 'rubi') {
      const findIndexByFilename = (filename) =>
        imagesForGallery.findIndex((src) => (typeof src === 'string' ? src.includes(filename) : false))

      return {
        bidet: findIndexByFilename('bide-1.webp'),
        bathtub: findIndexByFilename('thub-1.webp'),
        builtInMixer: findIndexByFilename('ugradbena-1.webp'),
        builtInShower: findIndexByFilename('ug-tus-1.webp'),
        showerSet: findIndexByFilename('zid-tus-1.webp'),
      }
    }

    // default fallback za ostale kolekcije
    return {
      bidet: 0,
      bathtub: 1,
      builtInMixer: 2,
      builtInShower: 3,
      showerSet: 4,
    }
  }, [collection, imagesForGallery])

  if (!collection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="max-w-lg text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            {t('faucetsPage.notFoundLabel') ?? 'Slavina nije pronađena'}
          </p>
          <p className="mb-8 text-lg text-slate-700">
            {t('faucetsPage.notFoundDescription') ?? 'Odabrana kolekcija ne postoji ili je trenutno nedostupna.'}
          </p>
          <RouterLink
            to="/proizvodi/slavine"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
          >
            {t('faucetsPage.backToList') ?? 'Natrag na slavine'}
          </RouterLink>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero s pozadinskom slikom i naslovom kolekcije */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden">
        <img
          src={kupaonicaImage}
          alt="Slavine"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
            {t('products.faucets')}
          </p>
          <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t(`collections.${collection.key}.name`)}
          </h1>
          <p className="text-lg text-white/85 md:text-xl">
            {t(`collections.${collection.key}.benefit`)}
          </p>
        </div>
      </section>

      {/* Detalji kolekcije */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-10 rounded-3xl bg-slate-50 p-6 shadow-md md:flex-row md:items-start md:p-10">
            {/* Galerija lijevo */}
            <div className="w-full md:w-1/2">
              <ProductGallery
                images={imagesForGallery}
                alt={t(`collections.${collection.key}.name`)}
                activeIndexExternal={activeImageIndex}
              />
            </div>

            {/* Opis i linkovi desno */}
            <div className="flex w-full flex-col justify-between space-y-8 md:w-1/2">
              {/* Opis kolekcije */}
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                  {t(`collections.${collection.key}.description`)}
                </p>

                {/* Sekcije proizvoda – mješalice za vodu */}
                <div className="mt-4 space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {t('faucetsPage.sections.waterMixersTitle')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['bidet', 'bathtub', 'builtInMixer', 'builtInShower', 'showerSet'].map((key) => (
                      <span
                        key={key}
                        onClick={() => {
                          const mapped = waterMixerImageMap[key]
                          const targetIndex =
                            typeof mapped === 'number' && mapped >= 0 ? mapped : 0
                          setActiveImageIndex(targetIndex)
                        }}
                        className="inline-flex cursor-pointer items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:border-[#0070CD] hover:text-[#0070CD]"
                      >
                        {t(`faucetsPage.sections.waterMixers.${key}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gumbi i povratak */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <a
                    href={collection.b2bLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#005bb0]"
                  >
                    {t('navbar.b2b')}
                  </a>
                  <a
                    href={collection.editHomeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
                  >
                    {t('navbar.editHome')}
                  </a>
                </div>

                <RouterLink
                  to="/proizvodi/slavine"
                  className="inline-flex items-center justify-center text-sm font-semibold text-[#0070CD] underline-offset-4 hover:underline"
                >
                  {t('faucetsPage.backToList') ?? 'Natrag na popis slavina'}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcija: pregled proizvoda po varijanti */}
      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {t('faucetsPage.productVariantTitle') ?? t(`collections.${collection.key}.name`)}
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              {t('faucetsPage.productVariantSubtitle') ??
                'Odaberite boju i kratki opis proizvoda kako biste lakše usporedili različite varijante unutar kolekcije.'}
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
            {/* Lijevo: pregled slike (koristimo istu aktivnu sliku iz galerije) */}
            <div className="flex w-full items-center justify-center md:w-1/2">
              <div className="relative w-full max-w-md">
                <div className="relative mx-auto flex h-[360px] max-h-[420px] items-center justify-center overflow-visible md:h-[420px]">
                  <img
                    src={imagesForGallery[activeImageIndex] ?? collection.image}
                    alt={t(`collections.${collection.key}.name`)}
                    className="max-h-full w-auto object-contain drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Desno: naslov, opis, dropdowni */}
            <div className="mt-6 flex w-full flex-col gap-6 md:mt-0 md:w-1/2">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                  {t(`collections.${collection.key}.name`)}
                </h3>
                <p className="text-sm text-slate-600 md:text-base">
                  {t(`collections.${collection.key}.description`)}
                </p>
              </div>

              {/* Dropdown za boju proizvoda */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  {t('faucetsPage.colorLabel') ?? 'Boja proizvoda'}
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
                  value={colorFilter}
                  onChange={(e) => {
                    const next = e.target.value
                    setColorFilter(next)
                    // resetiraj aktivnu sliku na prvu iz nove galerije
                    // (mapiranje boja → datoteke rješava imagesForGallery)
                    setActiveImageIndex(0)
                  }}
                >
                  <option value="">
                    {t('faucetsPage.colorPlaceholder') ?? 'Odaberite boju'}
                  </option>
                  {['chrome', 'black', 'gunMetal', 'brushGold', 'brushedNickel', 'bronze'].map((finishKey) => (
                    <option key={finishKey} value={finishKey}>
                      {t(`faucetsPage.finishes.${finishKey}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown za kratki opis proizvoda */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  {t('faucetsPage.variantInfoLabel') ?? 'Kratki opis proizvoda'}
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('faucetsPage.variantInfoPlaceholder') ?? 'Odaberite kratki opis'}
                  </option>
                  <option value="washbasin">
                    {t('faucetsPage.variantWashbasin') ?? 'Mješalica za umivaonik'}
                  </option>
                  <option value="bidet">{t('faucetsPage.variantBidet') ?? 'Mješalica za bide'}</option>
                  <option value="bathtub">{t('faucetsPage.variantBathtub') ?? 'Mješalica za kadu / tuš'}</option>
                  <option value="builtIn">{t('faucetsPage.variantBuiltIn') ?? 'Ugradbena mješalica'}</option>
                  <option value="showerSet">{t('faucetsPage.variantShowerSet') ?? 'Tuš set / sistem'}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProizvodSlavinaDetalj

