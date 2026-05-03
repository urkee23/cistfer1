export interface Korak {
  stevilka: number
  naziv: string
  opis: string
  slika?: string
}

export const KORAKI: Korak[] = [
  {
    stevilka: 1,
    naziv: 'Kontakt',
    opis: 'Pišite ali pokličite. Odgovorimo v 24 urah.',
  },
  {
    stevilka: 2,
    naziv: 'Ogled in brezplačen test',
    opis: 'Pridemo na lokacijo, opravimo brezplačen test in pripravimo fiksno ponudbo brez skritih stroškov.',
    slika: '/slike/kako-delamo/brezplacen-test.jpeg',
  },
  {
    stevilka: 3,
    naziv: 'Čiščenje in pregled',
    opis: 'Očistimo vam učinkovito, vso umazanijo ter podaljšamo življenjsko dobo vašim površinam in jim povrnemo svež videz.',
    slika: '/slike/kako-delamo/pregled.jpg',
  },
]
