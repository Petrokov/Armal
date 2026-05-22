import { useLanguage } from '../contexts/LanguageContext'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogHeroImage from '../assets/armal-blog.webp'
import { buildLocalizedPath } from '../utils/languageRouting'
import SEOHead from '../components/SEOHead'
import JsonLd from '../components/JsonLd'
import { getSeoData, SEO_ROUTE_KEYS } from '../seo/seoConfig'
import { buildBreadcrumbListSchema } from '../seo/structuredData'
import { isSupabaseConfigured, supabasePublic } from '../lib/supabaseClient'

const BlogPage = () => {
  const { t, language } = useLanguage()
  const location = useLocation()
  const localizePath = (path) => buildLocalizedPath(path, language)
  const seo = getSeoData(SEO_ROUTE_KEYS.BLOG, language)
  const [supabasePosts, setSupabasePosts] = useState([])

  useEffect(() => {
    let active = true

    if (!isSupabaseConfigured) {
      return undefined
    }

    supabasePublic
      .getPublishedBlogPosts(language)
      .then((posts) => {
        if (active) setSupabasePosts(Array.isArray(posts) ? posts : [])
      })
      .catch(() => {
        if (active) setSupabasePosts([])
      })

    return () => {
      active = false
    }
  }, [language])

  const displayedPosts = supabasePosts
    .map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.cover_image_url || blogHeroImage,
      date: post.published_at || post.created_at,
    }))
    .sort((first, second) => new Date(second.date) - new Date(first.date))

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
      <SEOHead
        title={seo.title}
        description={seo.description}
        ogType={seo.ogType}
      />
      <JsonLd
        id="breadcrumb-blog"
        data={buildBreadcrumbListSchema({
          pathname: location.pathname,
          items: [
            { name: t('navbar.home'), path: '/' },
            { name: t('navbar.blog'), path: '/blog' },
          ],
        })}
      />
      <section className="w-full h-[40vh] flex items-center text-white" style={{ backgroundImage: `url(${blogHeroImage})`, backgroundPosition: 'center 72%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 text-left">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <h1 className="text-4xl font-bold md:text-5xl">{t('navbar.blog')}</h1>
            <p className="mt-4 text-lg text-white/90">{t('blogPage.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {displayedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                      <CalendarIcon />
                      <span>{formatDate(post.date)}</span>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-slate-900">
                      {post.title}
                    </h2>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>

                    <Link
                      to={localizePath(`/blog/${post.slug}`)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0070CD] transition-colors hover:text-[#005bb0]"
                    >
                      {t('blogPage.readMore')}
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
              Trenutno nema objavljenih blogova za odabrani jezik.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

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
