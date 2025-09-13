export interface Product {
  id?: string | number;
  slug?: string;
  title: string;
  description?: string;
  price?: number | string;
  images?: string[];
  category?: string;
  tags?: string[];
  specs?: Record<string, string | number | boolean>;
  // YEKLAB specific fields
  model?: string;
  name?: string;
  specifications?: Record<string, string>;
  certificates?: string[];
  label?: 'featured' | 'new' | 'popular' | 'none';
  featured?: boolean;
  fastDelivery?: boolean;
  stock?: number;
  purchasable?: boolean;
  paymentMethods?: ('iyzico' | 'iban' | 'whatsapp')[];
  image?: string;
}