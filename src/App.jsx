import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CanonicalLink from './components/CanonicalLink'

// Lazy load stranice za code splitting
const LandingPage = lazy(() => import('./components/LandingPage'))
const KataloziPage = lazy(() => import('./pages/KataloziPage'))
const ONamaPage = lazy(() => import('./pages/o_nama'))
const ServisPage = lazy(() => import('./pages/ServisPage'))
const ProizvodiPage = lazy(() => import('./pages/ProizvodiPage'))
const ProizvodiSlavine = lazy(() => import('./pages/ProizvodiSlavine'))
const ProizvodSlavinaDetalj = lazy(() => import('./pages/ProizvodSlavinaDetalj'))
const ProizvodiKupanjeTusiranje = lazy(() => import('./pages/ProizvodiKupanjeTusiranje'))
const ProizvodiSanitarije = lazy(() => import('./pages/ProizvodiSanitarije'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))

// Loading fallback komponenta
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0070CD] border-r-transparent"></div>
      <p className="text-slate-600">Učitavanje...</p>
    </div>
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <Router>
        <CanonicalLink />
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/katalozi" element={<KataloziPage />} />
                <Route path="/o-nama" element={<ONamaPage />} />
                <Route path="/servis" element={<ServisPage />} />
                <Route path="/proizvodi" element={<ProizvodiPage />} />
                <Route path="/proizvodi/slavine" element={<ProizvodiSlavine />} />
                <Route path="/proizvodi/slavine/:id" element={<ProizvodSlavinaDetalj />} />
                <Route path="/proizvodi/kupanje-tusiranje" element={<ProizvodiKupanjeTusiranje />} />
                <Route path="/proizvodi/sanitarije" element={<ProizvodiSanitarije />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
