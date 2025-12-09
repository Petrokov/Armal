/**
 * LanguageContext - Upravljanje multijezičnošću aplikacije
 * 
 * Ovaj context omogućava:
 * - Dinamičku promjenu jezika bez reloada stranice
 * - Automatski fallback na hrvatski jezik ako prijevod nije dostupan
 * - Trajno spremanje odabranog jezika u localStorage
 * 
 * Podržani jezici: hr (hrvatski), slo (slovenski), rs (srpski)
 */

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import hrTranslations from '../translations/hr.json'
import sloTranslations from '../translations/slo.json'
import rsTranslations from '../translations/rs.json'

// Fallback jezik - koristi se ako prijevod nije dostupan
const FALLBACK_LANGUAGE = 'hr'

// Svi dostupni prijevodi
const translations = {
  hr: hrTranslations,
  slo: sloTranslations,
  rs: rsTranslations,
}

// Provjera da li je jezik podržan
const isLanguageSupported = (lang) => {
  return Object.keys(translations).includes(lang)
}

// Dohvaćanje prijevoda s fallback mehanizmom
const getTranslation = (lang, key) => {
  // Ako jezik nije podržan, koristi fallback
  const currentLang = isLanguageSupported(lang) ? lang : FALLBACK_LANGUAGE
  
  // Rastavljanje ključa (npr. "navbar.home" -> ["navbar", "home"])
  const keys = key.split('.')
  
  // Počinje od prijevoda trenutnog jezika
  let value = translations[currentLang]
  
  // Prolazi kroz sve ključeve
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Ako ključ ne postoji, pokušaj s fallback jezikom
      value = translations[FALLBACK_LANGUAGE]
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey]
        } else {
          // Ako ni u fallback jeziku ne postoji, vrati originalni ključ
          return key
        }
      }
      break
    }
  }
  
  // Ako je vrijednost string, vrati je; inače vrati ključ
  return typeof value === 'string' ? value : key
}

// Kreiranje contexta
const LanguageContext = createContext()

/**
 * Hook za pristup language contextu
 * @returns {Object} { language, changeLanguage, t }
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

/**
 * LanguageProvider - Provider komponenta koja omogućava pristup prijevodima
 * 
 * @param {Object} props - React props
 * @param {ReactNode} props.children - Dječje komponente
 */
export const LanguageProvider = ({ children }) => {
  // Inicijalizacija jezika iz localStorage ili default na hrvatski
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('armal_language')
      // Provjeri da li je spremljeni jezik podržan
      if (saved && isLanguageSupported(saved)) {
        return saved
      }
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error)
    }
    return FALLBACK_LANGUAGE
  })

  // Spremi jezik u localStorage kada se promijeni
  useEffect(() => {
    try {
      localStorage.setItem('armal_language', language)
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error)
    }
  }, [language])

  /**
   * Funkcija za dohvaćanje prijevoda
   * @param {string} key - Ključ prijevoda (npr. "navbar.home")
   * @returns {string} Prevedeni tekst ili originalni ključ ako prijevod ne postoji
   */
  const t = useMemo(() => {
    return (key) => getTranslation(language, key)
  }, [language])

  /**
   * Funkcija za promjenu jezika
   * @param {string} lang - Kod jezika (hr, slo, rs)
   */
  const changeLanguage = (lang) => {
    if (isLanguageSupported(lang)) {
      setLanguage(lang)
    } else {
      console.warn(`Language "${lang}" is not supported. Falling back to "${FALLBACK_LANGUAGE}"`)
      setLanguage(FALLBACK_LANGUAGE)
    }
  }

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      t,
    }),
    [language, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

