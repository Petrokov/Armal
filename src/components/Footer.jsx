import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import logo from '../assets/Armal_logo_BLUE.png'
import { buildLocalizedPath } from '../utils/languageRouting'

const Footer = () => {
  const { t, language } = useLanguage()
  const localizePath = (path) => buildLocalizedPath(path, language)

  // Navigacijski linkovi za footer
  const footerLinks = [
    { key: 'home', path: '/' },
    { key: 'products', path: '#proizvodi' },
    { key: 'catalogues', path: '/katalozi' },
    { key: 'about', path: '/o-nama' },
  ]

  // Legal linkovi
  const legalLinks = [
    { key: 'privacy', path: '#privacy' },
    { key: 'terms', path: '#terms' },
    { key: 'cookies', path: '#cookies' },
  ]

  // Usluge linkovi
  const servicesLinks = [
    { key: 'servis', path: '/servis', isRoute: true },
    { key: 'b2b', path: 'https://b2b.armal.hr/', isRoute: false },
    { key: 'editHome', path: 'https://uredidom.hr/', isRoute: false },
    { key: 'blog', path: '/blog', isRoute: true },
  ]

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-10 lg:gap-6">
          {/* Left block — logo, kontakt | poslovni i bankovni podaci */}
          <div className="flex flex-col lg:col-span-4">
            <img src={logo} alt="Armal logo" className="mb-4 h-8 w-36 shrink-0" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-start sm:gap-5 lg:gap-6">
              <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                <p>
                  Mrkšina 52D
                  <br />
                  10000 Zagreb, Hrvatska
                </p>
                <p>
                  <a
                    href="mailto:info@armal.hr"
                    className="font-semibold text-slate-700 transition-colors hover:text-[#0070CD]"
                  >
                    info@armal.hr
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:servis@armal.hr"
                    className="font-semibold text-slate-700 transition-colors hover:text-[#0070CD]"
                  >
                    servis@armal.hr
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+385913375730"
                    className="font-semibold text-slate-700 transition-colors hover:text-[#0070CD]"
                  >
                    +385 91 3375 730
                  </a>
                </p>
              </div>

              <div className="text-sm leading-relaxed text-slate-500 sm:border-l sm:border-slate-200 sm:pl-4">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-1">
                  <span className="whitespace-nowrap">
                    {t('footer.oib')}:{' '}
                    <span className="font-semibold text-slate-700">02300129401</span>
                  </span>
                  <span className="whitespace-nowrap">
                    {t('footer.mbs')}: 08140233
                  </span>
                  <span className="whitespace-nowrap">
                    {t('footer.uid')}: HR02300129401
                  </span>
                  <span className="sm:max-w-[min(100%,28rem)]">
                    Banka: Erste&Steiermärkische Bank d. d.
                  </span>
                  <span className="whitespace-nowrap">
                    IBAN:{' '}
                    <span className="font-semibold text-slate-700">HR63 2402 0061 1011 2456 1</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Linkovi, Usluge, Legal — zajedno, ujednačen gap, poravnato udesno na lg+ */}
          <div className="flex flex-col md:items-stretch lg:col-span-6 lg:flex-row lg:justify-end">
            <div className="grid w-full grid-cols-1 gap-6 p-4 sm:p-5 sm:grid-cols-3 lg:w-auto lg:max-w-none lg:p-6">
              <div className="flex min-w-0 flex-col">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  {t('footer.linksTitle')}
                </h3>
                <nav className="flex flex-col space-y-2">
                  {footerLinks.map((link) => {
                    if (link.path.startsWith('#')) {
                      return (
                        <a
                          key={link.key}
                          href={link.path}
                          className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                        >
                          {t(`navbar.${link.key}`)}
                        </a>
                      )
                    }
                    return (
                      <Link
                        key={link.key}
                        to={localizePath(link.path)}
                        className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                      >
                        {t(`navbar.${link.key}`)}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="flex min-w-0 flex-col">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Usluge
                </h3>
                <nav className="flex flex-col space-y-2">
                  {servicesLinks.map((link) => {
                    if (!link.isRoute) {
                      return (
                        <a
                          key={link.key}
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                        >
                          {t(`navbar.${link.key}`)}
                        </a>
                      )
                    }

                    return (
                      <Link
                        key={link.key}
                        to={localizePath(link.path)}
                        className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                      >
                        {t(`navbar.${link.key}`)}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="flex min-w-0 flex-col">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  {t('footer.legalTitle')}
                </h3>
                <nav className="flex flex-col space-y-2">
                  {legalLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.path}
                      className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                    >
                      {t(`footer.${link.key}`)}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-200 pt-6 text-center">
          <p className="text-xs text-slate-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

