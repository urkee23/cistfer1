import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ONas from '@/components/sections/ONas'
import ZaupajoNam from '@/components/sections/ZaupajoNam'
import Storitve from '@/components/sections/Storitve'
import Proces from '@/components/sections/Proces'
import CtaBand from '@/components/sections/CtaBand'
import FAQ from '@/components/sections/FAQ'
import Pokritost from '@/components/sections/Pokritost'
import Kontakt from '@/components/sections/Kontakt'

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <Stats />
      <ONas />
      <ZaupajoNam />
      <Storitve />
      <Proces />
      <CtaBand />
      <FAQ />
      <Pokritost />
      <Kontakt />
    </main>
  )
}
