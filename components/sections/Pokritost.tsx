import { MapPin } from 'lucide-react'
import { REGIJE } from '@/content/config'

export default function Pokritost() {
  return (
    <section id="pokritost" style={{
      background: 'var(--dark)', padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      textAlign: 'center',
    }}>
      <div className="reveal" style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
          color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
          fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
          Pokritost
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: '#fff', letterSpacing: '-0.8px', marginBottom: 'var(--space-md)',
        }}>
          Delujemo po <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>celi Sloveniji</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', marginBottom: 'var(--space-2xl)' }}>
          Od Kopra do Murske Sobote — prihajamo do vas.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center', marginBottom: 'var(--space-3xl)' }}>
          {REGIJE.map(regija => (
            <div key={regija} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--radius-full)', padding: '8px 18px',
              color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
            }}>
              <MapPin size={14} color="var(--brand)" />
              {regija}
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(0,119,194,0.15)', border: '1px solid rgba(0,119,194,0.25)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)',
          display: 'inline-block', maxWidth: 480,
        }}>
          <p style={{ color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--brand)' }}>Niste prepričani?</strong> Pokličite nas in skupaj najdemo rešitev,
            ne glede na vašo lokacijo v Sloveniji.
          </p>
          <a href="#kontakt" style={{
            display: 'inline-block', marginTop: 'var(--space-lg)',
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)', padding: '12px 28px',
            fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none',
          }}>
            Preverite pokritost →
          </a>
        </div>
      </div>
    </section>
  )
}
