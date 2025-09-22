"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore, useCartItemCount, useCartHasItems } from '@/stores/cart';
import { tl } from '@/lib/format';
import { ClientOnly } from './ClientOnly';

export function MiniCart() {
  return (
    <ClientOnly
      fallback={
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      }
    >
      <MiniCartContent />
    </ClientOnly>
  );
}

function MiniCartContent() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totals, removeItem, updateQty } = useCartStore();
  const itemCount = useCartItemCount();
  const hasItems = useCartHasItems();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Sepetim ({itemCount} ürün)</h3>
        </div>
        
        {!hasItems ? (
          <div className="p-4 text-center text-muted-foreground">
            <ShoppingCart className="mx-auto h-12 w-12 mb-2 text-muted-foreground/50" />
            <p>Sepetiniz boş</p>
            <Link href="/hizli-teslimat">
              <Button variant="outline" size="sm" className="mt-2">
                Alışverişe Başla
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.qty} × {tl(item.price)}
                      </p>
                      <p className="text-sm font-semibold text-red-600">
                        {tl(item.price * item.qty)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="h-6 w-6 p-0"
                      >
                        -
                      </Button>
                      <span className="text-sm w-8 text-center">{item.qty}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="h-6 w-6 p-0"
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between text-sm mb-2">
                <span>Ara Toplam:</span>
                <span>{tl(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span>Kargo:</span>
                <span className={totals.shipping === 0 ? "text-green-600" : ""}>
                  {totals.shipping === 0 ? 'Ücretsiz' : tl(totals.shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base mb-3">
                <span>Toplam:</span>
                <span className="text-red-600">{tl(totals.total)}</span>
              </div>
              
              <div className="space-y-2">
                <Link href="/sepet" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsOpen(false)}
                  >
                    Sepeti Görüntüle
                  </Button>
                </Link>
                <Link href="/odeme" className="block">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg transform opacity-100" 
                    onClick={() => setIsOpen(false)}
                  >
                    Güvenli Ödemeye Geç
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}