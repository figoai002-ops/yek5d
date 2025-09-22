'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Building2, 
  CreditCard, 
  Landmark, 
  Lock, 
  Shield,
  ShoppingCart,
  Truck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/stores/cart';
import { tl, genId } from '@/lib/format';
import { saveOrder, pushEmail } from '@/lib/storage';
import { renderOrderConfirmationEmail } from '@/lib/email';
import type { CustomerInfo, Order } from '@/types/ecom';
import { ClientOnly } from '@/components/ClientOnly';

type PaymentMethod = 'card' | 'bank-transfer';

export default function CheckoutPage() {
  return (
    <ClientOnly
      fallback={
        <main className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Yükleniyor...</h1>
            <p className="text-muted-foreground mb-6">
              Ödeme sayfası yükleniyor...
            </p>
          </div>
        </main>
      }
    >
      <CheckoutPageContent />
    </ClientOnly>
  );
}

function CheckoutPageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, totals, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    useSameAddress: true,
    companyName: '',
    taxNumber: '',
    taxOffice: '',
    billingAddress: '',
    billingCity: '',
    billingDistrict: '',
    billingPostalCode: '',
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    communication: false,
  });

  const hasItems = items.length > 0;

  // Redirect if cart is empty
  if (!hasItems) {
    return (
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Sepetiniz Boş</h1>
          <p className="text-muted-foreground mb-6">
            Ödeme yapabilmek için sepetinizde ürün bulunması gerekiyor.
          </p>
          <Link href="/hizli-teslimat">
            <Button>Alışverişe Başla</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Form validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    const missingFields = requiredFields.filter(field => !customerInfo[field as keyof CustomerInfo]);
    
    if (missingFields.length > 0) {
      toast({
        title: 'Eksik Bilgiler',
        description: 'Lütfen tüm zorunlu alanları doldurun.',
        variant: 'destructive',
      });
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      toast({
        title: 'Sözleşmeler',
        description: 'Lütfen kullanım koşulları ve gizlilik politikasını kabul edin.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const orderId = genId();
      
      const order: Order = {
        id: orderId,
        items: [...items],
        customerInfo: { ...customerInfo },
        totals: { ...totals },
        paymentMethod,
        paymentStatus: 'pending',
        orderStatus: 'received',
        createdAt: new Date().toISOString(),
      };

      // Save order to localStorage
      saveOrder(order);

      // Generate and save email
      const emailHtml = renderOrderConfirmationEmail(order);
      pushEmail({
        id: `order_${orderId}`,
        type: 'order_confirmation',
        to: customerInfo.email,
        subject: `Sipariş Onayı - ${orderId}`,
        html: emailHtml,
        createdAt: new Date().toISOString(),
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (paymentMethod === 'card') {
        // Simulate PayTR payment redirect
        toast({
          title: 'Ödeme Yönlendirmesi',
          description: 'PayTR ödeme sayfasına yönlendiriliyorsunuz...',
        });
        
        // In real app, redirect to PayTR
        setTimeout(() => {
          clearCart();
          router.push(`/odeme/basari?order=${orderId}`);
        }, 1500);
      } else {
        // Bank transfer - direct success
        clearCart();
        router.push(`/odeme/basari?order=${orderId}&method=bank`);
      }

    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = 
    customerInfo.firstName &&
    customerInfo.lastName &&
    customerInfo.email &&
    customerInfo.phone &&
    customerInfo.address &&
    customerInfo.city &&
    agreements.terms &&
    agreements.privacy;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/sepet"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Sepete Dön</span>
            </Link>
            
            {/* Progress Steps */}
            <div className="hidden sm:flex items-center space-x-3 text-sm">
              <div className="flex items-center text-gray-400">
                <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">✓</div>
                <span className="ml-2">Sepet</span>
              </div>
              <div className="w-6 h-px bg-gray-300"></div>
              <div className="flex items-center text-blue-600">
                <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                <span className="ml-2 font-medium">Ödeme</span>
              </div>
              <div className="w-6 h-px bg-gray-300"></div>
              <div className="flex items-center text-gray-400">
                <div className="w-7 h-7 border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                <span className="ml-2">Tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Güvenli Ödeme</h1>
            <p className="text-gray-600">
              Siparişinizi tamamlamak için bilgilerinizi girin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">


              {/* Customer Information */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    Teslimat Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        Ad <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Adınız"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Soyad <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Soyadınız"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
              
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        E-posta <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ornek@email.com"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Telefon <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="0555 123 45 67"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Adres <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Tam adres bilgisi"
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        Şehir <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="İstanbul"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-sm font-medium text-gray-700">
                        İlçe
                      </Label>
                      <Input
                        id="district"
                        value={customerInfo.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="Kadıköy"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                        Posta Kodu
                      </Label>
                      <Input
                        id="postalCode"
                        value={customerInfo.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="34000"
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
            </CardContent>
          </Card>

              {/* Billing Information */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-4 h-4 text-green-600" />
                    </div>
                    Fatura Bilgileri
                    <Badge variant="secondary" className="ml-3 bg-gray-100 text-gray-600">Opsiyonel</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox
                      id="useSameAddress"
                      checked={billingInfo.useSameAddress}
                      onCheckedChange={(checked) => 
                        setBillingInfo(prev => ({ ...prev, useSameAddress: !!checked }))
                      }
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="useSameAddress" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Fatura adresi teslimat adresi ile aynı
                    </Label>
                  </div>                  {!billingInfo.useSameAddress && (
                    <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                            Şirket Adı
                          </Label>
                          <Input
                            id="companyName"
                            value={billingInfo.companyName}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder="Şirket adı (opsiyonel)"
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxNumber" className="text-sm font-medium text-gray-700">
                            Vergi Numarası
                          </Label>
                          <Input
                            id="taxNumber"
                            value={billingInfo.taxNumber}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, taxNumber: e.target.value }))}
                            placeholder="1234567890"
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taxOffice" className="text-sm font-medium text-gray-700">
                          Vergi Dairesi
                        </Label>
                        <Input
                          id="taxOffice"
                          value={billingInfo.taxOffice}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, taxOffice: e.target.value }))}
                          placeholder="Kadıköy Vergi Dairesi"
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress" className="text-sm font-medium text-gray-700">
                          Fatura Adresi
                        </Label>
                        <Input
                          id="billingAddress"
                          value={billingInfo.billingAddress}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, billingAddress: e.target.value }))}
                          placeholder="Fatura adresi"
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="billingCity" className="text-sm font-medium text-gray-700">
                            Şehir
                          </Label>
                          <Input
                            id="billingCity"
                            value={billingInfo.billingCity}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, billingCity: e.target.value }))}
                            placeholder="İstanbul"
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingDistrict" className="text-sm font-medium text-gray-700">
                            İlçe
                          </Label>
                          <Input
                            id="billingDistrict"
                            value={billingInfo.billingDistrict}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, billingDistrict: e.target.value }))}
                            placeholder="Kadıköy"
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingPostalCode" className="text-sm font-medium text-gray-700">
                            Posta Kodu
                          </Label>
                          <Input
                            id="billingPostalCode"
                            value={billingInfo.billingPostalCode}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, billingPostalCode: e.target.value }))}
                            placeholder="34000"
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}
            </CardContent>
          </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                    </div>
                    Ödeme Yöntemi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    <div className="relative">
                      <div className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'card' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <RadioGroupItem value="card" id="card" className="text-blue-600" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <CreditCard className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">Kredi/Banka Kartı</span>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Güvenli ödeme altyapısı ile kartınızla ödeyin
                                  </p>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                                PayTR Güvencesi
                              </Badge>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'bank-transfer' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <RadioGroupItem value="bank-transfer" id="bank" className="text-blue-600" />
                          <Label htmlFor="bank" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <Building2 className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">Havale/EFT</span>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Banka hesap bilgileri sipariş sonrası gönderilir
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                %3 İndirim
                              </Badge>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
            </CardContent>
          </Card>

              {/* Agreements */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <Checkbox 
                        id="terms"
                        checked={agreements.terms}
                        onCheckedChange={(checked) => 
                          setAgreements(prev => ({ ...prev, terms: !!checked }))
                        }
                        className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 mt-0.5"
                      />
                      <Label htmlFor="terms" className="text-sm font-medium text-gray-700 cursor-pointer leading-relaxed">
                        <span className="text-red-500">*</span> 
                        <Link href="/kullanim-kosullari" target="_blank" className="text-blue-600 hover:text-blue-700 transition-colors underline ml-1">
                          Kullanım Koşulları
                        </Link>
                        'nı okudum ve kabul ediyorum
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <Checkbox 
                        id="privacy"
                        checked={agreements.privacy}
                        onCheckedChange={(checked) => 
                          setAgreements(prev => ({ ...prev, privacy: !!checked }))
                        }
                        className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 mt-0.5"
                      />
                      <Label htmlFor="privacy" className="text-sm font-medium text-gray-700 cursor-pointer leading-relaxed">
                        <span className="text-red-500">*</span>
                        <Link href="/gizlilik-politikasi" target="_blank" className="text-blue-600 hover:text-blue-700 transition-colors underline ml-1">
                          Gizlilik Politikası
                        </Link>
                        'nı okudum ve kabul ediyorum
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Checkbox 
                        id="communication"
                        checked={agreements.communication}
                        onCheckedChange={(checked) => 
                          setAgreements(prev => ({ ...prev, communication: !!checked }))
                        }
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-0.5"
                      />
                      <Label htmlFor="communication" className="text-sm font-medium text-gray-700 cursor-pointer leading-relaxed">
                        Kampanya ve bildirimler için e-posta/SMS almak istiyorum
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
        </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <ShoppingCart className="w-4 h-4 text-indigo-600" />
                    </div>
                    Sipariş Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-lg bg-gray-50 ${
                        index !== items.length - 1 ? 'border-b border-gray-200' : ''
                      }`}>
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.qty} × {tl(item.price)}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {tl(item.price * item.qty)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Ara Toplam:</span>
                        <span className="font-medium">{tl(totals.subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Kargo:</span>
                        <span className={`font-medium ${totals.shipping === 0 ? "text-green-600" : ""}`}>
                          {totals.shipping === 0 ? 'Ücretsiz Kargo' : tl(totals.shipping)}
                        </span>
                      </div>
                      
                      {paymentMethod === 'bank-transfer' && (
                        <div className="flex justify-between text-green-600">
                          <span>Havale İndirimi:</span>
                          <span className="font-medium">-{tl(totals.total * 0.03)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900 bg-gray-50 p-4 rounded-lg">
                        <span>Toplam:</span>
                        <span className="text-blue-600">
                          {paymentMethod === 'bank-transfer' 
                            ? tl(totals.total * 0.97) 
                            : tl(totals.total)
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Button 
                      className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                      onClick={handleSubmit}
                      disabled={!isFormValid || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          İşleniyor...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-3" />
                          {paymentMethod === 'card' ? 'Güvenli Ödeme Yap' : 'Siparişi Tamamla'}
                        </>
                      )}
                    </Button>
                    
                    <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                      <Shield className="w-4 h-4 mr-2 text-green-600" />
                      <span>256-bit SSL ile korunmaktadır</span>
                    </div>
                  </div>
            </CardContent>
          </Card>

              {/* Quick Delivery Info */}
              {items.some(item => item.isQuickDelivery) && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="font-bold text-green-800 text-lg mb-2">Hızlı Teslimat</h3>
                      <p className="text-green-700">
                        Siparişiniz 3 gün içerisinde kargoya verilecek!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}