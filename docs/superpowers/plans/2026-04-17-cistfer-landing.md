# Čistfer Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrirati obstoječ PHP/CSS prototip v produkcijsko Next.js 15 single-page landing stran z novimi sekcijami (Proces, Pred/potem, FAQ, Pokritost), deploy na Vercel.

**Architecture:** Single `app/page.tsx` ki uvaža vse sekcije kot React komponente. Design tokens (barve, fonti, spacing) so CSS variables v `globals.css` — kopirani 1:1 iz obstoječega `slogi.css`. Vsebina (storitve, FAQ, proces) je TypeScript array v `/content` mapi, ne v bazi.

**Tech Stack:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui (Accordion za FAQ), Lucide React (ikone), next/image

---

## File Map

```
cistfer/
├── app/
│   ├── layout.tsx              # Root: fonti, metadata, Navbar, Footer
│   ├── page.tsx                # Vse sekcije po vrsti
│   └── globals.css             # Design tokens + Tailwind base
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky, scroll-spy, hamburger
│   │   └── Footer.tsx          # Footer grid
│   └── sections/
│       ├── Hero.tsx            # Hero + Before/After slider
│       ├── Stats.tsx           # Animirani števci
│       ├── ONas.tsx            # O nas grid
│       ├── ZaupajoNam.tsx      # Marquee logo strip
│       ├── Storitve.tsx        # Kartice storitev
│       ├── Proces.tsx          # 5-koračni stepper (NOVO)
│       ├── PredPotem.tsx       # Before/After galerija (NOVO)
│       ├── FAQ.tsx             # Accordion FAQ (NOVO)
│       ├── Pokritost.tsx       # Pokritost po Sloveniji (NOVO)
│       ├── CtaBand.tsx         # CTA pasica
│       └── Kontakt.tsx         # Obrazec + Google Maps
├── components/
│   └── RevealObserver.tsx      # IntersectionObserver za .reveal animacije
├── content/
│   ├── storitve.ts             # Array storitev
│   ├── faq.ts                  # Array FAQ vprašanj
│   ├── proces.ts               # Array 5 korakov
│   └── config.ts               # Kontakt podatki, regije, statistike
└── public/
    └── slike/                  # Preseljene slike iz cistfer2
```

---

## Task 1: Next.js projekt setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`

- [ ] **1.1 Ustvari Next.js projekt**

```bash
cd C:/Users/uros7/Desktop/cistfer_claude
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```

Ko vpraša:
- `Would you like to use Turbopack?` → **Yes**
- Vse ostalo: **Yes** (defaults)

- [ ] **1.2 Inštaliraj shadcn/ui**

```bash
npx shadcn@latest init
```

Ko vpraša:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Nato dodaj Accordion komponento:
```bash
npx shadcn@latest add accordion
```

- [ ] **1.3 Inštaliraj ostale dependence**

```bash
npm install lucide-react zod
```

- [ ] **1.4 Konfiguriraj `next.config.ts`**

Odpri `next.config.ts` in zamenjaj vsebino z:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Lokalne slike iz /public delujejo brez konfiguracije.
    // Dodaj domene sem ko boš uporabljal externe AI-generirane slike:
    remotePatterns: [
      // { hostname: 'example.com' },
    ],
  },
}

export default nextConfig
```

- [ ] **1.5 Ustvari `.env.local` in `.env.example`**

Ustvari `.env.local` (nikoli v git):
```bash
# Kontakt API (Plan B — izpolni ko imaš API ključe)
RESEND_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
CRON_SECRET=
```

Ustvari `.env.example` (gre v git — brez vrednosti):
```bash
cp .env.local .env.example
```

Dodaj `.env.local` v `.gitignore` (je že tam po defaultu z create-next-app).

- [ ] **1.6 Počisti default Next.js boilerplate**

Izbriši vsebino `app/page.tsx` in zamenjaj z:

```tsx
export default function Home() {
  return <main>Čistfer</main>
}
```

Izbriši `app/globals.css` vsebino (pustimo samo Tailwind directives):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **1.7 Preveri da deluje**

```bash
npm run dev
```

Odpri `http://localhost:3000` — mora pisati "Čistfer". Ni napak v konzoli.

- [ ] **1.8 Inicializiraj git in prvi commit**

```bash
git init
git add .
git commit -m "feat: Next.js 15 projekt setup + env scaffold"
```

---

## Task 2: Design tokens in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **2.1 Kopiraj design tokens iz obstoječega slogi.css**

Zamenjaj vsebino `app/globals.css` z:

```css
@import "tailwindcss";

@layer base {
  :root {
    --brand: #0077C2;
    --brand-dark: #005fa3;
    --brand-deep: #004d8a;
    --secondary: #2BBBAD;
    --secondary-dark: #219e92;
    --tertiary: #E0F7FA;
    --neutral: #F8FAFB;
    --surface: #ffffff;
    --dark: #0c1b2e;
    --dark-mid: #152642;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --border: #e2e8f0;
    --border-light: #f1f5f9;
    --font-heading: 'Lexend', sans-serif;
    --font-body: 'Source Sans 3', sans-serif;
    --space-xs: 4px; --space-sm: 8px; --space-md: 16px;
    --space-lg: 24px; --space-xl: 32px; --space-2xl: 48px;
    --space-3xl: 64px; --space-4xl: 96px; --section-pad: 100px;
    --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px;
    --radius-xl: 20px; --radius-full: 9999px;
    --max-w: 1200px; --nav-h: 72px;
    --ease: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --ease-spring: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--text-primary);
    background: var(--neutral);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* Reveal animacija */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.vis {
    opacity: 1;
    transform: none;
  }

  /* Scroll margin za navbar */
  [id] { scroll-margin-top: calc(var(--nav-h) + 16px); }
}
```

- [ ] **2.2 Posodobi `app/layout.tsx` z Google Fonts**

