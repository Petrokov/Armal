import { useLanguage } from '../contexts/LanguageContext'

const BlogPage = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-16 text-white" style={{ background: 'linear-gradient(to bottom right, #0070CD, #005bb0, #004A8A)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold md:text-5xl">{t('navbar.blog')}</h1>
          <p className="mt-4 text-lg text-white/90">{t('blogPage.subtitle')}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-slate-600">{t('productsPage.comingSoon')}</p>
      </section>
    </div>
  )
}

export default BlogPage

