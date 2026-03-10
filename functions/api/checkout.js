import Stripe from 'stripe';

export const onRequestPost = async (context) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);

  try {
    const requestBody = await context.request.json();
    const { successUrl, cancelUrl, customerEmail, metadata, customerName } = requestBody;

    // Validate required fields
    if (!successUrl || !cancelUrl) {
      return new Response(JSON.stringify({ error: 'Missing successUrl or cancelUrl' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Security: Validate Origins (Open Redirect protection)
    const requestOrigin = new URL(context.request.url).origin;
    if (!successUrl.startsWith(requestOrigin) || !cancelUrl.startsWith(requestOrigin)) {
      return new Response(JSON.stringify({ error: 'Invalid URL origin' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Dynamic pricing based on plan
    let unitAmount = 10000; // Default Light
    if (metadata.plan === 'standard') unitAmount = 30000;
    else if (metadata.plan === 'premium') unitAmount = 50000;

    const session = await stripe.checkout.sessions.create({
      automatic_payment_methods: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `${metadata.plan.charAt(0).toUpperCase() + metadata.plan.slice(1)} Template Plan`,
              description: `HP制作テンプレートプラン: ${metadata.plan}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        ...metadata,
        customerName: customerName || (metadata && metadata.customerName) || '',
      },
      payment_intent_data: {
        metadata: {
          ...metadata,
          customerName: customerName || (metadata && metadata.customerName) || '',
        },
      },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Stripe Error:', error);
    // Error Masking: Hide internal Stripe errors from the client
    return new Response(JSON.stringify({ error: '決済の準備中にエラーが発生しました。しばらく経ってから再度お試しください。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
