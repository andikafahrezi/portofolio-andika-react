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

  // Continuous seamless infinite scroll carousel
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    let isUserScrolling = false
    let scrollTimeout
    
    const itemWidth = 420 + 24 // minWidth + gap
    const itemCount = 4 // Original items
    const totalItemsInDom = 12 // 3x repeat untuk seamless loop

    const animate = () => {
      if (!isUserScrolling) {
        gallery.scrollLeft += scrollSpeedRef.current

        // Seamless bidirectional infinite loop
        // Jump right when reaching 2nd loop end
        if (gallery.scrollLeft > itemWidth * itemCount * 2) {
          gallery.scrollLeft = itemWidth * itemCount
        }
        // Jump left when reaching beginning
        if (gallery.scrollLeft <= 0) {
          gallery.scrollLeft = itemWidth * itemCount
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Handle manual left/right scrolling
    const handleScroll = () => {
      const itemWidth = 420 + 24 // minWidth + gap
      const itemCount = 4 // Original items
      
      // Jump to end if user scrolls past the start
      if (gallery.scrollLeft <= 0) {
        gallery.scrollLeft = itemWidth * itemCount
      }
      // Jump to start if user scrolls past the end
      if (gallery.scrollLeft > itemWidth * itemCount * 2) {
        gallery.scrollLeft = itemWidth * itemCount
      }
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
    gallery.addEventListener('mousedown', handleMouseDown)
    gallery.addEventListener('mouseup', handleMouseUp)
    gallery.addEventListener('mouseleave', handleMouseUp)
    gallery.addEventListener('wheel', handleWheel, { passive: true })
    gallery.addEventListener('touchstart', handleMouseDown)
    gallery.addEventListener('touchend', handleMouseUp)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      gallery.removeEventListener('scroll', handleScroll)
      gallery.removeEventListener('mousedown', handleMouseDown)
      gallery.removeEventListener('mouseup', handleMouseUp)
      gallery.removeEventListener('mouseleave', handleMouseUp)
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
          scrollBehavior: 'smooth',
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

        {/* Seamless infinite carousel - 3 complete loops */}
        {[
          // Loop 1
          { id: 1, img: '/images/hobby1.jpg' },
          { id: 2, img: '/images/hobby2.jpg' },
          { id: 3, img: '/images/hobby3.jpg' },
          { id: 4, img: '/images/hobby4.jpg' },
          // Loop 2 (seamless repeat)
          { id: 1, img: '/images/hobby1.jpg' },
          { id: 2, img: '/images/hobby2.jpg' },
          { id: 3, img: '/images/hobby3.jpg' },
          { id: 4, img: '/images/hobby4.jpg' },
          // Loop 3 (buffer for jumping)
          { id: 1, img: '/images/hobby1.jpg' },
          { id: 2, img: '/images/hobby2.jpg' },
          { id: 3, img: '/images/hobby3.jpg' },
          { id: 4, img: '/images/hobby4.jpg' },
        ].map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            whileHover={{
              scale: 1.08,
              y: -15,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            style={{
              minWidth: '420px',
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              flexShrink: 0,
            }}
          >
            <motion.img
              src={item.img}
              alt={`hobby-${item.id}`}
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
                pointerEvents: 'none',
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