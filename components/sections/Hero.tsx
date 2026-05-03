'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { SparklesText } from '@/components/ui/sparkles-text'

function BeforeAfterSlider({
  before,
  after,
  beforePosition = '50% 50%',
  afterPosition = '50% 50%',
}: {
  before: string
  after: string
  beforePosition?: string
  afterPosition?: string
}) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition(Math.max(4, Math.min(96, (x / rect.width) * 100)))
  }, [])

  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); updatePosition(e.clientX) }
  const onTouchStart = (e: React.TouchEvent) => { setDragging(true); updatePosition(e.touches[0].clientX) }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (dragging) updatePosition(e.clientX) }
    const onTouchMove = (e: TouchEvent) => { if (dragging) updatePosition(e.touches[0].clientX) }
    const onUp = () => setDragging(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, updatePosition])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 select-none overflow-hidden"
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After — polna slika, spodaj */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt="Fasada po čiščenju"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: afterPosition }}
        draggable={false}
      />

      {/* Before — enako polna slika, klipana z desne (clip-path, brez deformacij) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Fasada pred čiščenjem"
          className="w-full h-full object-cover"
          style={{ objectPosition: beforePosition }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#9ccaff] z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#131313] border-2 border-[#9ccaff] flex items-center justify-center z-30 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <span className="material-symbols-outlined text-[#9ccaff] text-base">swap_horiz</span>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-[#131313] border border-[#404751] px-3 py-1 z-20 pointer-events-none">
        <span className="text-[#8a919c] font-bold uppercase tracking-widest text-xs">PRED</span>
      </div>
      <div className="absolute top-4 right-4 bg-[#0077c2] border border-[#0077c2] px-3 py-1 z-20 pointer-events-none">
        <span className="text-white font-bold uppercase tracking-widest text-xs">POTEM</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row border-b border-[#404751]">
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#404751]">
        <h1 className="font-black uppercase tracking-tighter leading-[0.9] text-white mb-8" style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)' }}>
          <SparklesText
            text="Čiščenje"
            className="text-[#0077c2]"
            colors={{ first: '#ffffff', second: '#ffffff' }}
            sparklesCount={7}
          />{' '}fasade stane{' '}
          <span className="text-[#0077c2]">3–5x</span>{' '}
          manj kot barvanje.
        </h1>
        <div className="hidden sm:flex flex-row flex-wrap gap-3 mb-8">
          {['FASADE', 'STREHE', 'SONČNE ELEKTRARNE', 'TALNE POVRŠINE', 'STEKLENE POVRŠINE'].map(tag => (
            <span key={tag} className="border border-[#404751] text-[#9ccaff] px-3 py-1 text-xs font-bold uppercase tracking-widest">{tag}</span>
          ))}
        </div>
        <p className="text-base text-[#c0c7d3] mb-12 leading-relaxed">
          Kontaktirajte nas. Čistimo fasade, dovozne poti, strešne kritine, sončne elektrarne in vse kar se na vaši hiši umaže — od Primorske do Notranjske.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#kontakt"
            className="bg-[#0077c2] text-white px-8 py-5 font-bold uppercase tracking-widest border border-[#0077c2] hover:bg-transparent hover:text-[#0077c2] transition-colors duration-200 text-center"
          >
            Zahtevaj brezplačno ponudbo
          </a>
          <a
            href="#storitve"
            className="bg-transparent text-white px-8 py-5 font-bold uppercase tracking-widest border border-[#404751] hover:bg-[#404751] transition-colors duration-200 text-center"
          >
            Naše storitve
          </a>
        </div>
      </div>
      <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full bg-[#1c1b1b] overflow-hidden">
        <BeforeAfterSlider
          before="/slike/hero/fasada-pred.jpg"
          after="/slike/hero/fasada-potem.jpg"
          beforePosition="50% 50%"
          afterPosition="50% 50%"
        />
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[#8a919c] text-xs uppercase tracking-widest whitespace-nowrap pointer-events-none z-10">
          Povlecite za primerjavo
        </p>
      </div>
    </section>
  )
}
