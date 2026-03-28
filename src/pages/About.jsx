import PageTransition from '../components/PageTransition'

function About() {
  const skills = [
    "UI/UX Design", "Figma", "React", "Quasar",
    "HTML & CSS", "JavaScript", "Tailwind CSS"
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 text-white px-6">
        <div className="max-w-2xl mx-auto pt-40 pb-20">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            About Me
          </p>
          <h1 className="text-5xl font-bold mb-8">
            Designer who codes.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Saya Andika Fahrezi, seorang UI/UX Designer yang sedang
            memperluas skill ke dunia frontend development. Saat ini
            menjalani program magang MagangHub Kemenaker.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-16">
            Saya percaya desain yang baik bukan hanya soal estetika,
            tapi juga bagaimana sebuah produk terasa saat digunakan.
          </p>
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-6">
            Skills
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-mono border border-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm hover:border-white hover:text-white transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default About