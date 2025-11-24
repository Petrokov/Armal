import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
