import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav
        className="hidden md:flex absolute top-0 left-0 right-0 z-50 items-start justify-between bg-transparent"
        style={{
          padding: '24px 48px',
        }}
      >
        {/* Kiri — Logo */}
        <Link to="/" style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'white', letterSpacing: '0.1em', textDecoration: 'none' }}>
          ANDIKA FAHREZI®
        </Link>

        {/* Tengah — Clock + Indonesia + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{time}</span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Indonesia</span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>(IT & UI/UX Design enthusiast)</span>
        </div>

        {/* Kanan — Nav links vertikal */}
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
                  color: isActive ? '#E8650A' : 'white',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#E8650A' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'white' }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav
        className="md:hidden absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent"
        style={{
          padding: '16px 48px',
        }}
      >
        <Link to="/" style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: 'white', textDecoration: 'none' }}>
          ANDIKA FAHREZI®
        </Link>

        <span style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>{time}</span>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px' }}>
          <span style={{ display: 'block', height: '1px', width: '20px', backgroundColor: 'white', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ display: 'block', height: '1px', backgroundColor: 'white', transition: 'all 0.3s ease', width: menuOpen ? '0' : '14px', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', height: '1px', width: '20px', backgroundColor: 'white', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>

    </>
  )
}

export default Navbar