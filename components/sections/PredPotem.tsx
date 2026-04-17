'use client'

import { useEffect, useRef } from 'react'

const PRIMERI = [
  { naziv: 'Čiščenje fasade', lokacija: 'Ljubljana' },
  { naziv: 'Čiščenje dovoza', lokacija: 'Maribor' },
  { naziv: 'Čiščenje strehe', lokacija: 'Celje' },
]

function Slider({ naziv, lokacija }: { naziv: string; lokacija: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const clip = clipRef.current
    const rule = ruleRef.current
    if (!box || !clip || !rule) return
    let on = false

    function set(x: number) {
      const r = box!.getBoundingClientRect()
      const p = Math.max(0.04, Math.min(0.96, (x - r.left) / r.width))
      clip!.style.width = p * 100 + '%'
      rule!.style.left = p * 100 + '%'
    }

    const onMD = (e: MouseEvent) => { on = true; set(e.clientX) }
    const onMM = (e: MouseEvent) => { if (on) set(e.clientX) }
    const onMU = () => { on = false }
    const onTS = (e: TouchEvent) => { on = true; set(e.touches[0].clientX) }
    const onTM = (e: TouchEvent) => { if (on) set(e.touches[0].clientX) }
    const onTE = () => { on = false }

    box.addEventListener('mousedown', onMD)
    window.addEventListener('mousemove', onMM)
    window.addEventListener('mouseup', onMU)
    box.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchmove', onTM, { passive: true })
    window.addEventListener('touchend', onTE)

    return () => {
      box.removeEventListener('mousedown', onMD)
      window.removeEventListener('mousemove', onMM)
      window.removeEventListener('mouseup', onMU)
      box.removeEventListener('touchstart', onTS)
      window.removeEventListener('touchmove', onTM)
      window.removeEventListener('touchend', onTE)
    }
  }, [])

  return (
    <div className="reveal">
      <div
        ref={boxRef}
        style={{
          position: 'relative', borderRadius: 'var(--radius-lg)',
          overflow: 'hidden', cursor: 'ew-resize',
          aspectRatio: '4/3', background: '#e8f4fd', userSelect: 'none',
        }}
      >
        {/* Potem */}
        <div style={{
          position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #e8f4fd, #b3d9f5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--brand)', opacity: 0.5, fontFamily: 'var(--font-body)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>✨</div>
            <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Dodaj sliko POTEM</div>
          </div>
        </div>
        {/* Pred */}
        <div ref={clipRef} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%', overflow: 'hidden' }}>
          <div style={{
            width: '200%', height: '100%',
            background: 'linear-gradient(135deg, #8B6914, #5a4010)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>🏚</div>
              <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Dodaj sliko PRED</div>
            </div>
          </div>
        </div>
        <div ref={ruleRef} style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: '#fff', transform: 'translateX(-50%)' }} />
        <span style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700 }}>PRED</span>
        <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'var(--brand)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700 }}>POTEM</span>
      </div>
      <div style={{ marginTop: 'var(--space-md)', fontFamily: 'var(--font-body)' }}>
        <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{naziv}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lokacija}</div>
      </div>
    </div>
  )
}

export default function PredPotem() {
  return (
    <section id="pred-potem" style={{
      background: 'var(--neutral)', padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Rezultati
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--dark)', letterSpacing: '-0.8px',
          }}>
            Pred in po čiščenju
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-sm)' }}>
            Ilustrativni primeri — povlecite drsnik za primerjavo
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-xl)' }} className="pred-potem-grid">
          {PRIMERI.map(p => <Slider key={p.naziv} {...p} />)}
        </div>
      </div>
    </section>
  )
}
