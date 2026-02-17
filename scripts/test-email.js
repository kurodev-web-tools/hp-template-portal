require('dotenv').config();
const nodemailer = require('nodemailer');

async function main() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    console.log('Testing Gmail connection for:', process.env.GMAIL_USER);

    try {
        const info = await transporter.sendMail({
            from: `"Test HP Portal" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Send to self
            subject: "Test Email from HP Portal Dev",
            text: "This is a test email to verify your App Password and Gmail configuration works correctly.",
        });

        console.log("✅ Email sent successfully!");
        console.log("Message ID:", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("❌ Email failed to send.");
        console.error(error);
    }
}

main();
