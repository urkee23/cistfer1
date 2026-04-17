import type { Metadata } from 'next'
import { Lexend, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealObserver from '@/components/RevealObserver'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Čistfer — Čistilni servis zunanjih površin',
  description: 'Profesionalno čiščenje fasad, teras, dovozov in vseh zunanjih površin. Zanesljivo, temeljito in okolju prijazno.',
  keywords: 'čiščenje fasad, čiščenje teras, čiščenje dovozov, čistilni servis, Slovenija',
  openGraph: {
    title: 'Čistfer — Čistilni servis zunanjih površin',
    description: 'Profesionalno čiščenje zunanjih površin po celi Sloveniji.',
    locale: 'sl_SI',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Čistfer — Čistilni servis zunanjih površin',
      },
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Čistfer',
  description: 'Profesionalni čistilni servis zunanjih površin po celi Sloveniji.',
  url: 'https://cistfer.si',
  telephone: '+38631456663',
  email: 'info@cistfer.si',
  areaServed: 'SI',
  priceRange: '€€',
  serviceType: 'Čiščenje zunanjih površin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${lexend.variable} ${sourceSans.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
