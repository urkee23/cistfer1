'use client'

import { useEffect, useRef } from 'react'
import { STATISTIKE } from '@/content/config'

export default function Stats() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const stat = STATISTIKE[i]
      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        let cur = 0
        const step = stat.vrednost / 60
        const timer = setInterval(() => {
          cur += step
          if (cur >= stat.vrednost) {
            el.textContent = stat.vrednost + stat.enota
            clearInterval(timer)
          } else {
            el.textContent = Math.floor(cur) + stat.enota
          }
        }, 16)
        obs.disconnect()
      }, { threshold: 0.5 })
      obs.observe(el)
    })
  }, [])

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      background: '#fff', borderRadius: 'var(--radius-xl)',
      boxShadow: '0 8px 48px rgba(12,27,46,0.08)',
      margin: '0 clamp(var(--space-lg), 5vw, var(--space-4xl))',
      marginTop: -40, position: 'relative', zIndex: 10,
    }} className="stats-grid">
      {STATISTIKE.map((stat, i) => (
        <div key={stat.naziv} style={{
          padding: 'var(--space-2xl) var(--space-xl)',
          textAlign: 'center',
          borderRight: i < STATISTIKE.length - 1 ? '1px solid var(--border-light)' : 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: 'var(--brand)', lineHeight: 1,
          }}>
            <span ref={el => { refs.current[i] = el }}>
              0{stat.enota}
            </span>
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
            color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginTop: 8,
          }}>
            {stat.naziv}
          </div>
        </div>
      ))}
    </div>
  )
}
