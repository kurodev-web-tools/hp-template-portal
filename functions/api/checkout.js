import Stripe from 'stripe';

export const onRequestPost = async (context) => {
  const stripeSecretKey = context.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new Response(JSON.stringify({ error: 'Server Error: STRIPE_SECRET_KEY is not defined in the environment.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const stripe = new Stripe(stripeSecretKey);

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
    // Safe metadata access and dynamic pricing
    const safeMetadata = metadata || {};
    const plan = safeMetadata.plan || 'light';

    let unitAmount = 10000;
    if (plan === 'standard') unitAmount = 30000;
    else if (plan === 'premium') unitAmount = 50000;

    // 1. Create or retrieve Customer (Required for Bank Transfer / customer_balance)
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          source: 'hp-portal'
        }
      });
    }

    // 2. Build Checkout Session
    const sessionConfig = {
      customer: customer.id, // Explicitly set customer ID
      payment_method_types: ['card', 'customer_balance'],
      payment_method_options: {
        customer_balance: {
          funding_type: 'bank_transfer',
          bank_transfer: {
            type: 'jp_bank_transfer',
          },
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Template Plan`,
              description: `HP制作テンプレートプラン: ${plan}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      // customer_email: customerEmail, // REMOVED: Since customer ID is now provided
      metadata: {
        ...safeMetadata,
        customerName: customerName || safeMetadata.customerName || '',
      },
      payment_intent_data: {
        metadata: {
          ...safeMetadata,
          customerName: customerName || safeMetadata.customerName || '',
        },
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Stripe Error:', error);
    // Detailed error reporting for debugging
    return new Response(JSON.stringify({
      error: '決済の準備中にエラーが発生しました。',
      message: error.message,
      type: error.type,
      code: error.code
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
