'use client'

import { useState, useRef, SyntheticEvent } from 'react'
import Link from 'next/link'

const SERVICES = [
  { name: 'Fasade', img: '/slike/storitve/fasade/fasada.jpg', icon: 'water_damage', featured: true },
  { name: 'Talne površine', img: '/slike/storitve/talne-povrsine/tla.jpeg', icon: 'floor', featured: false },
  { name: 'Strešne kritine', img: '/slike/storitve/stresne-kritine/streha.png', icon: 'roofing', featured: false },
  { name: 'Sončne elektrarne', img: '/slike/storitve/soncne-elektrarne/soncni-paneli.png', icon: 'solar_power', featured: false },
  { name: 'Steklene površine', img: '/slike/storitve/steklene-povrsine/notranjost.png', icon: 'window', featured: false },
]

export default function Kontakt() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [gdprAccepted, setGdprAccepted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function toggleService(name: string) {
    setSelectedServices(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    )
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const body = {
      ime: fd.get('ime') as string,
      email: fd.get('email') as string,
      telefon: fd.get('telefon') as string,
      storitev: selectedServices,
      sporocilo: fd.get('sporocilo') as string,
      gdprAccepted: true as const,
      website: fd.get('website') as string,
    }
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      formRef.current?.reset()
      setSelectedServices([])
      setGdprAccepted(false)
    } catch {
      setStatus('error')
    }
  }

  const featured = SERVICES.find(s => s.featured)!
  const rest = SERVICES.filter(s => !s.featured)

  return (
    <section className="bg-[#131313] border-t border-[#404751]" id="kontakt">
      <div className="w-full flex flex-col md:flex-row md:min-h-screen">
        {/* Left — contact info */}
        <div className="flex-1 overflow-y-auto bg-[#0e0e0e] p-8 md:p-12">
          <div className="max-w-2xl mx-auto flex flex-col">
            <header className="mb-8">
              <span className="text-xs font-bold uppercase text-[#9ccaff] tracking-widest block mb-4">KONTAKTIRAJTE NAS</span>
              <h2 className="text-[48px] md:text-[64px] font-black text-white leading-none tracking-tighter">
                <div>KONTAKTNI</div>
                <div>PODATKI</div>
              </h2>
            </header>
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#404751] pt-6">
                <div>
                  <span className="text-xs font-bold uppercase text-[#8a919c] block mb-2">E-POŠTA</span>
                  <a href="mailto:info@cistfer.si" className="text-lg text-white hover:text-[#9ccaff] transition-colors">info@cistfer.si</a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-[#8a919c] block mb-2">TELEFON</span>
                  <a href="tel:031456663" className="text-lg text-white hover:text-[#9ccaff] transition-colors">+386 31 456 663</a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-[#8a919c] block mb-2">DELOVNI ČAS</span>
                  <p className="text-lg text-white">Pon–Pet 7:00–18:00</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-[#8a919c] block mb-2">ODZIVNI ČAS</span>
                  <p className="text-lg text-white">Odgovorimo v manj kot 24 urah</p>
                </div>
              </div>
              <div className="border-l-4 border-[#0077c2] pl-6 py-4 bg-[#1c1b1b] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-[#9ccaff]">visibility</span>
                </div>
                <p className="text-lg text-white relative z-10 italic">&ldquo;Brezplačen ogled na lokaciji za vsako povpraševanje.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — sticky form */}
        <div className="w-full md:w-1/2 shrink-0 bg-[#1c1b1b] border-t md:border-t-0 md:border-l border-white flex flex-col md:h-screen md:sticky md:top-0 z-10">
          <div className="p-8 md:p-12 overflow-y-auto h-full">
            <div className="mb-10">
              <h3 className="text-[28px] font-black text-white tracking-tighter">Pošljite povpraševanje</h3>
              <p className="text-base text-[#8a919c] mt-2">Izpolnite obrazec in odgovorili vam bomo v najkrajšem možnem času.</p>
            </div>
            <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white block tracking-wider">IME IN PRIIMEK</label>
                <input
                  name="ime"
                  required
                  type="text"
                  placeholder="Jure Novak"
                  className="w-full bg-[#201f1f] border border-white text-white focus:ring-0 focus:border-[#0077c2] transition-colors py-3 px-3 text-base outline-none placeholder-white/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white block tracking-wider">EMAIL</label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="jure@primer.si"
                  className="w-full bg-[#201f1f] border border-white text-white focus:ring-0 focus:border-[#0077c2] transition-colors py-3 px-3 text-base outline-none placeholder-white/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white block tracking-wider">TELEFON</label>
                <input
                  name="telefon"
                  type="tel"
                  placeholder="040 000 000"
                  className="w-full bg-[#201f1f] border border-white text-white focus:ring-0 focus:border-[#0077c2] transition-colors py-3 px-3 text-base outline-none placeholder-white/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white block tracking-wider">STORITEV</label>
                <div
                  className="w-full bg-[#201f1f] border border-white text-white/50 py-3 px-3 text-base flex justify-between items-center hover:border-[#0077c2] transition-colors cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  <span className={selectedServices.length > 0 ? 'text-white' : ''}>
                    {selectedServices.length > 0 ? selectedServices.join(', ') : 'Izberite storitev...'}
                  </span>
                  <span className="material-symbols-outlined text-[#8a919c]">expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white block tracking-wider">SPOROČILO</label>
                <textarea
                  name="sporocilo"
                  required
                  placeholder="Vaše sporočilo..."
                  rows={4}
                  className="w-full bg-[#201f1f] border border-white text-white focus:ring-0 focus:border-[#0077c2] transition-colors py-3 px-3 text-base outline-none resize-none placeholder-white/40"
                />
              </div>
              {/* Honeypot — skrito pred ljudmi, boti ga izpolnijo */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* GDPR privolitev */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={gdprAccepted}
                  onClick={() => setGdprAccepted(v => !v)}
                  className={`mt-0.5 shrink-0 w-5 h-5 border flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ccaff] ${gdprAccepted ? 'bg-[#0077c2] border-[#0077c2]' : 'bg-transparent border-white hover:border-[#0077c2]'
                    }`}
                >
                  {gdprAccepted && (
                    <span className="material-symbols-outlined text-white text-sm leading-none">check</span>
                  )}
                </button>
                <p className="text-xs text-[#8a919c] leading-relaxed">
                  Strinjam se z obdelavo posredovanih osebnih podatkov za namene odgovora na povpraševanje v skladu s{' '}
                  <Link
                    href="/politika-zasebnosti"
                    target="_blank"
                    className="text-[#9ccaff] hover:text-white underline underline-offset-2 transition-colors"
                  >
                    politiko zasebnosti
                  </Link>
                  . <span className="text-white">*</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || !gdprAccepted}
                className="w-full bg-[#0077c2] hover:bg-[#0062a1] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest py-4 px-6 transition-colors flex justify-between items-center group text-sm"
              >
                {status === 'sending' ? 'POŠILJANJE...' : 'POŠLJI POVPRAŠEVANJE'}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              {status === 'ok' && (
                <p className="text-center text-[#9ccaff] text-xs uppercase tracking-widest">Sporočilo poslano! Odgovorili vam bomo kmalu.</p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-400 text-xs uppercase tracking-widest">Napaka. Pokličite nas na +386 31 456 663.</p>
              )}
              {status === 'idle' && (
                <p className="text-center text-[#8a919c] text-xs uppercase tracking-widest">Odgovorimo v manj kot 24 urah.</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[#131313]/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          <div className="bg-[#1c1b1b] border border-[#404751] w-full max-w-3xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-[#404751] pb-4">
              <h3 className="text-[22px] font-black text-white tracking-tighter">Izberi čiščenje, ki ga potrebuješ:</h3>
              <button
                className="text-[#8a919c] hover:text-[#9ccaff] transition-colors"
                onClick={() => setModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Fasade — velika kartica */}
              <div
                className={`col-span-2 row-span-2 relative overflow-hidden min-h-[300px] border cursor-pointer group transition-colors ${selectedServices.includes(featured.name) ? 'border-[#9ccaff]' : 'border-[#404751] hover:border-[#9ccaff]'
                  }`}
                onClick={() => toggleService(featured.name)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={featured.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
                  src={featured.img}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                  <span className="material-symbols-outlined text-[36px] text-[#9ccaff] mb-2 block">{featured.icon}</span>
                  <span className="text-xl font-black text-white uppercase tracking-tighter">{featured.name}</span>
                </div>
                {selectedServices.includes(featured.name) && (
                  <div className="absolute top-2 right-2 bg-[#9ccaff] text-[#131313] p-1 z-20">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                )}
              </div>

              {/* Manjše kartice */}
              {rest.map(({ name, img, icon }) => (
                <div
                  key={name}
                  className={`relative overflow-hidden min-h-[145px] border cursor-pointer group transition-colors ${selectedServices.includes(name) ? 'border-[#9ccaff]' : 'border-[#404751] hover:border-[#9ccaff]'
                    }`}
                  onClick={() => toggleService(name)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
                    src={img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 z-10">
                    <span className="material-symbols-outlined text-[24px] text-[#9ccaff] mb-1 block">{icon}</span>
                    <span className="text-sm font-black text-white uppercase tracking-tighter">{name}</span>
                  </div>
                  {selectedServices.includes(name) && (
                    <div className="absolute top-2 right-2 bg-[#9ccaff] text-[#131313] p-1 z-20">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-[#0077c2] hover:bg-[#0062a1] text-white font-bold uppercase tracking-widest py-2 px-6 text-sm transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Potrdi ({selectedServices.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
