import { NextRequest, NextResponse } from 'next/server';
import { readInbox } from '@/lib/hostinger-mailer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const emails = await readInbox(limit);
    
    return NextResponse.json({
      success: true,
      emails,
      total: emails.length,
      message: `Son ${emails.length} email başarıyla alındı`
    });
  } catch (error) {
    console.error('IMAP API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to read emails',
      details: error instanceof Error ? error.message : 'Unknown error',
      emails: []
    }, { status: 500 });
  }
}