import Stripe from 'stripe';

export const onRequestPost = async (context) => {
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
    const signature = context.request.headers.get('stripe-signature');
    const endpointSecret = context.env.STRIPE_WEBHOOK_SECRET;

    if (!signature) {
        return new Response('Missing signature', { status: 400 });
    }

    try {
        const rawBody = await context.request.text();
        let event;

        try {
            event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
        } catch (err) {
            console.error(`Webhook Signature Verification Failed: ${err.message}`);
            return new Response(`Webhook Error: ${err.message}`, { status: 400 });
        }

        return await processEvent(context, event);

    } catch (err) {
        console.error(`Server Error: ${err.message}`);
        return new Response(`Server Error: ${err.message}`, { status: 500 });
    }
};

// Refactored event processing to be shared
async function processEvent(context, event) {
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details?.email;
        const customerName = session.metadata?.customerName || session.customer_details?.name || 'お客様';
        const productName = session.metadata?.productName || 'Standard Plan';
        const templateName = session.metadata?.template;
        const domainName = session.metadata?.domain;
        const userMessage = session.metadata?.message || '(なし)';

        console.log(`Payment successful: ${session.id}, Email: ${customerEmail}`);

        if (customerEmail) {
            // Send Email via Resend
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'HP Templates <onboarding@resend.dev>',
                    to: [customerEmail],
                    subject: '【HP Templates】ご購入ありがとうございます (Standard Plan)',
                    html: `
                        <p>${customerName} 様</p>
                        <p>HP Templates 代表の鈴木です。<br>
                        この度は、Standard Plan（テンプレート）をご購入いただき、誠にありがとうございます。</p>
                        <br>
                        <p>以下の内容で注文を受け付けいたしました。</p>
                        <hr>
                        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00f2ff; margin: 0;">
                            <p><strong>商品名:</strong> ${productName}</p>
                            <p><strong>テンプレート:</strong> ${templateName || '未選択'}</p>
                            <p><strong>ドメイン希望:</strong> ${domainName || 'なし'}</p>
                            <p><strong>メッセージ:</strong><br>${userMessage.replace(/\n/g, '<br>')}</p>
                        </blockquote>
                        <hr>
                        <br>
                        <h3>【今後の流れ】</h3>
                        <p>内容を確認し、通常24時間以内に私（鈴木）よりメールにてご連絡差し上げます。<br>
                        ドメイン・サーバー設定代行等の手続きについてご案内いたします。</p>
                        <br>
                        <p>今後ともHP Templatesをよろしくお願いいたします。</p>
                        <br>
                        <p>--------------------------------------------------<br>
                        HP Templates<br>
                        代表: 鈴木<br>
                        URL: <a href="https://hp-templates.com/">https://hp-templates.com/</a><br>
                        --------------------------------------------------</p>
                    `
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Email Sending Failed:', errorData);
            } else {
                console.log('Email sent successfully');
            }
        }
    }

    return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
