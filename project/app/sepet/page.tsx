'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/cart';
import { tl } from '@/lib/format';
import { ClientOnly } from '@/components/ClientOnly';

export default function CartPage() {
  return (
    <ClientOnly
      fallback={
        <main className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="mx-auto w-24 h-24 text-muted-foreground/50 mb-4" />
              <h1 className="text-3xl font-bold mb-2">Yükleniyor...</h1>
              <p className="text-muted-foreground mb-6">
                Sepetiniz yükleniyor...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <CartPageContent />
    </ClientOnly>
  );
}

function CartPageContent() {
  const { items, totals, removeItem, updateQty, clearCart } = useCartStore();
  const hasItems = items.length > 0;

  if (!hasItems) {
    return (
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="mx-auto w-24 h-24 text-muted-foreground/50 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Sepetiniz Boş</h1>
            <p className="text-muted-foreground mb-6">
              Hızlı teslimat ürünlerimizi keşfedin ve alışverişe başlayın!
            </p>
            <Link href="/hizli-teslimat">
              <Button size="lg">
                Alışverişe Başla
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link 
            href="/hizli-teslimat"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Alışverişe Devam Et
          </Link>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearCart}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Sepeti Temizle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-6">
            Sepetiniz ({items.reduce((sum, item) => sum + item.qty, 0)} ürün)
          </h1>
          
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    {item.isQuickDelivery && (
                      <Badge className="absolute -top-2 -left-2 bg-red-500 text-xs">
                        HIZLI
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    
                    {item.shortDesc && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.shortDesc}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium">
                            {item.qty}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            disabled={item.qty >= Math.min(item.stock, 99)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 h-8"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Kaldır
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {tl(item.price)} × {item.qty}
                        </p>
                        <p className="font-bold text-lg text-red-600">
                          {tl(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span>{tl(totals.subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Kargo:</span>
                  <span className={totals.shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {totals.shipping === 0 ? 'Ücretsiz Kargo!' : tl(totals.shipping)}
                  </span>
                </div>
                
                {totals.shipping === 0 && totals.subtotal < 300 && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    🎉 300 TL üzeri siparişlerinizde kargo ücretsiz!
                  </div>
                )}
                
                {totals.subtotal >= 300 && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    ✅ Ücretsiz kargo kazandınız!
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam:</span>
                  <span className="text-red-600">{tl(totals.total)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Link href="/odeme" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg transform opacity-100 border-0" size="lg">
                    Güvenli Ödemeye Geç ({tl(totals.total)})
                  </Button>
                </Link>
                
                <Link href="/hizli-teslimat" className="block">
                  <Button variant="outline" className="w-full">
                    Alışverişe Devam Et
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Delivery Info */}
          {items.some(item => item.isQuickDelivery) && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-green-800">
                  <h3 className="font-semibold mb-2 flex items-center">
                    🚀 Hızlı Teslimat
                  </h3>
                  <div className="text-sm space-y-1">
                    <p>• Sepetinizdeki hızlı teslimat ürünleri bugün kargoda!</p>
                    <p>• 16:00'dan önce sipariş verirseniz aynı gün gönderim</p>
                    <p>• Kargo takip numaranız SMS ile bildirilir</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}