import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const WORD_STAGGER = 0.03
const WORD_DURATION = 0.5
const WORD_Y = 16

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

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/andikafahrezii' },
  { label: 'Twitter (X)', href: 'https://x.com/andikafahrezi_' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/andikafahrezi' },
]

const directContacts = [
  { label: 'Email', value: 'andfrz09@gmail.com', href: 'mailto:andfrz09@gmail.com' },
  { label: 'Phone', value: '+62 819-7722-8896', href: 'tel:+6281977228896' },
]

function WordReveal({
  as = 'div',
  text,
  style,
  className,
  amount = WORD_STAGGER,
  duration = WORD_DURATION,
  y = WORD_Y,
}) {
  const MotionTag = motion[as]
  const words = String(text).split(' ')

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

function Contact() {
  const [result, setResult] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    if (!accessKey) {
      setResult('Form belum aktif. Isi VITE_WEB3FORMS_ACCESS_KEY dulu.')
      return
    }

    setIsSubmitting(true)
    setResult('Sending...')

    const formData = new FormData(form)
    const senderName = String(formData.get('name') || '').trim()
    const senderEmail = String(formData.get('email') || '').trim()
    const senderMessage = String(formData.get('message') || '').trim()

    const payload = {
      access_key: accessKey,
      subject: `New Portfolio Inquiry from ${senderName || 'Website Visitor'}`,
      from_name: 'Andika Fahrezi Portfolio Contact Form',
      name: senderName,
      email: senderEmail,
      message: senderMessage,
      replyto: senderEmail,
      source: 'andikafahrezi portfolio website',
      page: '/contact',
      botcheck: formData.get('botcheck') || '',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult(data.message || 'Message sent successfully.')
        form.reset()
      } else {
        setResult(data.message || 'Something went wrong while sending the form.')
      }
    } catch (error) {
      setResult('Network error. Please check internet, adblocker, or browser console.')
      console.error('Contact form submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      <section
        style={{
          padding: '120px 48px 72px',
          borderBottom: '0.5px solid #D4CFC8',
          backgroundColor: '#FFFFFF',
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
              fontWeight: 600,
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
            OPEN FOR PROFESSIONAL OPPORTUNITIES, AND CONVERSATIONS ABOUT
            DESIGN WORK.
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
          backgroundColor: '#FFFFFF',
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

          <WordReveal
            as="p"
            text="If you are looking for someone who cares about both clarity and presentation, I would be happy to discuss design, support, or technology-related opportunities."
            amount={0.05}
            duration={0.5}
            y={16}
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              fontWeight: 600,
              color: '#1A1814',
              lineHeight: 1.25,
              maxWidth: '760px',
            }}
          />
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
          padding: '72px 48px 120px',
          borderBottom: '0.5px solid #D4CFC8',
          backgroundColor: '#FFFFFF',
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
              Work in PT. Sintesa Inti Prestasi as an UI/UX Designer.
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

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '48px',
          padding: '72px 48px 120px',
          borderBottom: '0.5px solid #D4CFC8',
          backgroundColor: '#FFFFFF',
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
              letterSpacing: '0.12em',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            STAY CLOSE TO US
          </span>

          <WordReveal
            as="p"
            text="Let’s stay in touch and create incredible things together, turning ideas into reality with passion, creativity, and innovation"
            amount={0.09}
            duration={0.5}
            y={16}
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              fontWeight: 600,
              color: '#1A1814',
              lineHeight: 1.25,
              maxWidth: '760px',
            }}
          />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
        >
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />

          {[
            { label: 'Name', type: 'text', name: 'name', placeholder: 'Your name' },
            { label: 'Email', type: 'email', name: 'email', placeholder: 'Your email' },
          ].map((field) => (
            <label key={field.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Geist Mono',
                  fontSize: '11px',
                  color: '#E8650A',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                }}
              >
                {field.label}
              </span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                style={{
                  border: 'none',
                  borderBottom: '1px solid #D4CFC8',
                  padding: '0 0 10px',
                  backgroundColor: 'transparent',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 'clamp(18px, 1.6vw, 24px)',
                  color: '#1A1814',
                  outline: 'none',
                }}
              />
            </label>
          ))}

          <label style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'Geist Mono',
                fontSize: '11px',
                color: '#E8650A',
                letterSpacing: '0.12em',
                marginBottom: '12px',
              }}
            >
              Message
            </span>
            <textarea
              name="message"
              placeholder="Tell me about your project or idea"
              rows={4}
              required
              style={{
                border: 'none',
                borderBottom: '1px solid #D4CFC8',
                padding: '0 0 10px',
                backgroundColor: 'transparent',
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 'clamp(18px, 1.6vw, 24px)',
                color: '#1A1814',
                outline: 'none',
                resize: 'vertical',
                minHeight: '100px',
              }}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: 'fit-content',
              height: '42px',
              padding: '10px 14px',
              border: 'none',
              backgroundColor: '#09090B',
              color: '#FFFFFF',
              fontFamily: 'Plus Jakarta Sans',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isSubmitting ? 'default' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>

          <p
            style={{
              minHeight: '24px',
              margin: 0,
              fontFamily: 'Plus Jakarta Sans',
              fontSize: '14px',
              color: result.includes('successfully') ? '#1A1814' : '#666',
            }}
          >
            {result}
          </p>
        </motion.form>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.75fr) minmax(0, 1.25fr)',
          gap: '48px',
          padding: '72px 48px 140px',
          borderBottom: '0.5px solid #D4CFC8',
          backgroundColor: '#FFFFFF',
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
            }}
          >
            GET IN TOUCH
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
        >
          <div>
            <span
              style={{
                fontFamily: 'Geist Mono',
                fontSize: '11px',
                color: '#999',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '18px',
              }}
            >
              SOCIALS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 'clamp(16px, 1.4vw, 22px)',
                    color: '#1A1814',
                    textDecoration: 'none',
                    width: 'fit-content',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span
              style={{
                fontFamily: 'Geist Mono',
                fontSize: '11px',
                color: '#999',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '18px',
              }}
            >
              STAY CLOSE TO US
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {directContacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 'clamp(16px, 1.4vw, 22px)',
                    color: '#1A1814',
                    textDecoration: 'none',
                    width: 'fit-content',
                  }}
                >
                  {item.value}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          backgroundColor: '#FFFFFF',
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
          ANDIKA FAHREZI®
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
