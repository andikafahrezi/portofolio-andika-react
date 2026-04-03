import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Index from './pages/Index'
import Works from './pages/Works'
import Info from './pages/Info'
import Contact from './pages/Contact'
import PageTransition from './components/PageTransition'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
        <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F2EE] text-[#1A1814]">
        <Navbar />
        <main className="pt-20">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App