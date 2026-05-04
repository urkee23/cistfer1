import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ONas from '@/components/sections/ONas'
import Storitve from '@/components/sections/Storitve'
import Proces from '@/components/sections/Proces'
import CtaBand from '@/components/sections/CtaBand'
import FAQ from '@/components/sections/FAQ'
import Pokritost from '@/components/sections/Pokritost'
import Kontakt from '@/components/sections/Kontakt'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <ScrollReveal><Stats /></ScrollReveal>
      <ScrollReveal><ONas /></ScrollReveal>
      <ScrollReveal><Storitve /></ScrollReveal>
      <ScrollReveal><Proces /></ScrollReveal>
      <ScrollReveal><CtaBand /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><Pokritost /></ScrollReveal>
      <ScrollReveal><Kontakt /></ScrollReveal>
    </main>
  )
}
