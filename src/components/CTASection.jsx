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
          <div className="flex flex-wrap items-center justify-center gap-4">
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.href || '#'}
                target={button.href?.startsWith('http') ? '_blank' : undefined}
                rel={button.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:shadow-lg md:px-8 md:py-4 md:text-lg"
              >
                {button.label}
                {button.icon !== false && <ArrowRightIcon />}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Arrow Icon Component
const ArrowRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-900"
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

