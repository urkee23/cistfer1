import sharp from 'sharp'
import { statSync } from 'fs'

const images = [
  'public/slike/hero/fasada-pred.jpg',
  'public/slike/hero/fasada-potem.jpg',
  'public/slike/o-nas/cistfer-akcija.jpg',
  'public/slike/storitve/steklene-povrsine/notranjost.png',
  'public/slike/storitve/stresne-kritine/streha.png',
  'public/slike/storitve/stresne-kritine/streha2.png',
  'public/slike/storitve/soncne-elektrarne/soncni-paneli.png',
  'public/slike/storitve/fasade/fasada.jpg',
  'public/slike/kako-delamo/pregled.jpg',
]

let totalBefore = 0
let totalAfter = 0

for (const input of images) {
  const output = input.replace(/\.(jpg|png)$/, '.webp')
  const beforeSize = statSync(input).size / 1024
  await sharp(input).webp({ quality: 82 }).toFile(output)
  const afterSize = statSync(output).size / 1024
  totalBefore += beforeSize
  totalAfter += afterSize
  console.log(`${input.split('/').pop()}: ${beforeSize.toFixed(0)}KB → ${afterSize.toFixed(0)}KB`)
}

console.log(`\nSkupaj: ${totalBefore.toFixed(0)}KB → ${totalAfter.toFixed(0)}KB (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`)
