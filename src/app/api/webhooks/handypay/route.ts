import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'

export const runtime = 'nodejs'

const SECRET = process.env.HANDYPAY_WEBHOOK_SECRET
if (!SECRET) throw new Error('HANDYPAY_WEBHOOK_SECRET is not configured')

function hasValidSignature(payload: string, sig: string): boolean {
  if (!sig.startsWith('sha256=')) return false
  const hex = sig.slice(7)
  if (!/^[0-9a-f]{64}$/i.test(hex)) return false
  const expected = createHmac('sha256', SECRET!).update(payload).digest()
  const received = Buffer.from(hex, 'hex')
  return received.length === expected.length && timingSafeEqual(received, expected)
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('x-handypay-signature') ?? ''
  if (!hasValidSignature(body, sig)) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  let event: { id: string; type: string; data: unknown }
  try { event = JSON.parse(body) } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  switch (event.type) {
    case 'checkout.session.completed':
      // TODO: fulfill order — provision service or send confirmation email
      break
    case 'checkout.session.async_payment_succeeded': break
    case 'charge.refunded': break
    case 'payment_intent.payment_failed': break
  }
  return NextResponse.json({ received: true })
}