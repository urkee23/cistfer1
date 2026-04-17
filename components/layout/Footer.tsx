import { CONTACT } from '@/content/config'

export default function Footer() {
  const leto = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--dark)', color: '#fff', padding: 'var(--space-3xl) clamp(var(--space-lg), 5vw, var(--space-4xl)) var(--space-xl)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }} className="footer-grid">
          <div>
            <a href="#" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.45rem', color: '#fff', textDecoration: 'none', letterSpacing: '-0.5px' }}>
              Čist<span style={{ color: 'var(--brand)' }}>fer</span>
            </a>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: 'var(--space-md)', maxWidth: 240 }}>
              Profesionalni čistilni servis zunanjih površin. Zanesljivo, temeljito in okolju prijazno.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-lg)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Navigacija</h4>
            {['#o-nas:O nas', '#storitve:Storitve', '#proces:Proces', '#faq:FAQ', '#kontakt:Kontakt'].map(item => {
              const [href, label] = item.split(':')
              return (
                <a key={href} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>
                  {label}
                </a>
              )
            })}
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-lg)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Storitve</h4>
            {['Čiščenje fasad', 'Čiščenje teras', 'Čiščenje dovozov', 'Sončne elektrarne', 'Čiščenje streh'].map(s => (
              <a key={s} href="#storitve" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>
                {s}
              </a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-lg)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Kontakt</h4>
            <a href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>{CONTACT.telefon}</a>
            <a href={`mailto:${CONTACT.email}`} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>{CONTACT.email}</a>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>{CONTACT.delovniCas}</span>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            © {leto} Čistfer. Vse pravice pridržane.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            Zasebnost · Piškotki
          </span>
        </div>
      </div>
    </footer>
  )
}
