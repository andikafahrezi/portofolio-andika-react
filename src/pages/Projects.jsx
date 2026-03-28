import PageTransition from "../components/PageTransition"

const projects = [
    {
        id: 1,
        title: "Smart Mannequin Research Project",
        category: "Research, IoT, Data Analyst",
        year: "2022",
        description: "Smart Mannequin is a smart dummy with the anthropometry of Indonesian soldiers, designed to measure the ergonomic factors of combat vehicles. It measures comfort and safety factors, focusing on passenger safety and occupational health in combat vehicles. Developed and researched by CoE STAS RG.",
        link: "https://figma.com",
    },
    {
        id: 2,
        title: "SM Monitoring Dashboard UI Design",
        category: "UI/UX Design",
        year: "2023",
        description: "Smart Mannequin Monitoring Dashboard is an intuitive interface built to visualize real-time data from smart mannequin systems. The design focuses on clarity, responsiveness, and usability — allowing users to effortlessly monitor sensor activity, analyze performance, and gain insights through clean data visualization and thoughtful interaction design.",
        link: "https://www.figma.com/design/g1tJgL5gPbFssiB0KLPz3v/andika-performance-test?node-id=67-5758",
    },
    {
        id: 3,
        title: "VR Research Product Overview",
        category: "Virtual Reality, VR UI Design, Overview",
        year: "2024",
        description: "VR Research Product Overview is a virtual interface designed to showcase multiple research innovations through immersive storytelling. Built with user experience in mind, the design bridges technology and interactivity, enabling audiences to explore products such as Smart Mannequin and Automation Weapon Rack in a fully virtual environment that enhances understanding and engagement.",
        link: "https://www.figma.com/design/g1tJgL5gPbFssiB0KLPz3v/andika-performance-test?node-id=209-117",
    },
]

function Projects() {
  return (
    <PageTransition>
        <div className="min-h-screen bg-gray-950 text-white px-6">
        <div className="max-w-2xl mx-auto pt-40 pb-20">

            {/* Header */}
            <p className="font-mono text-gray-400 text-sm tracking-widest uppercase mb-4">
            Projects
            </p>
            <h1 className="text-5xl font-bold mb-16">
            Selected work.
            </h1>

            {/* Project List */}
            <div className="flex flex-col">
            {projects.map((project, index) => (
                <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between py-8 border-t border-gray-800 hover:border-gray-500 transition-all duration-300"
                >
                {/* Kiri — nomor + info */}
                <div className="flex items-start gap-6">
                    <span className="font-mono text-gray-600 text-sm mt-1">
                    {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition">
                        {project.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        {project.description}
                    </p>
                    </div>
                </div>

                {/* Kanan — kategori + tahun */}
                <div className="text-right ml-8 shrink-0">
                    <p className="font-mono text-gray-500 text-xs mb-1">{project.category}</p>
                    <p className="font-mono text-gray-600 text-xs">{project.year}</p>
                </div>
                </a>
            ))}

            {/* Border bawah terakhir */}
            <div className="border-t border-gray-800" />
            </div>

        </div>
        </div>
    </PageTransition>
  )
}

export default Projects