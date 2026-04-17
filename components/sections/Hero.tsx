'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const clipRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  // Before/After slider logika
  useEffect(() => {
    const box = boxRef.current
    const clip = clipRef.current
    const rule = ruleRef.current
    const knob = knobRef.current
    if (!box || !clip || !rule || !knob) return

    let on = false

    function set(x: number) {
      const r = box!.getBoundingClientRect()
      const p = Math.max(0.04, Math.min(0.96, (x - r.left) / r.width))
      const v = p * 100 + '%'
      clip!.style.width = v
      rule!.style.left = v
      knob!.style.left = v
    }

    const onMouseDown = (e: MouseEvent) => { on = true; set(e.clientX); e.preventDefault() }
    const onMouseMove = (e: MouseEvent) => { if (on) set(e.clientX) }
    const onMouseUp = () => { on = false }
    const onTouchStart = (e: TouchEvent) => { on = true; set(e.touches[0].clientX) }
    const onTouchMove = (e: TouchEvent) => { if (on) set(e.touches[0].clientX) }
    const onTouchEnd = () => { on = false }

    box.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    box.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      box.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      box.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex', alignItems: 'center',
      gap: 'var(--space-3xl)',
      padding: 'calc(var(--nav-h) + 48px) clamp(var(--space-lg), 5vw, var(--space-4xl)) var(--space-3xl)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ozadje dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(var(--brand) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Leva stran — tekst */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,119,194,0.15)', border: '1px solid rgba(0,119,194,0.3)',
          borderRadius: 'var(--radius-full)', padding: '6px 16px',
          marginBottom: 'var(--space-xl)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--brand)', display: 'inline-block',
            boxShadow: '0 0 8px var(--brand)',
          }} />
          <span style={{ color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            Profesionalni čistilni servis
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          color: '#fff', lineHeight: 1.1,
          letterSpacing: '-1.5px', marginBottom: 'var(--space-xl)',
        }}>
          Zunanje površine, ki{' '}
          <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>zasijejo</em>{' '}
          kot nove
        </h1>

        {/* Triptih */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
          {[
            { label: 'Čisto', icon: '✓' },
            { label: 'Hitro', icon: '⏱' },
            { label: 'Zanesljivo', icon: '🛡' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--radius-full)', padding: '8px 18px',
              color: '#fff', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-body)',
            }}>
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>

        <p style={{
          color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem',
          fontFamily: 'var(--font-body)', marginBottom: 'var(--space-2xl)',
          maxWidth: 440, lineHeight: 1.7,
        }}>
          Profesionalno čiščenje fasad, teras, dovozov in vseh zunanjih površin.
          Zanesljivo, temeljito in brez kompromisov.
        </p>

        {/* CTA gumbi */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <a href="#kontakt" style={{
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)', padding: '14px 32px',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Pridobite ponudbo →
          </a>
          <a href="#o-nas" style={{
            background: 'rgba(255,255,255,0.08)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--radius-full)', padding: '14px 32px',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem',
            textDecoration: 'none',
          }}>
            Več o nas
          </a>
        </div>
      </div>

      {/* Desna stran — Before/After slider */}
      <div style={{ flex: 1, minWidth: 0, maxWidth: 580, position: 'relative', zIndex: 1 }}>
        <div
          ref={boxRef}
          style={{
            position: 'relative', borderRadius: 'var(--radius-xl)',
            overflow: 'hidden', cursor: 'ew-resize',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            userSelect: 'none', aspectRatio: '4/3',
            background: '#1a2a3a',
          }}
        >
          {/* "POTEM" layer — ozadje */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #e8f4fd 0%, #c5e3f7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center', color: 'var(--brand)', opacity: 0.4 }}>
              <div style={{ fontSize: '3rem' }}>🏠</div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 8 }}>
                POTEM — dodaj pravo sliko
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>1200×900px</div>
            </div>
          </div>

          {/* "PRED" layer — clip */}
          <div
            ref={clipRef}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: '50%', overflow: 'hidden',
            }}
          >
            <div style={{
              width: '200%', height: '100%',
              background: 'linear-gradient(135deg, #8B6914 0%, #6B4F0F 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ fontSize: '3rem' }}>🏚</div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 8 }}>
                  PRED — dodaj pravo sliko
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>1200×900px</div>
              </div>
            </div>
          </div>

          {/* Razdelilna črta */}
          <div
            ref={ruleRef}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              width: 2, background: '#fff', transform: 'translateX(-50%)',
            }}
          />

          {/* Knob */}
          <div
            ref={knobRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
            }}
          >
            ↔
          </div>

          {/* Oznake */}
          <span style={{
            position: 'absolute', bottom: 12, left: 12,
            background: 'rgba(0,0,0,0.6)', color: '#fff',
            borderRadius: 'var(--radius-sm)', padding: '4px 10px',
            fontSize: '0.75rem', fontWeight: 700,
          }}>PRED</span>
          <span style={{
            position: 'absolute', bottom: 12, right: 12,
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-sm)', padding: '4px 10px',
            fontSize: '0.75rem', fontWeight: 700,
          }}>POTEM</span>
        </div>
      </div>
    </section>
  )
}
