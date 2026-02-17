require('dotenv').config();

// Mock Netlify Dev environment to bypass signature verification for this test
process.env.NETLIFY_DEV = 'true';

const { handler } = require('../netlify/functions/stripe-webhook');

const mockEvent = {
    type: 'checkout.session.completed',
    data: {
        object: {
            id: 'cs_test_simulated_session_12345',
            customer_details: {
                email: process.env.GMAIL_USER, // Send to yourself
                name: 'Test Customer (You)',
            },
            metadata: {
                productName: 'Standard Plan (Test)',
            },
        },
    },
};

async function runTest() {
    console.log('🧪 Starting Webhook Logic Simulation...');
    console.log('📧 Target Email:', process.env.GMAIL_USER);

    const event = {
        httpMethod: 'POST',
        body: JSON.stringify(mockEvent),
        headers: {
            // No signature needed because we set NETLIFY_DEV=true and don't provide endpointSecret in this context
            // (Unless .env has STRIPE_WEBHOOK_SECRET, then we might face issues if we don't clear it)
        },
    };

    // Temporarily unset STRIPE_WEBHOOK_SECRET to force dev path in handler if it exists in .env
    // But wait, the handler code checks `if (endpointSecret)`. 
    // If .env has it (user might have added it?), the test will fail on signature.
    // I should ensure endpointSecret is undefined for this test or mock the signature.
    // Easy fix: Unset the env var for this process.
    const originalSecret = process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.STRIPE_WEBHOOK_SECRET;

    try {
        const response = await handler(event, {});
        console.log('✅ Function executed successfully!');
        console.log('Response:', response);

        if (response.statusCode === 200) {
            console.log('🎉 Email trigger logic appears to have worked. Please check your inbox.');
        } else {
            console.error('⚠️ Function returned non-200 status.');
        }
    } catch (error) {
        console.error('❌ Function execution failed:', error);
    }
}

runTest();
