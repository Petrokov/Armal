import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import logo from '../assets/Armal_logo_BLUE.png'
import { buildLocalizedPath, stripLanguagePrefix } from '../utils/languageRouting'

const Navbar = () => {
  const { t, language, changeLanguage } = useLanguage()
  const [openLanguageDropdownId, setOpenLanguageDropdownId] = useState(null) // 'main' | 'sidebar'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const sidebarRef = useRef(null)
  const currentPath = stripLanguagePrefix(location.pathname)
  const localizePath = (path) => buildLocalizedPath(path, language)

  const utilityLinks = [
    { key: 'servis', href: '/servis', isRoute: true },
    { key: 'b2b', href: 'https://b2b.armal.hr/', isRoute: false },
    { key: 'editHome', href: 'https://uredidom.hr/', isRoute: false },
    { key: 'blog', href: '/blog', isRoute: true },
  ]

  const primaryLinks = [
    { key: 'home', href: '/', hasDropdown: false, isRoute: true },
    { key: 'products', href: '/proizvodi', hasDropdown: true, isRoute: true },
    { key: 'catalogues', href: '/katalozi', hasDropdown: false, isRoute: true },
    { key: 'about', href: '/o-nama', hasDropdown: false, isRoute: true },
  ]

  const productCategories = [
    { key: 'faucets', href: '/proizvodi/slavine', translationKey: 'products.faucets' },
    { key: 'bathing', href: '/proizvodi/kupanje-tusiranje', translationKey: 'products.bathing' },
    { key: 'sanitary', href: '/proizvodi/sanitarije', translationKey: 'products.sanitary' },
  ]

  const languages = [
    { code: 'hr', label: t('languages.hr'), short: 'HR' },
    { code: 'slo', label: t('languages.slo'), short: 'SI' },
    { code: 'rs', label: t('languages.rs'), short: 'RS' },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const switchLanguage = (lang, shouldCloseSidebar = false) => {
    const localizedUrl = buildLocalizedPath(
      `${location.pathname}${location.search}${location.hash}`,
      lang
    )
    changeLanguage(lang)
    navigate(localizedUrl)
    setOpenLanguageDropdownId(null)
    if (shouldCloseSidebar) closeSidebar()
  }

  useEffect(() => {
    closeSidebar()
  }, [location.pathname])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSidebarOpen])

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
    <header className="sticky top-0 z-[1000] w-full">
      <nav className="h-16 border-b border-black/10 bg-white">
        <div className="relative mx-auto flex h-full w-full items-center justify-between px-6 md:px-[70px]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors duration-200 hover:text-[#1a6cc4] md:inline-flex"
              aria-label={t('navbar.openMenu')}
            >
              <IconHamburger />
            </button>
            <Link to={localizePath('/')} aria-label="armal logo">
              <img src={logo} alt="armal logo" className="h-8 w-auto" />
            </Link>
          </div>

          <ul className="hidden items-center gap-8 text-[14px] font-medium text-[#1a1a1a] md:ml-auto md:flex min-[1400px]:absolute min-[1400px]:left-1/2 min-[1400px]:-translate-x-1/2">
            {primaryLinks.map((link) => {
              const isActive =
                link.key === 'products'
                  ? currentPath === link.href || currentPath.startsWith(`${link.href}/`)
                  : currentPath === link.href

              return (
                <li key={link.key} className="group relative inline-flex items-center">
                  <Link
                    to={localizePath(link.href)}
                    className={`flex items-center gap-1 border-b-2 border-transparent pb-1 transition-colors duration-200 ${
                      isActive
                        ? 'border-[#1a6cc4] text-[#1a6cc4]'
                        : 'text-[#1a1a1a] hover:border-[#1a6cc4] hover:text-[#1a6cc4]'
                    }`}
                  >
                    {t(`navbar.${link.key}`)}
                    {link.hasDropdown && <IconChevronDown />}
                  </Link>

                  {link.hasDropdown && (
                    <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="rounded-2xl bg-white p-4 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
                        <ul className="space-y-1">
                          {productCategories.map((category) => (
                            <li key={category.key}>
                              <Link
                                to={localizePath(category.href)}
                                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#1a6cc4]/10 hover:text-[#1a6cc4]"
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

          <div className="flex items-center gap-5">
            <div className="relative hidden rounded-full bg-slate-100 p-1 min-[1400px]:block">
              <button
                type="button"
                onClick={() =>
                  setOpenLanguageDropdownId(openLanguageDropdownId === 'main' ? null : 'main')
                }
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-[#4a4a4a] transition-colors duration-200 hover:border-[#1a6cc4]/30 hover:text-[#1a6cc4]"
                aria-label="Promijeni jezik"
              >
                <IconGlobe />
                {currentLanguage.short}
                <IconChevronDown className="h-3 w-3" />
              </button>

              {openLanguageDropdownId === 'main' && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenLanguageDropdownId(null)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          language === lang.code
                            ? 'bg-[#0070CD]/10 font-semibold text-[#0070CD]'
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

            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors duration-200 hover:text-[#1a6cc4] md:hidden"
              aria-label={t('navbar.openMenu')}
            >
              <IconHamburgerMobile />
            </button>

            <div className="hidden items-center gap-2 text-[12px] text-[#666] min-[1400px]:flex">
              {utilityLinks.map((link, idx) => {
                const LinkComponent = link.isRoute ? Link : 'a'
                const linkProps = link.isRoute
                  ? { to: localizePath(link.href) }
                  : { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                const isActive =
                  link.isRoute &&
                  (link.href === currentPath ||
                    (link.href === '/blog' && currentPath.startsWith('/blog/')))

                return (
                  <div key={link.key} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-slate-400">|</span>}
                    <LinkComponent
                      {...linkProps}
                      className={`transition-colors hover:text-[#1a6cc4] ${isActive ? 'text-[#1a6cc4]' : 'text-[#666]'}`}
                    >
                      {t(`navbar.${link.key}`)}
                    </LinkComponent>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(0,0,0,0.3)] transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-[1000] h-full w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <Link to={localizePath('/')} onClick={closeSidebar}>
              <img src={logo} alt="armal logo" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={closeSidebar}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#0070CD]"
              aria-label={t('navbar.closeMenu')}
            >
              <IconClose />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <nav className="space-y-1">
              {primaryLinks.map((link) => {
                const isActive =
                  link.key === 'products'
                    ? currentPath === link.href || currentPath.startsWith(`${link.href}/`)
                    : currentPath === link.href

                return (
                  <div key={link.key} className="flex flex-col">
                    <Link
                      to={localizePath(link.href)}
                      onClick={closeSidebar}
                      className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive ? 'bg-[#0070CD]/10 text-[#0070CD]' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t(`navbar.${link.key}`)}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-4">
                        {productCategories.map((category) => (
                          <Link
                            key={category.key}
                            to={localizePath(category.href)}
                            onClick={closeSidebar}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0070CD]"
                          >
                            {t(category.translationKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="mt-5 border-t border-slate-200 pt-4">
                {utilityLinks.map((link) => {
                  const LinkComponent = link.isRoute ? Link : 'a'
                  const linkProps = link.isRoute
                    ? { to: localizePath(link.href), onClick: closeSidebar }
                    : { href: link.href, onClick: closeSidebar, target: '_blank', rel: 'noopener noreferrer' }
                  return (
                    <LinkComponent
                      key={link.key}
                      {...linkProps}
                      className="block rounded-lg px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0070CD]"
                    >
                      {t(`navbar.${link.key}`)}
                    </LinkComponent>
                  )
                })}
              </div>
            </nav>
          </div>

          <div className="border-t border-slate-200 px-5 py-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Kontakt</p>
            <a href="mailto:info@armal.hr" className="block text-sm text-slate-700 hover:text-[#0070CD]">
              info@armal.hr
            </a>
            <a href="tel:+385913375730" className="block text-sm text-slate-700 hover:text-[#0070CD]">
              +385 91 3375 730
            </a>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/Armal.Hrvatska"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-[#0070CD]"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/armal_hrvatska/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-[#0070CD]"
              >
                Instagram
              </a>
              <a
                href="https://hr.linkedin.com/company/armal-d-o-o"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-[#0070CD]"
              >
                LinkedIn
              </a>
            </div>

            <div className="relative mt-4">
              <button
                type="button"
                onClick={() =>
                  setOpenLanguageDropdownId(openLanguageDropdownId === 'sidebar' ? null : 'sidebar')
                }
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-[#0070CD]/30 hover:text-[#0070CD]"
                aria-label="Promijeni jezik"
              >
                <div className="flex items-center gap-2">
                  <IconGlobe />
                  {currentLanguage.short}
                </div>
                <IconChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openLanguageDropdownId === 'sidebar' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openLanguageDropdownId === 'sidebar' && (
                <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border border-slate-200 bg-white shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code, true)}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        language === lang.code
                          ? 'bg-[#0070CD]/10 font-semibold text-[#0070CD]'
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

const IconHamburgerMobile = () => (
  <span className="flex flex-col gap-[5px]">
    <span className="block h-[2px] w-[22px] bg-current" />
    <span className="block h-[2px] w-[22px] bg-current" />
    <span className="block h-[2px] w-[22px] bg-current" />
  </span>
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
