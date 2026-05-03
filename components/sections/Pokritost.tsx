export default function Pokritost() {
  return (
    <section className="py-16 bg-[#1c1b1b] px-6 md:px-8 border-b border-[#404751]" id="pokritost">
      <div className="max-w-7xl mx-auto">
        <span className="text-xs font-bold uppercase text-[#9ccaff] tracking-widest block mb-4">POKRITOST</span>
        <h2 className="text-[40px] lg:text-[56px] font-black text-[#e0e2e9] uppercase tracking-tighter leading-[1.05] mb-4">
          Od Primorske do Notranjske.
        </h2>
        <p className="text-lg text-[#c0c7d3] mb-6 max-w-2xl">Pokrivamo celotno Primorsko in Notranjsko.</p>
        <p className="text-sm font-bold text-[#c0c7d3] uppercase tracking-widest mb-16">
          Nova Gorica · Koper · Ajdovščina · Sežana · Postojna · Idrija · Tolmin · Ljubljana · in okolica
        </p>
        <div className="bg-[#0077c2] inline-flex flex-col md:flex-row items-start md:items-center gap-10 p-6 border-l-4 border-white">
          <p className="text-[22px] font-black text-white uppercase tracking-tighter">
            Brezplačen prihod za projekte nad 300€
          </p>
          <a
            href="#kontakt"
            className="bg-[#131313] text-[#e0e2e9] font-bold uppercase tracking-widest px-6 py-4 border border-[#404751] hover:bg-[#1c1b1b] transition-colors whitespace-nowrap text-sm"
          >
            Zahtevaj ponudbo
          </a>
        </div>
      </div>
    </section>
  )
}
