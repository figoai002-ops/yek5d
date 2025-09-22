// Basit test mailer - demo amaçlı
export async function sendTestMail(to: string, subject: string, html: string) {
  // Gerçek mail gönderimi yerine console log
  console.log('=== TEST MAIL ===');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('HTML:', html.substring(0, 200) + '...');
  console.log('=================');
  
  // Mail gönderilmiş gibi davran
  return Promise.resolve(true);
}

export function createSimpleOrderEmail(order: any) {
  return `
    <h1>Sipariş Onayı - ${order.id}</h1>
    <p>Sayın ${order.customerInfo.firstName} ${order.customerInfo.lastName},</p>
    <p>Siparişiniz başarıyla alınmıştır.</p>
    <p><strong>Toplam:</strong> ₺${order.totals.total.toLocaleString('tr-TR')}</p>
    <p>Teşekkür ederiz!</p>
  `;
}