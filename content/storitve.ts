export interface Storitev {
  id: string
  naziv: string
  opis: string
  slika: string
}

export const STORITVE: Storitev[] = [
  {
    id: 'fasade',
    naziv: 'Čiščenje fasad',
    opis: 'Nežno in učinkovito čiščenje fasad brez poškodb materiala. Primerno za vse vrste fasad — mineralne, silikonske, kontaktne.',
    slika: '/slike/Fasade/fasada.png',
  },
  {
    id: 'dovozi',
    naziv: 'Čiščenje dovozov',
    opis: 'Profesionalno čiščenje dovozov z visokotlačnim čistilcem. Odstranimo mah, alge in umazanijo z betonskih in tlakovanih površin.',
    slika: '/slike/Dovozi/dvorisce.png',
  },
  {
    id: 'soncne-elektrarne',
    naziv: 'Čiščenje sončnih elektrarn',
    opis: 'Specializirano čiščenje sončnih panelov z deionizirano vodo brez kemikalij. Umazani paneli izgubijo do 30% učinkovitosti.',
    slika: '/slike/soncne elektrarne/soncni-paneli.png',
  },
  {
    id: 'poslovni-prostori',
    naziv: 'Čiščenje poslovnih prostorov',
    opis: 'Čiščenje pisarn, skladišč in poslovnih objektov. Prilagodljiv urnik — med vikendom ali izven delovnega časa.',
    slika: '/slike/Poslovni prostori/notranjost.png',
  },
  {
    id: 'strehe',
    naziv: 'Čiščenje streh',
    opis: 'Varno čiščenje streh z nizkim tlakom. Odstranjevanje mahov, lišajev in nanosov brez poškodb kritine.',
    slika: '/slike/strehe/streha.png',
  },
  {
    id: 'stekla',
    naziv: 'Čiščenje steklenih površin',
    opis: 'Čiščenje oken, zimskih vrtov in steklenih fasad. Brez prog, brez sledi — profesionalni rezultat.',
    slika: '/slike/stekla/terasa.png',
  },
]
