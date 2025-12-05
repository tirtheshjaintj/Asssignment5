const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});


async function sendMail(subject, receiver, message) {
    const mailOptions = {
        from: `"Imarticus Learning Team" <${process.env.GMAIL_USER}>`,
        to: receiver,
        subject,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
                    <h1 style="margin:0;">Imarticus Learning</h1>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px;">Hello,</p>
                    <p style="font-size: 16px;">${message}</p>
                    <p style="font-size: 16px;">Thank you for being part of the Imarticus Learning community.</p>
                    <p style="font-size: 16px;">&mdash; Imarticus Learning Team</p>
                </div>
                <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666;">
                    <p style="margin:0;">&copy; ${new Date().getFullYear()} Imarticus Learning. All rights reserved.</p>
                </div>
            </div>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        //console.log('Mail sent to:', receiver);
        return true;
    } catch (error) {
        console.error('Error sending mail:', error);
        return false;
    }
}

module.exports = sendMail;
