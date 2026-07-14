import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Phone, Mail, User, MessageSquare, Image as ImageIcon, FileText, MapPin } from 'lucide-react'
import servisHeroImage from '../assets/armal-auti.webp'
import SEOHead from '../components/SEOHead'
import { getSeoData, SEO_ROUTE_KEYS } from '../seo/seoConfig'

// Kad nije postavljen, koristi se relativni URL (/api/servis) – isti poslužitelj (npr. jedan deploy na Railway)
const API_URL = import.meta.env.VITE_API_URL ?? ''
const MAX_SERVICE_IMAGES = 5
const MAX_SERVICE_IMAGE_SIZE_MB = 2
const MAX_SERVICE_IMAGE_SIZE_BYTES = MAX_SERVICE_IMAGE_SIZE_MB * 1024 * 1024
const ALLOWED_SERVICE_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])

const ServisPage = () => {
  const { t, language } = useLanguage()
  const seo = getSeoData(SEO_ROUTE_KEYS.SERVICE, language)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    city: '',
    postalCode: '',
    country: '',
    message: '',
    images: [],
  })
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const serviceText = (key, values = {}) => {
    let text = t(`servisPage.${key}`)
    for (const [name, value] of Object.entries(values)) {
      text = text.replace(`{${name}}`, value)
    }
    return text
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (formData.images.length === 0) {
      setSubmitError(serviceText('imageRequiredError'))
      return
    }

    setSending(true)
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('street', formData.street)
      data.append('houseNumber', formData.houseNumber)
      data.append('city', formData.city)
      data.append('postalCode', formData.postalCode)
      data.append('country', formData.country)
      data.append('message', formData.message || '')
      formData.images.forEach((image) => {
        data.append('images', image)
      })

      const apiBase = API_URL ? API_URL.replace(/\/$/, '') : ''
      const res = await fetch(`${apiBase}/api/servis`, {
        method: 'POST',
        body: data,
      })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(json.error || serviceText('submitError'))
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        street: '',
        houseNumber: '',
        city: '',
        postalCode: '',
        country: '',
        message: '',
        images: [],
      })
      alert(t('servisPage.submitSuccess'))
    } catch (err) {
      const msg = err.message || ''
      if (msg === 'Failed to fetch' || msg.includes('fetch')) {
        setSubmitError(serviceText('fetchError'))
      } else {
        setSubmitError(msg || serviceText('genericError'))
      }
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const selectedFiles = Array.from(e.target.files || [])
      const nextImages = [...formData.images, ...selectedFiles]
      const invalidType = selectedFiles.find((file) => !ALLOWED_SERVICE_IMAGE_TYPES.has(file.type))
      const oversized = selectedFiles.find((file) => file.size > MAX_SERVICE_IMAGE_SIZE_BYTES)

      if (nextImages.length > MAX_SERVICE_IMAGES) {
        setSubmitError(serviceText('maxImagesError', { max: MAX_SERVICE_IMAGES }))
        e.target.value = ''
        return
      }

      if (invalidType) {
        setSubmitError(serviceText('imageTypeError'))
        e.target.value = ''
        return
      }

      if (oversized) {
        setSubmitError(serviceText('imageSizeError', { size: MAX_SERVICE_IMAGE_SIZE_MB }))
        e.target.value = ''
        return
      }

      setSubmitError(null)
      setFormData({
        ...formData,
        images: nextImages,
      })
      e.target.value = ''
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title={seo.title}
        description={seo.description}
        ogType={seo.ogType}
      />
      {/* Hero Section */}
      <section
        className="w-full h-[40vh] flex items-center text-white"
        style={{ backgroundImage: `url(${servisHeroImage})`, backgroundPosition: 'center 72%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 text-left">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <h1 className="text-4xl font-bold md:text-5xl">{t('navbar.servis')}</h1>
            <p className="mt-4 text-lg text-white/90">{t('servisPage.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Content Section - Two Columns */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Forma */}
          <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0070CD]/10">
                <FileText className="h-6 w-6 text-[#0070CD]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('servisPage.formTitle')}</h2>
            </div>
            <p className="mb-6 text-slate-600">
              {t('servisPage.formDescription')}
            </p>
            {submitError && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                  {t('servisPage.nameLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.namePlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  {t('servisPage.emailLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.emailPlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                  {t('servisPage.phoneLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.phonePlaceholder')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label htmlFor="street" className="mb-2 block text-sm font-medium text-slate-700">
                    {t('servisPage.streetLabel')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                      placeholder={t('servisPage.streetPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="houseNumber" className="mb-2 block text-sm font-medium text-slate-700">
                    {t('servisPage.houseNumberLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.houseNumberPlaceholder')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-slate-700">
                    {t('servisPage.postalCodeLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.postalCodePlaceholder')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">
                    {t('servisPage.cityLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.cityPlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="mb-2 block text-sm font-medium text-slate-700">
                  {t('servisPage.countryLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                  placeholder={t('servisPage.countryPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  {t('servisPage.messageLabel')}
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                    placeholder={t('servisPage.messagePlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="images" className="mb-2 block text-sm font-medium text-slate-700">
                  {t('servisPage.imageLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0070CD] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#005bb0] focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/20"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">{t('servisPage.imageHelp')}</p>
                {formData.images.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-slate-700">
                      {t('servisPage.selectedFiles')} {formData.images.length} / {MAX_SERVICE_IMAGES}
                    </p>
                    <ul className="space-y-2">
                      {formData.images.map((image, index) => (
                        <li
                          key={`${image.name}-${image.lastModified}-${index}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                        >
                          <span className="min-w-0 truncate">{image.name}</span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            {t('servisPage.removeFile')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-[#0070CD] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#005bb0] focus:outline-none focus:ring-2 focus:ring-[#0070CD] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? t('servisPage.sendingButton') : t('servisPage.submitButton')}
              </button>
            </form>
          </div>

          {/* Kontakt za mail */}
          <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0070CD]/10">
                <Mail className="h-6 w-6 text-[#0070CD]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('servisPage.contactTitle')}</h2>
            </div>
            <p className="mb-6 text-slate-600">
              {t('servisPage.contactDescription')}
            </p>
            <div className="grid flex-1 grid-rows-4 gap-6">
              <div className="flex flex-col justify-center rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">{t('servisPage.emailAddress')}</h3>
                <a
                  href="mailto:info@armal.hr"
                  className="flex items-center gap-3 text-[#0070CD] transition-colors hover:text-[#005bb0]"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-lg font-medium">info@armal.hr</span>
                </a>
              </div>
              <div className="flex flex-col justify-center rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">{t('servisPage.servisEmailLabel')}</h3>
                <a
                  href="mailto:servis@armal.hr"
                  className="flex items-center gap-3 text-[#0070CD] transition-colors hover:text-[#005bb0]"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-lg font-medium">servis@armal.hr</span>
                </a>
              </div>
              <div className="flex flex-col justify-center rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">{t('servisPage.phoneNumber')}</h3>
                <a
                  href="tel:+38517777707"
                  className="flex items-center gap-3 text-[#0070CD] transition-colors hover:text-[#005bb0]"
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-lg font-medium">+385 1 7777 707</span>
                </a>
              </div>
              <div className="flex flex-col justify-center rounded-lg border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">{t('servisPage.workingHours')}</h3>
                <div className="space-y-2 text-slate-700">
                  <p className="flex justify-between">
                    <span className="font-medium">{t('servisPage.weekdays')}</span>
                    <span>08:00 - 16:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">{t('servisPage.saturday')}</span>
                    <span>{t('servisPage.closed')}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">{t('servisPage.sunday')}</span>
                    <span>{t('servisPage.closed')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServisPage

