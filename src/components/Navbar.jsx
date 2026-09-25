import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Index', to: '/' },
  { label: 'Works', to: '/works' },
  { label: 'Info', to: '/info' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit',
        hour12: false, timeZone: 'Asia/Jakarta'
      })
      setTime(t)
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])

  const navbarColors = {
    text: '#1A1814',
    muted: 'rgba(26,24,20,0.5)',
    faint: 'rgba(26,24,20,0.4)',
  }

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav className="hidden md:flex absolute top-0 left-0 right-0 z-50 items-start justify-between bg-transparent"
        style={{ padding: '24px 48px' }}
      >
        <Link to="/" style={{ fontFamily: 'Geist Mono', fontSize: '12px', color: navbarColors.text, letterSpacing: '0.1em', textDecoration: 'none' }}>
          ANDIKA FAHREZI®
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: navbarColors.muted }}>{time}</span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: navbarColors.muted }}>Indonesia</span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: navbarColors.faint }}>(IT & UI/UX Designer)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  fontFamily: 'Geist Mono',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  color: isActive ? '#E8650A' : navbarColors.text,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#ff5500' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = navbarColors.text }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav className="md:hidden absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent"
        style={{ height: '64px', padding: '16px' }}
      >
        <Link to="/" style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: menuOpen ? 'white' : navbarColors.text, textDecoration: 'none' }}>
          ANDIKA FAHREZI®
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px', zIndex: 50 }}
        >
          <span style={{ display: 'block', height: '2px', width: '24px', backgroundColor: menuOpen ? 'white' : navbarColors.text, transition: 'transform 0.35s ease', transform: menuOpen ? 'rotate(45deg) translateY(5.5px)' : 'none' }} />
          <span style={{ display: 'block', height: '2px', width: '24px', backgroundColor: menuOpen ? 'white' : navbarColors.text, transition: 'transform 0.35s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-5.5px)' : 'none' }} />
        </button>
      </nav>

      {/* ── MOBILE MENU FULLSCREEN ── */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50vh',
              backgroundColor: '#1A1814',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '96px 24px 32px',
              gap: '14px',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.12 + navLinks.indexOf(link) * 0.06 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: 600,
                      fontSize: 'clamp(12px, 12vw, 22px)',
                      color: isActive ? '#ff5500' : 'white',
                      textDecoration: 'none',
                      letterSpacing: '-0.02em',
                      lineHeight: 0.5,
                    }}
                  >
                    {link.label}
                  </Link>
                </Motion.div>
              )
            })}

            <div style={{ position: 'absolute', bottom: '32px', left: '24px', display: 'flex', gap: '16px' }}>
              <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{time}</span>
              <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Indonesia</span>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
