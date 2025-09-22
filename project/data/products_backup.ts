/**
 * Centralized product data - single source of truth
 * All 56 products with normalized structure
 * Data-only module - no 'use client' directive
 */

import type { Product } from '@/types/ecom';
import { generateSlug } from '@/lib/slug';

// Helper function to convert old price format to number
const parsePrice = (priceStr: string): number => {
  // Extract number from "₺35,000 - ₺45,000" or "₺155" format
  const match = priceStr.match(/₺?([0-9.,]+)/);
  if (match) {
    // Take first number and remove commas
    return parseInt(match[1].replace(/[,.]/g, ''));
  }
  return 0;
};

export const products: Product[] = [
  // FIRIN VE ISITMA SİSTEMLERİ
  {
    id: '001',
    slug: generateSlug('Kurutma Fırını 250°C'),
    name: 'Kurutma Fırını 250°C',
    category: 'Fırınlar ve Isıtma',
    price: parsePrice('₺35,000'),
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 5,
    isQuickDelivery: false,
    shortDesc: 'Hassas sıcaklık kontrolü ile laboratuvar kurutma fırını. Dijital gösterge ve timer özellikli.',
    specs: {
      'Model': 'YEKLAB YK-OVEN250',
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 250°C',
      'Hacim': '50 Litre',
      'Güç': '2.5 kW',
      'Boyutlar': '60x50x45 cm',
      'Kontrol': 'Dijital PID',
      'Timer': '0-999 dakika'
    },
    purchasable: false
  },
  {
    id: '002',
    slug: generateSlug('Yüksek Sıcaklık Fırını 300°C'),
    name: 'Yüksek Sıcaklık Fırını 300°C',
    category: 'Fırınlar ve Isıtma',
    price: parsePrice('₺45,000'),
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Yüksek sıcaklık uygulamaları için profesyonel kurutma fırını.',
    specs: {
      'Model': 'YEKLAB YK-OVEN300',
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 300°C',
      'Hacim': '75 Litre',
      'Güç': '3.5 kW',
      'Boyutlar': '70x60x55 cm',
      'Kontrol': 'Dijital PID',
      'İzolasyon': 'Çift cidarlı'
    },
    purchasable: false
  },
  {
    id: '003',
    slug: generateSlug('Kül Fırını 550°C'),
    name: 'Nem Tayin Cihazı',
    price: 55000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    category: 'Ölçüm ve Analiz',
    stock: 25,
    isQuickDelivery: true,
    deliveryETA: '24 Saatte Teslim',
    shippingBadge: 'Hızlı Teslimat',
    shortDesc: 'Halojenlı ısıtıcı ile hızlı nem tayini, dijital ekran. Stokta mevcut, hızlı teslimat.',
    specs: {
      'Hassasiyet': '±0.01%',
      'Sıcaklık Aralığı': '50-200°C',
      'Kapasite': '100g',
      'Ekran': 'LCD dokunmatik'
    },
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp']
  },
  {
    id: 'prod-055',
    slug: 'yeklab-kul-firini-7l',
    name: 'Kül Fırını 7L',
    price: 65000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    category: 'Fırınlar ve Isıtma',
    stock: 10,
    isQuickDelivery: true,
    deliveryETA: '72 Saatte Teslim',
    shippingBadge: 'Son 10 Adet',
    shortDesc: 'Kül fırını, 7 litre hacim, 1200°C sıcaklık. Depoda hazır, hızlı kargo.',
    specs: {
      'Sıcaklık Aralığı': 'Oda sıcaklığı - 1200°C',
      'Hacim': '7 Litre',
      'Kontrol': 'Dijital PID',
      'Rampa': 'Ayarlanabilir ısıtma'
    },
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp']
  },
  
  {
    id: 'prod-003',
    slug: 'filtre-kagidi-90mm',
    name: 'Filtre Kağıdı 90mm',
    price: 32.75,
    image: PLACEHOLDER_IMAGE,
    category: 'Filtreleme',
    stock: 200,
    isQuickDelivery: true,
    deliveryETA: '24 Saatte Teslim',
    shippingBadge: 'Express',
    shortDesc: 'Yüksek kaliteli nitel filtre kağıdı. Laboratuvar filtrelemeleri için.',
    specs: {
      'Çap': '90mm',
      'Gramaj': '80g/m²',
      'Paket': '100 Adet',
      'Filtrasyon Hızı': 'Orta',
      'Ash Content': '<0.01%'
    }
  },
  {
    id: 'prod-004',
    slug: 'laboratuvar-eldiveni-m',
    name: 'Laboratuvar Eldiveni M (100\'lü)',
    price: 67.20,
    image: PLACEHOLDER_IMAGE,
    category: 'Güvenlik',
    stock: 120,
    isQuickDelivery: true,
    deliveryETA: '24 Saatte Teslim',
    shippingBadge: 'Hızlı Teslimat',
    shortDesc: 'Pudrasız nitril eldiven. Kimyasal dayanıklı, alerjisiz.',
    specs: {
      'Boyut': 'Medium (M)',
      'Malzeme': 'Nitril',
      'Paket': '100 Adet',
      'Kalınlık': '0.1mm',
      'Renk': 'Mavi',
      'Pudrasız': 'Evet'
    }
  },
  {
    id: 'prod-005',
    slug: 'erlenmayer-250ml',
    name: 'Erlenmeyer Balonu 250ml',
    price: 124.80,
    image: PLACEHOLDER_IMAGE,
    category: 'Cam Malzemeler',
    stock: 75,
    isQuickDelivery: false,
    deliveryETA: '2-3 İş Günü',
    shippingBadge: 'Standart Kargo',
    shortDesc: 'Dar ağızlı erlenmeyer balonu. Çözüm hazırlama ve karıştırma işlemleri için.',
    specs: {
      'Hacim': '250ml',
      'Malzeme': 'Borosilikat Cam',
      'Ağız Çapı': '24mm',
      'Graduasyon': '±5%',
      'Sıcaklık Direnci': '500°C'
    }
  },
  {
    id: 'prod-006',
    slug: 'beher-cam-1000ml',
    name: 'Beher Cam 1000ml',
    price: 156.40,
    image: PLACEHOLDER_IMAGE,
    category: 'Cam Malzemeler',
    stock: 60,
    isQuickDelivery: false,
    deliveryETA: '2-3 İş Günü',
    shortDesc: 'Yüksek kapasiteli laboratuvar behere. Büyük hacimli çözümler için.',
    specs: {
      'Hacim': '1000ml',
      'Malzeme': 'Borosilikat Cam',
      'Graduasyon': '±10ml',
      'Ağız Çapı': '85mm',
      'Yükseklik': '145mm'
    }
  },
  {
    id: 'prod-007',
    slug: 'peset-havani-porselen',
    name: 'Peset Havan Porselen 100ml',
    price: 198.60,
    image: PLACEHOLDER_IMAGE,
    category: 'Porselen',
    stock: 45,
    isQuickDelivery: false,
    deliveryETA: '3-5 İş Günü',
    shortDesc: 'Porselen havan ve peset seti. Örnek hazırlama ve öğütme işlemleri için.',
    specs: {
      'Hacim': '100ml',
      'Malzeme': 'Porselen',
      'Çap': '90mm',
      'Yükseklik': '35mm',
      'Peset Uzunluğu': '120mm'
    }
  },
  {
    id: 'prod-008',
    slug: 'test-tubu-15ml-plastik',
    name: 'Test Tüpü 15ml Plastik (50\'li)',
    price: 43.25,
    image: PLACEHOLDER_IMAGE,
    category: 'Plastik Malzemeler',
    stock: 180,
    isQuickDelivery: false,
    deliveryETA: '2-3 İş Günü',
    shortDesc: 'Steril polipropilen test tüpleri. Numune saklama için ideal.',
    specs: {
      'Hacim': '15ml',
      'Malzeme': 'Polipropilen',
      'Paket': '50 Adet',
      'Sterilizasyon': 'Gamma Ray',
      'Kapak': 'Dahil',
      'Sıcaklık Direnci': '121°C'
    }
  },
  {
    id: 'prod-009',
    slug: 'mikropipet-ucu-200ul',
    name: 'Mikropipet Ucu 200μl (1000\'li)',
    price: 78.90,
    image: PLACEHOLDER_IMAGE,
    category: 'Plastik Malzemeler',
    stock: 95,
    isQuickDelivery: false,
    deliveryETA: '2-3 İş Günü',
    shortDesc: 'Sarı renkli mikropipet uçları. Hassas sıvı transferi için.',
    specs: {
      'Hacim': '200μl',
      'Malzeme': 'Polipropilen',
      'Paket': '1000 Adet',
      'Renk': 'Sarı',
      'Steril': 'Evet',
      'DNA/RNA Free': 'Evet'
    }
  },
  {
    id: 'prod-010',
    slug: 'petri-kabi-90mm-steril',
    name: 'Petri Kabı 90mm Steril (20\'li)',
    price: 89.15,
    image: PLACEHOLDER_IMAGE,
    category: 'Plastik Malzemeler',
    stock: 110,
    isQuickDelivery: false,
    deliveryETA: '2-3 İş Günü',
    shortDesc: 'Steril polistiren petri kabları. Mikrobiyal kültür çalışmaları için.',
    specs: {
      'Çap': '90mm',
      'Malzeme': 'Polistiren',
      'Paket': '20 Adet',
      'Sterilizasyon': 'Gamma Ray',
      'Yükseklik': '15mm',
      'Renk': 'Şeffaf'
    }
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getQuickDeliveryProducts(): Product[] {
  return products.filter(p => p.isQuickDelivery);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category?.toLowerCase().includes(lowerQuery) ||
    p.shortDesc?.toLowerCase().includes(lowerQuery)
  );
}