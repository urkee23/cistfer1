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
  description: 'Čistfer — profesionalno čiščenje fasad, teras, dovozov in vseh zunanjih površin po celi Sloveniji. Zanesljivo, temeljito in okolju prijazno.',
  keywords: 'čistfer, cistfer, cistfer.si, čiščenje fasad, čiščenje teras, čiščenje dovozov, čistilni servis, pranje fasad, čiščenje zunanjih površin, Slovenija',
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
    description: 'Čistfer — profesionalno čiščenje zunanjih površin po celi Sloveniji.',
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
    description: 'Čistfer — profesionalno čiščenje zunanjih površin po celi Sloveniji.',
    images: ['/slike/hero/fasada-potem.webp'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Čistfer',
  alternateName: ['cistfer', 'cistfer.si'],
  description: 'Profesionalni čistilni servis zunanjih površin po celi Sloveniji.',
  url: 'https://www.cistfer.si',
  telephone: '+38631456663',
  email: 'info@cistfer.si',
  areaServed: {
    '@type': 'Country',
    name: 'Slovenija',
    sameAs: 'https://www.wikidata.org/wiki/Q215',
  },
  priceRange: '€€',
  serviceType: 'Čiščenje zunanjih površin',
  sameAs: ['https://www.cistfer.si'],
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
