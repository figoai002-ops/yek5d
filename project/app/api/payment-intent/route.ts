import { NextRequest, NextResponse } from 'next/server';
import { genId } from '@/lib/format';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { total, orderDraft } = body;
    
    // Basit validasyon
    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }
    
    // Test modu için sahte token üret
    const testToken = `TESTMODE-${crypto.randomUUID()}`;
    
    // Gerçek PayTR entegrasyonunda burada hash hesaplaması yapılacak
    /*
    const merchantId = process.env.PAYTR_MERCHANT_ID;
    const merchantKey = process.env.PAYTR_MERCHANT_KEY;
    const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
    
    // PayTR hash hesaplama
    const hashStr = `${merchantId}${userIp}${merchantOid}${emailAddress}${paymentAmount}${paymentType}${installmentCount}${currency}${testMode}${nonThreeD}`;
    const paytrToken = crypto.createHmac('sha256', merchantKey + merchantSalt).update(hashStr).digest('base64');
    */
    
    // Test response döndür
    return NextResponse.json({
      success: true,
      token: testToken,
      provider: 'PAYTR',
      testMode: true,
      message: 'Test modu - sahte token oluşturuldu'
    });
    
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET metodu - test için
export async function GET() {
  return NextResponse.json({
    message: 'PayTR Payment Intent API - Test Mode',
    endpoints: {
      POST: '/api/payment-intent - Create payment intent',
    },
    env: {
      PAYTR_MERCHANT_ID: process.env.PAYTR_MERCHANT_ID ? '***' : 'Not set',
      PAYTR_MERCHANT_KEY: process.env.PAYTR_MERCHANT_KEY ? '***' : 'Not set',
      PAYTR_MERCHANT_SALT: process.env.PAYTR_MERCHANT_SALT ? '***' : 'Not set',
      PAYTR_SUCCESS_URL: process.env.PAYTR_SUCCESS_URL || 'Not set',
      PAYTR_FAIL_URL: process.env.PAYTR_FAIL_URL || 'Not set'
    }
  });
}