```tsx
import type { Metadata } from 'next'
import { Lexend, Source_Sans_3 } from 'next/font/google'
import './globals.css'

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
        url: '/og-image.jpg', // Dodaj sliko 1200×630px v public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Čistfer — Čistilni servis zunanjih površin',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sl">
      <body className={`${lexend.variable} ${sourceSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **2.3 Preveri fonti se naložijo**

```bash
npm run dev
```

DevTools → Network → preveri da se naložita `Lexend` in `Source+Sans+3`.

- [ ] **2.4 Commit**

```bash
git add -A
git commit -m "feat: design tokens in globals.css + Google Fonts"
```

---

## Task 3: Content datoteke (TypeScript)

**Files:**
- Create: `content/config.ts`, `content/storitve.ts`, `content/faq.ts`, `content/proces.ts`

- [ ] **3.1 Ustvari `content/config.ts`**

```typescript
export const CONTACT = {
  telefon: '031 456 663',
  email: 'info@cistfer.si',
  lokacija: 'Slovenija',
  delovniCas: 'Pon–Pet: 7:00–18:00',
} as const

export const STATISTIKE = [
  { vrednost: 150, enota: '+', naziv: 'Opravljenih projektov' },
  { vrednost: 8, enota: '+', naziv: 'Let izkušenj' },
  { vrednost: 98, enota: '%', naziv: 'Zadovoljnih strank' },
  { vrednost: 24, enota: 'h', naziv: 'Odzivni čas' },
] as const

export const REGIJE = [
  'Ljubljana', 'Maribor', 'Celje', 'Koper',
  'Novo Mesto', 'Kranj', 'Velenje', 'Nova Gorica',
  'Murska Sobota', 'Ptuj',
] as const
```

- [ ] **3.2 Ustvari `content/storitve.ts`**

```typescript
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
```

- [ ] **3.3 Ustvari `content/proces.ts`**

```typescript
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
```

- [ ] **3.4 Ustvari `content/faq.ts`**

```typescript
export interface FaqVprasanje {
  vprasanje: string
  odgovor: string
}

export const FAQ: FaqVprasanje[] = [
  {
    vprasanje: 'Koliko stane čiščenje fasade?',
    odgovor: 'Cena je odvisna od velikosti in stanja fasade. Okvirno: 3–6 €/m². Za točno ceno opravimo brezplačen ogled in vam pošljemo pisno ponudbo.',
  },
  {
    vprasanje: 'Kako dolgo traja čiščenje?',
    odgovor: 'Manjši objekt (do 200 m²) navadno zaključimo v enem dnevu. Za večje objekte se dogovorimo individualno.',
  },
  {
    vprasanje: 'Kakšna čistila uporabljate?',
    odgovor: 'Uporabljamo biološko razgradljiva čistila, ki so varna za ljudi, živali in okolje. Brez agresivnih kemikalij, ki bi poškodovale material.',
  },
  {
    vprasanje: 'Ali delujete po celi Sloveniji?',
    odgovor: 'Da, delujemo po vsej Sloveniji. Brez doplačila za prihod v regijah Ljubljana, Maribor, Celje, Koper in Nova Gorica. Za oddaljene lokacije se dogovorimo.',
  },
  {
    vprasanje: 'Kdaj je najboljši čas za čiščenje fasade?',
    odgovor: 'Priporočamo spomladi (april–maj) ali jeseni (september–oktober). Temperatura mora biti nad 5°C in brez dežja vsaj 24 ur po čiščenju.',
  },
  {
    vprasanje: 'Ali moram biti prisoten med čiščenjem?',
    odgovor: 'Ni nujno. Dogovorimo se za dostop do objekta in vas obvestimo ko smo končali. Fotografiramo rezultat pred in po čiščenju.',
  },
  {
    vprasanje: 'Kako pogosto priporočate čiščenje?',
    odgovor: 'Za fasade priporočamo čiščenje vsakih 3–5 let, odvisno od lokacije. Objekte blizu cest ali v vlažnem okolju priporočamo pogosteje.',
  },
  {
    vprasanje: 'Ali ponujate garancijo na storitev?',
    odgovor: 'Da. Če s čiščenjem niste zadovoljni, pridemo brezplačno na ponovni ogled in rešimo morebitne pomanjkljivosti.',
  },
]
```

- [ ] **3.5 Commit**

```bash
git add -A
git commit -m "feat: content TypeScript datoteke (storitve, FAQ, proces, config)"
```

---

## Task 4: Navbar komponenta

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **4.1 Ustvari `components/layout/Navbar.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#storitve', label: 'Storitve' },
  { href: '#proces', label: 'Proces' },
  { href: '#faq', label: 'FAQ' },
  { href: '#kontakt', label: 'Kontakt' },
]

const SECTIONS = ['o-nas', 'storitve', 'proces', 'faq', 'kontakt']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll-spy + sticky shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Scroll-spy: katera sekcija je v viewportu
      let current = ''
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Zapri mobile meni ob resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 'var(--nav-h)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-xl)',
          padding: '0 clamp(var(--space-lg), 4vw, var(--space-3xl))',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(226,232,240,0.6)',
          transition: 'var(--ease)',
          boxShadow: scrolled ? '0 1px 24px rgba(12,27,46,0.06)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.45rem',
            color: 'var(--dark)', textDecoration: 'none', letterSpacing: '-0.5px',
          }}
        >
          Čist<span style={{ color: 'var(--brand)' }}>fer</span>
        </a>

        {/* Desktop links — centrirani */}
        <ul style={{
          display: 'flex', gap: 'var(--space-xl)', listStyle: 'none',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}
          className="nav-desktop-links"
        >
          {LINKS.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                    color: isActive ? 'var(--brand)' : 'var(--text-secondary)',
                    textDecoration: 'none', position: 'relative', padding: '4px 0',
                    transition: 'color var(--ease)',
                  }}
                >
                  {link.label}
                  {/* Podčrtaj — aktiven link */}
                  <span style={{
                    position: 'absolute', bottom: -2, left: 0,
                    width: isActive ? '100%' : '0%',
                    height: 2, background: 'var(--brand)',
                    borderRadius: 1, transition: 'width 0.3s ease',
                  }} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA gumb — desktop */}
        <a
          href="#kontakt"
          style={{
            marginLeft: 'auto',
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)',
            padding: '10px 22px',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background var(--ease)',
          }}
          className="nav-cta-btn"
        >
          Brezplačna ponudba
        </a>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Odpri meni"
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            marginLeft: 'auto',
          }}
          className="nav-hamburger"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--dark)', borderRadius: 1,
              transition: 'var(--ease)',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(12,27,46,0.97)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 'var(--space-xl)',
          paddingTop: 'var(--nav-h)',
        }}>
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700,
                color: '#fff', textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 'var(--space-md)',
              background: 'var(--brand)', color: '#fff',
              borderRadius: 'var(--radius-full)', padding: '14px 36px',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            Brezplačna ponudba
          </a>
        </div>
      )}
    </>
  )
}
```

- [ ] **4.2 Dodaj mobile CSS v globals.css**

Na konec `app/globals.css` dodaj:

```css
/* Navbar responsive */
@media (max-width: 768px) {
  .nav-desktop-links { display: none !important; }
  .nav-cta-btn { display: none !important; }
  .nav-hamburger { display: flex !important; }
}
```

- [ ] **4.3 Dodaj Navbar v layout.tsx**

```tsx
import Navbar from '@/components/layout/Navbar'

// V body tagu, pred {children}:
<Navbar />
{children}
```

- [ ] **4.4 Preveri v brskalniku**

```bash
npm run dev
```

- Navbar je sticky in se pojavi pri vrhu
- Scroll dol → shadow se pojavi
- Na mobilnem → hamburger gumb je viden, desktop linki skriti
- Klik hamburgerja → overlay meni se odpre

- [ ] **4.5 Commit**

```bash
git add -A
git commit -m "feat: Navbar z scroll-spy in mobile hamburger menijem"
```

---

## Task 5: Preseli slike in ustvari public mapo

**Files:**
- Copy: `C:/xampp/htdocs/cistfer2/slike/` → `public/slike/`

- [ ] **5.1 Kopiraj slike**

```bash
cp -r "C:/xampp/htdocs/cistfer2/slike" "C:/Users/uros7/Desktop/cistfer_claude/public/"
```

- [ ] **5.2 Preveri da slike delujejo**

V brskalniku odpri: `http://localhost:3000/slike/Fasade/fasada.png`

Mora se prikazati slika fasade.

- [ ] **5.3 Commit**

```bash
git add public/slike
git commit -m "feat: preseli slike iz obstoječega prototipa"
```

---

## Task 6: Hero sekcija

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **6.1 Ustvari `components/sections/Hero.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const clipRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  // Before/After slider logika
  useEffect(() => {
    const box = boxRef.current
    const clip = clipRef.current
    const rule = ruleRef.current
    const knob = knobRef.current
    if (!box || !clip || !rule || !knob) return

    let on = false

    function set(x: number) {
      const r = box!.getBoundingClientRect()
      const p = Math.max(0.04, Math.min(0.96, (x - r.left) / r.width))
      const v = p * 100 + '%'
      clip!.style.width = v
      rule!.style.left = v
      knob!.style.left = v
    }

    const onMouseDown = (e: MouseEvent) => { on = true; set(e.clientX); e.preventDefault() }
    const onMouseMove = (e: MouseEvent) => { if (on) set(e.clientX) }
    const onMouseUp = () => { on = false }
    const onTouchStart = (e: TouchEvent) => { on = true; set(e.touches[0].clientX) }
    const onTouchMove = (e: TouchEvent) => { if (on) set(e.touches[0].clientX) }
    const onTouchEnd = () => { on = false }

    box.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    box.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      box.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      box.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex', alignItems: 'center',
      gap: 'var(--space-3xl)',
      padding: 'calc(var(--nav-h) + 48px) clamp(var(--space-lg), 5vw, var(--space-4xl)) var(--space-3xl)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ozadje dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(var(--brand) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Leva stran — tekst */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,119,194,0.15)', border: '1px solid rgba(0,119,194,0.3)',
          borderRadius: 'var(--radius-full)', padding: '6px 16px',
          marginBottom: 'var(--space-xl)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--brand)', display: 'inline-block',
            boxShadow: '0 0 8px var(--brand)',
          }} />
          <span style={{ color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            Profesionalni čistilni servis
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          color: '#fff', lineHeight: 1.1,
          letterSpacing: '-1.5px', marginBottom: 'var(--space-xl)',
        }}>
          Zunanje površine, ki{' '}
          <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>zasijejo</em>{' '}
          kot nove
        </h1>

        {/* Triptih */}
        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
          {[
            { label: 'Čisto', icon: '✓' },
            { label: 'Hitro', icon: '⏱' },
            { label: 'Zanesljivo', icon: '🛡' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--radius-full)', padding: '8px 18px',
              color: '#fff', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-body)',
            }}>
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
        </div>

        <p style={{
          color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem',
          fontFamily: 'var(--font-body)', marginBottom: 'var(--space-2xl)',
          maxWidth: 440, lineHeight: 1.7,
        }}>
          Profesionalno čiščenje fasad, teras, dovozov in vseh zunanjih površin.
          Zanesljivo, temeljito in brez kompromisov.
        </p>

        {/* CTA gumbi */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <a href="#kontakt" style={{
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)', padding: '14px 32px',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Pridobite ponudbo →
          </a>
          <a href="#o-nas" style={{
            background: 'rgba(255,255,255,0.08)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--radius-full)', padding: '14px 32px',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem',
            textDecoration: 'none',
          }}>
            Več o nas
          </a>
        </div>
      </div>

      {/* Desna stran — Before/After slider */}
      <div style={{ flex: 1, minWidth: 0, maxWidth: 580, position: 'relative', zIndex: 1 }}>
        <div
          ref={boxRef}
          style={{
            position: 'relative', borderRadius: 'var(--radius-xl)',
            overflow: 'hidden', cursor: 'ew-resize',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            userSelect: 'none', aspectRatio: '4/3',
            background: '#1a2a3a',
          }}
        >
          {/* "POTEM" layer — ozadje */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #e8f4fd 0%, #c5e3f7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center', color: 'var(--brand)', opacity: 0.4 }}>
              <div style={{ fontSize: '3rem' }}>🏠</div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 8 }}>
                POTEM — dodaj pravo sliko
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>1200×900px</div>
            </div>
          </div>

          {/* "PRED" layer — clip */}
          <div
            ref={clipRef}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: '50%', overflow: 'hidden',
            }}
          >
            <div style={{
              width: '200%', height: '100%',
              background: 'linear-gradient(135deg, #8B6914 0%, #6B4F0F 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ fontSize: '3rem' }}>🏚</div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 8 }}>
                  PRED — dodaj pravo sliko
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>1200×900px</div>
              </div>
            </div>
          </div>

          {/* Razdelilna črta */}
          <div
            ref={ruleRef}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%',
              width: 2, background: '#fff', transform: 'translateX(-50%)',
            }}
          />

          {/* Knob */}
          <div
            ref={knobRef}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
            }}
          >
            ↔
          </div>

          {/* Oznake */}
          <span style={{
            position: 'absolute', bottom: 12, left: 12,
            background: 'rgba(0,0,0,0.6)', color: '#fff',
            borderRadius: 'var(--radius-sm)', padding: '4px 10px',
            fontSize: '0.75rem', fontWeight: 700,
          }}>PRED</span>
          <span style={{
            position: 'absolute', bottom: 12, right: 12,
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-sm)', padding: '4px 10px',
            fontSize: '0.75rem', fontWeight: 700,
          }}>POTEM</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **6.2 Dodaj Hero v `app/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **6.3 Preveri v brskalniku**

- Hero sekcija je vidna, temno ozadje, bel tekst
- Before/after slider se premika z miško/prstom
- Na mobilnem se sekcija pravilno zalomi (tekst nad sliderjem)

- [ ] **6.4 Commit**

```bash
git add -A
git commit -m "feat: Hero sekcija z before/after sliderjem"
```

---

## Task 7: Stats, ONas, ZaupajoNam, Storitve, CtaBand

**Files:**
- Create: `components/sections/Stats.tsx`, `ONas.tsx`, `ZaupajoNam.tsx`, `Storitve.tsx`, `CtaBand.tsx`

- [ ] **7.1 Stats.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { STATISTIKE } from '@/content/config'

export default function Stats() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const stat = STATISTIKE[i]
      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        let cur = 0
        const step = stat.vrednost / 60
        const timer = setInterval(() => {
          cur += step
          if (cur >= stat.vrednost) {
            el.textContent = stat.vrednost + stat.enota
            clearInterval(timer)
          } else {
            el.textContent = Math.floor(cur) + stat.enota
          }
        }, 16)
        obs.disconnect()
      }, { threshold: 0.5 })
      obs.observe(el)
    })
  }, [])

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      background: '#fff', borderRadius: 'var(--radius-xl)',
      boxShadow: '0 8px 48px rgba(12,27,46,0.08)',
      margin: '0 clamp(var(--space-lg), 5vw, var(--space-4xl))',
      marginTop: -40, position: 'relative', zIndex: 10,
    }} className="stats-grid">
      {STATISTIKE.map((stat, i) => (
        <div key={stat.naziv} style={{
          padding: 'var(--space-2xl) var(--space-xl)',
          textAlign: 'center',
          borderRight: i < STATISTIKE.length - 1 ? '1px solid var(--border-light)' : 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: 'var(--brand)', lineHeight: 1,
          }}>
            <span ref={el => { refs.current[i] = el }}>
              0{stat.enota}
            </span>
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
            color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginTop: 8,
          }}>
            {stat.naziv}
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **7.2 ONas.tsx**

```tsx
import { ShieldCheck, Leaf, Clock, Users } from 'lucide-react'

const TOCKE = [
  { ikona: ShieldCheck, naziv: 'Zanesljivost in kakovost', opis: 'Vsak projekt izvedemo s profesionalno opremo in preverjenimi postopki.' },
  { ikona: Leaf, naziv: 'Okolju prijazno', opis: 'Uporabljamo biološko razgradljiva čistila, ki varujejo vaše okolje.' },
  { ikona: Clock, naziv: 'Hiter odzivni čas', opis: 'Na vaše povpraševanje odgovorimo v roku 24 ur z brezplačno oceno.' },
  { ikona: Users, naziv: 'Izkušena ekipa', opis: 'Naša ekipa ima več kot 8 let izkušenj pri čiščenju zunanjih površin.' },
]

export default function ONas() {
  return (
    <section id="o-nas" style={{
      padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      maxWidth: 'var(--max-w)', margin: '0 auto',
    }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
          color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
          fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
          O nas
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: 'var(--dark)', letterSpacing: '-0.8px',
        }}>
          Združujemo kakovost, zanesljivost in izkušnje
        </h2>
        <p style={{
          color: 'var(--text-secondary)', maxWidth: 540, margin: 'var(--space-md) auto 0',
          fontFamily: 'var(--font-body)', lineHeight: 1.7,
        }}>
          Smo specializiran čistilni servis za zunanje površine. Uporabljamo profesionalno opremo in okolju prijazna čistila.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-3xl)', alignItems: 'center',
      }} className="about-grid">
        {/* Slika placeholder */}
        <div className="reveal" style={{
          background: 'var(--tertiary)', borderRadius: 'var(--radius-xl)',
          aspectRatio: '4/3', display: 'flex', alignItems: 'center',
          justifyContent: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ textAlign: 'center', color: 'var(--brand)', opacity: 0.5 }}>
            <div style={{ fontSize: '4rem' }}>👥</div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 8 }}>
              Slika ekipe — 1200×900px
            </div>
          </div>
          {/* Badge */}
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            background: '#fff', borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md) var(--space-lg)',
            boxShadow: '0 4px 24px rgba(12,27,46,0.12)',
            display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--brand)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>🛡</div>
            <div>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--dark)' }}>8+ let</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>aktivnega delovanja</div>
            </div>
          </div>
        </div>

        {/* Točke */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {TOCKE.map(tocka => {
            const Ikona = tocka.ikona
            return (
              <div key={tocka.naziv} style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--radius-md)',
                  background: 'var(--tertiary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Ikona size={22} color="var(--brand)" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>
                    {tocka.naziv}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {tocka.opis}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **7.3 ZaupajoNam.tsx**

```tsx
export default function ZaupajoNam() {
  // Placeholder — zamenjaj s pravimi logotipi
  const LOGOTIPI = ['Magna', 'Arctur', 'Gitri', 'Glasbena šola', 'IC Elektronika', 'Elektro']

  return (
    <section style={{
      padding: 'var(--space-3xl) 0',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      overflow: 'hidden',
    }}>
      <p style={{
        textAlign: 'center', marginBottom: 'var(--space-2xl)',
        fontFamily: 'var(--font-body)', fontWeight: 700,
        fontSize: '0.8rem', color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        Zaupajo nam
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-3xl)', animation: 'marquee 20s linear infinite', width: 'max-content' }}>
        {[...LOGOTIPI, ...LOGOTIPI].map((logo, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: '1.1rem', color: 'var(--text-muted)',
            whiteSpace: 'nowrap', padding: '0 var(--space-xl)',
          }}>
            {logo}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **7.4 Storitve.tsx**

```tsx
import Image from 'next/image'
import { STORITVE } from '@/content/storitve'

export default function Storitve() {
  return (
    <section id="storitve" style={{ background: 'var(--dark)', padding: 'var(--section-pad) 0' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 clamp(var(--space-lg), 5vw, var(--space-4xl))' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Storitve
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: '#fff', letterSpacing: '-0.8px',
          }}>
            Naša področja delovanja
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 540, margin: 'var(--space-md) auto 0', fontFamily: 'var(--font-body)' }}>
            Pokrivamo celoten spekter čiščenja zunanjih površin — od zasebnih domov do poslovnih objektov.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-xl)',
        }} className="storitve-grid">
          {STORITVE.map(s => (
            <div key={s.id} className="reveal" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              transition: 'transform var(--ease), border-color var(--ease)',
            }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: 'rgba(255,255,255,0.06)' }}>
                <Image src={s.slika} alt={s.naziv} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 'var(--space-xl)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700,
                  color: '#fff', marginBottom: 'var(--space-sm)',
                }}>
                  {s.naziv}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {s.opis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **7.5 CtaBand.tsx**

```tsx
export default function CtaBand() {
  return (
    <div className="reveal" style={{
      background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)',
      padding: 'var(--space-3xl) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff',
        letterSpacing: '-0.5px', marginBottom: 'var(--space-sm)',
      }}>
        Pridobite brezplačno ponudbo danes
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', marginBottom: 'var(--space-xl)' }}>
        Pišite nam — v 24 urah prejmete povratno informacijo.
      </p>
      <a href="#kontakt" style={{
        background: '#fff', color: 'var(--brand)',
        borderRadius: 'var(--radius-full)', padding: '14px 36px',
        fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none',
        display: 'inline-block',
      }}>
        Kontaktirajte nas →
      </a>
    </div>
  )
}
```

- [ ] **7.6 Dodaj vse sekcije v `app/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ONas from '@/components/sections/ONas'
import ZaupajoNam from '@/components/sections/ZaupajoNam'
import Storitve from '@/components/sections/Storitve'
import CtaBand from '@/components/sections/CtaBand'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ONas />
      <ZaupajoNam />
      <Storitve />
      <CtaBand />
    </main>
  )
}
```

- [ ] **7.7 Dodaj reveal animacijo observer v layout.tsx**

Na konec `app/layout.tsx` body dodaj script (ali ustvari `components/RevealObserver.tsx`):

```tsx
// components/RevealObserver.tsx
'use client'
import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('vis'), i * 70)
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return null
}
```

Dodaj v `layout.tsx` pred `</body>`:
```tsx
import RevealObserver from '@/components/RevealObserver'
// ...
<RevealObserver />
```

- [ ] **7.8 Preveri v brskalniku**

- Stats se animirajo ob scrollu
- O nas grid se pravilno prikaže
- Storitve kartice imajo slike
- Reveal animacije delujejo

- [ ] **7.9 Commit**

```bash
git add -A
git commit -m "feat: Stats, ONas, ZaupajoNam, Storitve, CtaBand sekcije"
```

---

## Task 8: Nove sekcije — Proces, PredPotem, FAQ, Pokritost

**Files:**
- Create: `components/sections/Proces.tsx`, `PredPotem.tsx`, `FAQ.tsx`, `Pokritost.tsx`

- [ ] **8.1 Proces.tsx (5-koračni stepper)**

```tsx
import { MessageSquare, Search, FileText, Sparkles, CheckCircle, type LucideIcon } from 'lucide-react'
import { KORAKI } from '@/content/proces'

