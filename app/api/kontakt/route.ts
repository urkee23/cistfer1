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
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Napaka strežnika' }, { status: 500 })
  }
}
