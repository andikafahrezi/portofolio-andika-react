import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6">
      <Link to="/">
        <img
            src="/aflogonobg.png"
            alt="Andika Fahrezi"
            className="h-8 w-auto"
        />
      </Link>
      <div className="flex gap-8">
        <Link to="/" className="text-gray-400 hover:text-white transition text-sm">
          Home
        </Link>
        <Link to="/about" className="text-gray-400 hover:text-white transition text-sm">
          About
        </Link>
        <Link to="/contact" className="text-gray-400 hover:text-white transition text-sm">
          Contact
        </Link>
      </div>
    </nav>
  )
}

export default Navbar