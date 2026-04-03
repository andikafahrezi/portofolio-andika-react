import { motion } from 'framer-motion'
import { video } from 'framer-motion/client'
import { useEffect, useRef } from 'react'

function Index() {
  const textRef = useRef(null)

  useEffect(() => {
    const fitText = () => {
      const el = textRef.current
      if (!el) return
      const padding = 96 // 48px kiri + 48px kanan
      el.style.transform = 'scaleX(1)'
      const availableWidth = window.innerWidth - padding
      const scale = availableWidth / el.scrollWidth
      el.style.transform = `scaleX(${scale})`
      el.style.transformOrigin = 'left'
    }
    fitText()
    window.addEventListener('resize', fitText)
    return () => window.removeEventListener('resize', fitText)
  }, [])

  return (
    <div>
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>

        {/* Background image */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/video/Yuta Okkotsu vs Kurourushi cut.mp4" type="video/mp4" />
        </video>

        {/* Overlay gelap */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1,
        }} />

        {/* Nama — di atas overlay */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          style={{ position: 'relative', zIndex: 2, padding: '0 48px 24px' }}
        >
          <h1
            ref={textRef}
            className="text-white leading-none inline-block"
            style={{
              fontFamily: "'Jujutsu Kaisen', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(30px, 8.5vw, 160px)',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            ANDIKA FAHREZI
          </h1>
        </motion.div>

      </section>

      {/* ── BIO ── */}
      <section style={{ padding: '140px 48px 140px', backgroundColor: '#F5F2EE', borderBottom: '0.5px solid #D4CFC8' }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 600,
            color: '#1A1814',
            lineHeight: 1.3,
            maxWidth: '70%',
          }}
        >
          Hi, I'm Andika, I am a graduate with a Bachelor of Applied Science
          in Digital Creative Multimedia. with experience in smart technology
          research, IoT data analysis, and strong skills in UI/UX design using Figma.
        </motion.p>
      </section>

    {/* ── SELECTED WORKS ── */}
    <section style={{ backgroundColor: '#F5F2EE' }}>

      {/* Section Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 48px',
        backgroundColor: '#F5F2EE',
        // borderBottom: '0.5px solid #D4CFC8',
      }}>
        <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: '#999', letterSpacing: '0.15em' }}>
          SELECTED WORKS
        </span>
        <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: '#999' }}>
          (22–24)
        </span>
      </div>

      {/* Project rows */}
      {[
        { num: '01', title: 'Smart Mannequin Research Project', type: 'IoT · Research', year: '2022', img: '/images/sm photo.png' },
        { num: '02', title: 'SM Monitoring Dashboard UI Design', type: 'UI Design · Dashboard', year: '2023', img: '/images/dashboard photo.png' },
        { num: '03', title: 'VR Research Product Overview', type: 'VR · UI Design', year: '2024', img: '/images/vr photo.png' },
      ].map((project) => (
        <a
          href="/works"
          key={project.num}
          style={{
            borderBottom: '0.5px solid #D4CFC8',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#F5F2EE'
              const title = e.currentTarget.querySelector('.proj-title')
              if (title) title.style.color = '#E8650A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#F5F2EE'
              const title = e.currentTarget.querySelector('.proj-title')
              if (title) title.style.color = '#1A1814'
            }}
        >
          {/* Project Header — STICKY */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '16px 48px',
              backgroundColor: '#F5F2EE',
              // borderBottom: '0.5px solid #D4CFC8',
              transition: 'background 0.3s ease',
              justifyContent: 'space-between',
            }}
          >
            {/* Left side: num + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
              <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: '#E8650A', minWidth: '24px' }}>
                {project.num}
              </span>
              <span
                className="proj-title"
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 'clamp(16px, 1.8vw, 24px)',
                  fontWeight: 500,
                  color: '#1A1814',
                  transition: 'color 0.3s ease',
                }}
              >
                {project.title}
              </span>
            </div>

            {/* Right side: tags */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {project.type.split(' · ').map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Geist Mono',
                  fontSize: '10px',
                  color: '#E8650A',
                  border: '0.5px solid #E8650A',
                  padding: '2px 8px',
                  borderRadius: '100px',
                }}>
                  {tag}
                </span>
              ))}
              <span style={{
                fontFamily: 'Geist Mono',
                fontSize: '10px',
                color: '#ccc',
                padding: '2px 8px',
              }}>
                {project.year}
              </span>
            </div>
          </div>

          {/* Project Image — NOT STICKY */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '32px 48px',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '60%',
              height: 'flex',
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              <img
                src={project.img}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </a>
      ))}

    </section>
    </div>
  )
}

export default Index