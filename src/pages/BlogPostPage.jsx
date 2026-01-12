import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import oNamaImage from '../assets/o_nama_kupaonica_2.png'

const BlogPostPage = () => {
  const { id } = useParams()
  const { t, language } = useLanguage()

  // Blog posts data - mora biti isti kao u BlogPage.jsx
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

  // Pronađi blog post po ID-u
  const post = blogPosts.find((p) => p.id === parseInt(id))

  // Ako blog post ne postoji, prikaži error
  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Blog post nije pronađen</h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#005bb0]"
          >
            Povratak na blog
          </Link>
        </section>
      </div>
    )
  }

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
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden">
        <img
          src={post.image}
          alt={t(`blogPage.posts.${post.key}.title`)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/50"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm text-white/80">
            <CalendarIcon />
            <span>{formatDate(post.date)}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t(`blogPage.posts.${post.key}.title`)}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-[#0070CD] transition-colors">
              {t('navbar.home')}
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#0070CD] transition-colors">
              {t('navbar.blog')}
            </Link>
            <span>/</span>
            <span className="text-slate-900">{t(`blogPage.posts.${post.key}.title`)}</span>
          </nav>

          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={t(`blogPage.posts.${post.key}.title`)}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-slate max-w-none">
            <div className="mb-6 text-lg leading-relaxed text-slate-700">
              {t(`blogPage.posts.${post.key}.excerpt`)}
            </div>
            
            {/* Main Content */}
            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              {t(`blogPage.posts.${post.key}.content`) && (
                <div className="whitespace-pre-line">
                  {t(`blogPage.posts.${post.key}.content`)}
                </div>
              )}
              {!t(`blogPage.posts.${post.key}.content`) && (
                <div className="space-y-4">
                  <p>
                    {t(`blogPage.posts.${post.key}.excerpt`)}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              )}
            </div>
          </article>

          {/* Back to Blog Button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0070CD] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#005bb0]"
            >
              <ArrowLeftIcon />
              {t('blogPage.backToBlog')}
            </Link>
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

const ArrowLeftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BlogPostPage

