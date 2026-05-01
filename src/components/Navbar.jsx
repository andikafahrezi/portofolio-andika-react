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
  const isIndexPage = location.pathname === '/'

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

  const textColor = isIndexPage ? 'white' : '#1A1814'
  const textMuted = isIndexPage ? 'rgba(255,255,255,0.6)' : 'rgba(26,24,20,0.5)'
  const textFaint = isIndexPage ? 'rgba(255,255,255,0.4)' : 'rgba(26,24,20,0.4)'

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav className="hidden md:flex absolute top-0 left-0 right-0 z-50 items-start justify-between bg-transparent"
        style={{ padding: '24px 48px' }}
      >
        <Link to="/" style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: textColor, letterSpacing: '0.1em', textDecoration: 'none' }}>
          ANDIKA FAHREZI®
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: textMuted }}>{time}</span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: textMuted }}>Indonesia</span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: textFaint }}>(IT & UI/UX Design enthusiast)</span>
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
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  color: isActive ? '#E8650A' : textColor,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#E8650A' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = textColor }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav className="md:hidden absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent"
        style={{ padding: '20px 24px' }}
      >
        <Link to="/" style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: menuOpen ? 'white' : textColor, textDecoration: 'none' }}>
          ANDIKA FAHREZI®
        </Link>

        <span style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: menuOpen ? 'rgba(255,255,255,0.6)' : textMuted }}>
          {time}
        </span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px', zIndex: 50 }}
        >
          <span style={{ display: 'block', height: '1px', width: '20px', backgroundColor: menuOpen ? 'white' : textColor, transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ display: 'block', height: '1px', backgroundColor: menuOpen ? 'white' : textColor, transition: 'all 0.3s ease', width: menuOpen ? '0' : '14px', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', height: '1px', width: '20px', backgroundColor: menuOpen ? 'white' : textColor, transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>

      {/* ── MOBILE MENU FULLSCREEN ── */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#1A1814',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '0 24px',
              gap: '24px',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Bricolage Grotesque',
                    fontWeight: 800,
                    fontSize: 'clamp(40px, 12vw, 80px)',
                    color: isActive ? '#E8650A' : 'white',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                </Link>
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
