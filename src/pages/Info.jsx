import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const skills = [
  'UI/UX Design',
  'Wireframe & Prototyping',
  'Frontend Dev',
  'Technical Support',
  'Data Analysis',
]

const WORD_STAGGER = 0.045
const WORD_DURATION = 0.55
const WORD_Y = 18
const WORD_EASE = 'easeOut'

const textAnimation = {
  initial: { opacity: 0.001, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay: 0.075, ease: 'easeOut' },
}

function WordReveal({
  as = 'div',
  text,
  style,
  className,
  amount = WORD_STAGGER,
  duration = WORD_DURATION,
  y = WORD_Y,
  ease = WORD_EASE,
}) {
  const MotionTag = motion[as]
  const words = text.split(' ')

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
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
              transition: { duration, ease },
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

function SectionLabel({ children }) {
  return (
    <WordReveal
      as="h2"
      text={children}
      amount={0.05}
      duration={0.5}
      y={12}
      style={{
        flex: '1 0 0',
        fontFamily: 'Geist Mono',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(235, 109, 0, 0.55)',
      }}
    />
  )
}

function Info() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflow: 'hidden' }}>
      <style>{`
        .info-page {
          width: 100%;
          background: #FFFFFF;
        }

        .info-title,
        .info-section,
        .info-divider,
        .info-image,
        .info-footer {
          width: 100%;
        }

        .info-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 195px 32px 80px 32px;
        }

        .info-image {
          aspect-ratio: 1.8181818181818181 / 1;
          min-height: 660px;
          background-image: url('https://framerusercontent.com/images/8wgAGnv2ys0wbxkJwJj9258.png?width=2639&height=1752');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .info-section {
          display: flex;
          align-items: flex-start;
          gap: 64px;
          padding: 80px 32px;
        }

        .info-divider {
          height: 1px;
          background: #F1F1F1;
        }

        .info-skills {
          flex: 1 0 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 48px;
          background: #FFFFFF;
        }

        @media (min-width: 810px) and (max-width: 1199.98px) {
          .info-image {
            min-height: 446px;
          }
        }

        @media (max-width: 809.98px) {
          .info-title {
            padding: 120px 16px 60px 16px;
          }

          .info-image {
            min-height: 110px;
          }

          .info-section {
            flex-direction: column;
            gap: 16px;
            padding: 60px 16px;
          }

          .info-footer {
            padding: 24px 16px;
          }
        }
      `}</style>

      <Navbar />

      <div className="info-page">
        <section className="info-title">
          <WordReveal
            as="h1"
            text="Bachelor of Applied Science - Digital Creative Multimedia - Telkom University."
            amount={0.035}
            duration={0.55}
            y={22}
            style={{
              flex: '1 0 0',
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(34px, 5vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#09090B',
              maxWidth: '100%',
            }}
          />
        </section>

        <div className="info-image" />

        <section className="info-section">
          <SectionLabel>Who I am</SectionLabel>

          <div
            style={{
              flex: '1 0 0',
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(16px, 1.55vw, 23px)',
              fontWeight: 500,
              lineHeight: 1.45,
              color: '#09090B',
              whiteSpace: 'pre-wrap',
            }}
          >
            <WordReveal
              as="p"
              text="A passionate IT & UI/UX designer who loves about digital experiences, product design, smart tech and playing badminton."
              amount={0.03}
              duration={0.5}
              y={16}
              style={{ margin: 0 }}
            />
            <div style={{ height: '1.2em' }} />
            <WordReveal
              as="p"
              text="I have a background in Computer Technology, Diploma, and relevant experience in the field of information technology. During my studies, I contributed to research and development projects in the fields of IoT and Embedded Systems, which involved design, development, and analysis of results data."
              amount={0.022}
              duration={0.5}
              y={16}
              style={{
                margin: 0,
                color: 'rgba(128, 128, 128, 0.95)',
              }}
            />
          </div>
        </section>

        <div className="info-divider" />

        <section className="info-section">
          <SectionLabel>SKILLS</SectionLabel>

          <div className="info-skills">
            {skills.map((skill, index) => (
              <WordReveal
                key={skill}
                as="h3"
                text={skill}
                amount={0.05}
                duration={0.5}
                y={14}
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 'clamp(18px, 2vw, 30px)',
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#09090B',
                  margin: 0,
                }}
              />
            ))}
          </div>
        </section>

        <div className="info-divider" />
        <div className="info-divider" />
        <div className="info-divider" />

        <footer className="info-footer">
          <span
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '11px',
              color: '#1A1814',
              letterSpacing: '0.08em',
            }}
          >
            ANDIKA FAHREZI
          </span>
          <span
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '11px',
              color: '#1A1814',
            }}
          >
            andfrz09@gmail.com
          </span>
        </footer>
      </div>
    </div>
  )
}

export default Info
