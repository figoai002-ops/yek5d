// Test sipariş email gönderimi için script
const testOrderData = {
  id: "TEST-001-" + Date.now(),
  createdAt: new Date().toISOString(),
  customerInfo: {
    firstName: "Test",
    lastName: "Kullanıcı", 
    email: "y.emrekaranfil@yeklab.com",
    phone: "+90 530 890 66 13",
    address: "Test Adresi, İstanbul, Türkiye"
  },
  items: [
    {
      name: "Pastör Pipeti 1ml",
      price: 180,
      qty: 2,
      image: "/images/products/pastor-pipeti.jpg"
    },
    {
      name: "Nem Tayin Cihazı", 
      price: 60000,
      qty: 1,
      image: "/images/products/nem-tayin.jpg"
    }
  ],
  totals: {
    total: 60360
  }
};

async function testOrderEmail() {
  try {
    console.log('🛒 Sipariş email testini başlatıyorum...');
    console.log('📧 Test verisi:', JSON.stringify(testOrderData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/send-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrderData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Sipariş emaili başarıyla gönderildi!');
      console.log('📨 Response:', result);
      console.log('🎯 y.emrekaranfil@yeklab.com adresini kontrol edin!');
    } else {
      console.error('❌ Email gönderim hatası:', result.error);
      console.error('📋 Response status:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Test hatası:', error);
  }
}

// Test çalıştır
testOrderEmail();