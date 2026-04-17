'use client'

import { useEffect, useRef } from 'react'
import { SparklesText } from '@/components/ui/sparkles-text'
import { CheckCircle, Clock, ShieldCheck, ChevronRight, ArrowDown } from 'lucide-react'

const TRIPTIH = [
  { label: 'Čisto', ikona: CheckCircle },
  { label: 'Hitro', ikona: Clock },
  { label: 'Zanesljivo', ikona: ShieldCheck },
]

// Abstraktna SVG ilustracija — čiščenje fasade, brez emoji, brez fake fotografij
function HeroIlustracija() {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      {/* Ozadje — fasada */}
      <rect width="560" height="420" fill="#0f2235" rx="16" />

      {/* Fasada — mreža */}
      {[0,1,2,3,4,5].map(col =>
        [0,1,2,3,4].map(row => (
          <rect
            key={`${col}-${row}`}
            x={col * 93 + 4}
            y={row * 84 + 4}
            width={86}
            height={76}
            rx={4}
            fill={`rgba(255,255,255,${0.015 + (col + row) % 3 * 0.008})`}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))
      )}

      {/* "Umazana" stran — levo, zamrznjeno pri 45% */}
      <rect x="0" y="0" width="252" height="420" fill="rgba(101,73,20,0.35)" rx="16" />
      {/* Tekstura umazanije — subtilne pike */}
      {[20,55,88,120,160,200,230].map((x, i) =>
        [30,80,130,190,260,320,380].map((y, j) => (
          <circle key={`d-${i}-${j}`} cx={x + (i*j)%17} cy={y} r={1.5 + (i+j)%3} fill="rgba(80,50,10,0.4)" />
        ))
      )}

      {/* Razdelilna črta */}
      <rect x="250" y="0" width="3" height="420" fill="white" opacity="0.9" />

      {/* Knob */}
      <circle cx="251" cy="210" r="22" fill="white" />
      <circle cx="251" cy="210" r="22" fill="none" stroke="rgba(0,119,194,0.3)" strokeWidth="2" />
      {/* Puščice v knobu */}
      <path d="M243 210 L237 205 M243 210 L237 215" stroke="#0077C2" strokeWidth="2" strokeLinecap="round" />
      <path d="M259 210 L265 205 M259 210 L265 215" stroke="#0077C2" strokeWidth="2" strokeLinecap="round" />
      <rect x="244" y="209" width="14" height="2" fill="#0077C2" rx="1" />

      {/* "PRED" oznaka */}
      <rect x="12" y="388" width="52" height="22" rx="4" fill="rgba(0,0,0,0.65)" />
      <text x="38" y="403" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="system-ui">PRED</text>

      {/* "POTEM" oznaka */}
      <rect x="496" y="388" width="56" height="22" rx="4" fill="#0077C2" />
      <text x="524" y="403" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="system-ui">POTEM</text>

      {/* Čista stran — desno: svetlejša fasada */}
      {/* Subtilni blesk na čisti strani */}
      <rect x="253" y="0" width="307" height="420" fill="rgba(0,119,194,0.05)" />

      {/* Visokotlačni čistilec — abstraktna linija vode */}
      <path
        d="M420 40 Q400 120 380 200 Q360 280 390 360"
        stroke="rgba(43,187,173,0.5)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 6"
      />
      <path
        d="M440 60 Q415 140 400 220 Q385 300 410 370"
        stroke="rgba(0,119,194,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      {/* Kapljice vode */}
      {[
        [390, 160], [375, 220], [400, 280], [385, 340],
        [410, 190], [425, 250], [395, 310],
      ].map(([cx, cy], i) => (
        <ellipse key={`drop-${i}`} cx={cx} cy={cy} rx={2} ry={3} fill="rgba(43,187,173,0.6)" />
      ))}

      {/* Zvezde/blesk na čisti strani */}
      {[
        [310, 80], [480, 150], [350, 300], [500, 350], [320, 200],
      ].map(([cx, cy], i) => (
        <g key={`star-${i}`} transform={`translate(${cx},${cy})`} opacity={0.5 + i*0.08}>
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#2BBBAD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#2BBBAD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="#2BBBAD" strokeWidth="1" strokeLinecap="round" />
          <line x1="3.5" y1="-3.5" x2="-3.5" y2="3.5" stroke="#2BBBAD" strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}

      {/* Spodnji tekst hint */}
      <text x="280" y="408" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="system-ui">
        Povlecite za primerjavo
      </text>
    </svg>
  )
}

export default function Hero() {
  const clipRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

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
    <section className="hero-section" style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(var(--space-2xl), 4vw, var(--space-4xl))',
      padding: 'calc(var(--nav-h) + 48px) clamp(var(--space-lg), 5vw, var(--space-4xl)) var(--space-3xl)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Ozadje: subtilni dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'radial-gradient(var(--brand) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* Ozadje: radial glow levo */}
      <div style={{
        position: 'absolute', top: '30%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,119,194,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Leva stran — tekst */}
      <div className="hero-text" style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>

        {/* Chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,119,194,0.12)',
          border: '1px solid rgba(0,119,194,0.25)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 16px',
          marginBottom: 'var(--space-xl)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--brand)',
            boxShadow: '0 0 8px var(--brand)',
            display: 'inline-block',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{
            color: 'var(--brand)', fontSize: '0.8rem',
            fontWeight: 600, fontFamily: 'var(--font-body)',
          }}>
            Profesionalni čistilni servis
          </span>
        </div>

        {/* Naslov */}
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          color: '#fff', lineHeight: 1.08,
          letterSpacing: '-2px',
          marginBottom: 'var(--space-xl)',
        }}>
          Zunanje površine,{' '}
          <br />
          ki{' '}
          <SparklesText
            text="zasijejo"
            sparklesCount={8}
            colors={{ first: '#009AD9', second: '#2BBBAD' }}
          />
          {' '}kot nove
        </h1>

        {/* Triptih — Lucide ikone, brez emoji */}
        <div style={{
          display: 'flex', gap: 'var(--space-sm)',
          flexWrap: 'wrap', marginBottom: 'var(--space-xl)',
        }}>
          {TRIPTIH.map(({ label, ikona: Ikona }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 18px',
              color: '#fff',
              fontSize: '0.875rem', fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}>
              <Ikona size={15} color="var(--brand)" strokeWidth={2.5} />
              {label}
            </div>
          ))}
        </div>

        {/* Opis */}
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: '1.05rem',
          fontFamily: 'var(--font-body)',
          marginBottom: 'var(--space-2xl)',
          maxWidth: 430,
          lineHeight: 1.75,
        }}>
          Fasade, terase, dovozi, sončne elektrarne.
          Prihajamo k vam — po celi Sloveniji.
        </p>

        {/* CTA gumbi */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="#kontakt" style={{
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)',
            padding: '14px 32px',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 32px rgba(0,119,194,0.35)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            Pridobite ponudbo
            <ChevronRight size={18} strokeWidth={2.5} />
          </a>
          <a href="#o-nas" style={{
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            borderRadius: 'var(--radius-full)',
            padding: '14px 24px',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'color 0.2s ease',
          }}>
            <ArrowDown size={16} strokeWidth={2} />
            Več o nas
          </a>
        </div>
      </div>

      {/* Desna stran — before/after ilustracija */}
      <div className="hero-illustration" style={{
        flex: 1, minWidth: 0, maxWidth: 560,
        position: 'relative', zIndex: 1,
      }}>
        {/* Glow za sliko */}
        <div style={{
          position: 'absolute', inset: -2,
          borderRadius: 'calc(var(--radius-xl) + 2px)',
          background: 'linear-gradient(135deg, rgba(0,119,194,0.3), rgba(43,187,173,0.15))',
          filter: 'blur(20px)',
          zIndex: 0,
        }} />

        <div
          ref={boxRef}
          style={{
            position: 'relative', borderRadius: 'var(--radius-xl)',
            overflow: 'hidden', cursor: 'ew-resize',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            userSelect: 'none', aspectRatio: '4/3',
            zIndex: 1,
          }}
        >
          {/* SVG ilustracija — cel box */}
          <HeroIlustracija />

          {/* Clip overlay za interaktivnost */}
          <div
            ref={clipRef}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: '50%', overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            {/* Leva (umazana) stran je že v SVG — overlay je samo za clip tracking */}
          </div>

          {/* Razdelilna črta */}
          <div
            ref={ruleRef}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              width: 2,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Knob */}
          <div
            ref={knobRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 48, height: 48, borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 0 3px rgba(0,119,194,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L2 10L7 16" stroke="#0077C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 4L18 10L13 16" stroke="#0077C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Spodnji hint tekst */}
        <p style={{
          textAlign: 'center', marginTop: 'var(--space-md)',
          color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem',
          fontFamily: 'var(--font-body)', fontWeight: 500,
          letterSpacing: '0.04em',
        }}>
          Povlecite drsnik za primerjavo · Pravi rezultati kmalu
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--brand); }
          50% { opacity: 0.6; box-shadow: 0 0 16px var(--brand); }
        }
      `}</style>
    </section>
  )
}
