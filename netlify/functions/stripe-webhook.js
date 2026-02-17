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
                    from: '"HP Templates 制作チーム" <' + process.env.GMAIL_USER + '>',
                    to: customerEmail,
                    cc: process.env.GMAIL_USER, // Also send a copy to yourself
                    subject: '【HP Templates】ご注文ありがとうございます（担当者よりご連絡いたします）',
                    html: `
                        <p>${customerName} 様</p>
                        <p>この度は、HP Templatesをご利用いただき、誠にありがとうございます。<br>
                        制作チーム代表でございます。</p>
                        <p><strong>${productName}</strong> の決済を確認いたしました。心より感謝申し上げます。</p>
                        <p>これより、お客様の現在の環境（サーバー契約の有無やドメイン取得状況など）に合わせて、最適な導入手順をご案内させていただきます。</p>
                        <h3>【今後の流れ】</h3>
                        <ol>
                            <li><strong>担当者からのご連絡（ヒアリング）</strong><br>
                            通常24時間以内に、担当者（制作チーム代表）より別途メールにてご連絡を差し上げます。<br>
                            その際、ドメインの状況やサーバーのご希望等について簡単にお伺いさせていただきます。<br>
                            （※既にサーバーをお持ちの場合なども柔軟に対応可能です）</li>
                            <li><strong>設定・構築</strong><br>
                            ヒアリング内容に基づき、サーバー環境の構築やドメイン接続を行います。</li>
                            <li><strong>納品・公開</strong></li>
                        </ol>
                        <p>まずは担当者からの連絡を今しばらくお待ちください。<br>
                        （お急ぎの場合や補足事項がある場合は、このメールに直接ご返信いただいても構いません。代表が直接確認いたします）</p>
                        <hr>
                        <p>HP Templates 制作チーム<br>
                        URL: <a href="https://kuro-web-design.netlify.app/">https://kuro-web-design.netlify.app/</a></p>
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
