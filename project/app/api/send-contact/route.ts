import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();
    const { name, phone, email, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçersiz email adresi' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Yeni İletişim Formu Mesajı - YEKLAB</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #2563eb; }
        .label { font-weight: bold; color: #374151; margin-bottom: 5px; }
        .value { color: #6b7280; }
        .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d1d5db; }
        .footer { background: #374151; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 YEKLAB İletişim Formu</h1>
            <p>Yeni müşteri mesajı alındı</p>
        </div>
        
        <div class="content">
            <div class="info-row">
                <div class="label">👤 Müşteri Adı:</div>
                <div class="value">${name}</div>
            </div>
            
            <div class="info-row">
                <div class="label">📧 Email Adresi:</div>
                <div class="value">${email}</div>
            </div>
            
            <div class="info-row">
                <div class="label">📱 Telefon Numarası:</div>
                <div class="value">${phone}</div>
            </div>
            
            <div class="message-box">
                <div class="label">💬 Mesaj İçeriği:</div>
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="info-row">
                <div class="label">🕐 Gönderim Zamanı:</div>
                <div class="value">${new Date().toLocaleString('tr-TR', { 
                  timeZone: 'Europe/Istanbul',
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Bu mesaj YEKLAB web sitesi iletişim formu aracılığıyla gönderilmiştir.</p>
            <p>Müşteriyle iletişime geçmek için yukarıdaki bilgileri kullanabilirsiniz.</p>
        </div>
    </div>
</body>
</html>
    `;

    // Configure YekLab SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"YEKLAB İletişim Formu" <${process.env.EMAIL_USER}>`,
      to: 'y.emrekaranfil@yeklab.com',
      subject: `🧪 YEKLAB İletişim Formu - ${name}`,
      html: emailContent,
    });

    // Store in localStorage on client side if needed
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}