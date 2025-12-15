import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import logo from '../assets/Armal_logo_BLUE.png'

const Navbar = () => {
  const { t, language, changeLanguage } = useLanguage()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const sidebarRef = useRef(null)

  // Navigacijski linkovi - koriste translation keys
  const navLinks = [
    { key: 'home', href: '/', isRoute: true },
    { key: 'products', href: '/proizvodi', hasDropdown: true, isRoute: true },
    { key: 'catalogues', href: '/katalozi', isRoute: true },
    { key: 'about', href: '/o-nama', isRoute: true },
    { key: 'b2b', href: '#b2b' },
    { key: 'editHome', href: '#uredi-dom' },
    { key: 'blog', href: '#blog' },
  ]

  // Glavne kategorije proizvoda
  const productCategories = [
    { key: 'faucets', href: '/proizvodi/slavine', translationKey: 'products.faucets' },
    { key: 'bathing', href: '/proizvodi/kupanje-tusiranje', translationKey: 'products.bathing' },
    { key: 'sanitary', href: '/proizvodi/sanitarije', translationKey: 'products.sanitary' },
  ]

  // Dostupni jezici
  const languages = [
    { code: 'hr', label: t('languages.hr') },
    { code: 'slo', label: t('languages.slo') },
    { code: 'rs', label: t('languages.rs') },
  ]

  // Zatvori sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  // Zatvori sidebar kada se promijeni lokacija
  useEffect(() => {
    closeSidebar()
  }, [location.pathname])

  // Zatvori sidebar na ESC tipku
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSidebarOpen])

  // Spriječi scroll kada je sidebar otvoren
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-8 py-4 font-sans">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors duration-200 hover:text-blue-600"
            aria-label={isSidebarOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
          >
            {isSidebarOpen ? <IconClose /> : <IconHamburger />}
          </button>
          <Link to="/">
            <img src={logo} alt="armal logo" className="h-8 w-auto" />
          </Link>
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-[#4a4a4a] lg:flex">
          {navLinks.map((link) => {
            // Za "Proizvodi" link, aktivan je i na /proizvodi i na svim podstranicama
            const isActive = link.isRoute
              ? link.key === 'products'
                ? location.pathname === link.href || location.pathname.startsWith(`${link.href}/`)
                : location.pathname === link.href
              : link.isActive
            const LinkComponent = link.isRoute ? Link : 'a'
            const linkProps = link.isRoute
              ? { to: link.href }
              : { href: link.href }

            return (
              <li key={link.key} className="relative inline-flex flex-col items-center group">
                <LinkComponent
                  {...linkProps}
                  className={`flex items-center gap-1 border-b-2 border-transparent pb-1 transition-colors duration-200 ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'text-[#4a4a4a] hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  {t(`navbar.${link.key}`)}
                  {link.hasDropdown && <IconChevronDown />}
                </LinkComponent>

                {link.hasDropdown && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl bg-white p-4 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
                      <ul className="space-y-1">
                        {productCategories.map((category) => (
                          <li key={category.key}>
                            <Link
                              to={category.href}
                              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                              {t(category.translationKey)}
                            </Link>
                                </li>
                              ))}
                            </ul>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[#4a4a4a] transition-colors duration-200 hover:border-blue-200 hover:text-blue-600"
            aria-label="Promijeni jezik"
          >
            <IconGlobe />
            {t(`languages.${language}`)}
            <IconChevronDown className="h-3 w-3" />
          </button>

          {isLanguageOpen && (
            <>
              {/* Overlay za zatvaranje dropdowna klikom izvan njega */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLanguageOpen(false)}
                aria-hidden="true"
              />
              {/* Dropdown meni */}
              <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code)
                      setIsLanguageOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      language === lang.code
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <Link to="/" onClick={closeSidebar}>
              <img src={logo} alt="armal logo" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={closeSidebar}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-blue-600"
              aria-label={t('navbar.closeMenu')}
            >
              <IconClose />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                // Za "Proizvodi" link, aktivan je i na /proizvodi i na svim podstranicama
                const isActive = link.isRoute
                  ? link.key === 'products'
                    ? location.pathname === link.href || location.pathname.startsWith(`${link.href}/`)
                    : location.pathname === link.href
                  : link.isActive
                const LinkComponent = link.isRoute ? Link : 'a'
                const linkProps = link.isRoute
                  ? { to: link.href, onClick: closeSidebar }
                  : { href: link.href, onClick: closeSidebar }

                if (link.hasDropdown) {
                  return (
                    <div key={link.key} className="flex flex-col">
                      <LinkComponent
                        {...linkProps}
                        className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {t(`navbar.${link.key}`)}
                      </LinkComponent>
                      {/* Products Categories in Sidebar */}
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-200 pl-4">
                        {productCategories.map((category) => (
                          <Link
                            key={category.key}
                            to={category.href}
                            onClick={closeSidebar}
                            className="block rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                                      >
                            {t(category.translationKey)}
                          </Link>
                            ))}
                          </div>
                    </div>
                  )
                }

                return (
                  <LinkComponent
                    key={link.key}
                    {...linkProps}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(`navbar.${link.key}`)}
                  </LinkComponent>
                )
              })}
            </nav>
          </div>

          {/* Sidebar Footer - Language Selector */}
          <div className="border-t border-slate-200 px-6 py-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600"
                aria-label="Promijeni jezik"
              >
                <div className="flex items-center gap-2">
                  <IconGlobe />
                  {t(`languages.${language}`)}
                </div>
                <IconChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLanguageOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border border-slate-200 bg-white shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setIsLanguageOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        language === lang.code
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </header>
  )
}

// SVG ikone
const IconHamburger = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const IconClose = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconChevronDown = ({ className = '' }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
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


export default Navbar
