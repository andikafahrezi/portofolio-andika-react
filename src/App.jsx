import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Index from './pages/Index'
import Works from './pages/Works'
import Info from './pages/Info'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import PageTransition from './components/PageTransition'

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    const pageNames = {
      '/': 'Home',
      '/works': 'Works',
      '/info': 'Info',
      '/contact': 'Contact',
      '/smart-mannequin-research-project': 'Smart Mannequin Research Project',
      '/sm-monitoring-dashboard-ui-design': 'SM Monitoring Dashboard UI Design',
      '/vr-research-product-overview': 'VR Research Product Overview',
    }
    
    const pageName = pageNames[location.pathname] || 'Page'
    document.title = `${pageName} | Andika Fahrezi`
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
        <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-[#1A1814]">
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
