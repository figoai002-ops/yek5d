"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart';
import { getProductById } from '@/data/products';
import { toast } from 'sonner';
import { ClientOnly } from './ClientOnly';

interface AddToCartButtonProps {
  productId: string;
  qty?: number;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({ 
  productId, 
  qty = 1, 
  className,
  children 
}: AddToCartButtonProps) {
  return (
    <ClientOnly
      fallback={
        <Button className={className} disabled>
          Sepete Ekle
        </Button>
      }
    >
      <AddToCartButtonContent 
        productId={productId}
        qty={qty}
        className={className}
      >
        {children}
      </AddToCartButtonContent>
    </ClientOnly>
  );
}

function AddToCartButtonContent({ 
  productId, 
  qty = 1, 
  className,
  children 
}: AddToCartButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = async () => {
    setIsLoading(true);
    
    try {
      const product = getProductById(productId);
      if (!product) {
        toast.error('Ürün bulunamadı');
        return;
      }
      
      if (product.purchasable === false) {
        toast.error('Bu ürün online satış için uygun değil');
        return;
      }
      
      if (product.stock < qty) {
        toast.error('Yetersiz stok');
        return;
      }
      
      // Ürün fiyatını kontrol et
      const productPrice = typeof product.price === 'number' ? product.price : 0;
      
      if (productPrice <= 0) {
        toast.error('Bu ürün için fiyat bilgisi mevcut değil');
        return;
      }

      // Sepete ekle
      for (let i = 0; i < qty; i++) {
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: productPrice,
          image: product.image,
          stock: product.stock,
          isQuickDelivery: product.isQuickDelivery,
          shortDesc: product.shortDesc
        });
      }
      
      toast.success(`${product.name} sepete eklendi`, {
        action: {
          label: "Sepete Git",
          onClick: () => router.push('/sepet')
        },
        duration: 3000,
        style: {
          cursor: 'pointer'
        }
      });
    } catch (error) {
      toast.error('Sepete eklenirken hata oluştu');
      console.error('Add to cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? 'Ekleniyor...' : (children || 'Sepete Ekle')}
    </Button>
  );
}