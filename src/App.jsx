import './App.css'
import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './AppRoutes'

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0070CD] border-r-transparent"></div>
      <p className="text-slate-600">Učitavanje...</p>
    </div>
  </div>
)

const AppLayout = () => {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0070CD] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
      >
        {t('navbar.skipToMainContent')}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppLayout />
      </LanguageProvider>
    </Router>
  )
}

export default App
