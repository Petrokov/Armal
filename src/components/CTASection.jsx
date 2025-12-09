/**
 * CTASection - Reusable Call-to-Action section component
 * 
 * @param {string} title - Small heading text above main CTA
 * @param {string} description - Main message below the title (supports line breaks)
 * @param {Array} buttons - Array of button objects with {label, href, icon?}
 */
const CTASection = ({ title, description, buttons = [] }) => {
  return (
    <section className="flex min-h-[400px] items-center justify-center bg-gradient-to-b from-[#1C2431] to-[#0E1320] px-4 py-16 md:min-h-[500px] md:py-24">
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Title */}
        {title && (
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
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
      href: '#b2b',
      icon: true,
    },
    {
      label: 'Uredi dom',
      href: '#uredi-dom',
      icon: true,
    },
  ],
}

export default CTASection

