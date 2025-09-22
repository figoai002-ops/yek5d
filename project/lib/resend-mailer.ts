import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(order: any) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'YEKLAB <onboarding@resend.dev>',
      to: [order.customerInfo.email],
      cc: ['y.emrekaranfil@yeklab.com'],
      subject: `Sipariş Onayı - ${order.id} - YEKLAB`,
      html: createOrderEmailTemplate(order),
    });

    if (error) {
      console.error('Resend mail error:', error);
      return { success: false, error };
    }

    console.log('Mail başarıyla gönderildi:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    return { success: false, error };
  }
}

function createOrderEmailTemplate(order: any) {
  const itemsHtml = order.items.map((item: any) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left;">
        <div style="display: flex; align-items: center;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 12px;">
          <div>
            <div style="font-weight: 600; color: #1f2937;">${item.name}</div>
            <div style="font-size: 14px; color: #6b7280;">Adet: ${item.qty}</div>
          </div>
        </div>
      </td>
      <td style="padding: 12px; text-align: right; font-weight: 600; color: #1f2937;">
        ₺${(item.price * item.qty).toLocaleString('tr-TR')}
      </td>
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
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">YEKLAB</h1>
          <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Laboratuvar Cihazları ve Ekipmanları</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Success Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; border-radius: 50px; font-weight: bold; margin-bottom: 16px;">
              ✅ Siparişiniz Alındı!
            </div>
            <h2 style="margin: 0; color: #1f2937; font-size: 24px;">Teşekkür ederiz!</h2>
            <p style="margin: 8px 0 0 0; color: #6b7280;">Siparişinizi en kısa sürede hazırlayacağız.</p>
          </div>

          <!-- Order Info -->
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Sipariş No</div>
                <div style="font-weight: bold; color: #1f2937; font-family: monospace;">${order.id}</div>
              </div>
              <div>
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Tarih</div>
                <div style="font-weight: bold; color: #1f2937;">${new Date(order.createdAt).toLocaleDateString('tr-TR')}</div>
              </div>
            </div>
            <div>
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Müşteri</div>
              <div style="font-weight: bold; color: #1f2937;">${order.customerInfo.firstName} ${order.customerInfo.lastName}</div>
              <div style="color: #6b7280;">${order.customerInfo.email}</div>
            </div>
          </div>

          <!-- Order Items -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">📦 Sipariş Detayları</h3>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 16px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Ürün</th>
                  <th style="padding: 16px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Tutar</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <!-- Total -->
          <div style="background-color: #3b82f6; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <div style="color: white; font-size: 16px; margin-bottom: 4px;">Toplam Tutar</div>
            <div style="color: white; font-size: 32px; font-weight: bold;">₺${order.totals.total.toLocaleString('tr-TR')}</div>
          </div>

          <!-- Delivery Info -->
          <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
            <h4 style="margin: 0 0 12px 0; color: #1f2937; display: flex; align-items: center;">
              🚚 Teslimat Bilgileri
            </h4>
            <div style="color: #6b7280; line-height: 1.6;">
              • Siparişiniz 3 iş günü içerisinde kargolanacaktır<br>
              • Kargo takip numaranız SMS ile bildirilecektir<br>
              • Teslimat adresi: ${order.customerInfo.address}
            </div>
          </div>

          <!-- Contact Info -->
          <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 12px;">
            <div style="color: #1f2937; font-weight: 600; margin-bottom: 8px;">İletişim</div>
            <div style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              📧 y.emrekaranfil@yeklab.com<br>
              📱 WhatsApp: +90 530 890 66 13<br>
              🌐 www.yeklab.com
            </div>
          </div>

        </div>

      </div>

    </body>
    </html>
  `;
}