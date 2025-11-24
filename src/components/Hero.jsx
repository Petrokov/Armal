import heroImage from '../assets/kupaonica-zelena.webp'

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] w-full flex-1 items-center overflow-hidden bg-slate-900 text-white">
      <img
        src={heroImage}
        alt="Moderni kupaonski interijer"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/30" />

      <div className="relative z-10 w-full">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-left md:px-10 lg:px-12">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.5em] text-white/70">armal kolekcije</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Praktična rješenja.
              <br />
              Estetski dojam.
              <br />
              Pristupačna cijena.
            </h1>
            <p className="mt-4 text-base text-white/80 sm:text-lg md:max-w-2xl">
              Uredite prostor po svom ukusu — bez kompromisa između izgleda i budžeta.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(15,23,42,0.25)]">
              Istražite Kolekciju
              <ArrowIcon />
            </button>
            <button className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
              Pogledajte Katalog
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Hero

