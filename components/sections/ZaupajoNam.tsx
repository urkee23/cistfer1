export default function ZaupajoNam() {
  // Placeholder — zamenjaj s pravimi logotipi
  const LOGOTIPI = ['Magna', 'Arctur', 'Gitri', 'Glasbena šola', 'IC Elektronika', 'Elektro']

  return (
    <section style={{
      padding: 'var(--space-3xl) 0',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      overflow: 'hidden',
    }}>
      <p style={{
        textAlign: 'center', marginBottom: 'var(--space-2xl)',
        fontFamily: 'var(--font-body)', fontWeight: 700,
        fontSize: '0.8rem', color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        Zaupajo nam
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-3xl)', animation: 'marquee 20s linear infinite', width: 'max-content' }}>
        {[...LOGOTIPI, ...LOGOTIPI].map((logo, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: '1.1rem', color: 'var(--text-muted)',
            whiteSpace: 'nowrap', padding: '0 var(--space-xl)',
          }}>
            {logo}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
