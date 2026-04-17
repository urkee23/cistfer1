export interface Korak {
  stevilka: number
  naziv: string
  opis: string
  ikona: string // Lucide icon name
}

export const KORAKI: Korak[] = [
  {
    stevilka: 1,
    naziv: 'Povpraševanje',
    opis: 'Izpolnite kontaktni obrazec ali nas pokličite. V 24 urah prejmete povratni klic.',
    ikona: 'MessageSquare',
  },
  {
    stevilka: 2,
    naziv: 'Brezplačen ogled',
    opis: 'Pridemo na ogled površine in ocenimo obseg dela. Brez obveznosti, brez stroškov.',
    ikona: 'Search',
  },
  {
    stevilka: 3,
    naziv: 'Ponudba',
    opis: 'V roku 24 ur prejmete jasno pisno ponudbo s ceno in predvidenim terminom.',
    ikona: 'FileText',
  },
  {
    stevilka: 4,
    naziv: 'Izvedba',
    opis: 'Na dogovorjeni dan pridemo z vso opremo. Površino pustimo čisto in uredno.',
    ikona: 'Sparkles',
  },
  {
    stevilka: 5,
    naziv: 'Pregled kakovosti',
    opis: 'Po končanem delu skupaj pregledamo rezultat. Vaše zadovoljstvo je naša prioriteta.',
    ikona: 'CheckCircle',
  },
]
