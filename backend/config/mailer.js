const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail({ toEmail, userName, serviceName, price }) {
  const mailOptions = {
    from: `"CareEase" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your CareEase Request is Confirmed! ✅`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background-color: #f0f4f8; border-radius: 12px;">
        
        <h1 style="color: #4A90D9; text-align: center;">CareEase 🤝</h1>
        
        <div style="background-color: #ffffff; border-radius: 12px; padding: 24px; margin-top: 16px;">
          <h2 style="color: #2d3748;">Hi ${userName}! 👋</h2>
          <p style="color: #718096;">Your service request has been successfully submitted. Here are your details:</p>
          
          <div style="background-color: #f7fafc; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 8px 0; color: #2d3748;"><strong>Service:</strong> ${serviceName}</p>
            <p style="margin: 8px 0; color: #2d3748;"><strong>Status:</strong> Pending</p>
            <p style="margin: 8px 0; color: #4A90D9; font-size: 18px;"><strong>Amount to Pay:</strong> ₹${price}</p>
          </div>

          <p style="color: #718096; font-size: 13px;">
            💡 Payment will be collected after the service is completed.
            We will get in touch with you shortly.
          </p>
        </div>

        <p style="text-align: center; color: #a0aec0; font-size: 12px; margin-top: 24px;">
          Thank you for choosing CareEase ❤️
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendConfirmationEmail;