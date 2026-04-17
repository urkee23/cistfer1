'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#storitve', label: 'Storitve' },
  { href: '#proces', label: 'Proces' },
  { href: '#faq', label: 'FAQ' },
  { href: '#kontakt', label: 'Kontakt' },
]

const SECTIONS = ['o-nas', 'storitve', 'proces', 'faq', 'kontakt']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll-spy + sticky shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Scroll-spy: katera sekcija je v viewportu
      let current = ''
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Zapri mobile meni ob resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 'var(--nav-h)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-xl)',
          padding: '0 clamp(var(--space-lg), 4vw, var(--space-3xl))',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(226,232,240,0.6)',
          transition: 'var(--ease)',
          boxShadow: scrolled ? '0 1px 24px rgba(12,27,46,0.06)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.45rem',
            color: 'var(--dark)', textDecoration: 'none', letterSpacing: '-0.5px',
          }}
        >
          Čist<span style={{ color: 'var(--brand)' }}>fer</span>
        </a>

        {/* Desktop links — centrirani */}
        <ul style={{
          display: 'flex', gap: 'var(--space-xl)', listStyle: 'none',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          margin: 0, padding: 0,
        }}
          className="nav-desktop-links"
        >
          {LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                    color: isActive ? 'var(--brand)' : 'var(--text-secondary)',
                    textDecoration: 'none', position: 'relative', padding: '4px 0',
                    transition: 'color var(--ease)',
                  }}
                >
                  {link.label}
                  {/* Podčrtaj — aktiven link */}
                  <span style={{
                    position: 'absolute', bottom: -2, left: 0,
                    width: isActive ? '100%' : '0%',
                    height: 2, background: 'var(--brand)',
                    borderRadius: 1, transition: 'width 0.3s ease',
                  }} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA gumb — desktop */}
        <a
          href="#kontakt"
          style={{
            marginLeft: 'auto',
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)',
            padding: '10px 22px',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background var(--ease)',
          }}
          className="nav-cta-btn"
        >
          Brezplačna ponudba
        </a>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Odpri meni"
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            marginLeft: 'auto',
          }}
          className="nav-hamburger"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--dark)', borderRadius: 1,
              transition: 'var(--ease)',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(12,27,46,0.97)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 'var(--space-xl)',
          paddingTop: 'var(--nav-h)',
        }}>
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700,
                color: '#fff', textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 'var(--space-md)',
              background: 'var(--brand)', color: '#fff',
              borderRadius: 'var(--radius-full)', padding: '14px 36px',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            Brezplačna ponudba
          </a>
        </div>
      )}
    </>
  )
}
