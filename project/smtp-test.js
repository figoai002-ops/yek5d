const nodemailer = require('nodemailer');

async function testYekLabSMTP() {
  console.log('🔧 YekLab SMTP Test Starting...');
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: 'y.emrekaranfil@yeklab.com',
      pass: 'jvka ekjr uxkg sfro',
    },
    debug: true,
    logger: true
  });

  try {
    // Test connection
    console.log('🔗 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: '"YEKLAB" <y.emrekaranfil@yeklab.com>',
      to: 'y.emrekaranfil@yeklab.com',
      subject: '🚀 YekLab Gmail SMTP Test - ' + new Date().toLocaleString('tr-TR'),
      html: `
        <h2>✅ YekLab Gmail SMTP Test</h2>
        <p>Bu email <strong>y.emrekaranfil@yeklab.com</strong> Gmail SMTP ile gönderildi!</p>
        <p><strong>Gönderim saati:</strong> ${new Date().toLocaleString('tr-TR')}</p>
        <p><strong>From:</strong> y.emrekaranfil@yeklab.com</p>
        <p><strong>Actual Account:</strong> y.emrekaranfil@yeklab.com</p>
        <p><strong>To:</strong> y.emrekaranfil@yeklab.com</p>
        <p><strong>Server:</strong> smtp.gmail.com:587</p>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #28a745; font-weight: bold;">🎯 YekLab Gmail SMTP Çalışıyor!</p>
        </div>
      `
    });

    console.log('✅ Email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    console.log('📋 Response:', info.response);

  } catch (error) {
    console.error('❌ SMTP Test Failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Response:', error.response);
  }
}

testYekLabSMTP();