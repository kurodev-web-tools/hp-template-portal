import { z } from 'zod';

const sanitizeHtml = (str) => {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const formSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    message: z.string().optional(),
    category: z.string().optional(),
    'form-name': z.string().optional(),
    form_name: z.string().optional(),
    b_none: z.string().optional(),
    attachments: z.array(z.any()).optional()
});

export const onRequestPost = async (context) => {
    try {
        const body = await context.request.json();
        const { payload } = body;

        // Security: Strict Origin/Referer Validation (Anti-CSRF/Spam)
        const requestOrigin = new URL(context.request.url).origin;
        const referer = context.request.headers.get('Referer');
        if (referer && !referer.startsWith(requestOrigin)) {
            console.warn('Blocked request from unknown referer:', referer);
            return new Response(JSON.stringify({ error: 'Invalid origin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
        }

        const data = body.payload || body; // Fallback

        // Security: Strict Schema Validation
        const parseResult = formSchema.safeParse(data);
        if (!parseResult.success) {
            return new Response(JSON.stringify({ error: 'Validation failed' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        const validData = parseResult.data;

        // 1. Honeypot check
        if (validData.b_none && validData.b_none.trim() !== "") {
            console.warn('Bot detected via honeypot');
            return new Response(JSON.stringify({ success: true, message: 'Processed' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const formName = validData['form-name'] || validData.form_name;
        const customerEmail = validData.email;
        const customerName = sanitizeHtml(validData.name || 'お客様');
        const customerMessage = sanitizeHtml(validData.message || '(本文なし)');
        const category = validData.category ? `<p><strong>カテゴリ:</strong> ${sanitizeHtml(validData.category)}</p>` : '';
        const attachments = validData.attachments || [];

        // Determine Subject and Context
        let emailSubject = '';
        let emailContext = '';

        if (formName === 'premium-order') {
            emailSubject = '【HP Templates】お問い合わせありがとうございます (Premium Plan)';
            emailContext = 'Premium Plan（フルオーダー制作）へのお問い合わせをいただき、誠にありがとうございます。';
        } else if (formName === 'general-contact') {
            emailSubject = '【HP Templates】お問い合わせありがとうございます';
            emailContext = 'HP Templatesへのお問い合わせ、誠にありがとうございます。';
        } else {
            return new Response(JSON.stringify({ error: 'Skipped', reason: 'Unknown form name', receivedName: formName }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!customerEmail) {
            return new Response('No email found', { status: 400 });
        }

        // Send Email via Resend
        // Send Email via Resend
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'HP Templates <support@kuro-lab.com>', // Use verified domain or onboarding for dev
                to: [customerEmail], // For dev/onboarding, this MUST be the verified account email
                bcc: ['kurodev.web.tools@gmail.com'],
                subject: emailSubject,
                attachments: attachments,
                html: `
            <p>${customerName} 様</p>
            <p>HP Templates 代表の鈴木です。<br>
            ${emailContext}</p>
            <br>
            <p>以下の内容で受け付けいたしました。</p>
            <hr>
            <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ccc; margin: 0;">
                <p><strong>お名前:</strong> ${customerName}</p>
                <p><strong>メールアドレス:</strong> ${customerEmail}</p>
                ${category}
                <p><strong>お問い合わせ内容:</strong><br>${customerMessage.replace(/\n/g, '<br>')}</p>
            </blockquote>
            <hr>
            <br>
            <h3>【今後の流れ】</h3>
            <p>通常2営業日以内に、私（鈴木）よりメールにて折り返しご連絡差し上げます。<br>
            （※内容によっては、お時間をいただく場合やお答えできない場合もございますのでご了承ください）</p>
            <p>今しばらくお待ちくださいませ。</p>
            <br>
            <p>--------------------------------------------------<br>
            HP Templates<br>
            代表: 鈴木<br>
            URL: <a href="https://hp-templates.com/">https://hp-templates.com/</a><br>
            --------------------------------------------------</p>
        `
            })
        });

        let successData = null;

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Resend Error:', JSON.stringify(errorData));
            throw new Error(`Resend API Error: ${res.status} ${res.statusText} - ${JSON.stringify(errorData)}`);
        } else {
            successData = await res.json();
            console.log('Resend Success:', JSON.stringify(successData));
        }

        const securityHeaders = {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
        };

        return new Response(JSON.stringify({
            success: true,
            message: 'Auto-reply sent',
            resendData: successData
        }), {
            status: 200,
            headers: securityHeaders
        });

    } catch (error) {
        console.error('Form Submit Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff' }
        });
    }
};
