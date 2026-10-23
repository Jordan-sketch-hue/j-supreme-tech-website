import { NextRequest, NextResponse } from 'next/server'
import { createPaymentSession } from '@/lib/handypay'
import { getPackage } from '@/lib/serviceOffers'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const slug = String(body.slug ?? '').trim()
    const pkgId = String(body.pkg ?? '').trim()

    // Server-side price lookup — client never sets the amount
    const pkg = getPackage(slug, pkgId)
    if (!pkg) return NextResponse.json({ error: 'Unknown package' }, { status: 404 })

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? ''
    const session = await createPaymentSession({
      amountJmd: pkg.amount,
      description: `${pkg.name} — ${slug}`,
      orderId: randomUUID(),
      successUrl: `${origin}/start`,
      cancelUrl: `${origin}/pricing`,
    })
    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Payment failed' }, { status: 500 })
  }
}