const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { successUrl, cancelUrl, customerEmail, metadata } = JSON.parse(event.body);

    // Validate required fields
    if (!successUrl || !cancelUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing successUrl or cancelUrl' }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'Standard Template Plan',
              description: 'Access to premium templates',
            },
            unit_amount: 100, // 100 JPY for testing
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: metadata, // Pass metadata to Stripe
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Stripe Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
