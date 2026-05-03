import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cistfer.si'),
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={lexend.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
