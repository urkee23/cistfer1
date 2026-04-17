import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ONas from '@/components/sections/ONas'
import ZaupajoNam from '@/components/sections/ZaupajoNam'
import Storitve from '@/components/sections/Storitve'
import CtaBand from '@/components/sections/CtaBand'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ONas />
      <ZaupajoNam />
      <Storitve />
      <CtaBand />
    </main>
  )
}
