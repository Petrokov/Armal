import logo from '../assets/Armal_logo_BLUE.png'

const navLinks = [
  { label: 'Početna', href: '#pocetna' },
  { label: 'Proizvodi', href: '#proizvodi', hasDropdown: true, isActive: true },
  { label: 'Katalog', href: '#katalog' },
  { label: 'O nama', href: '#onama' },
  { label: 'B2B Trgovina', href: '#b2b' },
  { label: 'Uredi dom', href: '#uredi-dom' },
  { label: 'Blog', href: '#blog' },
]

const productsMenu = [
  {
    title: 'Namještaj za kupaonicu',
    items: ['Viseći', 'Podni'],
  },
  {
    title: 'Slavine za kupaonicu',
    items: ['Slavine za umivaonik', 'Slavine za kadu', 'Slavine za tuš kadu', 'Slavine za bide', 'Ugradbene slavine'],
  },
  {
    title: 'Tuš kabine, vrata, stijene i paravani',
    items: ['Tuš kabine', 'Tuš vrata', 'Tuš stijene', 'Paravani za kadu'],
  },
  {
    title: 'Kade, tuš kade i kanalice',
    items: ['Kade', 'Masažni sustavi', 'Tuš kade', 'Tuš kanalice'],
  },
  {
    title: 'Sanitarna keramika',
    items: ['WC školjke i bidei', 'Monoblok', 'WC vodokotlići', 'Umivaonici'],
  },
  {
    title: 'Komponente tuša',
    items: ['Držači tuša', 'Tuš glave', 'Tuš crijeva', 'Tuš šipke', 'Tuš setovi'],
  },
  {
    title: 'Sanitarna oprema',
    items: ['Senzori i tipke za ispiranje'],
  },
  {
    title: 'Galanterija',
    items: ['Ogledala s ormarićem', 'Ogledala bez ormarića'],
  },
]

const Navbar = () => {
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-8 py-4 font-sans">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors duration-200 hover:text-blue-600"
            aria-label="Otvori izbornik"
          >
            <IconHamburger />
          </button>
          <img src={logo} alt="armal logo" className="h-8 w-auto" />
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-[#4a4a4a] lg:flex">
          {navLinks.map((link) => (
            <li key={link.label} className="relative inline-flex flex-col items-center group">
              <a
                href={link.href}
                className={`flex items-center gap-1 border-b-2 border-transparent pb-1 transition-colors duration-200 ${
                  link.isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'text-[#4a4a4a] hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {link.label}
                {link.hasDropdown && <IconChevronDown />}
              </a>

              {link.hasDropdown && (
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(90vw,64rem)] -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
                    <button className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_-15px_rgba(37,99,235,0.7)] transition hover:bg-[#1e49ba]">
                      <IconGrid />
                      View All Products
                    </button>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {productsMenu.map((section) => (
                        <div key={section.title} className="text-left">
                          <p className="text-sm font-semibold text-slate-900">{section.title}</p>
                          <ul className="mt-3 space-y-2 text-sm text-slate-500">
                            {section.items.map((item) => (
                              <li key={item}>
                                <a href="#" className="transition hover:text-slate-900">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[#4a4a4a] transition-colors duration-200 hover:border-blue-200 hover:text-blue-600"
        >
          <IconGlobe />
          Hrvatski
        </button>
      </nav>
    </header>
  )
}

const IconHamburger = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 9h17M3.5 15h17M12 3c-2 3-2 15 0 18 2-3 2-15 0-18Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5h4v4H5V5Zm10 0h4v4h-4V5ZM5 15h4v4H5v-4Zm10 0h4v4h-4v-4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Navbar

