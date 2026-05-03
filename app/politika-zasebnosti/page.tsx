import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politika zasebnosti — Čistfer',
  description: 'Politika zasebnosti in varstvo osebnih podatkov podjetja Čistfer v skladu z GDPR in ZVOP-2.',
  robots: { index: false },
}

export default function PolitikaZasebnosti() {
  return (
    <main className="bg-[#0e0e0e] min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-8">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#9ccaff] tracking-widest hover:text-white transition-colors mb-12"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Nazaj na začetno stran
        </Link>

        <h1 className="text-[48px] md:text-[64px] font-black text-white leading-none tracking-tighter mb-4">
          POLITIKA<br />ZASEBNOSTI
        </h1>
        <p className="text-[#8a919c] text-sm mb-12">
          Zadnja posodobitev: april 2026
        </p>

        <div className="space-y-12 text-[#c4c9d0] text-base leading-relaxed">

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              1. Upravljavec osebnih podatkov
            </h2>
            <p>
              Upravljavec osebnih podatkov je <strong className="text-white">Tjaš Furlan s.p.</strong> (tržno ime Čistfer),
              s sedežem na Ulici XXX. divizije 5A, 5000 Nova Gorica, Slovenija.
            </p>
            <ul className="mt-4 space-y-1 text-[#8a919c]">
              <li>Matična številka: <strong className="text-white">9835342000</strong></li>
              <li>Davčna številka: <strong className="text-white">70483515</strong></li>
              <li>Vpis: AJPES, datum vpisa 21. 1. 2025</li>
              <li className="pt-1">E-pošta: <a href="mailto:info@cistfer.si" className="text-[#9ccaff] hover:text-white transition-colors">info@cistfer.si</a></li>
              <li>Telefon: <a href="tel:+38631456663" className="text-[#9ccaff] hover:text-white transition-colors">+386 31 456 663</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              2. Katere osebne podatke zbiramo
            </h2>
            <p className="mb-4">
              Osebne podatke zbiramo izključno takrat, ko nam jih posredujete prostovoljno prek kontaktnega obrazca na naši spletni strani. Zbiramo naslednje podatke:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#8a919c] ml-2">
              <li>Ime in priimek</li>
              <li>E-poštni naslov</li>
              <li>Telefonska številka (neobvezno)</li>
              <li>Opis zahtevanega dela oz. storitve</li>
              <li>Vsebina sporočila</li>
            </ul>
            <p className="mt-4">
              Spletna stran ne uporablja piškotkov za sledenje, analitičnih orodij (npr. Google Analytics) niti oglaševalskih omrežij. Edini tehnični piškotki, ki se lahko nastavijo, so nujni za delovanje spletne strani (seja brskalnika).
            </p>
          </section>

          <section id="piskotki">
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              3. Piškotki
            </h2>
            <p>
              Ta spletna stran <strong className="text-white">ne nastavi nobenih piškotkov</strong>. Ne uporabljamo sledilnih, analitičnih ali oglaševalskih piškotkov. Ker piškotki niso prisotni, soglasje za njihovo uporabo ni potrebno.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              4. Namen in pravna podlaga obdelave
            </h2>
            <p className="mb-4">
              Vaše osebne podatke obdelujemo za naslednje namene:
            </p>
            <div className="space-y-4">
              <div className="border-l-2 border-[#0077c2] pl-4">
                <p className="text-white font-bold text-sm mb-1">Odgovor na povpraševanje</p>
                <p className="text-[#8a919c] text-sm">
                  Pravna podlaga: vaša privolitev (člen 6(1)(a) GDPR). Podatke uporabimo izključno za pripravo in posredovanje odgovora oziroma ponudbe.
                </p>
              </div>
              <div className="border-l-2 border-[#0077c2] pl-4">
                <p className="text-white font-bold text-sm mb-1">Sklenitev in izvedba pogodbe</p>
                <p className="text-[#8a919c] text-sm">
                  Pravna podlaga: izvedba pogodbe (člen 6(1)(b) GDPR), če do naročila pride.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              5. Hramba podatkov
            </h2>
            <p>
              Podatke hranimo toliko časa, kolikor je potrebno za uresničitev namena, za katerega so bili zbrani:
            </p>
            <ul className="mt-4 space-y-2 text-[#8a919c] ml-2 list-disc list-inside">
              <li>Povpraševanja brez naročila: do <strong className="text-white">12 mesecev</strong> od prejetja.</li>
              <li>Podatki, vezani na izvedeno naročilo: do <strong className="text-white">5 let</strong> iz naslova davčnih in računovodskih obveznosti.</li>
            </ul>
            <p className="mt-4">
              Po poteku roka za hrambo podatke trajno izbrišemo.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              6. Posredovanje podatkov tretjim osebam
            </h2>
            <p className="mb-4">
              Vaših osebnih podatkov ne prodajamo, ne oddajamo v najem in jih ne delimo s tretjimi osebami za tržne namene. Podatki se posredujejo izključno:
            </p>
            <ul className="space-y-2 text-[#8a919c] ml-2 list-disc list-inside">
              <li>
                <strong className="text-white">Resend Inc.</strong> — ponudnik e-poštne storitve za dostavo vašega sporočila do nas (obdelovalec, podatki se obdelujejo na strežnikih v EU/EGP).
              </li>
              <li>
                Državnim organom, kadar to zahteva zakon ali sodna odredba.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              7. Vaše pravice
            </h2>
            <p className="mb-4">
              V skladu z Uredbo GDPR (EU) 2016/679 in Zakonom o varstvu osebnih podatkov (ZVOP-2) imate naslednje pravice:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Pravica do dostopa', desc: 'Kadarkoli lahko zahtevate potrditev, ali obdelujemo vaše podatke, in vpogled v njih.' },
                { title: 'Pravica do popravka', desc: 'Zahtevate lahko popravek netočnih ali dopolnitev nepopolnih podatkov.' },
                { title: 'Pravica do izbrisa', desc: 'Pod določenimi pogoji lahko zahtevate izbris vaših osebnih podatkov ("pravica do pozabe").' },
                { title: 'Pravica do omejitve', desc: 'V določenih primerih lahko zahtevate omejitev obdelave vaših podatkov.' },
                { title: 'Pravica do prenosljivosti', desc: 'Podatke, ki ste nam jih posredovali, lahko prejmete v strukturirani, strojno berljivi obliki.' },
                { title: 'Pravica do preklica privolitve', desc: 'Privolitev za obdelavo podatkov lahko kadarkoli prekličete, ne da bi to vplivalo na zakonitost obdelave pred preklicem.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[#1c1b1b] border border-[#404751] p-4">
                  <p className="text-white font-bold text-sm mb-2">{title}</p>
                  <p className="text-[#8a919c] text-sm">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              Zahtevo za uveljavljanje pravic pošljite na{' '}
              <a href="mailto:info@cistfer.si" className="text-[#9ccaff] hover:text-white transition-colors">
                info@cistfer.si
              </a>
              . Odgovorili vam bomo v roku 30 dni.
            </p>
            <p className="mt-4 text-[#8a919c]">
              Pritožbo v zvezi z obdelavo vaših osebnih podatkov lahko vložite pri Informacijskem pooblaščencu RS:{' '}
              <a
                href="https://www.ip-rs.si"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9ccaff] hover:text-white transition-colors"
              >
                www.ip-rs.si
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              8. Varnost podatkov
            </h2>
            <p>
              Spletna stran uporablja protokol HTTPS za šifrirano komunikacijo. Vsi podatki, ki nam jih pošljete prek obrazca, se prenašajo šifrirano. Dostop do prejetih sporočil je omejen izključno na pooblaščene osebe podjetja.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#404751] pb-3">
              9. Spremembe politike zasebnosti
            </h2>
            <p>
              To politiko zasebnosti lahko občasno posodobimo. O morebitnih bistvenih spremembah vas bomo obvestili prek spletne strani. Datum zadnje posodobitve je vedno naveden na vrhu te strani.
            </p>
          </section>

          <section className="border border-[#404751] p-6">
            <p className="text-[#8a919c] text-sm">
              Za vsa vprašanja v zvezi z varstvom osebnih podatkov nas kontaktirajte na{' '}
              <a href="mailto:info@cistfer.si" className="text-[#9ccaff] hover:text-white transition-colors">
                info@cistfer.si
              </a>{' '}
              ali pokličite <a href="tel:+38631456663" className="text-[#9ccaff] hover:text-white transition-colors">+386 31 456 663</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
