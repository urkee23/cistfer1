import Image from 'next/image'
import { STORITVE } from '@/content/storitve'

export default function Storitve() {
  return (
    <section id="storitve" style={{ background: 'var(--dark)', padding: 'var(--section-pad) 0' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 clamp(var(--space-lg), 5vw, var(--space-4xl))' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Storitve
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: '#fff', letterSpacing: '-0.8px',
          }}>
            Naša področja delovanja
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 540, margin: 'var(--space-md) auto 0', fontFamily: 'var(--font-body)' }}>
            Pokrivamo celoten spekter čiščenja zunanjih površin — od zasebnih domov do poslovnih objektov.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-xl)',
        }} className="storitve-grid">
          {STORITVE.map(s => (
            <div key={s.id} className="reveal" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              transition: 'transform var(--ease), border-color var(--ease)',
            }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: 'rgba(255,255,255,0.06)' }}>
                <Image src={s.slika} alt={s.naziv} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 'var(--space-xl)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700,
                  color: '#fff', marginBottom: 'var(--space-sm)',
                }}>
                  {s.naziv}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {s.opis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