const IKONE: Record<string, LucideIcon> = { MessageSquare, Search, FileText, Sparkles, CheckCircle }

export default function Proces() {
  return (
    <section id="proces" style={{
      padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      maxWidth: 'var(--max-w)', margin: '0 auto',
    }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
          color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
          fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
          Kako delamo
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: 'var(--dark)', letterSpacing: '-0.8px',
        }}>
          Enostavno in pregledno sodelovanje
        </h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 'var(--space-lg)', position: 'relative',
      }} className="proces-grid">
        {/* Connecting line */}
        <div style={{
          position: 'absolute', top: 32, left: '10%', right: '10%', height: 2,
          background: 'linear-gradient(90deg, var(--brand) 0%, var(--tertiary) 100%)',
          zIndex: 0,
        }} className="proces-line" />

        {KORAKI.map((korak, i) => {
          const Ikona = IKONE[korak.ikona]
          return (
            <div key={korak.stevilka} className="reveal" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', zIndex: 1,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: i === 0 ? 'var(--brand)' : '#fff',
                border: `2px solid ${i === 0 ? 'var(--brand)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-lg)',
                boxShadow: '0 4px 16px rgba(0,119,194,0.15)',
              }}>
                {Ikona && <Ikona size={26} color={i === 0 ? '#fff' : 'var(--brand)'} />}
              </div>
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand)',
                fontFamily: 'var(--font-body)', textTransform: 'uppercase',
                letterSpacing: '0.1em', marginBottom: 4,
              }}>
                Korak {korak.stevilka}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                color: 'var(--dark)', marginBottom: 'var(--space-sm)',
              }}>
                {korak.naziv}
              </h4>
              <p style={{
                color: 'var(--text-secondary)', fontFamily: 'var(--font-body)',
                fontSize: '0.85rem', lineHeight: 1.6,
              }}>
                {korak.opis}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **8.2 PredPotem.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'

const PRIMERI = [
  { naziv: 'Čiščenje fasade', lokacija: 'Ljubljana' },
  { naziv: 'Čiščenje dovoza', lokacija: 'Maribor' },
  { naziv: 'Čiščenje strehe', lokacija: 'Celje' },
]

function Slider({ naziv, lokacija }: { naziv: string; lokacija: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const clip = clipRef.current
    const rule = ruleRef.current
    if (!box || !clip || !rule) return
    let on = false

    function set(x: number) {
      const r = box!.getBoundingClientRect()
      const p = Math.max(0.04, Math.min(0.96, (x - r.left) / r.width))
      clip!.style.width = p * 100 + '%'
      rule!.style.left = p * 100 + '%'
    }

    const onMD = (e: MouseEvent) => { on = true; set(e.clientX) }
    const onMM = (e: MouseEvent) => { if (on) set(e.clientX) }
    const onMU = () => { on = false }
    const onTS = (e: TouchEvent) => { on = true; set(e.touches[0].clientX) }
    const onTM = (e: TouchEvent) => { if (on) set(e.touches[0].clientX) }
    const onTE = () => { on = false }

    box.addEventListener('mousedown', onMD)
    window.addEventListener('mousemove', onMM)
    window.addEventListener('mouseup', onMU)
    box.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchmove', onTM, { passive: true })
    window.addEventListener('touchend', onTE)

    return () => {
      box.removeEventListener('mousedown', onMD)
      window.removeEventListener('mousemove', onMM)
      window.removeEventListener('mouseup', onMU)
      box.removeEventListener('touchstart', onTS)
      window.removeEventListener('touchmove', onTM)
      window.removeEventListener('touchend', onTE)
    }
  }, [])

  return (
    <div className="reveal">
      <div
        ref={boxRef}
        style={{
          position: 'relative', borderRadius: 'var(--radius-lg)',
          overflow: 'hidden', cursor: 'ew-resize',
          aspectRatio: '4/3', background: '#e8f4fd', userSelect: 'none',
        }}
      >
        {/* Potem */}
        <div style={{
          position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #e8f4fd, #b3d9f5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--brand)', opacity: 0.5, fontFamily: 'var(--font-body)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>✨</div>
            <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Dodaj sliko POTEM</div>
          </div>
        </div>
        {/* Pred */}
        <div ref={clipRef} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%', overflow: 'hidden' }}>
          <div style={{
            width: '200%', height: '100%',
            background: 'linear-gradient(135deg, #8B6914, #5a4010)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>🏚</div>
              <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Dodaj sliko PRED</div>
            </div>
          </div>
        </div>
        <div ref={ruleRef} style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: '#fff', transform: 'translateX(-50%)' }} />
        <span style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700 }}>PRED</span>
        <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'var(--brand)', color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700 }}>POTEM</span>
      </div>
      <div style={{ marginTop: 'var(--space-md)', fontFamily: 'var(--font-body)' }}>
        <div style={{ fontWeight: 700, color: 'var(--dark)' }}>{naziv}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lokacija}</div>
      </div>
    </div>
  )
}

export default function PredPotem() {
  return (
    <section id="pred-potem" style={{
      background: 'var(--neutral)', padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Rezultati
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--dark)', letterSpacing: '-0.8px',
          }}>
            Pred in po čiščenju
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-sm)' }}>
            Ilustrativni primeri — povlecite drsnik za primerjavo
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-xl)' }} className="pred-potem-grid">
          {PRIMERI.map(p => <Slider key={p.naziv} {...p} />)}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **8.3 FAQ.tsx (shadcn/ui Accordion)**

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQ as FAQ_DATA } from '@/content/faq'

export default function FAQ() {
  return (
    <section id="faq" style={{
      background: '#fff', padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Pogosta vprašanja
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--dark)', letterSpacing: '-0.8px',
          }}>
            Odgovori na vaša vprašanja
          </h2>
        </div>

        <Accordion type="single" collapsible className="reveal">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} style={{ borderBottom: '1px solid var(--border-light)' }}>
              <AccordionTrigger style={{
                fontFamily: 'var(--font-heading)', fontWeight: 600,
                color: 'var(--dark)', fontSize: '1rem', textAlign: 'left',
                padding: 'var(--space-xl) 0',
              }}>
                {item.vprasanje}
              </AccordionTrigger>
              <AccordionContent style={{
                fontFamily: 'var(--font-body)', color: 'var(--text-secondary)',
                lineHeight: 1.7, paddingBottom: 'var(--space-xl)',
              }}>
                {item.odgovor}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

- [ ] **8.4 Pokritost.tsx**

```tsx
import { MapPin } from 'lucide-react'
import { REGIJE } from '@/content/config'

export default function Pokritost() {
  return (
    <section id="pokritost" style={{
      background: 'var(--dark)', padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      textAlign: 'center',
    }}>
      <div className="reveal" style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
          color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
          fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
          Pokritost
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: '#fff', letterSpacing: '-0.8px', marginBottom: 'var(--space-md)',
        }}>
          Delujemo po <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>celi Sloveniji</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', marginBottom: 'var(--space-2xl)' }}>
          Od Kopra do Murske Sobote — prihajamo do vas.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center', marginBottom: 'var(--space-3xl)' }}>
          {REGIJE.map(regija => (
            <div key={regija} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--radius-full)', padding: '8px 18px',
              color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
            }}>
              <MapPin size={14} color="var(--brand)" />
              {regija}
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(0,119,194,0.15)', border: '1px solid rgba(0,119,194,0.25)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)',
          display: 'inline-block', maxWidth: 480,
        }}>
          <p style={{ color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--brand)' }}>Niste prepričani?</strong> Pokličite nas in skupaj najdemo rešitev,
            ne glede na vašo lokacijo v Sloveniji.
          </p>
          <a href="#kontakt" style={{
            display: 'inline-block', marginTop: 'var(--space-lg)',
            background: 'var(--brand)', color: '#fff',
            borderRadius: 'var(--radius-full)', padding: '12px 28px',
            fontFamily: 'var(--font-body)', fontWeight: 700, textDecoration: 'none',
          }}>
            Preverite pokritost →
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **8.5 Dodaj vse v `app/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import ONas from '@/components/sections/ONas'
import ZaupajoNam from '@/components/sections/ZaupajoNam'
import Storitve from '@/components/sections/Storitve'
import Proces from '@/components/sections/Proces'
import PredPotem from '@/components/sections/PredPotem'
import CtaBand from '@/components/sections/CtaBand'
import FAQ from '@/components/sections/FAQ'
import Pokritost from '@/components/sections/Pokritost'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ONas />
      <ZaupajoNam />
      <Storitve />
      <Proces />
      <PredPotem />
      <CtaBand />
      <FAQ />
      <Pokritost />
    </main>
  )
}
```

- [ ] **8.6 Dodaj responsive CSS v globals.css**

```css
@media (max-width: 900px) {
  .storitve-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .proces-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .proces-line { display: none !important; }
  .pred-potem-grid { grid-template-columns: 1fr !important; }
  .about-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 600px) {
  .storitve-grid { grid-template-columns: 1fr !important; }
  .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
```

- [ ] **8.7 Preveri v brskalniku**

- Proces stepper je viden
- PredPotem sliderji delujejo
- FAQ accordion se odpira/zapira
- Pokritost regije badge-i so vidni
- Na mobilnem se vse pravilno prelomi

- [ ] **8.8 Commit**

```bash
git add -A
git commit -m "feat: Proces, PredPotem, FAQ, Pokritost sekcije"
```

---

## Task 9: Kontakt sekcija in Footer

**Files:**
- Create: `components/sections/Kontakt.tsx`, `components/layout/Footer.tsx`

- [ ] **9.1 Kontakt.tsx**

```tsx
'use client'

import { useState } from 'react'
import { CONTACT } from '@/content/config'

export default function Kontakt() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const res = await fetch('/api/kontakt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setStatus('success')
      setMsg('Hvala! Vaše povpraševanje smo prejeli. Odgovorili bomo v 24 urah.');
      (e.target as HTMLFormElement).reset()
    } else {
      setStatus('error')
      setMsg('Prišlo je do napake. Prosimo pokličite nas neposredno.')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-primary)',
    background: '#fff', outline: 'none', transition: 'border-color var(--ease)',
  }

  return (
    <section id="kontakt" style={{
      padding: 'var(--section-pad) clamp(var(--space-lg), 5vw, var(--space-4xl))',
      background: 'var(--neutral)',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)',
            color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 24, height: 2, background: 'var(--brand)', display: 'inline-block' }} />
            Kontakt
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--dark)', letterSpacing: '-0.8px',
          }}>
            Stopite v stik z nami
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-sm)' }}>
            Pišite nam — v 24 urah prejmete brezplačno ponudbo.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: 'var(--space-3xl)', alignItems: 'start',
        }} className="kontakt-grid">
          {/* Leva: info + mapa */}
          <div className="reveal">
            <div style={{
              background: '#fff', borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)', marginBottom: 'var(--space-xl)',
              boxShadow: '0 4px 24px rgba(12,27,46,0.06)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--dark)', marginBottom: 'var(--space-xl)' }}>
                Kontaktni podatki
              </h3>
              {[
                { label: 'Telefon', value: CONTACT.telefon, href: `tel:${CONTACT.telefon.replace(/\s/g, '')}` },
                { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { label: 'Lokacija', value: CONTACT.lokacija, href: undefined },
                { label: 'Delovni čas', value: CONTACT.delovniCas, href: undefined },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 'var(--space-lg)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, fontFamily: 'var(--font-body)' }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--brand)', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none' }}>
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 4px 24px rgba(12,27,46,0.06)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175368.5!2d14.5058!3d46.0569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47652d5b8e0c8a39%3A0x45a25e9bde5de0!2sLjubljana%2C%20Slovenia!5e0!3m2!1sen!2sSI!4v1"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija Čistfer"
              />
            </div>
          </div>

          {/* Desna: obrazec */}
          <div className="reveal">
            <form onSubmit={handleSubmit} style={{
              background: '#fff', borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              boxShadow: '0 4px 24px rgba(12,27,46,0.06)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Ime in priimek *
                  </label>
                  <input name="ime" type="text" required placeholder="npr. Janez Novak" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Email naslov *
                  </label>
                  <input name="email" type="email" required placeholder="janez@gmail.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Telefon
                  </label>
                  <input name="telefon" type="tel" placeholder="031 456 663" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--dark)' }}>
                    Sporočilo *
                  </label>
                  <textarea name="sporocilo" required rows={5} placeholder="Opišite površino, lokacijo in obseg čiščenja..." style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                {msg && (
                  <div style={{
                    padding: 'var(--space-md)', borderRadius: 'var(--radius-md)',
                    background: status === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: status === 'success' ? '#15803d' : '#b91c1c',
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  }}>
                    {msg}
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} style={{
                  background: 'var(--brand)', color: '#fff',
                  border: 'none', borderRadius: 'var(--radius-full)',
                  padding: '14px 32px', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'background var(--ease)',
                }}>
                  {status === 'loading' ? 'Pošiljanje…' : 'Pošlji povpraševanje →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **9.2 Footer.tsx**

```tsx
import { CONTACT } from '@/content/config'

export default function Footer() {
  const leto = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--dark)', color: '#fff', padding: 'var(--space-3xl) clamp(var(--space-lg), 5vw, var(--space-4xl)) var(--space-xl)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }} className="footer-grid">
          <div>
            <a href="#" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.45rem', color: '#fff', textDecoration: 'none', letterSpacing: '-0.5px' }}>
              Čist<span style={{ color: 'var(--brand)' }}>fer</span>
            </a>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: 'var(--space-md)', maxWidth: 240 }}>
              Profesionalni čistilni servis zunanjih površin. Zanesljivo, temeljito in okolju prijazno.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-lg)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Navigacija</h4>
            {['#o-nas:O nas', '#storitve:Storitve', '#proces:Proces', '#faq:FAQ', '#kontakt:Kontakt'].map(item => {
              const [href, label] = item.split(':')
              return (
                <a key={href} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>
                  {label}
                </a>
              )
            })}
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-lg)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Storitve</h4>
            {['Čiščenje fasad', 'Čiščenje teras', 'Čiščenje dovozov', 'Sončne elektrarne', 'Čiščenje streh'].map(s => (
              <a key={s} href="#storitve" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>
                {s}
              </a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-lg)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>Kontakt</h4>
            <a href={`tel:${CONTACT.telefon.replace(/\s/g, '')}`} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>{CONTACT.telefon}</a>
            <a href={`mailto:${CONTACT.email}`} style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 'var(--space-sm)' }}>{CONTACT.email}</a>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>{CONTACT.delovniCas}</span>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            © {leto} Čistfer. Vse pravice pridržane.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            Zasebnost · Piškotki
          </span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **9.3 Dodaj Kontakt + Footer v page.tsx in layout.tsx**

