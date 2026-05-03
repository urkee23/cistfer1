export default function CtaBand() {
  return (
    <section className="bg-[#0077c2] py-10 px-6 md:px-8 border-b border-[#404751]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <h2 className="text-[28px] md:text-[36px] font-black text-white uppercase tracking-tighter">
          Pripravljeni na čisto preobrazbo?
        </h2>
        <a
          href="#kontakt"
          className="bg-white text-[#0077c2] font-bold uppercase tracking-widest px-6 py-4 hover:bg-[#f9faff] hover:text-[#0077c2] transition-colors shrink-0 border border-white text-sm"
        >
          Zahtevaj brezplačno ponudbo
        </a>
      </div>
    </section>
  )
}
