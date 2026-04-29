import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const WORD_STAGGER = 0.04
const WORD_DURATION = 0.45
const WORD_Y = 14

const projects = [
  {
    num: '01',
    title: 'Smart Mannequin Research Project',
    tags: ['IOT HARDWARE ENGINEER', 'DATA ANALYST', 'RESEARCH'],
    year: '2022',
    img: null,
    overlayLabel: 'SMART MANNEQUIN',
  },
  {
    num: '02',
    title: 'SM Monitoring Dashboard UI Design',
    tags: ['UI DESIGN', 'DASHBOARD DESIGN', 'DATA VISUALIZATION'],
    year: '2023',
    img: null,
    overlayLabel: 'SM DASHBOARD',
  },
  {
    num: '03',
    title: 'VR Research Product Overview',
    tags: ['VIRTUAL REALITY', 'VR UI DESIGN', 'OVERVIEW'],
    year: '2024',
    img: null,
    overlayLabel: 'VR RESEARCH',
  },
]

function WordReveal({
  as = 'div',
  text,
  style,
  className,
  amount = WORD_STAGGER,
  duration = WORD_DURATION,
  y = WORD_Y,
  delay = 0,
}) {
  const MotionTag = motion[as]
  const words = String(text).split(' ')

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: amount,
          },
        },
      }}
      style={style}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0.001, y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: 'easeOut' },
            },
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}

function Works() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div style={{ backgroundColor: '#Fff', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HEADER ── */}
      <section style={{
        padding: '120px 48px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            fontFamily: 'Onest',
            fontWeight: 600,
            fontSize: 'clamp(60px, 10vw, 220px)',
            color: '#1A1814',
            lineHeight: 1,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          WORK
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'Bricolage Grotesque',
            fontWeight: 400,
            fontSize: 'clamp(50px, 6vw, 180px)',
            color: '#D4CFC8',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          (22–24)
        </motion.span>
      </section>

      {/* ── PROJECT LIST ── */}
      <section>

        {/* Header kolom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 48px',
          borderBottom: '0.5px solid #D4CFC8',
        }}>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A', letterSpacing: '0.15em', flex: 2 }}>
            # NAME ✦
          </span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A', letterSpacing: '0.15em', flex: 2 }}>
            TYPE ✦
          </span>
          <span style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A', letterSpacing: '0.15em', textAlign: 'right', flex: 0.5 }}>
            YEAR ✦
          </span>
        </div>

        {/* Project rows */}
        {projects.map((project, index) => (
          <div
            key={project.num}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 48px',
              borderBottom: '0.5px solid #D4CFC8',
              backgroundColor: hoveredIndex === index ? '#EDEAE5' : '#Fff',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
          >
            {/* Nama project */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 2 }}>
              <span style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A' }}>
                {project.num}
              </span>
              <WordReveal
                as="div"
                text={project.title}
                amount={0.05}
                duration={0.42}
                y={12}
                delay={0}
                style={{
                  fontFamily: 'Onest',
                  fontWeight: 600,
                  fontSize: 'clamp(8px, 1vw, 12px)',
                  color: '#1A1814',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              />
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '16px', flex: 2 }}>
              {project.tags.map((tag, tagIndex) => (
                <WordReveal
                  key={tag}
                  as="div"
                  text={tag}
                  amount={0.025}
                  duration={0.38}
                  y={10}
                  delay={0.14 + tagIndex * 0.06}
                  style={{
                    fontFamily: 'Geist Mono',
                    fontSize: '8px',
                    color: '#888',
                    letterSpacing: '0.05em',
                  }}
                />
              ))}
            </div>

            {/* Tahun */}
            <WordReveal
              as="div"
              text={project.year}
              amount={0.08}
              duration={0.35}
              y={10}
              delay={0.34}
              style={{
                fontFamily: 'Geist Mono',
                fontSize: '12px',
                color: '#1A1814',
                fontWeight: 500,
                textAlign: 'right',
                flex: 0.5,
              }}
            />

            {/* Overlay card */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  right: '120px',
                  // top: '0',
                  transform: 'translateY(-50%)',
                  width: '300px',
                  height: '300px',
                  // borderRadius: '8px',
                  overflow: 'hidden',
                  zIndex: 20,
                  backgroundColor: '#1A1814',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                }}
              >
                {/* Gambar placeholder — ganti src saat sudah punya file */}
                {project.img && (
                  <img
                    src={project.img}
                    alt={project.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.6,
                    }}
                  />
                )}

                {/* Dark overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }} />

                {/* Label */}
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: 'Bricolage Grotesque',
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 2vw, 28px)',
                  color: 'white',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}>
                  {project.overlayLabel}
                </span>
              </motion.div>
            )}
          </div>
        ))}
      </section>

      {/* ── CONTACT CTA ── */}
      <section style={{
        display: 'flex',
        padding: '140px 48px',
        // borderTop: '0.5px solid #D4CFC8',
        borderBottom: '0.5px solid #D4CFC8',
        backgroundColor: '#Fff',
      }}>
        <div style={{ flex: 1 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
              'Always', 'seeking', 'opportunities', 'to', 'contribute',
              'professionally', 'in', 'the', 'field', 'of', 'smart',
              'technology', 'and', 'design.'
            ].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

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
        backgroundColor: '#fff',
      }}>
        <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: '#1A1814', letterSpacing: '0.08em' }}>
          ANDIKA FAHREZI®
        </span>
        <span style={{ fontFamily: 'Geist Mono', fontSize: '11px', color: '#1A1814' }}>
          andfrz09@gmail.com
        </span>
      </footer>

    </div>
  )
}

export default Works
