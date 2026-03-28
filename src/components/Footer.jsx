function Footer() {
  const links = [
    { label: "GitHub", href: "https://github.com/andikafahrezi" },
    { label: "LinkedIn", href: "https://linkedin.com/in/andikafahrezi" },
    { label: "Figma", href: "https://figma.com/@andikafahrezi" },
  ]

  return (
    <footer className="border-t border-gray-800 px-10 py-8 flex items-center justify-between">
      <p className="font-mono text-gray-600 text-xs">
        © 2025 Andika Fahrezi
      </p>
      <div className="flex gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-gray-600 text-xs hover:text-white transition"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer