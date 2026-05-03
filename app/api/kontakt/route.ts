import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const STORITVE = [
  'Fasade',
  'Talne površine',
  'Strešne kritine',
  'Sončne elektrarne',
  'Steklene površine',
] as const

const KontaktShema = z.object({
  ime: z.string().min(2, 'Ime je prekratko').max(100),
  email: z.email('Neveljaven email'),
  telefon: z.string().max(20).optional(),
  storitev: z.array(z.enum(STORITVE)).optional(),
  sporocilo: z.string().min(5, 'Sporočilo je prekratko').max(2000),
  gdprAccepted: z.literal(true, { error: 'Privolitev je obvezna' }),
})

type FormData = z.infer<typeof KontaktShema>

const upstashConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN

const upstashRatelimit = upstashConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, '10 m'),
      prefix: 'cistfer:kontakt',
    })
  : null

// In-memory fallback — deluje samo na lokalnem razvoju (ne na serverless/Vercel)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimitLocal(ip: string): boolean {
  const now = Date.now()
  const WINDOW_MS = 10 * 60 * 1000
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

async function checkRateLimit(ip: string): Promise<boolean> {
  if (upstashRatelimit) {
    const { success } = await upstashRatelimit.limit(ip)
    return success
  }
  return checkRateLimitLocal(ip)
}

const ALLOWED_ORIGINS = ['https://cistfer.si', 'https://www.cistfer.si']

async function saveToGoogleSheets(data: FormData, storitevText: string, timestamp: string) {
  const url = process.env.GOOGLE_SCRIPT_URL
  const secret = process.env.GOOGLE_SCRIPT_SECRET
  if (!url || !secret) return
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      timestamp,
      ime: data.ime,
      email: data.email,
      telefon: data.telefon || '',
      storitev: storitevText,
      sporocilo: data.sporocilo,
    }),
  })
}

async function sendTelegramNotification(data: FormData, storitevText: string, timestamp: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  const message = [
    'Nova stranka — Cistfer',
    '',
    `Ime: ${data.ime}`,
    `Email: ${data.email}`,
    `Telefon: ${data.telefon || '—'}`,
    `Storitev: ${storitevText}`,
    '',
    'Sporocilo:',
    data.sporocilo,
    '',
    `Cas: ${timestamp}`,
  ].join('\n')
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  })
}

export async function POST(request: NextRequest) {
  // FIX 1: Produkcija brez Upstash = brez rate limitinga = zavrnemo vse zahteve
  if (process.env.NODE_ENV === 'production' && !upstashConfigured) {
    console.error('[kontakt] KRITIČNO: Upstash ni nastavljen v produkciji — API blokiran')
    return NextResponse.json({ error: 'Servis ni na voljo' }, { status: 503 })
  }

  // FIX 2: V produkciji zahtevamo veljaven Origin — blokira curl/bot klice brez Origina
  const origin = request.headers.get('origin')
  if (process.env.NODE_ENV === 'production') {
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!await checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Prevec zahtevkov. Poskusite cez 10 minut.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Napaka streznika' }, { status: 400 })
  }

  // FIX 3: Honeypot — boti izpolnijo skrita polja, ljudje ne
  if (body && typeof body === 'object' && 'website' in body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true })
  }

  let data: FormData
  try {
    data = KontaktShema.parse(body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Napaka streznika' }, { status: 500 })
  }

  const timestamp = new Date().toLocaleString('sl-SI', { timeZone: 'Europe/Ljubljana' })
  const storitevText = data.storitev?.join(', ') || '—'

  // FIX 4: Logiramo napake integracij
  const results = await Promise.allSettled([
    saveToGoogleSheets(data, storitevText, timestamp),
    sendTelegramNotification(data, storitevText, timestamp),
  ])
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[kontakt] Integracija ni uspela:', result.reason)
    }
  }

  return NextResponse.json({ success: true })
}
