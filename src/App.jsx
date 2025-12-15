import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import KataloziPage from './pages/KataloziPage'
import ONamaPage from './pages/o_nama'
import ProizvodiPage from './pages/ProizvodiPage'
import ProizvodiSlavine from './pages/ProizvodiSlavine'
import ProizvodiKupanjeTusiranje from './pages/ProizvodiKupanjeTusiranje'
import ProizvodiSanitarije from './pages/ProizvodiSanitarije'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/katalozi" element={<KataloziPage />} />
              <Route path="/o-nama" element={<ONamaPage />} />
              <Route path="/proizvodi" element={<ProizvodiPage />} />
              <Route path="/proizvodi/slavine" element={<ProizvodiSlavine />} />
              <Route path="/proizvodi/kupanje-tusiranje" element={<ProizvodiKupanjeTusiranje />} />
              <Route path="/proizvodi/sanitarije" element={<ProizvodiSanitarije />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
