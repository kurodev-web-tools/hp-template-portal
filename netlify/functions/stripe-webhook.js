const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const sig = event.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        if (endpointSecret) {
            stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
        } else {
            // Local fallback (INSECURE - for dev only)
            if (process.env.NETLIFY_DEV === 'true') {
                console.warn('Skipping signature verification in local dev (no secret set)');
                stripeEvent = JSON.parse(event.body);
            } else {
                return { statusCode: 400, body: 'Missing Stripe Webhook Secret' };
            }
        }
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name || 'お客様';
        const productName = session.metadata?.productName || 'Standard Plan';
        const templateName = session.metadata?.template;
        const domainName = session.metadata?.domain;
        const userMessage = session.metadata?.message || '(なし)';

        console.log(`Payment successful: ${session.id}, Email: ${customerEmail}`);

        if (customerEmail) {
            // Gmail Transporter Configuration
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });

            try {
                const info = await transporter.sendMail({
                    from: '"HP Templates 代表" <' + process.env.GMAIL_USER + '>',
                    to: customerEmail,
                    cc: process.env.GMAIL_USER, // Also send a copy to yourself
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
                        URL: <a href="https://kuro-web-design.netlify.app/">https://kuro-web-design.netlify.app/</a><br>
                        --------------------------------------------------</p>
                    `,
                });

                console.log('Email sent successfully:', info.messageId);
            } catch (emailErr) {
                console.error('Email Sending Failed:', emailErr);
            }
        }
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
