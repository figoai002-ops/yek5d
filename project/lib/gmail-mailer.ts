import nodemailer from "nodemailer";

// Gmail SMTP konfigürasyonu
export const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // yourname@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password
  },
});

export async function sendGmailMail(to: string, subject: string, html: string) {
  try {
    await gmailTransporter.sendMail({
      from: `"YEKLAB" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Gmail mail gönderildi: ${to}`);
  } catch (error) {
    console.error('Gmail mail hatası:', error);
    throw error;
  }
}