import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Deteksi scroll untuk tambah background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tutup menu saat pindah halaman
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Navbar Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 transition-all duration-500 ${
        scrolled ? 'bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50' : 'bg-transparent'
      }`}>
        <Link to="/" onClick={closeMenu}>
          <img src="/aflogonobg.png" alt="Andika Fahrezi" className="h-8 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-gray-400 hover:text-white transition text-sm">Home</Link>
          <Link to="/projects" className="text-gray-400 hover:text-white transition text-sm">Projects</Link>
          <Link to="/about" className="text-gray-400 hover:text-white transition text-sm">About</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact</Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
        >
          <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`} />
          <span className={`block h-px bg-white transition-all duration-300 ${
            isOpen ? 'w-0 opacity-0' : 'w-4'
          }`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center ${
            isOpen ? '-rotate-45 -translate-y-2.5' : ''
          }`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-gray-950 flex flex-col items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center gap-10">
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className="text-4xl font-bold text-gray-500 hover:text-white transition-all duration-300"
              style={{
                transitionDelay: isOpen ? `${index * 80}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar