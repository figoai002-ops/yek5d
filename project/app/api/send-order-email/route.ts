import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createOrderConfirmationEmail, createBankTransferOrderEmail } from '@/lib/hostinger-mailer';

// Cache için gönderilen e-maileleri sakla
const sentEmails = new Map<string, number>();

// Cache temizleme - 10 dakikada bir eski kayıtları sil
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(sentEmails.entries());
  for (const [key, timestamp] of entries) {
    if (now - timestamp > 600000) { // 10 dakika = 600000ms
      sentEmails.delete(key);
    }
  }
}, 300000); // Her 5 dakikada bir temizle

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Duplicate gönderim kontrolü - 5 dakika içinde aynı sipariş için mail gönderilmişse skip et
    const emailKey = `${orderData.id}_${orderData.customerInfo.email}`;
    const now = Date.now();
    const lastSent = sentEmails.get(emailKey);
    
    if (lastSent && (now - lastSent) < 300000) { // 5 dakika = 300000ms
      console.log(`Duplicate e-mail engellendi: ${emailKey}`);
      return NextResponse.json({ 
        success: true, 
        message: 'E-mail zaten gönderildi (duplicate engellendi)' 
      });
    }
    
    // Bu sipariş için e-mail gönderiliyor olarak işaretle
    sentEmails.set(emailKey, now);
    
    console.log(`🔄 Starting email send process...`);
    console.log(`📧 Email config: {
  from: '${process.env.EMAIL_USER}',
  to: '${orderData.customerInfo.email}',
  subject: 'Sipariş ${orderData.paymentMethod === 'bank-transfer' ? 'Oluşturuldu - Ödeme Bekleniyor' : 'Onayı'}',
  smtpHost: '${process.env.SMTP_HOST}',
  smtpPort: '${process.env.SMTP_PORT}'
}`);
    
    // Ödeme yöntemine göre doğru template'i seç
    const isCardPayment = orderData.paymentMethod === 'card' || orderData.paymentMethod === 'creditCard';
    const isBankTransfer = orderData.paymentMethod === 'bank-transfer' || orderData.paymentMethod === 'bankTransfer';
    
    let emailHtml: string;
    let emailSubject: string;
    
    if (isBankTransfer) {
      // Havale ödemesi için özel template
      emailHtml = createBankTransferOrderEmail(orderData);
      emailSubject = `Sipariş Oluşturuldu - Ödeme Bekleniyor - ${orderData.id} - YEKLAB`;
    } else {
      // Kart ödemesi için standart onay template'i
      emailHtml = createOrderConfirmationEmail(orderData);
      emailSubject = `Sipariş Onayı - ${orderData.id} - YEKLAB`;
    }
    
    // Müşteriye sipariş maili gönder (havale veya onay)
    const customerResult = await sendEmail(
      orderData.customerInfo.email,
      emailSubject,
      emailHtml
    );

    if (!customerResult.success) {
      console.error('Müşteri email hatası:', customerResult.error);
      return NextResponse.json(
        { error: 'Müşteri emaili gönderilemedi: ' + customerResult.error },
        { status: 500 }
      );
    }

    // Yöneticiye de bildirim gönder  
    const paymentMethodText = isBankTransfer ? "🏦 Havale/EFT (Ödeme Bekliyor)" : "💳 Kredi Kartı (Ödenmiş)";
    const adminEmailTitle = isBankTransfer ? `Yeni Havale Siparişi - ${orderData.id}` : `Yeni Sipariş - ${orderData.id}`;
    
    const adminResult = await sendEmail(
      'y.emrekaranfil@yeklab.com',
      adminEmailTitle,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50;">📦 Yeni Sipariş Alındı</h2>
          <div style="background: ${isBankTransfer ? '#fff3cd' : '#d1ecf1'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${isBankTransfer ? '#ffc107' : '#17a2b8'};">
            <p><strong>Sipariş No:</strong> ${orderData.id}</p>
            <p><strong>Ödeme Yöntemi:</strong> ${paymentMethodText}</p>
            <p><strong>Müşteri:</strong> ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}</p>
            <p><strong>E-posta:</strong> ${orderData.customerInfo.email}</p>
            <p><strong>Telefon:</strong> ${orderData.customerInfo.phone}</p>
            <p><strong>Adres:</strong> ${orderData.customerInfo.address}</p>
            <p><strong>Toplam:</strong> ₺${orderData.totals.total.toLocaleString('tr-TR')}${isBankTransfer ? ' (Havale indirimi: ₺' + (orderData.totals.total * 0.03).toLocaleString('tr-TR') + ')' : ''}</p>
            <p><strong>Tarih:</strong> ${new Date(orderData.createdAt).toLocaleString('tr-TR')}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background: ${isBankTransfer ? '#fff3cd' : '#e8f5e8'}; border-radius: 8px;">
            <p style="margin: 0; color: ${isBankTransfer ? '#856404' : '#28a745'}; font-weight: bold;">
              ${isBankTransfer ? '⏳ Havale bilgileri müşteriye gönderildi! Ödeme kontrolü gerekiyor.' : '✅ Sipariş ödenmiş ve müşteriye onay emaili gönderildi!'}
            </p>
          </div>
        </div>
      `
    );

    if (!adminResult.success) {
      console.error('Admin email hatası:', adminResult.error);
      // Admin email hatası kritik değil, sipariş yine de alındı
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    return NextResponse.json(
      { error: 'Mail gönderilemedi' },
      { status: 500 }
    );
  }
}