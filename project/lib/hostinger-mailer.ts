import nodemailer from 'nodemailer';
import { ImapFlow } from 'imapflow';

// YekLab SMTP Configuration
export const hostingerTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.hostinger.com
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // STARTTLS for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Function with detailed debugging
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    console.log('🔄 Starting email send process...');
    console.log('📧 Email config:', {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT
    });

    // First verify SMTP connection
    console.log('🔗 Verifying SMTP connection...');
    await hostingerTransporter.verify();
    console.log('✅ SMTP connection verified successfully');

    const mailOptions = {
      from: `"YEKLAB" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    console.log('📤 Sending email with options:', mailOptions);
    const info = await hostingerTransporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    console.log('📋 Response:', info.response);
    
    return { 
      success: true, 
      messageId: info.messageId,
      response: info.response 
    };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    const errorAny = error as any;
    console.error('🔍 Error details:', {
      code: errorAny?.code,
      response: errorAny?.response,
      responseCode: errorAny?.responseCode,
      command: errorAny?.command
    });
    
    return { 
      success: false, 
      error: errorAny?.message || String(error),
      details: {
        code: errorAny?.code,
        responseCode: errorAny?.responseCode,
        command: errorAny?.command
      }
    };
  }
}

// Gmail IMAP Configuration
const imapConfig = {
  host: process.env.IMAP_HOST || 'imap.gmail.com',
  port: parseInt(process.env.IMAP_PORT || '993'),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

// Read Inbox Function
export async function readInbox(limit: number = 10) {
  let client: ImapFlow | null = null;
  
  try {
    client = new ImapFlow(imapConfig);
    
    // Connect to IMAP server
    await client.connect();
    console.log('Connected to IMAP server');

    // Select INBOX
    await client.mailboxOpen('INBOX');
    
    // Search for messages (latest first)
    const messages = client.fetch('1:*', {
      envelope: true,
      flags: true,
      bodyStructure: true,
      uid: true,
    }, {
      uid: true
    });

    const emails: any[] = [];
    let count = 0;

    for await (let message of messages) {
      if (count >= limit) break;
      
      emails.push({
        uid: message.uid,
        subject: message.envelope?.subject || 'No Subject',
        from: message.envelope?.from?.[0]?.address || 'Unknown',
        fromName: message.envelope?.from?.[0]?.name || 'Unknown',
        date: message.envelope?.date || new Date(),
        flags: message.flags || [],
        seen: message.flags ? Array.from(message.flags).includes('\\Seen') : false,
      });
      
      count++;
    }

    // Sort by date (newest first)
    emails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return emails.slice(0, limit);
    
  } catch (error) {
    console.error('IMAP error:', error);
    throw error;
  } finally {
    if (client) {
      await client.logout();
    }
  }
}

// Create test email template
export function createTestEmailTemplate(recipientEmail: string) {
  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Email - YEKLAB</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; color: white; font-size: 28px;">✅ YEKLAB TEST EMAIL</h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9);">Hostinger Email Integration Test</p>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">📧 Email Test Successful!</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; color: #1f2937;">Test Details:</h3>
          <p style="margin: 5px 0;"><strong>From:</strong> ${process.env.EMAIL_USER}</p>
          <p style="margin: 5px 0;"><strong>To:</strong> ${recipientEmail}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString('tr-TR')}</p>
          <p style="margin: 5px 0;"><strong>Server:</strong> Hostinger SMTP</p>
        </div>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0; color: #28a745; font-weight: bold;">✅ Hostinger Email Integration Working Successfully!</p>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #6b7280; font-size: 14px;">
            Bu email Hostinger SMTP servisi üzerinden gönderilmiştir.<br>
            YEKLAB - Laboratuvar Cihazları ve Ekipmanları
          </p>
        </div>

      </div>

    </body>
    </html>
  `;
}

