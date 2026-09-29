import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'
import { projects } from '../data/projects'

const WORD_STAGGER = 0.08
const WORD_DURATION = 0.55
const WORD_Y = 24

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
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
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
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}

function LetterReveal({ as = 'div', text, style, className, amount = 0.06, duration = 0.6 }) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: amount,
          },
        },
      }}
      style={style}
      className={className}
    >
      {Array.from(String(text)).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: 'easeOut' },
            },
          }}
          style={{
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : undefined,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </MotionTag>
  )
}

function ProjectMedia({ project }) {
  const hero = project.layout?.hero
  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: hero?.objectFit || 'cover',
    objectPosition: hero?.objectPosition || 'center',
    display: 'block',
  }

  if (hero?.type === 'video') {
    return (
      <video
        src={hero.src}
        poster={hero.poster || project.img}
        autoPlay
        muted
        loop
        playsInline
        style={mediaStyle}
      />
    )
  }

  return <img src={hero?.src || project.img} alt={project.title} style={mediaStyle} />
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
          .works-contact-cta {
            padding: 96px 20px !important;
            flex-direction: column;
            gap: 24px !important;
          }
          .works-overlay-card {
            display: none;
          }
        }
        .works-project-main {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }
        .works-project-heading {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }
        .works-project-roles,
        .works-project-preview {
          display: none;
        }
        .works-project-details {
          display: contents;
        }
        @media (max-width: 1199.98px) {
          .works-header {
            padding-bottom: 124px !important;
          }
          .works-list-header {
            display: none !important;
          }
          .works-col-type,
          .works-col-year {
            display: none;
          }
          .works-list-item {
            display: grid !important;
            position: sticky !important;
            top: 32px;
            z-index: var(--works-row-order);
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
            align-items: start !important;
            gap: 16px;
            padding: 24px 16px !important;
          }
          .works-project-main {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            min-width: 0;
            z-index: 1;
          }
          .works-project-heading {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            min-width: 0;
          }
          .works-project-number {
            font-size: 12px !important;
            line-height: 16.8px;
            color: rgba(26, 24, 20, 0.5) !important;
          }
          .works-project-title {
            font-size: 18px !important;
            line-height: 1.2;
            padding-bottom: 16px !important;
            letter-spacing: normal !important;
            text-transform: none !important;
          }
          .works-project-preview {
            display: block;
            width: 100%;
            height: 115px;
            overflow: hidden;
            background: #f1f1f1;
          }
          .works-project-details {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px !important;
            min-width: 0;
            width: 100%;
            overflow: hidden;
          }
          .works-project-tags {
            display: none !important;
          }
          .works-project-roles {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
            min-width: 0;
            width: 100%;
          }
          .works-project-role {
            font-family: 'Plus Jakarta Sans';
            font-size: 12px;
            line-height: 1.2;
            color: #888;
            overflow-wrap: anywhere;
            text-align: right;
          }
          .works-project-year {
            align-self: flex-end;
            font-size: 12px !important;
            font-weight: 500 !important;
            line-height: 1.2;
          }
          .works-overlay-card {
            display: none;
          }
        }
        @media (max-width: 720px) {
          .works-header {
            padding-bottom: 103px !important;
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
        <LetterReveal
          as="h1"
          text="WORK"
          style={{
            fontFamily: 'Onest',
            fontWeight: 600,
            fontSize: 'clamp(60px, 10vw, 220px)',
            color: '#1A1814',
            lineHeight: 1,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        />

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
          (22–26)
        </motion.span>
      </section>

      {/* ── PROJECT LIST ── */}
      <section>

        {/* Header kolom */}
        <div className="works-list-header" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 4fr) minmax(0, 1fr)',
          padding: '12px 48px',
          borderBottom: '0.5px solid #D4CFC8',
        }}>
          <span className="works-col-name" style={{ fontFamily: 'Geist Mono', fontSize: '12px', color: '#0B33A7', letterSpacing: '0.15em', flex: 2 }}>
            # NAME ✦
          </span>
          <span className="works-col-type" style={{ fontFamily: 'Geist Mono', fontSize: '12px', color: '#0B33A7', letterSpacing: '0.15em', flex: 2 }}>
            TYPE ✦
          </span>
          <span className="works-col-year" style={{ fontFamily: 'Geist Mono', fontSize: '12px', color: '#0B33A7', letterSpacing: '0.15em', textAlign: 'right', flex: 0.5 }}>
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
              '--works-row-order': index + 1,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 4fr) minmax(0, 1fr)',
              alignItems: 'center',
              padding: '14px 48px',
              borderBottom: '0.5px solid #D4CFC8',
              backgroundColor: hoveredIndex === index ? '#EDEAE5' : '#Fff',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            {/* Project name and inline preview */}
            <div className="works-project-main" style={{ flex: 2 }}>
              <div className="works-project-heading">
                <span className="works-project-number" style={{ fontFamily: 'Geist Mono', fontSize: '10px', color: '#0B33A7' }}>
                  {project.num}
                </span>
                <WordReveal
                  as="div"
                  text={project.title}
                  className="proj-title works-project-title"
                  delay={0}
                  style={{
                    fontFamily: 'Onest',
                    fontWeight: 600,
                    fontSize: 'clamp(12px, 1vw, 12px)',
                    color: '#1A1814',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                />
              </div>
              <div className="works-project-preview">
                <ProjectMedia project={project} />
              </div>
            </div>

            {/* Project details */}
            <div className="works-project-details" style={{ gap: '16px', flex: 2 }}>
              <div className="works-project-roles">
                {project.detailRoles.map((role) => (
                  <div key={role} className="works-project-role">{role}</div>
                ))}
              </div>
              <div className="works-project-tags" style={{ display: 'flex', gap: '16px', flex: 1 }}>
                {project.tags.map((tag, tagIndex) => (
                  <WordReveal
                    key={tag}
                    as="div"
                    text={tag}
                    delay={0.14 + tagIndex * 0.06}
                    style={{
                      fontFamily: 'Geist Mono',
                      fontSize: '10px',
                      color: '#888',
                      letterSpacing: '0.05em',
                    }}
                  />
                ))}
              </div>
              {/* Year */}
              <WordReveal
                as="div"
                text={project.year}
                className="works-project-year"
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
            </div>

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
                <ProjectMedia project={project} />
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
              hidden: {},
              visible: {
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
              lineHeight: 1,
              maxWidth: '380px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.3em',
            }}
          >
            {'Always seeking opportunities to contribute professionally in the field of smart technology and design.'.split(' ').map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0.001, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  },
                }}
                style={{
                  display: 'inline-block',
                  marginRight: '0.25em',
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
      <SiteFooter />

    </div>
  )
}

export default Works
