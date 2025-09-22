const { sendEmail, createBankTransferOrderEmail } = require('./lib/hostinger-mailer.ts');

// Havale siparişi test verisi
const testOrder = {
  id: 'HAVALE-TEST-' + Date.now().toString(36).toUpperCase(),
  createdAt: new Date().toISOString(),
  paymentMethod: 'bank-transfer',
  customerInfo: {
    firstName: 'Test',
    lastName: 'Müşteri',
    email: 'y.emrekaranfil@hotmail.com',
    phone: '+90 530 890 66 13',
    address: 'Test Adres, İstanbul'
  },
  items: [
    {
      name: 'Laboratuvar Test Cihazı',
      price: 1500,
      qty: 2,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp'
    },
    {
      name: 'Pastör Pipeti (100\'lü paket)',
      price: 180,
      qty: 1,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp'
    }
  ],
  totals: {
    total: 3180 // 1500*2 + 180*1 = 3180
  }
};

async function testBankTransferEmail() {
  console.log('🏦 Havale email testi başlıyor...');
  console.log('📦 Test Sipariş ID:', testOrder.id);
  
  try {
    // Havale template'ini oluştur
    const emailHtml = createBankTransferOrderEmail(testOrder);
    
    // Email gönder
    const result = await sendEmail(
      testOrder.customerInfo.email,
      `Sipariş Oluşturuldu - Ödeme Bekleniyor - ${testOrder.id} - YEKLAB`,
      emailHtml
    );
    
    if (result.success) {
      console.log('✅ Havale email başarıyla gönderildi!');
      console.log('📨 Message ID:', result.messageId);
      console.log('💰 Ödenecek Tutar:', (testOrder.totals.total - (testOrder.totals.total * 0.03)).toLocaleString('tr-TR'), 'TL (havale indirimi dahil)');
    } else {
      console.error('❌ Email gönderim hatası:', result.error);
    }
  } catch (error) {
    console.error('💥 Test hatası:', error);
  }
}

testBankTransferEmail();