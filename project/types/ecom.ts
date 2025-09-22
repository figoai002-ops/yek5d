export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number | string; // TL veya fiyat aralığı
  image: string;
  images?: string[]; // Multi-image support için ek görseller
  category?: string;
  stock: number;
  isQuickDelivery: boolean; // HIZLI TESLİMAT bayrağı
  deliveryETA?: string; // "24 Saatte Teslim" vb.
  shippingBadge?: string; // "Kargo Bedava", "Aynı Gün" vb.
  shortDesc?: string;
  specs?: Record<string, string>;
  purchasable?: boolean; // Satın alınabilir mi?
  paymentMethods?: ('iyzico' | 'iban' | 'whatsapp')[]; // Ödeme yöntemleri
  label?: 'featured' | 'new' | 'popular' | 'none'; // Ürün etiketleri
};

export type CartItem = {
  id: string; // product id
  slug: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  stock: number;
  isQuickDelivery: boolean;
  shortDesc?: string;
};

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district?: string;
  postalCode?: string;
};

export type CartTotals = {
  subtotal: number;
  shipping: number;
  total: number;
};

export type Order = {
  id: string; // ORDER-2025xxxxx
  createdAt: string;
  items: CartItem[];
  totals: CartTotals;
  customerInfo: CustomerInfo;
  paymentMethod: 'card' | 'bank-transfer';
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "received" | "preparing" | "shipped" | "delivered" | "cancelled";
};

export type EmailRecord = {
  id: string;
  type: 'order_confirmation' | 'payment_confirmation';
  to: string;
  subject: string;
  html: string;
  createdAt: string;
};