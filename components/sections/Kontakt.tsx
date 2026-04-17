'use client'

import { useState } from 'react'
import { CONTACT } from '@/content/config'

export default function Kontakt() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setStatus('success')
      setMsg('Hvala! Vaše povpraševanje smo prejeli. Odgovorili bomo v 24 urah.');
      (e.target as HTMLFormElement).reset()
    } else {
      setStatus('error')
      setMsg('Prišlo je do napake. Prosimo pokličite nas neposredno.')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-primary)',
    background: '#fff', outline: 'none', transition: 'border-color var(--ease)',
  }

  return (
    <section id="kontakt" style={{
      padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      background: 'var(--neutral)',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Kontakt
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--dark)', letterSpacing: '-0.8px',
          }}>
            Stopite v stik z nami
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-sm)' }}>
            Pišite nam — v 24 urah prejmete brezplačno ponudbo.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 'var(--space-3xl)', alignItems: 'start',
        }} className="kontakt-grid">
          {/* Leva: info + mapa */}
          <div className="reveal">
            <div style={{
              background: '#fff', borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)', marginBottom: 'var(--space-xl)',
              boxShadow: '0 4px 24px rgba(12,27,46,0.06)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--dark)', marginBottom: 'var(--space-xl)' }}>
                Kontaktni podatki
              </h3>
              {[
                { label: 'Telefon', value: CONTACT.telefon, href: `tel:${CONTACT.telefon.replace(/\s/g, '')}` },
                { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { label: 'Lokacija', value: CONTACT.lokacija, href: undefined },
                { label: 'Delovni čas', value: CONTACT.delovniCas, href: undefined },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 'var(--space-lg)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, fontFamily: 'var(--font-body)' }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--brand)', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none' }}>
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 4px 24px rgba(12,27,46,0.06)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175368.5!2d14.5058!3d46.0569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47652d5b8e0c8a39%3A0x45a25e9bde5de0!2sLjubljana%2C%20Slovenia!5e0!3m2!1sen!2sSI!4v1"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija Čistfer"
              />
            </div>
          </div>

          {/* Desna: obrazec */}
          <div className="reveal">
            <form onSubmit={handleSubmit} style={{
              background: '#fff', borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              boxShadow: '0 4px 24px rgba(12,27,46,0.06)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Ime in priimek *
                  </label>
                  <input name="ime" type="text" required placeholder="npr. Janez Novak" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Email naslov *
                  </label>
                  <input name="email" type="email" required placeholder="janez@gmail.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Telefon
                  </label>
                  <input name="telefon" type="tel" placeholder="031 456 663" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Sporočilo *
                  </label>
                  <textarea name="sporocilo" required rows={5} placeholder="Opišite površino, lokacijo in obseg čiščenja..." style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {msg && (
                  <div style={{
                    padding: 'var(--space-md)', borderRadius: 'var(--radius-md)',
                    background: status === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: status === 'success' ? '#15803d' : '#b91c1c',
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  }}>
                    {msg}
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} style={{
                  background: 'var(--brand)', color: '#fff',
                  border: 'none', borderRadius: 'var(--radius-full)',
                  padding: '14px 32px', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'background var(--ease)',
                }}>
                  {status === 'loading' ? 'Pošiljanje…' : 'Pošlji povpraševanje →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
