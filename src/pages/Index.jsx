import { motion, useScroll, useTransform } from 'framer-motion'
import { video } from 'framer-motion/client'
import { useEffect, useRef } from 'react'

function Index() {
  const textRef = useRef(null)
  const galleryRef = useRef(null)
  const rafRef = useRef(null)
  const scrollSpeedRef = useRef(1) // pixels per frame - lebih smooth

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

  // Continuous seamless infinite scroll carousel - Left direction only
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    let isUserScrolling = false
    let scrollTimeout
    let isHovering = false
    
    const itemWidth = 420 + 24 // minWidth + gap
    const itemCount = 4 // Original items
    const loops = 2 // 2x repetition untuk seamless infinite

    // Wait for DOM to be ready, then start from middle
    setTimeout(() => {
      gallery.scrollLeft = itemWidth * itemCount // Start at 2nd copy
    }, 100)

    const animate = () => {
      if (!isUserScrolling) {
        const speed = isHovering ? 0.3 : 1 // Slower when hovering
        gallery.scrollLeft -= speed

        // Seamless loop: jump from end of 1st copy back to start of 2nd copy
        if (gallery.scrollLeft <= itemWidth * 0.5) {
          gallery.scrollLeft = itemWidth * itemCount + (itemWidth * itemCount)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      // Jump back if scrolled past start
      if (gallery.scrollLeft <= itemWidth * 0.5) {
        gallery.scrollLeft = itemWidth * itemCount + (itemWidth * itemCount)
      }
    }

    const handleMouseEnter = () => {
      isHovering = true
    }

    const handleMouseLeave = () => {
      isHovering = false
    }

    const handleMouseDown = () => {
      isUserScrolling = true
    }

    const handleMouseUp = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false
      }, 1000)
    }

    const handleWheel = () => {
      isUserScrolling = true
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false
      }, 800)
    }

    // Start animation
    rafRef.current = requestAnimationFrame(animate)

    // Event listeners
    gallery.addEventListener('scroll', handleScroll)
    gallery.addEventListener('mouseenter', handleMouseEnter, true)
    gallery.addEventListener('mouseleave', handleMouseLeave, true)
    gallery.addEventListener('mousedown', handleMouseDown)
    gallery.addEventListener('mouseup', handleMouseUp)
    gallery.addEventListener('wheel', handleWheel, { passive: true })
    gallery.addEventListener('touchstart', handleMouseDown)
    gallery.addEventListener('touchend', handleMouseUp)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      gallery.removeEventListener('scroll', handleScroll)
      gallery.removeEventListener('mouseenter', handleMouseEnter, true)
      gallery.removeEventListener('mouseleave', handleMouseLeave, true)
      gallery.removeEventListener('mousedown', handleMouseDown)
      gallery.removeEventListener('mouseup', handleMouseUp)
      gallery.removeEventListener('wheel', handleWheel)
      gallery.removeEventListener('touchstart', handleMouseDown)
      gallery.removeEventListener('touchend', handleMouseUp)
      clearTimeout(scrollTimeout)
    }
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          style={{
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 600,
            color: '#1A1814',
            lineHeight: 1.3,
            maxWidth: '70%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3em',
          }}
        >
          {[
            'Hi,', "I'm", 'Andika,', 'I', 'am', 'a', 'graduate', 'with', 'a', 'Bachelor', 'of', 'Applied', 'Science',
            'in', 'Digital', 'Creative', 'Multimedia.', 'with', 'experience', 'in', 'smart', 'technology',
            'research,', 'IoT', 'data', 'analysis,', 'and', 'strong', 'skills', 'in', 'UI/UX', 'design', 'using', 'Figma.'
          ].map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
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

    {/* ── SKILLS ── */}
    <section style={{ padding: '140px 48px 140px', backgroundColor: '#F5F2EE', borderTop: '0.5px solid #D4CFC8', borderBottom: '0.5px solid #D4CFC8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '80px', alignItems: 'flex-start' }}>
        
        {/* Left side — Label + Description */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <span style={{
              fontFamily: 'Geist Mono',
              fontSize: '11px',
              color: '#E8650A',
              letterSpacing: '0.15em',
              display: 'block',
              marginBottom: '24px',
            }}>
              SKILLS
            </span>
            <p style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(24px, 2.8vw, 42px)',
              fontWeight: 600,
              color: '#1A1814',
              lineHeight: 1.3,
            }}>
              Crafting seamless digital experiences from concept to execution.
            </p>
          </motion.div>
        </div>

        {/* Right side — Skills List */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {[
              'Figma',
              'UI/UX Design',
              'Wireframe & Prototyping',
              'Technical Support',
              'Data Analysis',
            ].map((skill, index) => (
              <div key={index} style={{
                paddingBottom: index < 3 ? '24px' : '0',
                borderBottom: index < 3 ? '0.5px solid #D4CFC8' : 'none',
              }}>
                <h3 style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 'clamp(18px, 2.2vw, 28px)',
                  fontWeight: 600,
                  color: '#1A1814',
                  margin: 0,
                }}>
                  {skill}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>

    {/* ── PERSONAL DOCUMENTATION ── */}
    <section style={{ padding: '140px 0 140px 0', backgroundColor: '#F5F2EE', overflow: 'hidden' }}>
      <div style={{ paddingLeft: '48px', paddingRight: '48px', paddingBottom: '64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span style={{
            fontFamily: 'Geist Mono',
            fontSize: '11px',
            color: '#E8650A',
            letterSpacing: '0.15em',
            display: 'block',
          }}>
            PERSONAL DOCUMENTATION OF MY HOBBIES AND ACTIVITIES
          </span>
        </motion.div>
      </div>

      {/* Scrollable Carousel */}
      <div
        ref={galleryRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'revert-layer',
          gap: '24px',
          paddingLeft: '48px',
          paddingRight: '48px',
          paddingBottom: '48px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Hide scrollbar CSS */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Infinite carousel - 4 original items x 2 loops untuk seamless infinite */}
        {[
          // Loop 1
          { id: 1, img: '/images/bultang1.jpeg' },
          { id: 2, img: '/images/andika2.jpeg' },
          { id: 3, img: '/images/andika.jpeg' },
          { id: 4, img: '/images/rumahpohon.jpeg' },
          // Loop 2 (seamless repeat - allows infinite loop without visible duplication)
          { id: 1, img: '/images/bultang1.jpeg' },
          { id: 2, img: '/images/andika2.jpeg' },
          { id: 3, img: '/images/andika.jpeg' },
          { id: 4, img: '/images/rumahpohon.jpeg' },
        ].map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            style={{
              minWidth: '420px',
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <img
              src={item.img}
              alt={`hobby-${item.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          fontFamily: 'Geist Mono',
          letterSpacing: '0.1em',
          paddingLeft: '48px',
          paddingRight: '48px',
        }}
      >
        ← SCROLL HORIZONTALLY →
      </motion.div>
    </section>

    </div>
  )
}

export default Index