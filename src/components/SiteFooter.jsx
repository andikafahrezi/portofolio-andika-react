function SiteFooter() {
  return (
    <>
      <style>{`
        .site-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4px;
          padding: 24px 48px;
          background: #FFFFFF;
        }

        .site-footer span {
          font-family: 'Geist Mono', monospace;
          font-size: 12px;
          color: #1A1814;
        }

        .site-footer span:first-child {
          letter-spacing: 0.08em;
        }

        @media (max-width: 809.98px) {
          .site-footer {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 16px;
          }
        }
      `}</style>
      <footer className="site-footer">
        <span>ANDIKA FAHREZI®</span>
        <span>andfrz09@gmail.com</span>
      </footer>
    </>
  )
}

export default SiteFooter
