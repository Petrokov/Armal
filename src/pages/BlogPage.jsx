import { useLanguage } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import oNamaImage from '../assets/o_nama_kupaonica_2.png'

const BlogPage = () => {
  const { t, language } = useLanguage()

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      key: 'blog1',
      image: kupaonicaImage,
      date: '2025-01-15',
    },
    {
      id: 2,
      key: 'blog2',
      image: oNamaImage,
      date: '2025-01-10',
    },
    {
      id: 3,
      key: 'blog3',
      image: kupaonicaImage,
      date: '2025-01-05',
    },
    {
      id: 4,
      key: 'blog4',
      image: oNamaImage,
      date: '2024-12-28',
    },
    {
      id: 5,
      key: 'blog5',
      image: kupaonicaImage,
      date: '2024-12-20',
    },
    {
      id: 6,
      key: 'blog6',
      image: oNamaImage,
      date: '2024-12-15',
    },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const localeMap = {
      hr: 'hr-HR',
      slo: 'sl-SI',
      rs: 'sr-RS',
    }
    return date.toLocaleDateString(localeMap[language] || 'hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-16 text-white" style={{ background: 'linear-gradient(to bottom right, #0070CD, #005bb0, #004A8A)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold md:text-5xl">{t('navbar.blog')}</h1>
          <p className="mt-4 text-lg text-white/90">{t('blogPage.subtitle')}</p>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={t(`blogPage.posts.${post.key}.title`)}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Date */}
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarIcon />
                    <span>{formatDate(post.date)}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-xl font-bold text-slate-900">
                    {t(`blogPage.posts.${post.key}.title`)}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                    {t(`blogPage.posts.${post.key}.excerpt`)}
                  </p>

                  {/* Read More Button */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0070CD] transition-colors hover:text-[#005bb0]"
                  >
                    {t('blogPage.readMore')}
                    <ArrowRightIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Icon Components
const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BlogPage

