import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/ecom';
import { saveCart, loadCart } from '@/lib/storage';

export interface CartTotals {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  totals: CartTotals;
  
  // Actions
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// Kargo hesaplama kuralı: 300 TL üzeri ücretsiz
const SHIPPING_THRESHOLD = 300;
const SHIPPING_COST = 79.90;

const calculateCartTotals = (items: CartItem[]): CartTotals => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = 0; // Şimdilik indirim yok
  const total = subtotal + shipping - discount;
  
  return {
    subtotal,
    shipping,
    discount,
    total
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totals: {
        subtotal: 0,
        shipping: 0,
        discount: 0,
        total: 0
      },

      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === newItem.id);
        
        let updatedItems: CartItem[];
        
        if (existingItem) {
          // Mevcut ürün varsa miktarını artır
          updatedItems = items.map(item =>
            item.id === newItem.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // Yeni ürün ekle
          updatedItems = [...items, { ...newItem, qty: 1 }];
        }
        
        const totals = calculateCartTotals(updatedItems);
        
        set({ items: updatedItems, totals });
        saveCart(updatedItems);
      },

      removeItem: (id) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== id);
        const totals = calculateCartTotals(updatedItems);
        
        set({ items: updatedItems, totals });
        saveCart(updatedItems);
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        
        const { items } = get();
        const updatedItems = items.map(item =>
          item.id === id ? { ...item, qty } : item
        );
        const totals = calculateCartTotals(updatedItems);
        
        set({ items: updatedItems, totals });
        saveCart(updatedItems);
      },

      clearCart: () => {
        set({ 
          items: [], 
          totals: { subtotal: 0, shipping: 0, discount: 0, total: 0 }
        });
        saveCart([]);
      },

      calculateTotals: () => {
        const { items } = get();
        const totals = calculateCartTotals(items);
        set({ totals });
      }
    }),
    {
      name: 'yeklab.cart',
      // Hydration sorunu olmaması için
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Yüklendiğinde totalleri yeniden hesapla
          const totals = calculateCartTotals(state.items);
          state.totals = totals;
        }
      },
    }
  )
);

// Hook - cart item sayısını almak için
export const useCartItemCount = () => {
  return useCartStore(state => 
    state.items.reduce((sum, item) => sum + item.qty, 0)
  );
};

// Hook - cart'ın dolu olup olmadığını kontrol etmek için
export const useCartHasItems = () => {
  return useCartStore(state => state.items.length > 0);
};