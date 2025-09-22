'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Package, Mail, Download, Share2, Home, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CopyButton } from '@/components/CopyButton';
import { DownloadHtmlButton } from '@/components/DownloadHtmlButton';
import { tl } from '@/lib/format';
import { loadOrder, getEmails } from '@/lib/storage';
import type { Order } from '@/types/ecom';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const method = searchParams.get('method');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [emailHtml, setEmailHtml] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  
  useEffect(() => {
    if (orderId) {
      const foundOrder = loadOrder(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        
        // Load email HTML
        const emails = getEmails();
        const orderEmail = emails.find(email => email.id === `order_${orderId}`);
        if (orderEmail) {
          setEmailHtml(orderEmail.html);
        }

        // Mail gönderimini sadece bir kez yap - localStorage kontrolü ile
        const emailSentKey = `email_sent_${orderId}`;
        const alreadySent = localStorage.getItem(emailSentKey);
        
        if (!alreadySent && !emailSent && foundOrder.customerInfo?.email) {
          // Hemen localStorage'e kaydet ki duplicate gönderimler engellensin
          localStorage.setItem(emailSentKey, 'true');
          sendOrderConfirmationEmail(foundOrder);
        } else if (alreadySent) {
          setEmailSent(true);
        }
      }
    }
  }, [orderId]); // emailSent'i dependency'den çıkardık

  // Mail gönderim fonksiyonu
  const sendOrderConfirmationEmail = async (orderData: Order) => {
    const emailSentKey = `email_sent_${orderData.id}`;
    
    // Eğer zaten gönderilmişse, tekrar gönderme
    if (localStorage.getItem(emailSentKey) === 'true' || emailSent) {
      console.log('E-mail zaten gönderilmiş, tekrar gönderilmiyor');
      return;
    }

    try {
      console.log(`Sipariş ${orderData.id} için e-mail gönderiliyor...`);
      
      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setEmailSent(true);
        localStorage.setItem(emailSentKey, 'true');
        console.log('Sipariş onay maili başarıyla gönderildi');
      } else {
        console.error('Mail gönderim hatası:', await response.text());
        // Hata durumunda localStorage'dan kaldır
        localStorage.removeItem(emailSentKey);
      }
    } catch (error) {
      console.error('Mail gönderim hatası:', error);
      // Hata durumunda localStorage'dan kaldır
      localStorage.removeItem(emailSentKey);
    }
  };

  if (!order) {
    return (
      <main className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Sipariş Bulunamadı</h1>
          <p className="text-muted-foreground mb-6">
            Belirtilen sipariş numarası ile ilgili bilgi bulunamadı.
          </p>
          <Link href="/hizli-teslimat">
            <Button>Alışverişe Devam Et</Button>
          </Link>
        </div>
      </main>
    );
  }

  const isQuickDelivery = order.items.some(item => item.isQuickDelivery);
  const isBankTransfer = method === 'bank' || order.paymentMethod === 'bank-transfer';

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            {isBankTransfer ? '🎉 Siparişiniz Alındı!' : '✅ Ödeme Başarılı!'}
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 mb-6">
            Teşekkürler! Siparişiniz başarıyla oluşturuldu.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-lg mb-2">Sipariş Numaranız</p>
            <p className="font-mono text-2xl font-bold text-yellow-300">{order.id}</p>
            <div className="flex items-center justify-center space-x-3 mt-4">
              <CopyButton text={order.id} variant="outline" className="text-white border-white hover:bg-white hover:text-green-600" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {new Date(order.createdAt).toLocaleDateString('tr-TR')} {' '}
                {new Date(order.createdAt).toLocaleTimeString('tr-TR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Badge>
            </div>
          </div>
          
          {emailSent && (
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 mt-6 max-w-md mx-auto">
              <div className="flex items-center justify-center text-white">
                <Mail className="w-5 h-5 mr-2" />
                <span>📧 Onay maili {order.customerInfo.email} adresine gönderildi</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Status */}
              <Card className={`${isBankTransfer ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50' : 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-8">
                  <div className={`text-center ${isBankTransfer ? 'text-orange-800' : 'text-green-800'}`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${isBankTransfer ? 'bg-orange-200' : 'bg-green-200'} rounded-full mb-4`}>
                      {isBankTransfer ? (
                        <span className="text-2xl">🏦</span>
                      ) : (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">
                      {isBankTransfer ? '⏳ Ödeme Bekleniyor' : '✅ Ödeme Tamamlandı'}
                    </h2>
                    
                    {isBankTransfer ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-orange-200 to-yellow-200 rounded-xl p-4">
                          <p className="font-bold text-lg text-orange-900">🎉 %3 Havale İndirimi Uygulandı!</p>
                        </div>
                        
                        <div className="bg-white border-2 border-orange-300 rounded-2xl p-6 text-left shadow-inner">
                          <h3 className="font-bold text-orange-900 mb-4 flex items-center text-lg">
                            <span className="text-2xl mr-2">🏦</span>
                            Banka Hesap Bilgileri
                          </h3>
                          <div className="space-y-3 text-sm text-orange-800">
                            <div className="bg-orange-50 rounded-lg p-3">
                              <p className="font-semibold">🏢 Hesap Sahibi:</p>
                              <p className="font-mono">YEKLAB Laboratuvar Cihazları</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-3">
                              <p className="font-semibold">🏦 Ziraat Bankası:</p>
                              <p className="font-mono text-lg">TR98 0001 0017 4578 9512 3456 78</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-3">
                              <p className="font-semibold">🏦 İş Bankası:</p>
                              <p className="font-mono text-lg">TR53 0006 4000 0011 2345 6789 01</p>
                            </div>
                            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mt-4">
                              <p className="font-bold text-red-800 text-center">
                                ⚠️ ÖNEMLİ: Açıklama kısmına mutlaka yazınız
                              </p>
                              <p className="font-mono text-xl text-center text-red-900 bg-red-50 rounded px-3 py-2 mt-2">
                                {order.id}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="bg-blue-100 rounded-xl p-4 border border-blue-200">
                            <span className="text-blue-800">📧 Detaylı bilgiler e-postanıza gönderildi</span>
                          </div>
                          <div className="bg-green-100 rounded-xl p-4 border border-green-200">
                            <span className="text-green-800">⚡ Ödeme sonrası hemen hazırlanır</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-200 to-emerald-200 rounded-xl p-4">
                          <p className="font-bold text-lg text-green-900">💳 Kredi kartı ödemesi başarıyla tamamlandı</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="bg-white rounded-xl p-4 border border-green-200">
                            <span className="text-green-800">✅ Ödeme alındı</span>
                          </div>
                          <div className="bg-white rounded-xl p-4 border border-green-200">
                            <span className="text-green-800">🚀 Hazırlanıyor</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Delivery Alert */}
              {isQuickDelivery && (
                <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-emerald-800 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-200 rounded-full mb-4 animate-pulse">
                        <span className="text-2xl">⚡</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        🚀 Hızlı Teslimat Aktif!
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-inner">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-emerald-100 rounded-xl p-4">
                              <div className="text-2xl mb-2">�</div>
                              <p className="font-bold text-emerald-900">3 İş Günü</p>
                              <p className="text-emerald-700">içinde kargoya verilir</p>
                            </div>
                            <div className="bg-blue-100 rounded-xl p-4">
                              <div className="text-2xl mb-2">📱</div>
                              <p className="font-bold text-blue-900">SMS Takip</p>
                              <p className="text-blue-700">Kargo numaranız gönderilir</p>
                            </div>
                            <div className="bg-yellow-100 rounded-xl p-4">
                              <div className="text-2xl mb-2">⚡</div>
                              <p className="font-bold text-yellow-900">Öncelikli</p>
                              <p className="text-yellow-700">Hazırlık süreci</p>
                            </div>
                            <div className="bg-purple-100 rounded-xl p-4">
                              <div className="text-2xl mb-2">🎯</div>
                              <p className="font-bold text-purple-900">Hızlı</p>
                              <p className="text-purple-700">Teslimat garantisi</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-emerald-200 to-green-200 rounded-xl p-4">
                          <p className="font-bold text-emerald-900">🏆 Öncelikli işlem sırasındasınız!</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Items */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <Package className="w-6 h-6 mr-3 text-blue-600" />
                    📦 Sipariş İçeriği
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          {item.isQuickDelivery && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-xs animate-bounce">
                              ⚡
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {item.qty} adet
                            </Badge>
                            <span className="text-sm text-gray-600">×</span>
                            <span className="text-sm font-medium text-blue-600">{tl(item.price)}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            {tl(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ara Toplam:</span>
                        <span className="font-medium">{tl(order.totals.subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Kargo:</span>
                        <span className={`font-medium ${order.totals.shipping === 0 ? "text-green-600" : "text-gray-900"}`}>
                          {order.totals.shipping === 0 ? (
                            <span className="flex items-center">
                              ✅ Ücretsiz
                            </span>
                          ) : tl(order.totals.shipping)}
                        </span>
                      </div>
                      
                      {isBankTransfer && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Havale İndirimi (%3):</span>
                          <span className="font-medium text-green-600 flex items-center">
                            <span className="mr-1">🎉</span>
                            -{tl(order.totals.total * 0.03)}
                          </span>
                        </div>
                      )}
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between font-bold text-xl pt-2">
                        <span className="text-gray-900">Toplam:</span>
                        <span className="text-2xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                          {isBankTransfer 
                            ? tl(order.totals.total * 0.97) 
                            : tl(order.totals.total)
                          }
                        </span>
                      </div>
                      
                      {isBankTransfer && (
                        <div className="bg-green-100 border border-green-300 rounded-lg p-3 mt-3">
                          <p className="text-sm text-green-800 text-center font-medium">
                            💰 Havale indirimi sayesinde <strong>{tl(order.totals.total * 0.03)}</strong> tasarruf ettiniz!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <Truck className="w-6 h-6 mr-3 text-purple-600" />
                    🚚 Teslimat Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">👤</span>
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900">
                            {order.customerInfo.firstName} {order.customerInfo.lastName}
                          </p>
                          <p className="text-sm text-gray-600">Alıcı</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-blue-600">📧</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">E-posta</span>
                          </div>
                          <p className="font-medium text-gray-900">{order.customerInfo.email}</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-green-600">📱</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Telefon</span>
                          </div>
                          <p className="font-medium text-gray-900">{order.customerInfo.phone}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-orange-600">🏠</span>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Teslimat Adresi</span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{order.customerInfo.address}</p>
                          <p className="text-sm text-gray-600">
                            {order.customerInfo.district && `${order.customerInfo.district}, `}
                            {order.customerInfo.city}
                            {order.customerInfo.postalCode && ` ${order.customerInfo.postalCode}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">ℹ️</span>
                          <span className="text-sm text-blue-800 font-medium">
                            Kargo takip bilgileri {order.customerInfo.phone} numarasına SMS ile gönderilecektir.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>

            {/* Action Panel */}
            <div className="space-y-6">
              {/* Email Actions */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-indigo-200">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-lg">
                    <Mail className="w-6 h-6 mr-3 text-indigo-600" />
                    📧 E-posta İşlemleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4">
                    <p className="text-sm text-indigo-800">
                      Sipariş detayları <strong className="text-indigo-900">{order.customerInfo.email}</strong> adresine gönderildi.
                    </p>
                  </div>
                  
                  {emailHtml && (
                    <div className="space-y-3">
                      <DownloadHtmlButton 
                        html={emailHtml}
                        filename={`siparis-${order.id}.html`}
                        className="w-full hover:scale-105 transition-transform"
                      />
                      
                      <CopyButton 
                        text={emailHtml}
                        label="📄 HTML Kodu Kopyala"
                        variant="outline"
                        className="w-full hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-lg">
                    <Share2 className="w-6 h-6 mr-3 text-green-600" />
                    🚀 Hızlı İşlemler
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <Link href="/" className="block">
                    <Button variant="outline" className="w-full h-12 text-lg hover:scale-105 transition-all duration-200 hover:shadow-lg">
                      <Home className="w-5 h-5 mr-3" />
                      🏠 Ana Sayfaya Dön
                    </Button>
                  </Link>
                  
                  <Link href="/hizli-teslimat" className="block">
                    <Button className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-200 hover:shadow-lg">
                      <ShoppingBag className="w-5 h-5 mr-3" />
                      🛒 Alışverişe Devam Et
                    </Button>
                  </Link>
                  
                  <Link href="/admin/local-orders" className="block">
                    <Button variant="secondary" className="w-full h-12 text-lg hover:scale-105 transition-all duration-200 hover:shadow-lg">
                      📊 Siparişleri Görüntüle
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Support Info */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-4">
                      <span className="text-2xl">📞</span>
                    </div>
                    
                    <h3 className="font-bold text-xl text-blue-900 mb-4">Müşteri Desteği</h3>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <p className="text-sm text-blue-700 mb-1">Telefon Destek</p>
                        <p className="font-bold text-xl text-blue-900">0530 890 66 13</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <p className="text-sm text-blue-700 mb-1">E-posta Destek</p>
                        <p className="font-medium text-blue-900">info@yeklab.com</p>
                      </div>
                      
                      <div className="bg-blue-100 rounded-xl p-3">
                        <p className="text-xs text-blue-800">
                          🕒 <strong>Çalışma Saatleri:</strong><br />
                          Hafta içi 09:00 - 18:00
                        </p>
                      </div>
                      
                      <Button 
                        asChild
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200"
                      >
                        <a
                          href={`https://wa.me/905308906613?text=${encodeURIComponent(`Merhaba, ${order.id} numaralı siparişim hakkında bilgi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-white"
                        >
                          <span className="text-xl">💬</span>
                          WhatsApp Destek
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}