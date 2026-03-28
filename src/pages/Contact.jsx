function Contact() {
  const links = [
    { label: "Email", value: "andfrz09@gmail.com", href: "mailto:andfrz09@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/andikafahrezi", href: "https://www.linkedin.com/in/andikafahrezi" },
    { label: "GitHub", value: "github.com/andikafahrezi", href: "https://github.com/andikafahrezi" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6">
      <div className="max-w-2xl mx-auto pt-40 pb-20">

        <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
          Contact
        </p>
        <h1 className="text-5xl font-bold mb-8">
          Let's work together.
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-16">
          Terbuka untuk project freelance, kolaborasi, maupun
          kesempatan kerja baru. Jangan ragu untuk menghubungi!
        </p>

        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-between border border-gray-800 rounded-2xl px-6 py-5 hover:border-gray-500 transition group"
            >
              <span className="text-gray-400 text-sm">{link.label}</span>
              <span className="text-white">{link.value}</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Contact