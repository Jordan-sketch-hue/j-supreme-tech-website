import { NextRequest, NextResponse } from 'next/server';
import { stripe, createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, customerId, successUrl, cancelUrl } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    const session = await createCheckoutSession(
      priceId,
      customerId,
      successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`
    );

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