V `app/page.tsx` dodaj na konec:
```tsx
import Kontakt from '@/components/sections/Kontakt'
// ...
<Kontakt />
```

V `app/layout.tsx` dodaj:
```tsx
import Footer from '@/components/layout/Footer'
// Po {children}:
<Footer />
```

- [ ] **9.4 Dodaj responsive CSS za kontakt grid**

```css
@media (max-width: 900px) {
  .kontakt-grid { grid-template-columns: 1fr !important; }
  .footer-grid { grid-template-columns: 1fr 1fr !important; }
}
@media (max-width: 600px) {
  .footer-grid { grid-template-columns: 1fr !important; }
}
```

- [ ] **9.5 Preveri v brskalniku**

- Kontakt sekcija ima info + obrazec
- Google Maps embed se naloži
- Footer ima 4 kolone na desktopu, 1 na mobilnem

- [ ] **9.6 Commit**

```bash
git add -A
git commit -m "feat: Kontakt sekcija z obrazcem + Footer"
```

---

## Task 10: Kontakt API endpoint (stub za Plan B)

**Files:**
- Create: `app/api/kontakt/route.ts`

> Polna integracija (Resend + Sheets + Telegram) je v Plan B. Tukaj naredimo stub ki vrne 200 OK in logira podatke, da obrazec deluje že zdaj.

