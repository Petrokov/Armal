import rubiProstor from '../../assets/slavine/rubi-compresed/rubi-prostor.webp'
import safirMain from '../../assets/slavine/safir/glavna-slika.webp'
import berilMain from '../../assets/slavine/beril/glavna-slika-beril.webp'
import lapisMain from '../../assets/slavine/lapis/lapis-glavna-slika.webp'
import violetMain from '../../assets/slavine/violet/Violet glavna.webp'
import janaMain from '../../assets/slavine/jana/Slavina Jana naslovna.webp'
import anaMain from '../../assets/slavine/ana/glavna-slika.webp'
import startMain from '../../assets/slavine/start/Start-glavna-slika.webp'

const toSortedImages = (globResult) => (
  Object.entries(globResult)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
    .map(([, mod]) => (mod && 'default' in mod ? mod.default : mod))
)

const rubiGlob = import.meta.glob('../../assets/slavine/rubi-compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const rubiGalleryImages = toSortedImages(rubiGlob)
const rubiImages =
  rubiGalleryImages.length > 0
    ? [rubiProstor, ...rubiGalleryImages.filter((src) => src !== rubiProstor)]
    : [rubiProstor]

const safirGlob = import.meta.glob('../../assets/slavine/safir/**/*.{webp,png,jpg,jpeg}', { eager: true })
const safirGalleryImages = toSortedImages(safirGlob)
const safirImages =
  safirGalleryImages.length > 0
    ? [safirMain, ...safirGalleryImages.filter((src) => src !== safirMain)]
    : [safirMain]

const berilGlob = import.meta.glob('../../assets/slavine/beril/**/*.{webp,png,jpg,jpeg}', { eager: true })
const berilGalleryImages = toSortedImages(berilGlob)
const berilImages =
  berilGalleryImages.length > 0
    ? [berilMain, ...berilGalleryImages.filter((src) => src !== berilMain)]
    : [berilMain]

const lapisGlob = import.meta.glob('../../assets/slavine/lapis/**/*.{webp,png,jpg,jpeg}', { eager: true })
const lapisGalleryImages = toSortedImages(lapisGlob)
const lapisImages =
  lapisGalleryImages.length > 0
    ? [lapisMain, ...lapisGalleryImages.filter((src) => src !== lapisMain)]
    : [lapisMain]

const violetGlob = import.meta.glob('../../assets/slavine/violet/**/*.{webp,png,jpg,jpeg}', { eager: true })
const violetGalleryImages = toSortedImages(violetGlob)
const violetImages =
  violetGalleryImages.length > 0
    ? [violetMain, ...violetGalleryImages.filter((src) => src !== violetMain)]
    : [violetMain]

const janaGlob = import.meta.glob('../../assets/slavine/jana/**/*.{webp,png,jpg,jpeg}', { eager: true })
const janaGalleryImages = toSortedImages(janaGlob)
const janaImages =
  janaGalleryImages.length > 0
    ? [janaMain, ...janaGalleryImages.filter((src) => src !== janaMain)]
    : [janaMain]

const anaGlob = import.meta.glob('../../assets/slavine/ana/**/*.{webp,png,jpg,jpeg}', { eager: true })
const anaGalleryImages = toSortedImages(anaGlob)
const anaImages =
  anaGalleryImages.length > 0
    ? [anaMain, ...anaGalleryImages.filter((src) => src !== anaMain)]
    : [anaMain]

const startGlob = import.meta.glob('../../assets/slavine/start/**/*.{webp,png,jpg,jpeg}', { eager: true })
const startGalleryImages = toSortedImages(startGlob)
const startImages =
  startGalleryImages.length > 0
    ? [startMain, ...startGalleryImages.filter((src) => src !== startMain)]
    : [startMain]

const topazGlob = import.meta.glob('../../assets/slavine/topaz-compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const topazGalleryImages = toSortedImages(topazGlob)
const topazImages = ['/slavine/topaz.webp', ...topazGalleryImages]

const opalGlob = import.meta.glob('../../assets/slavine/opal compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const opalGalleryImages = toSortedImages(opalGlob)
const opalImages = ['/slavine/opal.webp', ...opalGalleryImages]

export const colorFilenameMapByCollection = {
  rubi: {
    chrome: ['bidet-4.webp', 'high-4.webp', 'slavina-4.webp', 'thub-1.webp', 'ug-tus-1.webp', 'ugradbena-5.webp'],
    black: ['bide-3.webp', 'high-5.webp', 'slavina-2.webp', 'thub-2.webp', 'ugradbena-1.webp', 'ug-tus-3.webp', 'zid-tus-4.webp'],
    gunMetal: ['bide-1.webp', 'high-2.webp', 'slavina-3.webp', 'thub-4.webp', 'ugradbena-3.webp', 'ug-tus-5.webp', 'zid-tus-2.webp'],
    brushGold: ['bide-5.webp', 'high-1.webp', 'slavina-1.webp', 'thub-3.webp', 'ugradbena-2.webp', 'ug-tus-4.webp', 'zid-tus-1.webp'],
    brushedNickel: ['bide-2.webp', 'high-3.webp', 'slavina-5.webp', 'thub-5.webp', 'ugradbena-4.webp', 'ug-tus-2.webp', 'zid-tus-5.webp'],
  },
  safir: {
    chrome: ['bide-krom.webp', 'kada-krom.webp', 'niska-krom.webp', 'tus-krom.webp', 'ugr-mjesalica-krom.webp', 'visoka-krom.webp'],
    black: ['bide-crna.webp', 'kada-crna.webp', 'niska-crna.webp', 'tus-crna.webp', 'ugr-mjesalica-crna.webp', 'visoka-crna.webp'],
  },
  topaz: {
    brushGold: ['bide-zlatna.webp', 'kada-zlatna.webp', 'slavina-zlatna.webp', 'visoka-zlatna.webp', 'tus-slavina-zlatna.webp'],
    black: ['bide-crna.webp', 'kada-crna.webp', 'slavina-crna.webp', 'visoka-crna.webp', 'tus-slavina-crna.webp'],
    gunMetal: ['bide-gunmetal.webp', 'kada-gunmetal.webp', 'slavina-gunmetal.webp', 'visoka-gunmetal.webp', 'tus-slavina-gunmetal.webp'],
    chrome: ['bide-krom.webp', 'kada-krom.webp', 'slavina-krom.webp', 'visoka-krom.webp', 'tus-slavina-krom.webp'],
  },
  opal: {
    black: ['bidet-crna.webp', 'kada-crna.webp', 'niska-crna.webp', 'tus-crni.webp', 'ugr-slavina-crna.webp', 'ugr-tus-crna.webp', 'visoka-crna.webp'],
    gunMetal: ['bidet-gunmetal.webp', 'kada-gunmetal.webp', 'niska-gunmetal.webp', 'tus-gunmetal.webp', 'ugr-slavina-gunmetal.webp', 'ugr-tus-gunmetal.webp', 'visoka-gunmetal.webp'],
    chrome: ['bidet-krom.webp', 'kada-krom.webp', 'niska-krom.webp', 'tus-krom.webp', 'ugr-slavina-krom.webp', 'ugr-tus-krom.webp', 'visoka-krom.webp'],
  },
  beril: {
    chrome: ['bidet-krom.webp', 'kada-krom.webp', 'slavina-niska-krom.webp', 'slavina-3-krom.webp', 'tus-krom.webp', 'tus-2-krom.webp', 'ugr-tus-krom.webp', 'ugr-tus-strop-krom.webp', 'beril_FH8226A-D111 Picture copy.webp'],
    black: ['bidet-crna.webp', 'kada-crna.webp', 'slavina-niska-crna.webp', 'slavina-3-crna.webp', 'ugr-tus-strop-crni.webp', 'beril_FH8226A-D111-PB Picture copy.webp'],
  },
  lapis: {
    bronze: ['bidet-bronca.webp', 'kada-bronca.webp', 'kada-visoka-bronca.webp', 'mješalica-bronca.webp', 'mješalica-visoka-bronca.webp', 'tus-bronca.webp', 'tus-set-bronca.webp', 'ugradbeni-tus-bronca.webp'],
    black: ['bidet-crna.webp', 'kada-crna.webp', 'kada-visoka-crna.webp', 'mješalica-crna.webp', 'mješalica-visoka-crna.webp', 'tus-crna.webp', 'tus-set-crna.webp', 'ugradbeni-tus-crna.webp'],
  },
}

export const categoryFilenameMapByCollection = {
  rubi: { bidet: 'bide-1.webp', bathtub: 'thub-1.webp', builtInMixer: 'ugradbena-1.webp', builtInShower: 'ug-tus-1.webp', showerSet: 'zid-tus-1.webp' },
  safir: { bidet: 'bide-crna.webp', bathtub: 'kada-crna.webp', builtInMixer: 'ugr-mjesalica-crna.webp', builtInShower: 'visoka-crna.webp', showerSet: 'tus-crna.webp' },
  beril: { bidet: 'bidet-crna.webp', bathtub: 'kada-crna.webp', builtInMixer: 'slavina-3-crna.webp', showerSet: 'tus-2-krom.webp', builtInShower: 'ugr-tus-krom.webp' },
  lapis: { bidet: 'lapis/bidet/', bathtub: 'lapis/kada/', builtInMixer: 'lapis/slavina/', showerSet: 'lapis/tus/', builtInShower: 'lapis/ugradbeni-tus/' },
  jana: { bidet: 'slavina-bidet-korm.webp', bathtub: 'slavina-kada-krom.webp', builtInMixer: 'slavina-krom.webp', builtInShower: 'slavina-tus-krom.webp', showerSet: 'tus-set-krom.webp' },
  violet: { bidet: 'bidet-krom.webp', bathtub: 'kada-krom.webp', builtInMixer: 'slavina-krom.webp', showerSet: 'tus-krom.webp' },
  topaz: { bidet: 'bide-crna.webp', bathtub: 'kada-crna.webp', showerSet: 'tus-slavina-crna.webp', builtInShower: 'visoka-crna.webp' },
  opal: { bidet: 'bidet-crna.webp', bathtub: 'kada-crna.webp', builtInMixer: 'ugr-slavina-crna.webp', builtInShower: 'visoka-crna.webp', showerSet: 'ugr-tus-crna.webp' },
  ana: { bathtub: 'kada-krom.webp', builtInMixer: 'slavina-krom.webp', showerSet: 'tus-krom.webp' },
  start: { bidet: 'bidet krom.webp', bathtub: 'kada-krom.webp', builtInMixer: 'slavina-krom.webp', showerSet: 'tus-krom.webp' },
}

export const defaultFinishes = [
  { key: 'chrome', color: '#e5e7eb' },
  { key: 'black', color: '#1f2937' },
  { key: 'gunMetal', color: '#4b5563' },
  { key: 'brushGold', color: '#c9a227' },
  { key: 'brushedNickel', color: '#a8a9ad' },
  { key: 'bronze', color: '#cd7f32' },
]

export const faucetsCollections = [
  {
    key: 'rubi',
    image: rubiProstor,
    images: rubiImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }, { key: 'black', color: '#1f2937' }, { key: 'gunMetal', color: '#4b5563' }, { key: 'brushGold', color: '#c9a227' }, { key: 'brushedNickel', color: '#a8a9ad' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=RUBI',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'topaz',
    image: '/slavine/topaz.webp',
    images: topazImages.length ? topazImages : ['/slavine/topaz.webp'],
    finishes: [{ key: 'chrome', color: '#e5e7eb' }, { key: 'black', color: '#1f2937' }, { key: 'gunMetal', color: '#4b5563' }, { key: 'brushGold', color: '#c9a227' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=TOPAZ',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'violet',
    image: violetMain,
    images: violetImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=VIOLET',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'start',
    image: startMain,
    images: startImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=START',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'opal',
    image: '/slavine/opal.webp',
    images: opalImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }, { key: 'black', color: '#1f2937' }, { key: 'gunMetal', color: '#4b5563' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=OPAL',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'safir',
    image: safirMain,
    images: safirImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }, { key: 'black', color: '#1f2937' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=SAFIR',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'beril',
    image: berilMain,
    images: berilImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }, { key: 'black', color: '#1f2937' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=BERIL',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'lapis',
    image: lapisMain,
    images: lapisImages,
    finishes: [{ key: 'black', color: '#1f2937' }, { key: 'bronze', color: '#cd7f32' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=LAPIS',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'ana',
    image: anaMain,
    images: anaImages.length ? anaImages : [anaMain],
    finishes: [{ key: 'chrome', color: '#e5e7eb' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=ANA',
    editHomeLink: 'https://uredidom.hr/',
  },
  {
    key: 'jana',
    image: janaMain,
    images: janaImages,
    finishes: [{ key: 'chrome', color: '#e5e7eb' }],
    b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=JANA',
    editHomeLink: 'https://uredidom.hr/',
  },
]