// Sipariş onay maili template'i
export function createOrderConfirmationEmail(order: any) {
  const itemsHtml = order.items.map((item: any) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₺${item.price.toLocaleString('tr-TR')}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₺${(item.price * item.qty).toLocaleString('tr-TR')}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sipariş Onayı - YEKLAB</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">YEKLAB</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Laboratuvar Cihazları ve Ekipmanları</p>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        
        <h2 style="color: #2c3e50; margin-bottom: 20px;">✅ Siparişiniz Alındı!</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #28a745;">
          <p><strong>Sipariş No:</strong> ${order.id}</p>
          <p><strong>Tarih:</strong> ${new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
          <p><strong>Müşteri:</strong> ${order.customerInfo.firstName} ${order.customerInfo.lastName}</p>
          <p><strong>E-posta:</strong> ${order.customerInfo.email}</p>
          <p><strong>Telefon:</strong> ${order.customerInfo.phone}</p>
        </div>

        <h3 style="color: #2c3e50; margin-bottom: 15px;">📦 Sipariş Detayları</h3>
        
        <table style="width: 100%; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: #3498db; color: white;">
              <th style="padding: 12px 8px; text-align: left;">Ürün</th>
              <th style="padding: 12px 8px; text-align: left;">Ad</th>
              <th style="padding: 12px 8px; text-align: center;">Adet</th>
              <th style="padding: 12px 8px; text-align: right;">Birim Fiyat</th>
              <th style="padding: 12px 8px; text-align: right;">Toplam</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #2c3e50;">
            <span>GENEL TOPLAM:</span>
            <span style="color: #e74c3c;">₺${order.totals.total.toLocaleString('tr-TR')}</span>
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h4 style="color: #2c3e50; margin-bottom: 10px;">🚚 Kargo Bilgileri</h4>
          <p style="margin: 5px 0;">• Siparişiniz 3 gün içerisinde kargolanacaktır</p>
          <p style="margin: 5px 0;">• Kargo takip numaranız SMS ile bildirilecektir</p>
          <p style="margin: 5px 0;">• Teslimat adresi: ${order.customerInfo.address}</p>
        </div>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
          <p style="margin: 0; color: #28a745; font-weight: bold;">Siparişiniz için teşekkür ederiz! 🙏</p>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Herhangi bir sorunuz için bizimle iletişime geçebilirsiniz.</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0; font-size: 14px; color: #666;">
            <strong>YEKLAB Laboratuvar Cihazları</strong><br>
            📧 info@yeklab.com | 📱 WhatsApp: +90 530 890 66 13<br>
            🌐 <a href="https://yeklab.com" style="color: #3498db;">www.yeklab.com</a>
          </p>
        </div>

      </div>

    </body>
    </html>
  `;
}

// Havale ödemesi için özel email template'i
export function createBankTransferOrderEmail(order: any) {
  const itemsHtml = order.items.map((item: any) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₺${item.price.toLocaleString('tr-TR')}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₺${(item.price * item.qty).toLocaleString('tr-TR')}</td>
    </tr>
  `).join('');

  // %3 havale indirimi hesapla
  const discountAmount = order.totals.total * 0.03;
  const finalAmount = order.totals.total - discountAmount;

  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sipariş Oluşturuldu - YEKLAB</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">YEKLAB</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Laboratuvar Cihazları ve Ekipmanları</p>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        
        <h2 style="color: #e67e22; margin-bottom: 20px;">🏦 Siparişiniz Oluşturuldu - Ödeme Bekleniyor</h2>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #856404; margin: 0 0 10px 0;">⏳ Ödeme Bekleniyor</h3>
          <p style="margin: 0; color: #856404;">
            Siparişiniz oluşturulmuştur. Aşağıdaki banka bilgilerine ödemenizi yaptıktan sonra siparişiniz onaylanacak ve kargoya verilecektir.
          </p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #e67e22;">
          <p><strong>Sipariş No:</strong> ${order.id}</p>
          <p><strong>Tarih:</strong> ${new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
          <p><strong>Müşteri:</strong> ${order.customerInfo.firstName} ${order.customerInfo.lastName}</p>
          <p><strong>E-posta:</strong> ${order.customerInfo.email}</p>
          <p><strong>Telefon:</strong> ${order.customerInfo.phone}</p>
        </div>

        <h3 style="color: #2c3e50; margin-bottom: 15px;">📦 Sipariş Detayları</h3>
        
        <table style="width: 100%; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: #3498db; color: white;">
              <th style="padding: 12px 8px; text-align: left;">Ürün</th>
              <th style="padding: 12px 8px; text-align: left;">Ad</th>
              <th style="padding: 12px 8px; text-align: center;">Adet</th>
              <th style="padding: 12px 8px; text-align: right;">Birim Fiyat</th>
              <th style="padding: 12px 8px; text-align: right;">Toplam</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Ara Toplam:</span>
            <span>₺${order.totals.total.toLocaleString('tr-TR')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #27ae60;">
            <span>Havale İndirimi (%3):</span>
            <span>-₺${discountAmount.toLocaleString('tr-TR')}</span>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #2c3e50;">
            <span>ÖDENECEK TUTAR:</span>
            <span style="color: #e74c3c;">₺${finalAmount.toLocaleString('tr-TR')}</span>
          </div>
        </div>

        <!-- IBAN Bilgileri -->
        <div style="background: #e8f5e8; border: 2px solid #27ae60; padding: 25px; border-radius: 8px; margin-top: 25px;">
          <h3 style="color: #27ae60; margin: 0 0 15px 0; text-align: center;">🏦 BANKA HESAP BİLGİLERİ</h3>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h4 style="color: #2c3e50; margin: 0 0 10px 0;">💳 Ziraat Bankası</h4>
            <p style="margin: 5px 0;"><strong>Hesap Sahibi:</strong> YEKLAB Laboratuvar Cihazları</p>
            <p style="margin: 5px 0;"><strong>IBAN:</strong> TR98 0001 0017 4578 9512 3456 78</p>
            <p style="margin: 5px 0;"><strong>Şube Kodu:</strong> 1745</p>
            <p style="margin: 5px 0;"><strong>Hesap No:</strong> 78951234-5678</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h4 style="color: #2c3e50; margin: 0 0 10px 0;">💳 İş Bankası</h4>
            <p style="margin: 5px 0;"><strong>Hesap Sahibi:</strong> YEKLAB Laboratuvar Cihazları</p>
            <p style="margin: 5px 0;"><strong>IBAN:</strong> TR53 0006 4000 0011 2345 6789 01</p>
            <p style="margin: 5px 0;"><strong>Şube Kodu:</strong> 1234</p>
            <p style="margin: 5px 0;"><strong>Hesap No:</strong> 1234567890</p>
          </div>
        </div>

        <!-- Ödeme Talimatları -->
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h4 style="color: #856404; margin: 0 0 10px 0;">📋 ÖNEMLİ ÖDEME TALİMATLARI</h4>
          <ul style="color: #856404; margin: 0; padding-left: 20px;">
            <li><strong>Açıklama kısmına mutlaka sipariş numaranızı (${order.id}) yazınız</strong></li>
            <li>Ödeme tutarı: <strong>₺${finalAmount.toLocaleString('tr-TR')}</strong> (Havale indirimi dahil)</li>
            <li>Ödeme sahibinin adı sipariş sahibi ile aynı olmalıdır</li>
            <li>Ödeme onayı için dekont fotoğrafını WhatsApp'tan gönderebilirsiniz</li>
            <li>Ödemeniz 1 iş günü içerisinde kontrol edilecektir</li>
          </ul>
        </div>

        <!-- İletişim Bilgileri -->
        <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h4 style="color: #2c3e50; margin-bottom: 10px;">📞 İletişim & Destek</h4>
          <p style="margin: 5px 0;">📱 <strong>WhatsApp:</strong> +90 530 890 66 13</p>
          <p style="margin: 5px 0;">📧 <strong>E-posta:</strong> info@yeklab.com</p>
          <p style="margin: 5px 0;">🕐 <strong>Çalışma Saatleri:</strong> Hafta içi 09:00-18:00</p>
          <p style="margin: 5px 0; font-size: 14px; color: #666;">
            Ödeme sonrası dekont fotoğrafını WhatsApp'tan göndererek süreci hızlandırabilirsiniz.
          </p>
        </div>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center; border-left: 4px solid #3498db;">
          <p style="margin: 0; color: #2c3e50; font-weight: bold;">💼 Profesyonel İşbirliği İçin Teşekkürler!</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">Ödemeniz alındıktan sonra siparişiniz aynı gün kargoya verilecektir.</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0; font-size: 14px; color: #666;">
            <strong>YEKLAB Laboratuvar Cihazları</strong><br>
            📧 info@yeklab.com | 📱 WhatsApp: +90 530 890 66 13<br>
            🌐 <a href="https://yeklab.com" style="color: #3498db;">www.yeklab.com</a>
          </p>
        </div>

      </div>

    </body>
    </html>
  `;
}