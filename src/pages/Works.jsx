import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'

const WORD_STAGGER = 0.04
const WORD_DURATION = 0.45
const WORD_Y = 14

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
      <style>{`
        @media (max-width: 720px) {
          .works-header {
            padding: 96px 20px 48px !important;
            flex-direction: column;
            align-items: flex-start !important;
            gap: 12px;
          }
          .works-header-right {
            order: -1;
          }
          .works-list-header {
            padding: 12px 20px !important;
            display: none;
          }
          .works-list-item {
            padding: 18px 20px !important;
            flex-direction: column;
            gap: 12px;
            align-items: flex-start !important;
          }
          .works-contact-cta {
            padding: 96px 20px !important;
            flex-direction: column;
            gap: 24px !important;
          }
          .works-footer {
            padding: 18px 20px !important;
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
          .works-overlay-card {
            right: 16px !important;
            width: 200px !important;
            height: 200px !important;
          }
        }
      `}</style>
      <Navbar />

      {/* ── HEADER ── */}
      <section className="works-header" style={{
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
        <div className="works-list-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 48px',
          borderBottom: '0.5px solid #D4CFC8',
        }}>
          <span className="works-col-name" style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A', letterSpacing: '0.15em', flex: 2 }}>
            # NAME ✦
          </span>
          <span className="works-col-type" style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A', letterSpacing: '0.15em', flex: 2 }}>
            TYPE ✦
          </span>
          <span className="works-col-year" style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#E8650A', letterSpacing: '0.15em', textAlign: 'right', flex: 0.5 }}>
            YEAR ✦
          </span>
        </div>

        {/* Project rows */}
        {projects.map((project, index) => (
          <Link
            key={project.num}
            to={`/${project.slug}`}
            className="works-list-item"
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
              textDecoration: 'none',
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
                className="works-overlay-card"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  right: '120px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '300px',
                  height: '300px',
                  overflow: 'hidden',
                  zIndex: 20,
                  backgroundColor: '#FFFFFF',
                }}
              >
                {/* placeholder */}
                {project.layout?.hero?.type === 'video' ? (
                  <video
                    src={project.layout.hero.src}
                    poster={project.layout.hero.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: project.layout.hero.objectFit || 'cover',
                      objectPosition: project.layout.hero.objectPosition || 'center',
                      display: 'block',
                    }}
                  />
                ) : (
                  <img
                    src={project.layout?.hero?.src || project.img}
                    alt={project.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: project.layout?.hero?.objectFit || 'cover',
                      objectPosition: project.layout?.hero?.objectPosition || 'center',
                      display: 'block',
                    }}
                  />
                )}
              </motion.div>
            )}
          </Link>
        ))}
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="works-contact-cta" style={{
        display: 'flex',
        padding: '140px 48px',
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
      <footer className="works-footer" style={{
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
