import { Link, Navigate, useParams } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { getProjectBySlug, projects } from '../data/projects'

const ctaText =
  'Always seeking opportunities to contribute professionally in the field of smart technology and design.'

function SectionLabel({ children }) {
  return (
    <span
      style={{
        fontFamily: 'Geist Mono',
        fontSize: '10px',
        color: 'rgba(235, 109, 0, 0.72)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        display: 'block',
      }}
    >
      {children}
    </span>
  )
}

function ProjectHeroPreview({ project }) {
  const hero = project.layout?.hero

  if (hero?.type === 'video') {
    return (
      <video
        src={hero.src}
        poster={hero.poster || project.img}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          aspectRatio: '0.93 / 1',
          objectFit: hero.objectFit || 'cover',
          objectPosition: hero.objectPosition || 'center',
          display: 'block',
        }}
      />
    )
  }

  return (
    <img
      src={hero?.src || project.img}
      alt={project.title}
      style={{
        width: '100%',
        aspectRatio: '0.93 / 1',
        objectFit: hero?.objectFit || 'cover',
        objectPosition: hero?.objectPosition || 'center',
        display: 'block',
      }}
    />
  )
}

function MediaBlock({
  media,
  aspectRatio = '1.55 / 1',
  background = 'transparent',
  padding = '0',
  objectFit = 'contain',
  objectPosition = 'center',
  imageStyle = {},
  containerStyle = {},
}) {
  const resolvedMedia = media || {}
  const type = resolvedMedia.type || 'image'

  return (
    <div
      style={{
        aspectRatio: resolvedMedia.aspectRatio || aspectRatio,
        overflow: 'hidden',
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        ...containerStyle,
      }}
    >
      {type === 'video' ? (
        <video
          src={resolvedMedia.src}
          autoPlay
          muted
          loop
          playsInline
          poster={resolvedMedia.poster}
          style={{
            width: '100%',
            height: '100%',
            objectFit: resolvedMedia.objectFit || objectFit,
            objectPosition: resolvedMedia.objectPosition || objectPosition,
            display: 'block',
            ...resolvedMedia.imageStyle,
          }}
        />
      ) : (
        <img
          src={resolvedMedia.src}
          alt={resolvedMedia.alt || 'Project media'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: resolvedMedia.objectFit || objectFit,
            objectPosition: resolvedMedia.objectPosition || objectPosition,
            display: 'block',
            ...imageStyle,
            ...resolvedMedia.imageStyle,
          }}
        />
      )}
    </div>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/works" replace />
  }

  const moreWorks = projects.filter((item) => item.slug !== project.slug)
  const titleLines = project.titleLines || [project.title]

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflow: 'hidden' }}>
      <style>{`
        .detail-page {
          background: #ffffff;
        }

        .detail-shell {
          padding-left: 48px;
          padding-right: 48px;
        }

        .detail-title {
          padding-top: 120px;
          padding-bottom: 40px;
        }

        .detail-hero {
          min-height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }

        .detail-hero > * {
          width: 100%;
        }

        .detail-hero img,
        .detail-hero video {
          filter: none;
        }

        .detail-intro {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(220px, 0.48fr);
          gap: 56px;
          align-items: start;
          padding-top: 44px;
          padding-bottom: 110px;
        }

        .detail-gallery-two {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          padding-bottom: 48px;
        }

        .detail-meta-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .detail-wireframe {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          padding-bottom: 70px;
          border-bottom: 0.5px solid #D4CFC8;
        }

        .detail-more {
          padding-top: 70px;
        }

        .detail-more-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          padding-top: 24px;
          padding-bottom: 92px;
        }

        .detail-more-card img {
          width: 100%;
          aspect-ratio: 0.93 / 1;
          object-fit: cover;
          display: block;
        }

        .detail-cta {
          display: grid;
          grid-template-columns: 1fr minmax(260px, 0.42fr);
          padding-bottom: 96px;
        }

        .detail-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 48px 28px;
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .detail-shell {
            padding-left: 32px;
            padding-right: 32px;
          }

          .detail-intro {
            grid-template-columns: 1fr;
            gap: 32px;
            padding-top: 36px;
            padding-bottom: 80px;
          }

          .detail-wireframe,
          .detail-cta {
            grid-template-columns: 1fr;
          }

          .detail-cta {
            gap: 24px;
          }

          .detail-hero {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 720px) {
          .detail-shell {
            padding-left: 20px;
            padding-right: 20px;
          }

          .detail-title {
            padding-top: 100px;
            padding-bottom: 24px;
          }

          .detail-hero {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .detail-intro {
            gap: 24px;
            padding-top: 28px;
            padding-bottom: 56px;
          }

          .detail-gallery-two,
          .detail-wireframe,
          .detail-more-grid {
            grid-template-columns: 1fr;
          }

          .detail-gallery-two {
            gap: 16px;
            padding-bottom: 32px;
          }

          .detail-wireframe {
            gap: 16px;
            padding-bottom: 48px;
          }

          .detail-more {
            padding-top: 48px;
          }

          .detail-more-grid {
            gap: 16px;
            padding-top: 20px;
            padding-bottom: 64px;
          }

          .detail-cta {
            padding-bottom: 64px;
          }

          .detail-footer {
            padding: 18px 20px 22px;
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }

        /* Small Mobile */
        @media (max-width: 380px) {
          .detail-shell {
            padding-left: 16px;
            padding-right: 16px;
          }

          .detail-title {
            padding-top: 88px;
          }
        }
      `}</style>

      <Navbar />

      <div className="detail-page">
        <section className="detail-shell detail-title">
          <Motion.h1
            initial={{ opacity: 0.001, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: 'Onest',
              fontWeight: 600,
              fontSize: 'clamp(44px, 7vw, 78px)',
              lineHeight: 1.05,
              letterSpacing: '-0.055em',
              color: '#09090B',
              margin: 0,
              maxWidth: '1150px',
            }}
          >
            {titleLines.map((line, index) => (
              <span key={line} style={{ display: 'block' }}>
                {line}
                {index < titleLines.length - 1 ? null : null}
              </span>
            ))}
          </Motion.h1>
        </section>

        <section
          className="detail-hero"
          style={{
            paddingLeft: '48px',
            paddingRight: '48px',
            background: 'transparent',
          }}
        >
          <div style={{ width: '100%' }}>
            <MediaBlock
              media={project.layout?.hero}
              aspectRatio="1.72 / 1"
              background="transparent"
              padding="0"
            />
          </div>
        </section>

        <section className="detail-shell detail-intro">
          <Motion.p
            initial={{ opacity: 0.001, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: 'easeOut' }}
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 'clamp(28px, 4vw, 61px)',
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: '-0.045em',
              color: '#09090B',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {project.description}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0.001, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: 'easeOut', delay: 0.08 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            <div className="detail-meta-group">
              <SectionLabel>Date:</SectionLabel>
              <div
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: '19px',
                  lineHeight: 1.45,
                  fontWeight: 500,
                  color: '#09090B',
                }}
              >
                {project.year}
              </div>
            </div>

            <div className="detail-meta-group">
              <SectionLabel>Role:</SectionLabel>
              <div
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: '19px',
                  lineHeight: 1.45,
                  fontWeight: 500,
                  color: '#09090B',
                }}
              >
                {project.detailRoles.map((role) => (
                  <div key={role}>{role}</div>
                ))}
              </div>
            </div>
          </Motion.div>
        </section>

        <section className="detail-shell detail-gallery-two">
          {(project.layout?.galleryTop || []).map((media, index) => (
            <MediaBlock
              key={`${project.slug}-gallery-top-${index}`}
              media={media}
              background="transparent"
              padding="0"
            />
          ))}
        </section>

        <section className="detail-shell" style={{ paddingBottom: '48px' }}>
          <MediaBlock
            media={project.layout?.featureShowcase}
            aspectRatio="1.72 / 1"
            background="transparent"
            padding="0"
          />
        </section>

        <section className="detail-shell detail-wireframe">
          {(project.layout?.wireframeGallery || []).map((media, index) => (
            <MediaBlock
              key={`${project.slug}-wireframe-${index}`}
              media={media}
              aspectRatio="1.55 / 1"
              padding="0"
              background="transparent"
            />
          ))}
        </section>

        <section className="detail-shell detail-more">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SectionLabel>More Works</SectionLabel>
            <Link
              to="/works"
              style={{
                fontFamily: 'Geist Mono',
                fontSize: '10px',
                color: '#09090B',
                textDecoration: 'none',
              }}
            >
              See All
            </Link>
          </div>

          <div className="detail-more-grid">
            {moreWorks.map((item) => (
              <Link
                key={item.slug}
                to={`/${item.slug}`}
                className="detail-more-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ProjectHeroPreview project={item} />
                <div
                  style={{
                    fontFamily: 'Geist Mono',
                    fontSize: '9px',
                    color: '#09090B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginTop: '6px',
                  }}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="detail-shell detail-cta">
          <div />
          <div>
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans',
                fontSize: 'clamp(22px, 2.2vw, 33px)',
                lineHeight: 1.05,
                fontWeight: 600,
                color: '#09090B',
                maxWidth: '340px',
                margin: 0,
              }}
            >
              {ctaText}
            </p>
            <a
              href="mailto:andfrz09@gmail.com"
              style={{
                display: 'inline-block',
                marginTop: '14px',
                fontFamily: 'Plus Jakarta Sans',
                fontSize: '12px',
                color: '#09090B',
                textDecoration: 'none',
              }}
            >
              andfrz09@gmail.com
            </a>
          </div>
        </section>

        <footer className="detail-footer">
          <span
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '9px',
              color: '#1A1814',
              letterSpacing: '0.08em',
            }}
          >
            ANDIKA FAHREZI®
          </span>
          <span
            style={{
              fontFamily: 'Geist Mono',
              fontSize: '10px',
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

export default ProjectDetail
