import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createTestEmailTemplate } from '@/lib/hostinger-mailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message } = body;

    // Eğer sadece test mail gönderiliyor ise
    if (!to || !subject || !message) {
      const testEmail = process.env.EMAIL_USER || 'y.emrekaranfil@yeklab.com';
      const testSubject = 'YEKLAB - YekLab Email Test';
      const testHtml = createTestEmailTemplate(testEmail);

      const result = await sendEmail(testEmail, testSubject, testHtml);
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Test email sent successfully!',
          to: testEmail,
          messageId: result.messageId
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Failed to send test email',
          details: result.error
        }, { status: 500 });
      }
    }

    // Custom mail gönderimi
    const result = await sendEmail(to, subject, message);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully!',
        to,
        messageId: result.messageId
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to send email',
        details: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}