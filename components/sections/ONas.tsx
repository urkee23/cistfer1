import Image from 'next/image'
import { SparklesText } from '@/components/ui/sparkles-text'

export default function ONas() {
  return (
    <>
      {/* VALUE SECTION */}
      <section className="w-full bg-[#1c1b1b] py-24 border-b border-[#404751]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <h2 className="text-[54px] leading-none xl:text-[66px] xl:whitespace-nowrap text-white uppercase font-black mb-16 tracking-tighter border-l-[6px] border-[#0077c2] pl-8">
            Zakaj{' '}
            <SparklesText
              text="čiščenje"
              className="text-[#0077c2]"
              colors={{ first: '#ffffff', second: '#ffffff' }}
              sparklesCount={7}
            />
            {' '}in ne barvanje?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: '01',
                title: 'Nižji stroški',
                body: 'Barvanje fasade stane od 3-krat do 5-krat več. Čiščenje stane veliko manj in doseže enak videz.',
              },
              {
                n: '02',
                title: 'Daljša življenjska doba',
                body: 'Čiščenje podaljša življenjsko dobo fasade. Ne zakrijete problema — odpravite ga.',
              },
              {
                n: '03',
                title: 'Takojšen rezultat',
                body: 'Rezultat viden takoj. Brez odra, brez tedna čakanja, brez vonja po barvi.',
              },
            ].map(({ n, title, body }) => (
              <div
                key={n}
                className="relative bg-[#201f1f] border border-[#404751] p-10 overflow-hidden group hover:border-[#9ccaff] transition-colors duration-300"
              >
                <span className="absolute -top-6 -right-6 text-[140px] font-black text-[#404751] opacity-10 leading-none select-none">{n}</span>
                <div className="relative z-10">
                  <h3 className="text-[#9ccaff] font-bold uppercase tracking-widest mb-6 border-b border-[#404751] pb-4 inline-block">{title}</h3>
                  <p className="text-[#c0c7d3] text-base">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#8a919c] text-sm italic mt-8 text-center">Večina strank nas pokliče ko izvejo ceno barvanja. Pokličite nas prej.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="w-full bg-[#131313] py-24 border-b border-[#404751]" id="o-nas">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="border border-[#404751] bg-[#1c1b1b] relative z-10 w-full h-[500px] lg:h-[700px] overflow-hidden">
                <Image
                  alt="Čistfer ekipa pri delu — visokotlačno čiščenje fasade"
                  src="/slike/o-nas/cistfer-akcija.webp"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 65%' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-[#9ccaff] z-0" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <span className="inline-block border border-[#9ccaff] text-[#9ccaff] px-4 py-2 font-bold uppercase tracking-widest text-sm">O ČISTFERJU</span>
              </div>
              <h2 className="text-[32px] lg:text-[48px] font-black uppercase text-white mb-12 leading-[1.1] tracking-tighter">
                Profesionalna oprema.<br />Naravna čistila.<br />Garancija na rezultat.
              </h2>
              <div className="flex flex-col gap-8">
                {[
                  {
                    title: 'Hiter odziv na povpraševanje',
                    body: 'Odgovorimo v manj kot 24 urah. Pri manjših projektih pogosto pridemo na ogled isti ali naslednji dan — brez dolgega čakanja.',
                  },
                  {
                    title: 'Profesionalna oprema',
                    body: 'Delamo s profesionalno industrijsko opremo, ki zagotavlja rezultate brez poškodb površin.',
                  },
                  {
                    title: 'Biološko naravna čistila',
                    body: 'Naša čistila so 100% biološko razgradljiva in varna za vaše rastline, živali in okolico.',
                  },
                  {
                    title: 'Individualen pristop',
                    body: 'Vsaki stranki se 100% posvetimo. Upoštevamo specifiko lokacije, površine in situacije — ne delamo na pamet.',
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="border-l-2 border-[#9ccaff] pl-6 py-1">
                    <h4 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">{title}</h4>
                    <p className="text-[#c0c7d3] text-base">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
