import type { Order } from '@/types/ecom';
import { tl } from './format';
import { pushEmail } from './storage';

// Sipariş onay e-postası
export function renderOrderConfirmationEmail(order: Order): string {
  return `
<html>
<head><title>Sipariş Onayı</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
    <h1 style="color: #1f2937;">✅ Sipariş Onayı</h1>
    <p><strong>Sipariş No:</strong> ${order.id}</p>
    <p><strong>Tarih:</strong> ${new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
    
    <h2>Ürünler</h2>
    ${order.items.map(item => `
      <div style="border: 1px solid #ddd; padding: 10px; margin: 5px 0;">
        <strong>${item.name}</strong><br>
        Adet: ${item.qty} × ${tl(item.price)} = ${tl(item.price * item.qty)}
      </div>
    `).join('')}
    
    <div style="background: #f9f9f9; padding: 15px; margin: 20px 0;">
      <p>Ara Toplam: ${tl(order.totals.subtotal)}</p>
      <p>Kargo: ${order.totals.shipping === 0 ? 'Ücretsiz' : tl(order.totals.shipping)}</p>
      <h3 style="color: #dc2626;">TOPLAM: ${tl(order.totals.total)}</h3>
    </div>
    
    <h2>Teslimat Bilgileri</h2>
    <p><strong>Ad Soyad:</strong> ${order.customerInfo.firstName} ${order.customerInfo.lastName}</p>
    <p><strong>E-posta:</strong> ${order.customerInfo.email}</p>
    <p><strong>Telefon:</strong> ${order.customerInfo.phone}</p>
    <p><strong>Adres:</strong> ${order.customerInfo.address}, ${order.customerInfo.city}</p>
    
    <hr style="margin: 30px 0;">
    <p style="text-align: center; color: #666;">
      <strong>YEKLAB</strong> - Telefon: 0530 890 66 13
    </p>
  </div>
</body>
</html>`;
}

// Ödeme onay e-postası
export function renderOrderPaidEmail(order: Order): string {
  return `
<html>
<head><title>Ödeme Onayı</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f0f9ff;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
    <h1 style="color: #059669;">🎉 Ödeme Başarılı!</h1>
    <p><strong>Sipariş No:</strong> ${order.id}</p>
    <h2 style="color: #dc2626;">Tutar: ${tl(order.totals.total)}</h2>
    
    <div style="background: #f0fdf4; padding: 15px; margin: 20px 0; border-radius: 6px;">
      <p>✅ Siparişiniz hazırlanıyor</p>
      <p>📦 Kargo takip numaranız SMS ile gönderilecek</p>
    </div>
    
    <hr style="margin: 30px 0;">
    <p style="text-align: center; color: #666;">
      <strong>YEKLAB</strong> - Telefon: 0530 890 66 13
    </p>
  </div>
</body>
</html>`;
}

// HTML dosyası indirme
export function downloadEmailAsHtml(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// E-posta kaydı
interface SaveEmailParams {
  id: string;
  type: 'order_confirmation' | 'payment_confirmation';
  to: string;
  subject: string;
  html: string;
}

export function saveEmailToLocal(params: SaveEmailParams): void {
  pushEmail({
    ...params,
    createdAt: new Date().toISOString()
  });
}
