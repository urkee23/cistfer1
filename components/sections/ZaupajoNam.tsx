import Image from 'next/image'

const LOGOTIPI = [
  { name: 'Arctur', src: '/slike/logotipi/arctur.png' },
  { name: 'Gitri', src: '/slike/logotipi/gitri.png' },
  { name: 'Glasbena šola', src: '/slike/logotipi/glasbena.png' },
  { name: 'Komunala', src: '/slike/logotipi/komunala.png' },
  { name: 'Magmax', src: '/slike/logotipi/magmax.png' },
  { name: 'Mango', src: '/slike/logotipi/mango.png' },
  { name: 'Nova Gorica', src: '/slike/logotipi/nova-gorica.png' },
  { name: 'Pinss', src: '/slike/logotipi/pinss.png' },
  { name: 'Zavod', src: '/slike/logotipi/zavod.png' },
  { name: 'Zogica', src: '/slike/logotipi/zogica.png' },
]

export default function ZaupajoNam() {
  return (
    <section className="py-12 bg-white border-t border-b border-slate-200">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
        Zaupajo nam
      </p>

      {/* White card container */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm py-8 overflow-hidden">
          {/* Fade left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
          />
          {/* Fade right */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
          />

          <div
            className="flex items-center gap-16"
            style={{
              animation: 'marquee 30s linear infinite',
              width: 'max-content',
            }}
          >
            {[...LOGOTIPI, ...LOGOTIPI].map((logo, i) => (
              <div
                key={logo.name + i}
                className="relative w-[120px] h-[56px] shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
