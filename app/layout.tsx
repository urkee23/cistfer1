import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothAnchorScroll from '@/components/ui/SmoothAnchorScroll'

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cistfer.si'),
  title: {
    default: 'Čistfer — Čistilni servis zunanjih površin',
    template: '%s | Čistfer',
  },
  description: 'Čistfer — profesionalni čistilni servis zunanjih površin na Primorskem in Notranjskem. Čistimo fasade, strehe, talne površine in sončne elektrarne. Nova Gorica, Koper, Ajdovščina, Sežana, Postojna in okolica.',
  keywords: 'čistfer, cistfer, cistfer.si, čiščenje primorska, čistilni servis primorska, čiščenje fasad primorska, pranje fasad primorska, čiščenje Nova Gorica, čiščenje Koper, čiščenje Ajdovščina, čiščenje Sežana, čiščenje Postojna, čiščenje fasad, čiščenje teras, čiščenje dovozov, čistilni servis, pranje fasad, čiščenje zunanjih površin, čiščenje notranjska, čiščenje Idrija, čiščenje Tolmin, čiščenje zunanjosti',
  authors: [{ name: 'Čistfer', url: 'https://www.cistfer.si' }],
  creator: 'Čistfer',
  publisher: 'Čistfer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.cistfer.si',
  },
  openGraph: {
    title: 'Čistfer — Čistilni servis zunanjih površin',
    description: 'Profesionalni čistilni servis zunanjih površin na Primorskem in Notranjskem — fasade, strehe, sončne elektrarne, talne površine.',
    url: 'https://www.cistfer.si',
    siteName: 'Čistfer',
    locale: 'sl_SI',
    type: 'website',
    images: [
      {
        url: '/slike/hero/fasada-potem.webp',
        width: 1200,
        height: 630,
        alt: 'Čistfer — Čistilni servis zunanjih površin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Čistfer — Čistilni servis zunanjih površin',
    description: 'Profesionalni čistilni servis zunanjih površin na Primorskem in Notranjskem — fasade, strehe, sončne elektrarne, talne površine.',
    images: ['/slike/hero/fasada-potem.webp'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Čistfer',
  alternateName: ['cistfer', 'cistfer.si', 'Čistfer čistilni servis'],
  description: 'Profesionalni čistilni servis zunanjih površin na Primorskem in Notranjskem. Čistimo fasade, strehe, talne površine in sončne elektrarne.',
  url: 'https://www.cistfer.si',
  telephone: '+38631456663',
  email: 'info@cistfer.si',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Primorska', sameAs: 'https://www.wikidata.org/wiki/Q909409' },
    { '@type': 'AdministrativeArea', name: 'Notranjska' },
    { '@type': 'City', name: 'Nova Gorica', sameAs: 'https://www.wikidata.org/wiki/Q14533' },
    { '@type': 'City', name: 'Koper', sameAs: 'https://www.wikidata.org/wiki/Q180117' },
    { '@type': 'City', name: 'Ajdovščina' },
    { '@type': 'City', name: 'Sežana' },
    { '@type': 'City', name: 'Postojna' },
    { '@type': 'City', name: 'Idrija' },
    { '@type': 'City', name: 'Tolmin' },
    { '@type': 'City', name: 'Cerknica' },
    { '@type': 'City', name: 'Ljubljana' },
  ],
  priceRange: '€€',
  serviceType: 'Čiščenje zunanjih površin',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Čistilne storitve',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Čiščenje fasad', areaServed: 'Primorska' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Čiščenje streh', areaServed: 'Primorska' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Čiščenje sončnih elektrarn', areaServed: 'Primorska' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Čiščenje talnih površin', areaServed: 'Primorska' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Čiščenje steklenih površin', areaServed: 'Primorska' } },
    ],
  },
  sameAs: ['https://www.cistfer.si'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kdo opravlja čiščenje fasad na Primorskem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Čistfer je profesionalni čistilni servis za zunanje površine na Primorskem. Pokrivamo Novo Gorico, Koper, Ajdovščino, Sežano in celotno Primorsko regijo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ali Čistfer dela na Primorskem in v Novi Gorici?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da, Čistfer pokriva celotno Primorsko regijo — Nova Gorica, Koper, Ajdovščina, Sežana, Idrija, Tolmin in okolica. Prav tako pokrivamo Notranjsko: Postojna, Cerknica in Ljubljana.',
      },
    },
    {
      '@type': 'Question',
      name: 'Zakaj se čiščenje sploh splača?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fasada ali streha pogosto ni poškodovana — samo umazana. Čiščenje jo vrne v prvotni videz za majhen delček cene barvanja ali zamenjave.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ali delate tudi izven Primorske?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da, pokrivamo celotno Primorsko in Notranjsko regijo — Nova Gorica, Koper, Ajdovščina, Sežana, Postojna, Idrija, Cerknica, Ljubljana in okolica. Za projekte nad 300 € je prihod brezplačen.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={lexend.className}>
        <SmoothAnchorScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
