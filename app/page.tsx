import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ONas from '@/components/sections/ONas'
import ZaupajoNam from '@/components/sections/ZaupajoNam'
import Storitve from '@/components/sections/Storitve'
import Proces from '@/components/sections/Proces'
import PredPotem from '@/components/sections/PredPotem'
import CtaBand from '@/components/sections/CtaBand'
import FAQ from '@/components/sections/FAQ'
import Pokritost from '@/components/sections/Pokritost'
import Kontakt from '@/components/sections/Kontakt'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ONas />
      <ZaupajoNam />
      <Storitve />
      <Proces />
      <PredPotem />
      <CtaBand />
      <FAQ />
      <Pokritost />
      <Kontakt />
    </main>
  )
}
