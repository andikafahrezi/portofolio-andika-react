import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import Index from './pages/Index'
import Works from './pages/Works'
import Info from './pages/Info'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import PageTransition from './components/PageTransition'
import InitialLoader from './components/InitialLoader'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

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
    
    const pageName = pageNames[location.pathname]
    document.title = location.pathname === '/'
      ? 'Andika Fahrezi'
      : `${pageName || 'Page'} | Andika Fahrezi`
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
  const [isPortfolioReady, setIsPortfolioReady] = useState(false)
  const handlePortfolioReady = useCallback(() => {
    setIsPortfolioReady(true)
  }, [])

  return (
    <>
      <div
        className="min-h-screen bg-white text-[#1A1814]"
        aria-hidden={!isPortfolioReady}
        inert={!isPortfolioReady}
        style={{
          visibility: isPortfolioReady ? 'visible' : 'hidden',
          pointerEvents: isPortfolioReady ? 'auto' : 'none',
        }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <main>
            <AnimatedRoutes />
          </main>
        </BrowserRouter>
      </div>
      <InitialLoader onComplete={handlePortfolioReady} />
    </>
  )
}

export default App