- [ ] **10.1 Ustvari `app/api/kontakt/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const KontaktShema = z.object({
  ime: z.string().min(2, 'Ime je prekratko').max(100),
  email: z.string().email('Neveljaven email'),
  telefon: z.string().max(20).optional(),
  sporocilo: z.string().min(5, 'Sporočilo je prekratko').max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = KontaktShema.parse(body)

    // TODO (Plan B): pošlji Resend email, zapiši v Sheet, pošlji Telegram notif
    console.log('Novo povpraševanje:', data)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Napaka strežnika' }, { status: 500 })
  }
}
```

- [ ] **10.2 Testiraj obrazec**

Odpri `http://localhost:3000/#kontakt`, izpolni obrazec, pošlji.
V terminalu mora biti izpis `Novo povpraševanje: { ime: ..., email: ..., ... }`.
V brskalniku mora biti sporočilo "Hvala! Vaše povpraševanje smo prejeli."

- [ ] **10.3 Commit**

```bash
git add -A
git commit -m "feat: kontakt API stub (brez integracij — pripravljeno za Plan B)"
```

---

## Task 11: SEO in JSON-LD

**Files:**
- Modify: `app/layout.tsx`

- [ ] **11.1 Dodaj LocalBusiness JSON-LD v layout.tsx**

