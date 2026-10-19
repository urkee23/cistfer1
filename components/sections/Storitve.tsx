import Image from 'next/image'

export default function Storitve() {
  return (
    <section className="bg-[#1c1b1b] py-16 px-6 md:px-8 border-b border-[#404751]" id="storitve">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#9ccaff] uppercase tracking-widest block mb-2">STORITVE</span>
          <h2 className="text-[40px] lg:text-[56px] font-black text-[#e0e2e9] uppercase tracking-tighter leading-[1.05]">
            Profesionalno čiščenje za vsako površino.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Featured — Fasade 2×2 */}
          <a href="#kontakt" className="md:col-span-2 md:row-span-2 bg-[#31353a] border border-[#404751] p-6 flex flex-col justify-end min-h-[560px] relative overflow-hidden group hover:border-[#9ccaff] transition-colors cursor-pointer">
            <Image
              alt="Čiščenje fasad"
              src="/slike/storitve/fasade/fasada.webp"
              fill
              className="object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] text-[#9ccaff] mb-4 block">water_damage</span>
              <h3 className="text-[32px] font-black text-[#e0e2e9] uppercase tracking-tighter mb-2">Fasade</h3>
              <p className="text-[#c0c7d3] text-lg">Alge, mah, smog, madeži — čistimo vse vrste fasadnih sistemov. Naša najpogostejša storitev.</p>
            </div>
          </a>

          {/* Talne površine */}
          <a href="#kontakt" className="bg-[#31353a] border border-[#404751] p-5 flex flex-col justify-end min-h-[280px] relative overflow-hidden group hover:border-[#9ccaff] transition-colors cursor-pointer">
            <Image
              alt="Talne površine"
              src="/slike/storitve/talne-povrsine/tla.webp"
              fill
              className="object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] text-[#9ccaff] mb-2 block">floor</span>
              <h3 className="text-[22px] font-black text-[#e0e2e9] uppercase tracking-tighter mb-1">Talne površine</h3>
              <p className="text-[#c0c7d3] text-sm">Tlakovec, asfalt, beton. Dovozi in dvorišča kot novi.</p>
            </div>
          </a>

          {/* Strešne kritine */}
          <a href="#kontakt" className="bg-[#31353a] border border-[#404751] p-5 flex flex-col justify-end min-h-[280px] relative overflow-hidden group hover:border-[#9ccaff] transition-colors cursor-pointer">
            <Image
              alt="Strešne kritine"
              src="/slike/storitve/stresne-kritine/streha.webp"
              fill
              className="object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] text-[#9ccaff] mb-2 block">roofing</span>
              <h3 className="text-[22px] font-black text-[#e0e2e9] uppercase tracking-tighter mb-1">Strešne kritine</h3>
              <p className="text-[#c0c7d3] text-sm">Globinsko čiščenje opeke in betona. Podaljšamo življenjsko dobo strehe.</p>
            </div>
          </a>

          {/* Sončne elektrarne */}
          <a href="#kontakt" className="bg-[#31353a] border border-[#404751] p-5 flex flex-col justify-end min-h-[280px] relative overflow-hidden group hover:border-[#9ccaff] transition-colors cursor-pointer">
            <Image
              alt="Sončne elektrarne"
              src="/slike/storitve/soncne-elektrarne/soncni-paneli.webp"
              fill
              className="object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] text-[#9ccaff] mb-2 block">solar_power</span>
              <h3 className="text-[22px] font-black text-[#e0e2e9] uppercase tracking-tighter mb-1">Sončne elektrarne</h3>
              <p className="text-[#c0c7d3] text-sm">Umazani paneli = manj energije. Čisti paneli = več denarja v žepu.</p>
            </div>
          </a>

          {/* Steklene površine */}
          <a href="#kontakt" className="bg-[#31353a] border border-[#404751] p-5 flex flex-col justify-end min-h-[280px] relative overflow-hidden group hover:border-[#9ccaff] transition-colors cursor-pointer">
            <Image
              alt="Steklene površine"
              src="/slike/storitve/steklene-povrsine/notranjost.webp"
              fill
              className="object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] text-[#9ccaff] mb-2 block">window</span>
              <h3 className="text-[22px] font-black text-[#e0e2e9] uppercase tracking-tighter mb-1">Steklene površine</h3>
              <p className="text-[#c0c7d3] text-sm">Okna, fasadne steklene plošče, svetlobniki. Brez madežev in vodnih sledi.</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}
