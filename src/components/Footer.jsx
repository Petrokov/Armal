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

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Main Footer Content - Three Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {/* Left Column - Logo, Slogan, Company Info */}
          <div className="flex flex-col">
            <img src={logo} alt="Armal logo" className="mb-4 h-8 w-36" />
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              {t('footer.slogan')}
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <p>{t('footer.oib')}: {t('footer.oibValue')}</p>
              <p>{t('footer.mbs')}: {t('footer.mbsValue')}</p>
              <p>{t('footer.uid')}: {t('footer.uidValue')}</p>
            </div>
          </div>

          {/* Middle Column - Navigation Links */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              {t('footer.linksTitle')}
            </h3>
            <nav className="flex flex-col space-y-3">
              {footerLinks.map((link) => {
                if (link.path.startsWith('#')) {
                  return (
                    <a
                      key={link.key}
                      href={link.path}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {t(`navbar.${link.key}`)}
                    </a>
                  )
                }
                return (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    {t(`navbar.${link.key}`)}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Column - Legal Links */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-base font-semibold text-slate-900">
              {t('footer.legalTitle')}
            </h3>
            <nav className="flex flex-col space-y-3">
              {legalLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.path}
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {t(`footer.${link.key}`)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

