export default function CtaBand() {
  return (
    <div className="reveal" style={{
      background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)',
      padding: 'var(--space-3xl) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff',
        letterSpacing: '-0.5px', marginBottom: 'var(--space-sm)',
      }}>
        Pridobite brezplačno ponudbo danes
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', marginBottom: 'var(--space-xl)' }}>
        Pišite nam — v 24 urah prejmete povratno informacijo.
      </p>
      <a href="#kontakt" style={{
        background: '#fff', color: 'var(--brand)',
        borderRadius: 'var(--radius-full)', padding: '14px 36px',
        fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none',
        display: 'inline-block',
      }}>
        Kontaktirajte nas →
      </a>
    </div>
  )
}
