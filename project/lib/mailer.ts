import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || "y.emrekaranfil@yeklab.com",
    pass: process.env.EMAIL_PASS || "jvka ekjr uxkg sfro"
  },
});

// Mail gönderim fonksiyonu
export async function sendMail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: `"YEKLAB" <${process.env.EMAIL_USER || "y.emrekaranfil@yeklab.com"}>`,
      to,
      subject,
      html,
    });
    console.log(`Mail başarıyla gönderildi: ${to}`);
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    throw error;
  }
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