import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import logo from '../assets/Armal_logo_BLUE.png'

const Footer = () => {
  const { t } = useLanguage()

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-10 lg:gap-12">
          {/* Left Column - Logo, Slogan, Company Info */}
          <div className="flex flex-col lg:col-span-4">
            <img src={logo} alt="Armal logo" className="mb-4 h-8 w-36" />
            <div className="space-y-5">
              <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                <p>
                  Mrkšina 52D
                  <br />
                  10000 Zagreb, Hrvatska
                </p>
                <p>
                  <a href="mailto:info@armal.hr" className="transition-colors hover:text-[#0070CD]">
                    info@armal.hr
                  </a>
                  {' i '}
                  <a href="mailto:servis@armal.hr" className="transition-colors hover:text-[#0070CD]">
                    servis@armal.hr
                  </a>
                </p>
                <p>
                  <a href="tel:+385913375730" className="transition-colors hover:text-[#0070CD]">
                    +385 91 3375 730
                  </a>
                </p>
              </div>

              <div className="space-y-1.5 text-sm leading-relaxed text-slate-500">
                <p>
                  {t('footer.oib')}: {t('footer.oibValue')}
                </p>
                <p>
                  {t('footer.mbs')}: {t('footer.mbsValue')}
                </p>
                <p>
                  {t('footer.uid')}: {t('footer.uidValue')}
                </p>
              </div>

              <div className="space-y-1.5 text-sm leading-relaxed text-slate-500">
                <p>Banka: Erste&Steiermärkische Bank d. d.</p>
                <p>IBAN: HR63 2402 0061 1011 2456 1</p>
              </div>
            </div>
          </div>

          {/* Middle Column - Navigation Links */}
          <div className="flex flex-col lg:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              {t('footer.linksTitle')}
            </h3>
            <nav className="flex flex-col space-y-2.5">
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
                    to={link.path}
                    className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                  >
                    {t(`navbar.${link.key}`)}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Services Column */}
          <div className="flex flex-col lg:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              Usluge
            </h3>
            <nav className="flex flex-col space-y-2.5">
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
                    to={link.path}
                    className="text-sm text-slate-600 transition-colors hover:text-[#0070CD]"
                  >
                    {t(`navbar.${link.key}`)}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Column - Legal Links */}
          <div className="flex flex-col lg:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              {t('footer.legalTitle')}
            </h3>
            <nav className="flex flex-col space-y-2.5">
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

