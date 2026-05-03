'use client'

import { useState } from 'react'
import { FAQ as FAQ_DATA } from '@/content/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 bg-[#131313] px-6 md:px-8 border-b border-[#404751]" id="faq">
      <div className="max-w-[760px] mx-auto">
        <span className="text-xs font-bold uppercase text-[#9ccaff] tracking-widest block mb-4">POGOSTA VPRAŠANJA</span>
        <h2 className="text-[40px] lg:text-[56px] font-black text-[#e0e2e9] uppercase tracking-tighter leading-[1.05] mb-10">
          Odgovori na vaša vprašanja.
        </h2>
        <div className="space-y-2">
          {FAQ_DATA.map(({ vprasanje: q, odgovor: a }, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={q}
                className={`bg-[#1c1b1b] border border-[#404751] ${isOpen ? 'border-l-4 border-l-[#9ccaff]' : ''}`}
              >
                <button
                  className="w-full flex justify-between items-center p-6 cursor-pointer text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold uppercase text-[#e0e2e9] tracking-wider">{q}</span>
                  <span className={`material-symbols-outlined text-[#9ccaff] transition-transform shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="px-6 pb-6 text-[#c0c7d3] text-base">{a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