V `<head>` sekciji (ali direktno v layout body pred Navbar):

```tsx
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

// V return, v <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **11.2 Ustvari `app/sitemap.ts`**

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cistfer.si',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

- [ ] **11.3 Ustvari `app/robots.ts`**

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://cistfer.si/sitemap.xml',
  }
}
```

- [ ] **11.4 Commit**

```bash
git add -A
git commit -m "feat: SEO — JSON-LD LocalBusiness, sitemap, robots"
```

---

## Task 12: Build test in deploy priprava

- [ ] **12.1 Production build test**

```bash
npm run build
```

Pričakovano: BUILD SUCCESSFUL, brez TypeScript napak, brez ESLint napak.

Popravi morebitne napake preden greš naprej.

- [ ] **12.2 Ustvari GitHub repo**

```bash
git remote add origin https://github.com/TVOJE_UPORABNISKO_IME/cistfer.git
git branch -M main
git push -u origin main
```

- [ ] **12.3 Vercel deploy**

1. Odpri [vercel.com](https://vercel.com) → Sign up z GitHub računom
2. New Project → Import `cistfer` repo
3. Framework: **Next.js** (zazna avtomatično)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)
6. Deploy

- [ ] **12.4 Preveri deployed stran**

Odpri Vercel URL (npr. `cistfer.vercel.app`) — vse mora delovati enako kot lokalno.

- [ ] **12.5 Končni commit**

```bash
git add -A
git commit -m "chore: production ready — build clean, deployed na Vercel"
git push
```

---

## Kaj sledi (Plan B)

Ko je stran živa na Vercelu, začni Plan B: **Avtomatizacije** (Resend + Google Sheets + Telegram Bot + Vercel Cron). Plan B bo ločen dokument.

Za domeno `cistfer.si`:
1. Kupi na [Domenca.si](https://www.domenca.si) (~12 €/leto)
2. Vercel dashboard → Domains → Add domain → `cistfer.si`
3. Domenca → DNS nastavitve → dodaj Vercel DNS zapise (A in CNAME)
