import Image from 'next/image'
import { KORAKI } from '@/content/proces'

export default function Proces() {
  return (
    <section className="bg-[#131313] py-16 px-6 md:px-8 border-b border-[#404751]" id="kako-delamo">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#9ccaff] uppercase tracking-widest block mb-2">KAKO DELAMO</span>
          <h2 className="text-[40px] lg:text-[56px] font-black text-[#e0e2e9] uppercase tracking-tighter leading-[1.05]">
            Preprosto. Hitro. Brez presenečenj.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#404751] md:items-stretch">
          {KORAKI.map((korak, i) => (
            <div
              key={korak.stevilka}
              className={`relative overflow-hidden flex flex-col min-h-[460px] ${
                i < KORAKI.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#404751]' : ''
              } ${!korak.slika ? (i === 1 ? 'bg-[#1c1b1b]' : '') : ''}`}
            >
              {korak.slika && (
                <Image
                  src={korak.slika}
                  alt={korak.naziv}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              {korak.slika && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              )}
              <div className="absolute top-6 right-6 text-[60px] font-black leading-none select-none opacity-20 text-white z-10">
                {String(korak.stevilka).padStart(2, '0')}
              </div>
              <div className="relative z-10 p-10 mt-auto">
                {i === 1 && (
                  <span className="inline-block text-[10px] font-bold text-[#131313] bg-[#9ccaff] uppercase tracking-widest px-2 py-0.5 mb-3">
                    BREZPLAČNO
                  </span>
                )}
                <h3 className="text-[24px] font-black text-[#e0e2e9] uppercase tracking-tighter mb-2">{korak.naziv}</h3>
                <p className={`text-base ${korak.slika ? 'text-white/80' : 'text-[#c0c7d3]'}`}>{korak.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
