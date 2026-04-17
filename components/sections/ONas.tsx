import { ShieldCheck, Leaf, Clock, Users } from 'lucide-react'

const TOCKE = [
  { ikona: ShieldCheck, naziv: 'Zanesljivost in kakovost', opis: 'Vsak projekt izvedemo s profesionalno opremo in preverjenimi postopki.' },
  { ikona: Leaf, naziv: 'Okolju prijazno', opis: 'Uporabljamo biološko razgradljiva čistila, ki varujejo vaše okolje.' },
  { ikona: Clock, naziv: 'Hiter odzivni čas', opis: 'Na vaše povpraševanje odgovorimo v roku 24 ur z brezplačno oceno.' },
  { ikona: Users, naziv: 'Izkušena ekipa', opis: 'Naša ekipa ima več kot 8 let izkušenj pri čiščenju zunanjih površin.' },
]

export default function ONas() {
  return (
    <section id="o-nas" style={{
      padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      maxWidth: 'var(--max-w)', margin: '0 auto',
    }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
          color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
          fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
          O nas
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: 'var(--dark)', letterSpacing: '-0.8px',
        }}>
          Združujemo kakovost, zanesljivost in izkušnje
        </h2>
        <p style={{
          color: 'var(--text-secondary)', maxWidth: 540, margin: 'var(--space-md) auto 0',
          fontFamily: 'var(--font-body)', lineHeight: 1.7,
        }}>
          Smo specializiran čistilni servis za zunanje površine. Uporabljamo profesionalno opremo in okolju prijazna čistila.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-3xl)', alignItems: 'center',
      }} className="about-grid">
        {/* Slika placeholder */}
        <div className="reveal" style={{
          background: 'var(--tertiary)', borderRadius: 'var(--radius-xl)',
          aspectRatio: '4/3', display: 'flex', alignItems: 'center',
          justifyContent: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ textAlign: 'center', color: 'var(--brand)', opacity: 0.5 }}>
            <div style={{ fontSize: '4rem' }}>👥</div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 8 }}>
              Slika ekipe — 1200×900px
            </div>
          </div>
          {/* Badge */}
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            background: '#fff', borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md) var(--space-lg)',
            boxShadow: '0 4px 24px rgba(12,27,46,0.12)',
            display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--brand)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>🛡</div>
            <div>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--dark)' }}>8+ let</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>aktivnega delovanja</div>
            </div>
          </div>
        </div>

        {/* Točke */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {TOCKE.map(tocka => {
            const Ikona = tocka.ikona
            return (
              <div key={tocka.naziv} style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--radius-md)',
                  background: 'var(--tertiary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Ikona size={22} color="var(--brand)" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>
                    {tocka.naziv}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {tocka.opis}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
