import { useLanguage } from '../contexts/LanguageContext'

const ProizvodiSanitarije = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold md:text-5xl">{t('products.sanitary')}</h1>
          <p className="mt-4 text-lg text-white/90">{t('products.sanitaryDescription')}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-slate-600">{t('productsPage.comingSoon')}</p>
      </section>
    </div>
  )
}

export default ProizvodiSanitarije

