import { useLanguage } from '../contexts/LanguageContext'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'

const AboutSection = () => {
  const { t } = useLanguage()

  return (
    <section className="w-full bg-white px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left Side - Image */}
          <div className="w-full">
            <img
              src={kupaonicaImage}
              alt="Moderni kupaonski interijer"
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold text-blue-600 md:text-4xl">
              {t('about.title')}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 md:text-lg">
              {t('about.description')}
            </p>
            <a
              href="/o-nama"
              className="w-fit rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 md:px-8 md:py-4 md:text-lg"
            >
              {t('about.learnMore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection



