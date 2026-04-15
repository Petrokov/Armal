const FaucetsCtaSection = ({ t }) => (
  <section className="w-full bg-slate-50 py-16 md:py-24">
    <div className="mx-auto max-w-4xl px-6 text-center">
      <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
        {t('faucetsPage.ctaTitle')}
      </h2>
      <p className="mb-12 text-lg text-slate-600">
        {t('faucetsPage.ctaDescription')}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a
          href="https://b2b.armal.hr/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#005bb0] hover:shadow-lg"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {t('navbar.b2b')}
        </a>
        <a
          href="https://uredidom.hr/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {t('navbar.editHome')}
        </a>
      </div>
    </div>
  </section>
)

export default FaucetsCtaSection
