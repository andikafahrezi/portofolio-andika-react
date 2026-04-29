import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

function Gallery({ images }) {
  // Duplicate untuk seamless infinite loop
  const allImages = [...images, ...images, ...images]

  return (
    <div
      style={{
        overflow: 'hidden',
        paddingBottom: '48px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          width: 'max-content',
          animation: 'scroll-left 60s linear infinite',
        }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {allImages.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            style={{
              width: '420px',
              height: '420px',
              // borderRadius: '16px',
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
          </div>
        ))}
      </div>
    </div>
  )
}

function Index() {
  const textRef = useRef(null)

  useEffect(() => {
    const fitText = () => {
      const el = textRef.current
      if (!el) return

      // Force reflow untuk memastikan ukuran terbaru
      el.style.transform = 'scaleX(1)'
      void el.offsetWidth // trigger reflow

      const padding = 96 // 48px kiri + 48px kanan
      const availableWidth = window.innerWidth - padding
      const scale = availableWidth / el.scrollWidth
      el.style.transform = `scaleX(${scale})`
      el.style.transformOrigin = 'left'
    }

    // Tunggu font load selesai sebelum menghitung
    const initFitText = () => {
      if (document.fonts.ready) {
        document.fonts.ready.then(() => {
          requestAnimationFrame(fitText)
        })
      } else {
        requestAnimationFrame(fitText)
      }
    }

    initFitText()

    // Resize dengan debounce untuk performa
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(fitText)
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
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

        {/* Navbar - Fixed di section ini */}
        <Navbar />

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
      <section style={{ padding: '140px 48px 140px', backgroundColor: '#fff', borderBottom: '0.5px solid #D4CFC8' }}>
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
    <section style={{ backgroundColor: '#fff' }}>

      {/* Section Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 48px',
        backgroundColor: '#fff',
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
            e.currentTarget.style.backgroundColor = '#Fff'
            const titles = e.currentTarget.querySelectorAll('.proj-title')
            titles.forEach(t => t.style.color = '#E8650A')
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#fff'
            const titles = e.currentTarget.querySelectorAll('.proj-title')
            titles.forEach(t => t.style.color = '#1A1814')
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
              backgroundColor: '#Fff',
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
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.07 },
                  },
                }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.25em',
                }}
              >
                {project.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="proj-title"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: 'easeOut' },
                      },
                    }}
                    style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 'clamp(16px, 1.8vw, 24px)',
                      fontWeight: 500,
                      color: '#1A1814',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
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
    <section style={{ padding: '140px 48px 140px', backgroundColor: '#fff', borderBottom: '0.5px solid #D4CFC8' }}>
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
                paddingBottom: index < 4 ? '24px' : '0',
                borderBottom: index < 4 ? '0.5px solid #D4CFC8' : 'none',
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
    <section style={{ padding: '140px 0 140px 0', backgroundColor: '#Fff', overflow: 'hidden' }}>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-420px * 4 - 24px * 4));
          }
        }
      `}</style>
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

      <Gallery images={[
        { id: 1, img: '/images/bultang1.jpeg' },
        { id: 2, img: '/images/andika2.jpeg' },
        { id: 3, img: '/images/andika.jpeg' },
        { id: 4, img: '/images/rumahpohon.jpeg' },
      ]} />
    </section>

    {/* ── CONTACT CTA ── */}
    <section style={{
      display: 'flex',
      padding: '140px 48px',
      borderTop: '0.5px solid #D4CFC8',
      borderBottom: '0.5px solid #D4CFC8',
      backgroundColor: '#Fff',
    }}>
      {/* Kiri — kosong */}
      <div style={{ flex: 1 }} />

      {/* Kanan — teks + email */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Animasi kata per kata */}
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
            fontSize: 'clamp(20px, 2.2vw, 30px)',
            fontWeight: 600,
            color: '#1A1814',
            lineHeight: 1.1,
            maxWidth: '380px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3em',
          }}
        >
          {[
            'Available', 'for', 'work', 'and', 'always', 'seeking',
            'opportunities', 'to', 'contribute', 'professionally',
            'in', 'the', 'field', 'of', 'smart', 'technology',
            'and', 'design.'
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

        {/* email */}
        <motion.a
          href="mailto:andfrz09@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            fontWeight: 600,
            color: '#1A1814',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          andfrz09@gmail.com
        </motion.a>
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 48px',
      backgroundColor: '#Fff',
    }}>
      <span style={{
        fontFamily: 'Geist Mono',
        fontSize: '11px',
        color: '#1A1814',
        letterSpacing: '0.08em',
      }}>
        ANDIKA FAHREZI®
      </span>
      <span style={{
        fontFamily: 'Geist Mono',
        fontSize: '11px',
        color: '#1A1814',
      }}>
        andfrz09@gmail.com
      </span>
    </footer>

    </div>
  )
}

export default Index