const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const sig = event.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        if (endpointSecret) {
            stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
        } else {
            // If no secret is set (e.g. local dev without CLI forwarding), just parse body
            // WARNING: This is insecure in production!
            if (process.env.NETLIFY_DEV === 'true') {
                console.warn('Skipping signature verification in local dev (no secret set)');
                stripeEvent = JSON.parse(event.body);
            } else {
                throw new Error('Missing Stripe Webhook Secret in production');
            }
        }
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    }

    // Handle the event
    switch (stripeEvent.type) {
        case 'checkout.session.completed':
            const session = stripeEvent.data.object;
            console.log('Payment successful for session:', session.id);
            // TODO: Fulfill the purchase (e.g. send email, update database)
            break;
        default:
            console.log(`Unhandled event type ${stripeEvent.type}`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
    };
};
