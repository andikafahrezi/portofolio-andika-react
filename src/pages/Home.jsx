function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
          UI/UX Designer & Frontend Learner
        </p>
        <h1 className="text-6xl font-bold mb-6">
          Andika Fahrezi
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          Crafting clean, intentional digital experiences — from pixels to code.
        </p>
        <div className="flex gap-4 mt-10">
          <a href="/projects" className="bg-white text-gray-950 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            View Work
          </a>
          <a href="/contact" className="border border-gray-600 px-6 py-3 rounded-full text-gray-300 hover:border-white hover:text-white transition">
            Contact
          </a>
        </div>
      </section>

    </div>
  )
}

export default Home