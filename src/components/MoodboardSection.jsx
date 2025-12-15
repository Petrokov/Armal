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
        {/* Header - Centriran */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-600 md:text-4xl">
            {t('moodboard.title')}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600 md:text-lg">
            {t('moodboard.subtitle')}
          </p>
        </div>

        {/* Grid Layout - 4 slike na desktopu, 1 stupac na mobilnim */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {moodboardItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300"
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default MoodboardSection

