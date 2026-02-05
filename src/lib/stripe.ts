import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build';

export const stripe = new Stripe(stripeKey);

export const createCheckoutSession = async (
  priceId: string,
  customerId: string,
  successUrl: string,
  cancelUrl: string
) => {
  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
};

export const createOneTimeCheckout = async (
  amount: number,
  description: string,
  successUrl: string,
  cancelUrl: string
) => {
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: description,
          },
          unit_amount: amount * 100, // Stripe expects amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
};

export const handleWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      // Handle subscription creation/update
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscription.id);
      break;

    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const cancelledSub = event.data.object as Stripe.Subscription;
      console.log('Subscription cancelled:', cancelledSub.id);
      break;

    case 'charge.succeeded':
      // Handle successful payment
      const charge = event.data.object as Stripe.Charge;
      console.log('Payment succeeded:', charge.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};
