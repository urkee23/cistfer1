import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] border-t-2 border-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-16 max-w-7xl mx-auto">
        <div>
          <h4 className="text-xl font-black text-white uppercase mb-4">ČISTFER</h4>
          <p className="text-base text-[#8a919c] leading-relaxed">Zunanjost, ki spet zasije.</p>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase text-[#9ccaff] tracking-widest mb-4">STORITVE</h5>
          <ul className="space-y-2 text-base text-[#8a919c]">
            {['Fasade', 'Talne površine', 'Strešne kritine', 'Sončne elektrarne','Steklene površine'].map(s => (
              <li key={s}><a href="#storitve" className="hover:text-[#9ccaff] transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase text-[#9ccaff] tracking-widest mb-4">POVEZAVE</h5>
          <ul className="space-y-2 text-base text-[#8a919c]">
            <li><a href="#o-nas" className="hover:text-[#9ccaff] transition-colors">O nas</a></li>
            <li><a href="#kako-delamo" className="hover:text-[#9ccaff] transition-colors">Kako delamo</a></li>
            <li><a href="#faq" className="hover:text-[#9ccaff] transition-colors">FAQ</a></li>
            <li><a href="#kontakt" className="hover:text-[#9ccaff] transition-colors">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase text-[#9ccaff] tracking-widest mb-4">KONTAKT</h5>
          <ul className="space-y-2 text-base text-[#8a919c]">
            <li>+386 31 456 663</li>
            <li>info@cistfer.si</li>
            <li>Pon–Pet 7:00–18:00</li>
            <li className="pt-2">Ulica XXX. divizije 5A<br />5000 Nova Gorica</li>
            <li className="pt-2 border-t border-[#404751] text-xs leading-relaxed">
              Tjaš Furlan s.p.<br />
              Mat. št.: 9835342000<br />
              Davčna št.: 70483515<br />
              Vpisano pri AJPES
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#404751] px-8 py-4 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="text-xs font-bold uppercase text-[#8a919c]">© {new Date().getFullYear()} Čistfer · Vse pravice pridržane.</span>
        <span className="text-xs font-bold uppercase text-[#8a919c]">
          <Link href="/politika-zasebnosti" className="hover:text-[#9ccaff] transition-colors">Politika zasebnosti</Link>
          <span className="mx-2">·</span>
          <Link href="/politika-zasebnosti#piskotki" className="hover:text-[#9ccaff] transition-colors">Piškotki</Link>
        </span>
      </div>
    </footer >
  )
}
