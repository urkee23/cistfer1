import sharp from 'sharp'
import { readFileSync, statSync } from 'fs'

const images = [
  {
    input: 'public/slike/hero/fasada-pred.jpg',
    output: 'public/slike/hero/fasada-pred.webp',
  },
  {
    input: 'public/slike/hero/fasada-potem.jpg',
    output: 'public/slike/hero/fasada-potem.webp',
  },
]

for (const { input, output } of images) {
  const beforeSize = (statSync(input).size / 1024).toFixed(0)
  await sharp(input).webp({ quality: 82 }).toFile(output)
  const afterSize = (statSync(output).size / 1024).toFixed(0)
  console.log(`${input}: ${beforeSize}KB → ${afterSize}KB`)
}
