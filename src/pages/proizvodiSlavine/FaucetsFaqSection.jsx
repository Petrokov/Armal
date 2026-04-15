import { Link } from 'react-router-dom'

const FaucetsFaqSection = ({ seoLocale, localizePath }) => {
  if (!seoLocale?.faqs?.length) return null

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
          {seoLocale.faqHeading}
        </h2>
        <div className="space-y-4">
          {seoLocale.faqs.map((item, idx) => (
            <div key={`faq-${idx}`} className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <h3 className="text-base font-semibold text-slate-900 md:text-lg">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm text-slate-700 md:text-base">
          {seoLocale.faqCtaStart}{' '}
          <Link to={localizePath('/katalozi')} className="font-semibold text-[#0070CD] hover:underline">
            {seoLocale.faqCatalogsLabel}
          </Link>
          , {seoLocale.faqReadBlog}{' '}
          <Link to={localizePath('/blog')} className="font-semibold text-[#0070CD] hover:underline">
            {seoLocale.faqBlogLabel}
          </Link>{' '}
          {seoLocale.faqContactService}{' '}
          <Link to={localizePath('/servis')} className="font-semibold text-[#0070CD] hover:underline">
            {seoLocale.faqServiceLabel}
          </Link>
          .
        </div>
      </div>
    </section>
  )
}

export default FaucetsFaqSection
