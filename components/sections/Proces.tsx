import { MessageSquare, Search, FileText, Sparkles, CheckCircle, type LucideIcon } from 'lucide-react'
import { KORAKI } from '@/content/proces'

const IKONE: Record<string, LucideIcon> = { MessageSquare, Search, FileText, Sparkles, CheckCircle }

export default function Proces() {
  return (
    <section id="proces" style={{
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
          Kako delamo
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: 'var(--dark)', letterSpacing: '-0.8px',
        }}>
          Enostavno in pregledno sodelovanje
        </h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 'var(--space-lg)', position: 'relative',
      }} className="proces-grid">
        {/* Connecting line */}
        <div style={{
          position: 'absolute', top: 32, left: '10%', right: '10%', height: 2,
          background: 'linear-gradient(90deg, var(--brand) 0%, var(--tertiary) 100%)',
          zIndex: 0,
        }} className="proces-line" />

        {KORAKI.map((korak, i) => {
          const Ikona = IKONE[korak.ikona]
          return (
            <div key={korak.stevilka} className="reveal" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', zIndex: 1,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: i === 0 ? 'var(--brand)' : '#fff',
                border: `2px solid ${i === 0 ? 'var(--brand)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-lg)',
                boxShadow: '0 4px 16px rgba(0,119,194,0.15)',
              }}>
                {Ikona && <Ikona size={26} color={i === 0 ? '#fff' : 'var(--brand)'} />}
              </div>
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand)',
                fontFamily: 'var(--font-body)', textTransform: 'uppercase',
                letterSpacing: '0.1em', marginBottom: 4,
              }}>
                Korak {korak.stevilka}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                color: 'var(--dark)', marginBottom: 'var(--space-sm)',
              }}>
                {korak.naziv}
              </h4>
              <p style={{
                color: 'var(--text-secondary)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem', lineHeight: 1.6,
              }}>
                {korak.opis}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
