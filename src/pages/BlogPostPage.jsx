import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import blogHeroImage from '../assets/armal-blog.webp'
import { buildLocalizedPath } from '../utils/languageRouting'
import SEOHead from '../components/SEOHead'
import JsonLd from '../components/JsonLd'
import { getSeoData, SEO_ROUTE_KEYS } from '../seo/seoConfig'
import { buildArticleSchema } from '../seo/structuredData'
import { isSupabaseConfigured, supabasePublic } from '../lib/supabaseClient'

const BlogPostPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { t, language } = useLanguage()
  const localizePath = (path) => buildLocalizedPath(path, language)
  const seo = getSeoData(SEO_ROUTE_KEYS.BLOG, language)
  const [supabasePost, setSupabasePost] = useState(null)
  const [loadingSupabasePost, setLoadingSupabasePost] = useState(isSupabaseConfigured)

  useEffect(() => {
    let active = true

    if (!isSupabaseConfigured) {
      queueMicrotask(() => {
        if (active) setLoadingSupabasePost(false)
      })
      return undefined
    }

    queueMicrotask(() => {
      if (active) setLoadingSupabasePost(true)
    })
    supabasePublic
      .getPublishedBlogPost(language, id)
      .then((post) => {
        if (active) setSupabasePost(post)
      })
      .catch(() => {
        if (active) setSupabasePost(null)
      })
      .finally(() => {
        if (active) setLoadingSupabasePost(false)
      })

    return () => {
      active = false
    }
  }, [id, language])

  const post = supabasePost
    ? {
        id: supabasePost.id,
        title: supabasePost.title,
        excerpt: supabasePost.excerpt,
        content: supabasePost.content,
        image: supabasePost.cover_image_url || blogHeroImage,
        galleryImages: Array.isArray(supabasePost.gallery_image_urls) ? supabasePost.gallery_image_urls : [],
        date: supabasePost.published_at || supabasePost.created_at,
        seoTitle: supabasePost.seo_title,
        seoDescription: supabasePost.seo_description,
      }
    : null

  if (loadingSupabasePost) {
    return <div className="min-h-screen bg-white px-6 py-16 text-center text-slate-600">Ucitavanje...</div>
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead title={seo.title} description={seo.description} ogType={seo.ogType} />
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Blog post nije pronaden</h1>
          <Link
            to={localizePath('/blog')}
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
      <SEOHead
        title={post.seoTitle || `${post.title} | Armal`}
        description={post.seoDescription || post.excerpt || seo.description}
        ogType={seo.ogType}
      />
      <JsonLd
        id={`article-blog-${post.id}`}
        data={buildArticleSchema({
          pathname: location.pathname,
          language,
          headline: post.title,
          description: post.excerpt || seo.description,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
        })}
      />
      <section className="relative flex min-h-[40vh] w-full items-center overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/50"></div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 text-left text-white">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/80">
              <CalendarIcon />
              <span>{formatDate(post.date)}</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{post.title}</h1>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
            <Link to={localizePath('/')} className="hover:text-[#0070CD] transition-colors">
              {t('navbar.home')}
            </Link>
            <span>/</span>
            <Link to={localizePath('/blog')} className="hover:text-[#0070CD] transition-colors">
              {t('navbar.blog')}
            </Link>
            <span>/</span>
            <span className="text-slate-900">{post.title}</span>
          </nav>

          <div className="mb-8 overflow-hidden rounded-2xl">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
          </div>

          <article className="prose prose-slate max-w-none">
            {post.excerpt && <div className="mb-6 text-lg leading-relaxed text-slate-700">{post.excerpt}</div>}

            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              {post.content && <div className="whitespace-pre-line">{post.content}</div>}
            </div>
          </article>

          {post.galleryImages.length > 0 && (
            <section className="mt-12">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {post.galleryImages.map((imageUrl) => (
                  <div key={imageUrl} className="overflow-hidden rounded-2xl bg-slate-100">
                    <img src={imageUrl} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              to={localizePath('/blog')}
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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default BlogPostPage
