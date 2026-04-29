import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const contactItems = [
  {
    label: 'EMAIL',
    value: 'andfrz09@gmail.com',
    href: 'mailto:andfrz09@gmail.com',
  },
  {
    label: 'LOCATION',
    value: 'Indonesia',
  },
  {
    label: 'FOCUS',
    value: 'Smart Technology, UI/UX Design, Digital Product Support',
  },
]

function Contact() {
  return (
    <div style={{ backgroundColor: '#F5F2EE', minHeight: '100vh' }}>
      <Navbar />

      <section
        style={{
          padding: '120px 48px 72px',
          borderBottom: '0.5px solid #D4CFC8',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <h1
            style={{
              fontFamily: 'Bricolage Grotesque',
              fontWeight: 700,
              fontSize: 'clamp(56px, 10vw, 180px)',
              color: '#1A1814',
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            CONTACT
          </h1>

          <p
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '11px',
              color: '#E8650A',
              letterSpacing: '0.15em',
              maxWidth: '320px',
              lineHeight: 1.7,
            }}
          >
            OPEN FOR PROFESSIONAL OPPORTUNITIES, COLLABORATION, AND CONVERSATIONS ABOUT
            DIGITAL WORK.
          </p>
        </motion.div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '48px',
          padding: '72px 48px 120px',
          borderBottom: '0.5px solid #D4CFC8',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '11px',
              color: '#E8650A',
              letterSpacing: '0.15em',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            LET&apos;S CONNECT
          </span>

          <p
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              fontWeight: 600,
              color: '#1A1814',
              lineHeight: 1.25,
              maxWidth: '760px',
            }}
          >
            If you are looking for someone who cares about both clarity and presentation, I
            would be happy to discuss design, support, or technology-related opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{
            padding: '24px 0 0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {contactItems.map((item, index) => (
            <div
              key={item.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px minmax(0, 1fr)',
                gap: '20px',
                padding: '18px 0',
                borderTop: '0.5px solid #D4CFC8',
                borderBottom:
                  index === contactItems.length - 1 ? '0.5px solid #D4CFC8' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'Geist Mono',
                  fontSize: '11px',
                  color: '#999',
                  letterSpacing: '0.12em',
                }}
              >
                {item.label}
              </span>

              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 'clamp(16px, 1.3vw, 20px)',
                    color: '#1A1814',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    wordBreak: 'break-word',
                  }}
                >
                  {item.value}
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 'clamp(16px, 1.3vw, 20px)',
                    color: '#1A1814',
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </section>

      <section
        style={{
          padding: '72px 48px 140px',
          borderBottom: '0.5px solid #D4CFC8',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.75fr) minmax(0, 1.25fr)',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          <span
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '11px',
              color: '#E8650A',
              letterSpacing: '0.15em',
              display: 'block',
            }}
          >
            CURRENTLY
          </span>

          <div>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 'clamp(18px, 2vw, 28px)',
                fontWeight: 600,
                color: '#1A1814',
                lineHeight: 1.35,
                margin: '0 0 18px',
                maxWidth: '720px',
              }}
            >
              Building a portfolio that reflects my growth in frontend, interface thinking,
              and digital problem solving.
            </p>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                color: '#4D463D',
                lineHeight: 1.7,
                maxWidth: '720px',
              }}
            >
              I am especially interested in roles and collaborations where design awareness,
              structured execution, and curiosity for technology can work together.
            </p>
          </div>
        </motion.div>
      </section>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          backgroundColor: '#F5F2EE',
        }}
      >
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
  )
}

export default Contact
