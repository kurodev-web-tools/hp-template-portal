const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only Trigger on POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const { payload } = body;

        // Determine Subject and Context based on Form Name
        let emailSubject = '';
        let emailContext = '';

        if (payload.form_name === 'premium-order') {
            emailSubject = '【HP Templates】お問い合わせありがとうございます (Premium Plan)';
            emailContext = 'Premium Plan（フルオーダー制作）へのお問い合わせをいただき、誠にありがとうございます。';
        } else if (payload.form_name === 'general-contact') {
            emailSubject = '【HP Templates】お問い合わせありがとうございます';
            emailContext = 'HP Templatesへのお問い合わせ、誠にありがとうございます。';
        } else {
            console.log('Skipping auto-reply for:', payload.form_name);
            return { statusCode: 200, body: 'Skipped' };
        }

        const customerEmail = payload.email;
        const customerName = payload.name || 'お客様';
        // Handle different field names (data.message vs message)
        const customerMessage = payload.data.message || payload.human_fields?.Message || '(本文なし)';
        // Extract category for general contact if available
        const category = payload.data.category ? `<p><strong>カテゴリ:</strong> ${payload.data.category}</p>` : '';

        if (!customerEmail) {
            console.error('No email found in submission');
            return { statusCode: 400, body: 'No email found' };
        }

        // Configure Transporter (Same as Stripe Webhook)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Email Options
        const mailOptions = {
            from: '"HP Templates 代表" <' + process.env.GMAIL_USER + '>',
            to: customerEmail,
            cc: process.env.GMAIL_USER, // Admin copy
            subject: emailSubject,
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
                URL: <a href="https://kuro-web-design.netlify.app/">https://kuro-web-design.netlify.app/</a><br>
                --------------------------------------------------</p>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        console.log(`Auto-reply sent to ${customerEmail}`);

        return { statusCode: 200, body: 'Auto-reply sent successfully' };

    } catch (error) {
        console.error('Auto-reply Error:', error);
        return { statusCode: 500, body: `Error: ${error.message}` };
    }
};
