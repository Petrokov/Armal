import kupaonicaZelena from '../assets/kupaonica-zelena.webp'

/**
 * CTASection - Reusable Call-to-Action section
 *
 * Pozadina: cover + centar kadra (ormarić i školjka u sredini), prilagođeno visini sekcije po breakpointima.
 */
const CTASection = ({ title, description, buttons = [] }) => {
  return (
    <section
      className="flex min-h-[380px] items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-6 sm:min-h-[360px] md:min-h-[360px] md:py-8 lg:min-h-[360px] xl:min-h-[360px]"
      style={{
        backgroundImage: `url(${kupaonicaZelena})`,
      }}
    >
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/35 bg-white/20 p-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.2)] backdrop-blur-md md:p-8">
        {/* Title */}
        {title && (
          <h2 className="mb-2 text-xl font-bold text-white md:text-xl lg:text-3xl">
            {title}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="mb-10 text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {buttons.map((button, index) => {
              const isPrimary = index === 0
              const baseClass = isPrimary
                ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#005bb0] hover:shadow-lg'
                : 'inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-lg'
              return (
                <a
                  key={index}
                  href={button.href || '#'}
                  target={button.href?.startsWith('http') ? '_blank' : undefined}
                  rel={button.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={baseClass}
                >
                  {button.icon !== false &&
                    (isPrimary ? <CTAShopIcon /> : <CTAHomeIcon />)}
                  {button.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

/** Isti vizual kao gumbi B2B / Uredi dom na ProizvodiSlavine.jsx */
const CTAShopIcon = () => (
  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
)

const CTAHomeIcon = () => (
  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

// Default props for preview
CTASection.defaultProps = {
  title: 'Stvorimo Vaš Prostor Snova',
  description:
    'Bilo da tražite ekskluzivne komade za vaš dom ili uređujete poslovni prostor, tu smo da pomognemo.',
  buttons: [
    {
      label: 'B2B Trgovina',
      href: 'https://b2b.armal.hr/',
      icon: true,
    },
    {
      label: 'Uredi dom',
      href: 'https://uredidom.hr/',
      icon: true,
    },
  ],
}

export default CTASection

