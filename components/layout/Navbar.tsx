'use client'

import { useState } from 'react'

const LINKS = [
  { label: 'Storitve', href: '#storitve' },
  { label: 'Vprašanja', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-[#404751] bg-[#131313]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 h-20 w-full">
          <a href="#" className="text-2xl font-black tracking-tighter text-white uppercase cursor-pointer hover:opacity-80 transition-all duration-100">
            ČISTFER
          </a>
          <div className="hidden md:flex gap-8 items-center">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-black uppercase tracking-widest text-sm text-white hover:bg-[#9ccaff] hover:text-black transition-all duration-100 px-3 py-2"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#kontakt"
              className="flex items-center gap-2 font-black uppercase tracking-widest text-sm text-white hover:text-[#9ccaff] transition-all duration-100"
            >
              <span className="material-symbols-outlined text-base">call</span>
              031 456 663
            </a>
            <a
              href="mailto:info@cistfer.si"
              className="flex items-center gap-2 font-black uppercase tracking-widest text-sm text-white hover:text-[#9ccaff] transition-all duration-100"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              info@cistfer.si
            </a>
            <a
              href="#kontakt"
              className="bg-[#0077c2] text-white font-black uppercase tracking-widest text-sm px-6 py-3 border border-[#0077c2] hover:bg-transparent hover:text-[#0077c2] transition-all duration-100"
            >
              Brezplačna ponudba
            </a>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meni"
          >
            <span className="material-symbols-outlined text-3xl">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#131313] pt-20 flex flex-col items-center justify-center gap-8">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-black uppercase tracking-widest text-2xl text-white hover:text-[#9ccaff] transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMobileOpen(false)}
            className="bg-[#0077c2] text-white font-black uppercase tracking-widest text-sm px-8 py-4 border border-[#0077c2] mt-4"
          >
            Brezplačna ponudba
          </a>
        </div>
      )}
    </>
  )
}
