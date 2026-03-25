import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Slika1Normal from '../assets/slika_1_normal.png'
import Slika1Hover from '../assets/slika_1_hover.png'
import Slika2Normal from '../assets/slika 2 normal.png'
import Slika2Hover from '../assets/slika 2 hover.png'
import Slika3Normal from '../assets/slika 3 nomal.png'
import Slika3Hover from '../assets/slika 3 hover.png'
import Slika4Normal from '../assets/slika 4 normal.png'
import Slika4Hover from '../assets/slika 4 hover.png'
import logo from '../assets/ARMAL_be_inspired.svg'
import TiltCard from './TiltCard'

const MoodboardSection = () => {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Podaci za slike - normal i hover verzije
  const moodboardItems = [
    {
      id: 1,
      normal: Slika1Normal,
      hover: Slika1Hover,
      alt: 'Moodboard slika 1',
    },
    {
      id: 2,
      normal: Slika2Normal,
      hover: Slika2Hover,
      alt: 'Moodboard slika 2',
    },
    {
      id: 3,
      normal: Slika3Normal,
      hover: Slika3Hover,
      alt: 'Moodboard slika 3',
    },
    {
      id: 4,
      normal: Slika4Normal,
      hover: Slika4Hover,
      alt: 'Moodboard slika 4',
    },
  ]

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Layout - Text on left, Images on right */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Section - Text Block */}
          <TiltCard className="flex h-full flex-col justify-between rounded-2xl bg-sky-50 p-8 md:p-12">
            {/* Title */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#0070CD] md:text-4xl">
                {t('moodboard.title')}
              </h2>

              {/* Description */}
              <p className="mb-8 text-base leading-relaxed text-[#0070CD] md:text-lg">
                {t('moodboard.description')}
              </p>
            </div>

            {/* Logo and Tagline */}
            <div className="mt-auto">
              <img src={logo} alt="armal logo" className="mb-2 h-16 sm:h-24 w-auto " />
            </div>
          </TiltCard>

          {/* Right Section - 2x2 Grid of Images */}
          <div className="grid h-full grid-cols-2 gap-6">
            {moodboardItems.map((item, index) => (
              <TiltCard
                key={item.id}
                className="rounded-2xl transition-all duration-300"
                maxTilt={6}
                scale={1.01}
              >
                <div
                  className="relative h-full w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Normal slika */}
                  <img
                    src={item.normal}
                    alt={item.alt}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}
                    loading="lazy"
                  />

                  {/* Hover slika */}
                  <img
                    src={item.hover}
                    alt={`${item.alt} hover`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                  />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoodboardSection

