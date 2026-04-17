# Čistfer — Next.js Migration Design Spec
**Datum:** 2026-04-17  
**Avtor:** Gasparič Uroš  
**Status:** Odobren

---

## 1. Kontekst in cilj

Migracija šolskega PHP/MySQL prototipa (`cistfer2`) v produkcijsko Next.js spletno stran za pravo čistilno podjetje **Čistfer** (lastnik: Tjaš).

**Cilj:** Profesionalna, hitra, production-ready single-page spletna stran z avtomatiziranimi poslovnimi procesi, deployirana na Vercel z domeno `cistfer.si`.

---

## 2. Tech Stack

| Sloj | Tehnologija | Razlog |
|------|-------------|--------|
| Framework | Next.js 15 (App Router) | SSR, Server Actions, Vercel Cron native |
| Jezik | TypeScript (strict) | Type safety, manj bugov |
| Styling | Tailwind CSS v4 + CSS variables | Ohranjamo obstoječe design tokens |
| UI komponente | shadcn/ui | Accordion (FAQ), Form, Button |
| Validacija | Zod | Client + server validacija |
| Email | Resend API | 3000 mail/mesec brez plačila |
| Baza podatkov | Google Sheets API v4 | Tjaš vidi podatke brez admin panela |
| Notifikacije | Telegram Bot API | Instant alert Tjašu na telefon |
| Slike | next/image | Avtomatski WebP, lazy load |
| Testi | Vitest + Testing Library | Samo za API/logiko (TDD-2) |
| Hosting | Vercel (free tier) | Auto-deploy iz GitHub, SSL, CDN |
| Domena | cistfer.si via Domenca | 12 €/leto |
| Fonti | Lexend + Source Sans 3 | Enako kot prototip |

---

## 3. Arhitektura projekta

```
cistfer/
├── app/
│   ├── layout.tsx                # Root layout: fonti, meta, Navbar, Footer
│   ├── page.tsx                  # Single-page landing (vse sekcije)
│   ├── globals.css               # Tailwind + design tokens
│   └── api/
│       ├── kontakt/route.ts      # POST: Zod validacija → Sheet + Resend + Telegram
│       └── cron/
│           ├── followup/route.ts # Cron: follow-up maili (vsak dan 09:00)
│           └── report/route.ts   # Cron: mesečno poročilo (1. v mesecu)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky, scroll-spy, hamburger mobile
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx              # Hero + Before/After slider
│       ├── Stats.tsx             # Animirani števci
│       ├── ONas.tsx              # O nas grid
│       ├── ZaupajoNam.tsx        # Marquee logo strip
│       ├── Storitve.tsx          # Kartice storitev
│       ├── Proces.tsx            # NOVO: 5-koračni stepper
│       ├── PredPotem.tsx         # NOVO: galerija before/after sliderjev
│       ├── FAQ.tsx               # NOVO: accordion (shadcn/ui)
│       ├── Pokritost.tsx         # NOVO: pokritost po Sloveniji
│       └── Kontakt.tsx           # Kontakt obrazec + Google Maps embed
├── content/
│   ├── storitve.ts               # Array storitev (naziv, opis, slika)
│   ├── faq.ts                    # Array FAQ vprašanj/odgovorov
│   ├── proces.ts                 # Array 5 korakov
│   └── config.ts                 # Kontaktni podatki, delovni čas, regije
├── lib/
│   ├── sheets.ts                 # Google Sheets API wrapper
│   ├── resend.ts                 # Resend email wrapper + template-i
│   ├── telegram.ts               # Telegram Bot API wrapper
│   └── validations.ts            # Zod shema za kontakt obrazec
├── public/slike/                 # Preseljene obstoječe slike
├── middleware.ts                  # Rate limiting (@upstash/ratelimit) + Origin header check
├── vercel.json                   # Cron job urniki
├── .env.local                    # API ključi (nikoli v git)
└── .env.example                  # Primer .env za dokumentacijo
```

---

## 4. Design Tokens (ohranjamo obstoječe)

```css
--brand:         #009AD9   /* primarna modra */
--brand-dark:    #007BB5   /* hover stanje */
--dark:          #0D1B2A   /* hero ozadje, tekst */
--light:         #F8FAFB   /* svetlo ozadje sekcij */
--accent:        #00C49A   /* zelena: okolju prijazno */
--font-heading:  'Lexend', sans-serif
--font-body:     'Source Sans 3', sans-serif
```

---

## 5. Strani in sekcije (single-page)

Vse sekcije so na `page.tsx`. Navbar linki scrollajo do ID-jev:

| Sekcija | ID | Status | Opis |
|---------|-----|--------|------|
| Hero | `#hero` | Migracija | Before/After slider, CTA gumbi |
| Stats | `#stats` | Migracija | Animirani števci iz content/config |
| O nas | `#o-nas` | Migracija | Grid z ikonami in "8+ let" badge |
| Zaupajo nam | — | Migracija | Marquee logo strip |
| Storitve | `#storitve` | Migracija | Kartice iz content/storitve.ts |
| Proces | `#proces` | NOVO | 5-koračni numbered stepper |
| Pred/potem | `#pred-potem` | NOVO | 3-4 before/after sliderji |
| FAQ | `#faq` | NOVO | Accordion, 8 vprašanj |
| Pokritost | `#pokritost` | NOVO | "Delujemo po celi Sloveniji" + regije |
| Kontakt | `#kontakt` | Migracija+ | Obrazec + Google Maps embed |

**Navbar linki:** O nas · Storitve · Proces · FAQ · Kontakt · [Brezplačna ponudba CTA]

---

## 6. Navbar — scroll-spy

Navbar postane `sticky` takoj ob scrollu. Aktivni link se highlighta glede na trenutno vidno sekcijo (IntersectionObserver, threshold 0.5). Hamburger meni na mobilnih napravah (<768px) pokaže full-screen overlay.

---

## 7. Kontakt API — podatkovni tok

```
Stranka odda obrazec
        ↓
Server Action (app/api/kontakt/route.ts)
        ↓
Zod validacija (ime, email, telefon?, storitev?, sporocilo)
        ↓ (vzporedno)
┌───────────────────────────────────────────────────┐
│  Resend: mail Tjašu          │ Google Sheet: nova  │
│  + auto "Hvala" stranki      │ vrstica (timestamp, │
│                              │ vse polje, status   │
│                              │ "Novo")             │
│              Telegram: instant notif Tjašu         │
└───────────────────────────────────────────────────┘
        ↓
Redirect na /#kontakt?status=success
```

**Google Sheet stolpci:**
`Timestamp | Ime | Email | Telefon | Storitev | Sporočilo | Status | Follow-up 3d sent | Follow-up 7d sent | Opravljeno Timestamp`

- `Status`: vrednosti → `Novo`, `V obravnavi`, `Ponudba poslana`, `Opravljeno`
- `Follow-up 3d sent` / `Follow-up 7d sent`: boolean (`TRUE`/`FALSE`)
- `Opravljeno Timestamp`: Tjaš nastavi datum ko označi `Status = Opravljeno` — cron računa "+2 dni" od tega datuma

---

## 8. Avtomatizacije (Vercel Cron)

### Follow-up sistem
- **Cron:** vsak dan ob 09:00 (`0 9 * * *`)
- **Logika:** poišče vrstice v Sheet-u kjer `Status = "Novo"` in `Timestamp > 3 dni`
- **Akcija:** pošlje follow-up mail stranki (Resend template), posodobi Sheet `Follow-up sent = true`
- **7-dnevni follow-up:** enako, ampak 7 dni in drugačen template

### Mesečno poročilo
- **Cron:** 1. v mesecu ob 08:00 (`0 8 1 * *`)
- **Logika:** prebere zadnjih 30 dni iz Sheet-a, izračuna: skupaj povpraševanj, najpogostejša storitev, conversion rate
- **Akcija:** pošlje HTML mail Tjašu s statistiko

### Po-storitvi review mail
- **Sprožilec:** Tjaš v Sheet-u nastavi `Status = "Opravljeno"`
- **Cron:** vsak dan preveri Sheet, 2 dni po `Status = Opravljeno` pošlje mail stranki
- **Vsebina:** "Hvala za zaupanje, ocenite nas na Google Maps [link]"

---

## 9. Varnost

| Tveganje | Zaščita |
|----------|---------|
| Spam na kontakt obrazec | Honeypot polje + `@upstash/ratelimit` z Upstash Redis (free tier) v `middleware.ts` |
| API ključi | `.env.local`, nikoli v git, Vercel env variables |
| XSS | React escaping by default + Zod sanitizacija |
| CSRF | Kontakt je Route Handler (ne Server Action) → explicitna `Origin` header validacija v route |
| Cron abuse | `CRON_SECRET` header validacija |
| Sheets quota | Vedno `batchGet` (en API klic za vse vrstice), nikoli row-by-row iteracija |

---

## 10. TDD scope (TDD-2)

Testi **samo za logiko**, ne za UI komponente:

- `lib/validations.test.ts` — Zod shema edge cases
- `lib/sheets.test.ts` — mock Google API, testira write/read
- `lib/resend.test.ts` — mock Resend, testira template rendering
- `lib/telegram.test.ts` — mock Telegram API
- `app/api/kontakt/route.test.ts` — integration test (mock vseh treh integracij)
- `app/api/cron/followup/route.test.ts` — cron logika

---

## 11. Image strategija

| Lokacija | Tip slike | Vir |
|----------|-----------|-----|
| Hero before/after | AI-generirana (ImageFX/Flux) z oznako "Ilustrativni primer" | ImageFX |
| Storitve kartice | Preseljene iz `/slike/` ali AI ambient | Obstoječe + ImageFX |
| O nas ekipa | Placeholder do pravih foto | Tjaš fotografira |
| Pred/potem galerija | 2 AI primera + placeholder za prave | ImageFX |
| Proces ikone | shadcn/ui ikone (Lucide) | Lucide React |

---

## 12. SEO

- `metadata` objekt v `layout.tsx` (title, description, og:image, og:locale)
- `sitemap.ts` (Next.js native)
- `robots.ts` (Next.js native)
- Structured data: `LocalBusiness` JSON-LD v `layout.tsx`
- Google Search Console verifikacija po deployju

---

## 13. Deploy postopek

1. GitHub repo (private) → Vercel import
2. Env variables nastavi v Vercel dashboard
3. Custom domain `cistfer.si` → Vercel DNS nastavitve
4. SSL avtomatski (Vercel Let's Encrypt)
5. Google Search Console → verifikacija domene

---

## 14. Phase 2 (izven scope-a tega spec-a)

- Termin booking sistem (Google Calendar API)
- Kvota kalkulator (okvirna cena glede na m²)
- Pravi before/after upload (Tjaš fotografira, simple upload UI)
- Testimonials (ko bodo Google ocene)
- Google Workspace prehod (ko bodo prihodki)
