/**
 * Centralized product data - single source of truth
 * All 52 products with normalized labels
 * Data-only module - no 'use client' directive
 */

export interface Product {
  id: string;
  model: string;
  name: string;
  category: string;
  description: string;
  specifications: { [key: string]: string };
  price: string;
  image: string;
  images?: string[]; // Multi-image support için ek görseller
  certificates: string[];
  label: 'featured' | 'new' | 'popular' | 'none';
  featured?: boolean;
  fastDelivery?: boolean;
  stock?: number;
  purchasable?: boolean;
  paymentMethods?: PaymentMethod[];
}


export type PaymentMethod = 'iyzico' | 'iban' | 'whatsapp';

export const products: Product[] = [
  // FIRIN VE ISITMA SİSTEMLERİ
  {
    id: '1',
    model: 'YEKLAB YK-OVEN250',
    name: 'Kurutma Fırını 250°C',
    category: 'Fırınlar ve Isıtma',
    description: 'Hassas sıcaklık kontrolü ile laboratuvar kurutma fırını. Dijital gösterge ve timer özellikli.',
    specifications: {
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 250°C',
      'Hacim': '50 Litre',
      'Güç': '2.5 kW',
      'Boyutlar': '60x50x45 cm',
      'Kontrol': 'Dijital PID',
      'Timer': '0-999 dakika'
    },
    price: '₺35,000 - ₺45,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '2',
    model: 'YEKLAB YK-OVEN300',
    name: 'Yüksek Sıcaklık Fırını 300°C',
    category: 'Fırınlar ve Isıtma',
    description: 'Yüksek sıcaklık uygulamaları için profesyonel kurutma fırını.',
    specifications: {
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 300°C',
      'Hacim': '75 Litre',
      'Güç': '3.5 kW',
      'Boyutlar': '70x60x55 cm',
      'Kontrol': 'Dijital PID',
      'İzolasyon': 'Çift cidarlı'
    },
    price: '₺45,000 - ₺55,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001'],
    label: 'new'
  },
  {
    id: '3',
    model: 'YEKLAB YK-ASH550',
    name: 'Kül Fırını 550°C',
    category: 'Fırınlar ve Isıtma',
    description: 'Kül analizi ve yüksek sıcaklık uygulamaları için özel tasarım fırın.',
    specifications: {
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 550°C',
      'Hacim': '30 Litre',
      'Güç': '4.0 kW',
      'Boyutlar': '50x45x40 cm',
      'Kontrol': 'Programlanabilir',
      'Rampa': 'Ayarlanabilir ısıtma hızı'
    },
    price: '₺65,000 - ₺75,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001'],
    label: 'popular'
  },
  {
    id: '4',
    model: 'YEKLAB YK-OVEN180',
    name: 'Kompakt Kurutma Fırını',
    category: 'Fırınlar ve Isıtma',
    description: 'Küçük laboratuvarlar için kompakt boyutlu kurutma fırını.',
    specifications: {
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 180°C',
      'Hacim': '25 Litre',
      'Güç': '1.8 kW',
      'Boyutlar': '45x40x35 cm',
      'Kontrol': 'Analog',
      'Raf Sayısı': '2 adet'
    },
    price: '₺25,000 - ₺30,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE'],
    label: 'none'
  },

  // İNKÜBATÖRLER
  {
    id: '5',
    model: 'YEKLAB YK-INC37',
    name: 'Bakteriyoloji İnkübatörü',
    category: 'Hücre Kültürü',
    description: 'Bakteriyoloji çalışmaları için hassas sıcaklık kontrolü sağlayan inkübatör.',
    specifications: {
      'Sıcaklık Aralığı': '5°C - 70°C',
      'Hacim': '150 Litre',
      'Sıcaklık Hassasiyeti': '±0.1°C',
      'Boyutlar': '60x55x80 cm',
      'Kontrol': 'Mikroişlemci',
      'Alarm': 'Sesli ve görsel'
    },
    price: '₺40,000 - ₺50,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '6',
    model: 'YEKLAB YK-CO2INC',
    name: 'CO2 İnkübatörü',
    category: 'Hücre Kültürü',
    description: 'Hücre kültürü çalışmaları için CO2 kontrollü inkübatör.',
    specifications: {
      'Sıcaklık Aralığı': '5°C - 50°C',
      'CO2 Aralığı': '0-20%',
      'Hacim': '160 Litre',
      'Nem Kontrolü': '%95 RH',
      'Sterilizasyon': '180°C sıcak hava',
      'Kontrol': 'Dokunmatik ekran'
    },
    price: '₺85,000 - ₺120,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001', 'ISO13485'],
    label: 'featured'
  },
  {
    id: '7',
    model: 'YEKLAB YK-COOLINC',
    name: 'Soğutmalı İnkübatör',
    category: 'Hücre Kültürü',
    description: 'Düşük sıcaklık uygulamaları için soğutmalı inkübatör.',
    specifications: {
      'Sıcaklık Aralığı': '-10°C - +60°C',
      'Hacim': '200 Litre',
      'Soğutma Sistemi': 'CFC-free',
      'Boyutlar': '65x60x85 cm',
      'Kontrol': 'PID kontrol',
      'İç Malzeme': 'Paslanmaz çelik'
    },
    price: '₺65,000 - ₺80,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001'],
    label: 'new'
  },
  {
    id: '8',
    model: 'YEKLAB YK-MINIINC',
    name: 'Mini İnkübatör',
    category: 'Hücre Kültürü',
    description: 'Küçük hacimli numuneler için kompakt inkübatör.',
    specifications: {
      'Sıcaklık Aralığı': '5°C - 70°C',
      'Hacim': '50 Litre',
      'Güç': '300W',
      'Boyutlar': '45x40x50 cm',
      'Kontrol': 'Dijital',
      'Kapasıte': '2 raf'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE'],
    label: 'popular'
  },

  // STERİLİZATÖRLER
  {
    id: '9',
    model: 'YEKLAB YK-AUTO23L',
    name: 'Otomatik Otoklavı 23L',
    category: 'Sterilizasyon ve Temizlik',
    description: 'Tam otomatik buhar sterilizatörü, kompakt tasarım.',
    specifications: {
      'Hacim': '23 Litre',
      'Sıcaklık': '121°C - 134°C',
      'Basınç': '0.22 MPa',
      'Boyutlar': '50x50x85 cm',
      'Çevrim Süresi': '15-60 dakika',
      'Kontrol': 'Mikroişlemci'
    },
    price: '₺45,000 - ₺60,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001', 'ISO13485'],
    label: 'featured'
  },
  {
    id: '10',
    model: 'YEKLAB YK-AUTO50L',
    name: 'Otomatik Otoklavı 50L',
    category: 'Sterilizasyon ve Temizlik',
    description: 'Orta kapasiteli tam otomatik buhar sterilizatörü.',
    specifications: {
      'Hacim': '50 Litre',
      'Sıcaklık': '121°C - 134°C',
      'Basınç': '0.22 MPa',
      'Boyutlar': '60x60x95 cm',
      'Çevrim Süresi': '15-60 dakika',
      'Kurutma': 'Vakumlu kurutma'
    },
    price: '₺75,000 - ₺95,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001', 'ISO13485'],
    label: 'popular'
  },
  {
    id: '11',
    model: 'YEKLAB YK-UV30',
    name: 'UV Sterilizasyon Kabini',
    category: 'Sterilizasyon ve Temizlik',
    description: 'UV-C ışınları ile yüzey sterilizasyonu kabini.',
    specifications: {
      'UV Gücü': '30W',
      'Dalga Boyu': '254 nm',
      'Hacim': '100 Litre',
      'Boyutlar': '60x40x50 cm',
      'Timer': '0-60 dakika',
      'Güvenlik': 'Kapı kilidi'
    },
    price: '₺15,000 - ₺25,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'new'
  },
  {
    id: '12',
    model: 'YEKLAB YK-PLASMA',
    name: 'Plazma Sterilizatörü',
    category: 'Sterilizasyon ve Temizlik',
    description: 'Düşük sıcaklık plazma sterilizasyon sistemi.',
    specifications: {
      'Hacim': '100 Litre',
      'Sıcaklık': '45°C - 55°C',
      'Çevrim Süresi': '28-75 dakika',
      'Boyutlar': '85x65x180 cm',
      'Kontrol': 'Dokunmatik panel',
      'Güvenlik': 'Çoklu güvenlik sistemi'
    },
    price: '₺250,000 - ₺350,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001', 'ISO13485'],
    label: 'featured'
  },

  // KARIŞTIRICLAR VE ÇALKALAYICILAR
  {
    id: '13',
    model: 'YEKLAB YK-SHAKE150',
    name: 'Orbital Çalkalayıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    description: 'Değişken hızlı orbital çalkalayıcı, dijital gösterge.',
    specifications: {
      'Hız Aralığı': '30-300 rpm',
      'Orbit': '25 mm',
      'Kapasite': '2 kg',
      'Platform': '30x30 cm',
      'Timer': '1-999 dakika',
      'Kontrol': 'Dijital'
    },
    price: '₺18,000 - ₺25,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '14',
    model: 'YEKLAB YK-VORTEX',
    name: 'Vorteks Karıştırıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    description: 'Yüksek hızlı vorteks karıştırıcı, dokunmatik ve sürekli mod.',
    specifications: {
      'Hız': '0-3000 rpm',
      'Orbit': '4.5 mm',
      'Kapasite': '50ml tüp',
      'Boyutlar': '15x15x20 cm',
      'Mod': 'Dokunmatik/Sürekli',
      'Güç': '50W'
    },
    price: '₺8,000 - ₺12,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },
  {
    id: '15',
    model: 'YEKLAB YK-MAGSTIR',
    name: 'Manyetik Karıştırıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    description: 'Isıtmalı manyetik karıştırıcı, dijital sıcaklık kontrolü.',
    specifications: {
      'Hız': '100-1500 rpm',
      'Sıcaklık': 'Oda sıcaklığı - 300°C',
      'Plaka': '135x135 mm',
      'Kapasite': '1000 ml',
      'Kontrol': 'Dijital',
      'Güvenlik': 'Aşırı ısınma koruması'
    },
    price: '₺12,000 - ₺18,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '16',
    model: 'YEKLAB YK-OVERHEAD',
    name: 'Üstten Karıştırıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    description: 'Yüksek viskoziteli sıvılar için üstten karıştırıcı.',
    specifications: {
      'Hız': '50-2000 rpm',
      'Tork': '50 Ncm',
      'Kapasite': '5 Litre',
      'Şaft': 'Paslanmaz çelik',
      'Kontrol': 'Dijital',
      'Güç': '200W'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'new'
  },

  // SANTRİFÜJ SİSTEMLERİ
  {
    id: '17',
    model: 'YEKLAB YK-MICRO',
    name: 'Mikro Santrifüj',
    category: 'Santrifüj Sistemleri',
    description: 'Yüksek hızlı mikro santrifüj, 1.5/2.0 ml tüpler için.',
    specifications: {
      'Maksimum Hız': '15,000 rpm',
      'RCF': '21,380 x g',
      'Kapasite': '24 x 1.5/2.0 ml',
      'Timer': '30 saniye - 99 dakika',
      'Boyutlar': '35x25x20 cm',
      'Gürültü': '<54 dB'
    },
    price: '₺35,000 - ₺45,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'popular'
  },
  {
    id: '18',
    model: 'YEKLAB YK-CLINICAL',
    name: 'Klinik Santrifüj',
    category: 'Santrifüj Sistemleri',
    description: 'Klinik laboratuvarlar için çok amaçlı santrifüj.',
    specifications: {
      'Maksimum Hız': '6,000 rpm',
      'RCF': '4,730 x g',
      'Kapasite': '12 x 15 ml',
      'Timer': '1-99 dakika',
      'Boyutlar': '45x35x30 cm',
      'Fren': 'Otomatik'
    },
    price: '₺28,000 - ₺38,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '19',
    model: 'YEKLAB YK-HIGHSPEED',
    name: 'Yüksek Hızlı Santrifüj',
    category: 'Santrifüj Sistemleri',
    description: 'Araştırma laboratuvarları için yüksek hızlı santrifüj.',
    specifications: {
      'Maksimum Hız': '25,000 rpm',
      'RCF': '65,000 x g',
      'Kapasite': '6 x 50 ml',
      'Sıcaklık Kontrolü': '4°C - 40°C',
      'Boyutlar': '65x55x85 cm',
      'Güvenlik': 'Çoklu güvenlik sistemi'
    },
    price: '₺150,000 - ₺200,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '20',
    model: 'YEKLAB YK-MINI',
    name: 'Mini Santrifüj',
    category: 'Santrifüj Sistemleri',
    description: 'Kompakt boyutlu mini santrifüj, PCR tüpleri için.',
    specifications: {
      'Maksimum Hız': '6,000 rpm',
      'RCF': '2,000 x g',
      'Kapasite': '8 x 0.2 ml',
      'Timer': '15 saniye - 15 dakika',
      'Boyutlar': '20x15x15 cm',
      'Güç': '50W'
    },
    price: '₺12,000 - ₺18,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },

  // SU SİSTEMLERİ
  {
    id: '21',
    model: 'YEKLAB YK-PURE10',
    name: 'Saf Su Sistemi 10L/h',
    category: 'Su Sistemleri',
    description: 'Laboratuvar için saf su üretim sistemi, 10 litre/saat.',
    specifications: {
      'Kapasite': '10 L/h',
      'Saflık': 'Tip II (1-10 MΩ.cm)',
      'TOC': '<50 ppb',
      'Bakteriler': '<10 CFU/ml',
      'Boyutlar': '40x30x60 cm',
      'Filtreler': 'Ön filtre + RO + DI'
    },
    price: '₺45,000 - ₺60,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'popular'
  },
  {
    id: '22',
    model: 'YEKLAB YK-ULTRA',
    name: 'Ultra Saf Su Sistemi',
    category: 'Su Sistemleri',
    description: 'Ultra saf su üretimi için gelişmiş sistem.',
    specifications: {
      'Kapasite': '5 L/h',
      'Saflık': 'Tip I (>18.2 MΩ.cm)',
      'TOC': '<5 ppb',
      'Bakteriler': '<1 CFU/ml',
      'Boyutlar': '50x40x70 cm',
      'UV Lamba': '254 nm sterilizasyon'
    },
    price: '₺85,000 - ₺120,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '23',
    model: 'YEKLAB YK-DISTILL',
    name: 'Su Distilasyon Cihazı',
    category: 'Su Sistemleri',
    description: 'Elektrikli su distilasyon cihazı, 4 litre/saat.',
    specifications: {
      'Kapasite': '4 L/h',
      'Güç': '3 kW',
      'Malzeme': 'Paslanmaz çelik',
      'Boyutlar': '35x25x45 cm',
      'Otomatik': 'Seviye kontrolü',
      'Saflık': '1-5 MΩ.cm'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },
  {
    id: '24',
    model: 'YEKLAB YK-FILTER',
    name: 'Su Filtrasyon Sistemi',
    category: 'Su Sistemleri',
    description: 'Çok aşamalı su filtrasyon sistemi.',
    specifications: {
      'Aşama': '5 aşamalı',
      'Kapasite': '20 L/h',
      'Filtreler': 'Sediment + Karbon + RO',
      'Boyutlar': '60x20x80 cm',
      'Basınç': '2-6 bar',
      'Değişim': 'Kolay filtre değişimi'
    },
    price: '₺15,000 - ₺25,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'new'
  },

  // ÖLÇÜM VE ANALİZ
  {
    id: '25',
    model: 'YEKLAB YK-PH700',
    name: 'Masaüstü pH Metre',
    category: 'Ölçüm ve Analiz',
    description: 'Yüksek hassasiyetli masaüstü pH/mV/sıcaklık ölçer.',
    specifications: {
      'pH Aralığı': '-2.00 - 16.00 pH',
      'Hassasiyet': '±0.01 pH',
      'mV Aralığı': '±1999.9 mV',
      'Sıcaklık': '-5 - 105°C',
      'Kalibrasyon': '1-5 nokta',
      'Ekran': 'LCD'
    },
    price: '₺8,000 - ₺12,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '26',
    model: 'YEKLAB YK-COND500',
    name: 'İletkenlik Ölçer',
    category: 'Ölçüm ve Analiz',
    description: 'Dijital iletkenlik/TDS/tuzluluk ölçer.',
    specifications: {
      'İletkenlik': '0-200 mS/cm',
      'TDS': '0-100 g/L',
      'Tuzluluk': '0-100 ppt',
      'Hassasiyet': '±1% FS',
      'Sıcaklık': '0-100°C',
      'Kompanzasyon': 'Otomatik'
    },
    price: '₺6,000 - ₺10,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },
  {
    id: '27',
    model: 'YEKLAB YK-SPECTRO',
    name: 'UV-Vis Spektrofotometre',
    category: 'Ölçüm ve Analiz',
    description: 'Çift ışın UV-Vis spektrofotometre, geniş dalga boyu aralığı.',
    specifications: {
      'Dalga Boyu': '190-1100 nm',
      'Bant Genişliği': '1.8 nm',
      'Hassasiyet': '±0.3 nm',
      'Fotometrik': '±0.002 Abs',
      'Küvet': '10 mm cam/kuvars',
      'Yazılım': 'PC kontrollü'
    },
    price: '₺85,000 - ₺120,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '28',
    model: 'YEKLAB YK-BALANCE',
    name: 'Analitik Terazi',
    category: 'Ölçüm ve Analiz',
    description: 'Yüksek hassasiyetli analitik terazi, 0.1 mg okuma.',
    specifications: {
      'Kapasite': '220 g',
      'Okuma': '0.1 mg',
      'Tekrarlanabilirlik': '±0.1 mg',
      'Doğrusallık': '±0.2 mg',
      'Kalibrasyon': 'Harici',
      'Rüzgar Kalkanı': 'Cam'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'popular'
  },

  // OPTİK CİHAZLAR
  {
    id: '29',
    model: 'YEKLAB YK-MICRO400',
    name: 'Biyolojik Mikroskop',
    category: 'Optik Cihazlar',
    description: 'LED aydınlatmalı biyolojik mikroskop, 40x-1000x büyütme.',
    specifications: {
      'Büyütme': '40x-1000x',
      'Objektifler': '4x, 10x, 40x, 100x',
      'Okülerler': '10x geniş alan',
      'Aydınlatma': 'LED',
      'Kondenser': 'Abbe N.A. 1.25',
      'Sahne': 'Mekanik'
    },
    price: '₺15,000 - ₺25,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '30',
    model: 'YEKLAB YK-STEREO',
    name: 'Stereo Mikroskop',
    category: 'Optik Cihazlar',
    description: 'Zoom stereo mikroskop, LED aydınlatma.',
    specifications: {
      'Büyütme': '7x-45x',
      'Zoom Oranı': '6.4:1',
      'Çalışma Mesafesi': '100 mm',
      'Aydınlatma': 'LED üst/alt',
      'Okülerler': '10x',
      'Stand': 'Ayarlanabilir'
    },
    price: '₺18,000 - ₺28,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'new'
  },
  {
    id: '31',
    model: 'YEKLAB YK-DIGITAL',
    name: 'Dijital Mikroskop',
    category: 'Optik Cihazlar',
    description: 'USB dijital mikroskop, görüntü kayıt özellikli.',
    specifications: {
      'Büyütme': '50x-1000x',
      'Çözünürlük': '2MP',
      'Arayüz': 'USB 2.0',
      'Yazılım': 'Windows/Mac',
      'Aydınlatma': '8 LED',
      'Ölçüm': 'Yazılım desteği'
    },
    price: '₺8,000 - ₺15,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },
  {
    id: '32',
    model: 'YEKLAB YK-FLUOR',
    name: 'Floresan Mikroskop',
    category: 'Optik Cihazlar',
    description: 'Floresan mikroskop, çoklu filtre küpleri.',
    specifications: {
      'Büyütme': '40x-1000x',
      'Aydınlatma': '100W Hg',
      'Filtreler': 'DAPI, FITC, TRITC',
      'Objektifler': 'Plan fluor',
      'Kamera': 'Opsiyonel',
      'Güvenlik': 'UV koruması'
    },
    price: '₺85,000 - ₺150,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },

  // GENEL LABORATUVAR
  {
    id: '33',
    model: 'YEKLAB YK-HOOD120',
    name: 'Çeker Ocak 1200mm',
    category: 'Genel Laboratuvar',
    description: 'Kimyasal çeker ocak, değişken hava akımı.',
    specifications: {
      'Genişlik': '1200 mm',
      'Derinlik': '800 mm',
      'Yükseklik': '2400 mm',
      'Hava Akımı': '0.3-0.5 m/s',
      'Gürültü': '<65 dB',
      'Malzeme': 'Epoksi reçine'
    },
    price: '₺45,000 - ₺65,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'popular'
  },
  {
    id: '34',
    model: 'YEKLAB YK-CABINET',
    name: 'Güvenlik Kabini',
    category: 'Genel Laboratuvar',
    description: 'Biyolojik güvenlik kabini, Class II.',
    specifications: {
      'Sınıf': 'Class II A2',
      'Genişlik': '1200 mm',
      'HEPA Filtre': '%99.99',
      'Hava Akımı': '0.38 m/s',
      'UV Lamba': '30W',
      'Alarm': 'Sesli/görsel'
    },
    price: '₺65,000 - ₺85,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '35',
    model: 'YEKLAB YK-WASH',
    name: 'Laboratuvar Yıkama Makinesi',
    category: 'Genel Laboratuvar',
    description: 'Otomatik laboratuvar cam eşya yıkama makinesi.',
    specifications: {
      'Kapasite': '120 parça',
      'Program': '6 yıkama programı',
      'Sıcaklık': '93°C',
      'Kurutma': 'Sıcak hava',
      'Boyutlar': '60x60x85 cm',
      'Su': 'Saf su bağlantısı'
    },
    price: '₺85,000 - ₺120,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'new'
  },
  {
    id: '36',
    model: 'YEKLAB YK-FREEZE',
    name: 'Derin Dondurucu -80°C',
    category: 'Genel Laboratuvar',
    description: 'Ultra düşük sıcaklık derin dondurucu.',
    specifications: {
      'Sıcaklık': '-40°C - -86°C',
      'Hacim': '340 Litre',
      'Soğutucu': 'Çift kompresör',
      'Alarm': 'Sıcaklık/güç',
      'Boyutlar': '75x65x190 cm',
      'Güvenlik': 'Kilit sistemi'
    },
    price: '₺150,000 - ₺200,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },

  // ANALİZ VE AYIRMA
  {
    id: '37',
    model: 'YEKLAB YK-GEL200',
    name: 'Elektroforez Sistemi',
    category: 'Analiz ve Ayırma',
    description: 'Yatay elektroforez sistemi, DNA/RNA analizi.',
    specifications: {
      'Jel Boyutu': '20x25 cm',
      'Voltaj': '5-300V',
      'Akım': '400 mA',
      'Güç': '75W',
      'Kuyucuk': '20-50 adet',
      'Güvenlik': 'Otomatik kapanma'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '38',
    model: 'YEKLAB YK-CHROM',
    name: 'HPLC Sistemi',
    category: 'Analiz ve Ayırma',
    description: 'Yüksek performanslı sıvı kromatografi sistemi.',
    specifications: {
      'Basınç': '400 bar',
      'Akış Hızı': '0.1-10 ml/dk',
      'Enjeksiyon': 'Otomatik',
      'Dedektör': 'UV-Vis',
      'Yazılım': 'Veri analizi',
      'Kolon': 'C18 dahil'
    },
    price: '₺250,000 - ₺350,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '39',
    model: 'YEKLAB YK-GC',
    name: 'Gaz Kromatografi',
    category: 'Analiz ve Ayırma',
    description: 'Gaz kromatografi sistemi, FID dedektör.',
    specifications: {
      'Sıcaklık': '50-450°C',
      'Enjeksiyon': 'Split/Splitless',
      'Dedektör': 'FID',
      'Kolon': 'Kapiler',
      'Taşıyıcı Gaz': 'He, N2, H2',
      'Yazılım': 'PC kontrollü'
    },
    price: '₺180,000 - ₺250,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '40',
    model: 'YEKLAB YK-PCR',
    name: 'PCR Termal Döngü Cihazı',
    category: 'Analiz ve Ayırma',
    description: 'Programlanabilir PCR termal döngü cihazı.',
    specifications: {
      'Kapasite': '96 x 0.2 ml',
      'Sıcaklık': '4-99°C',
      'Hassasiyet': '±0.1°C',
      'Rampa Hızı': '3°C/s',
      'Program': '100 program',
      'Ekran': 'Dokunmatik'
    },
    price: '₺65,000 - ₺85,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'popular'
  },

  // DÖKÜM VE KUMLAMA SİSTEMLERİ
  {
    id: '41',
    model: 'YEKLAB YK-CAST100',
    name: 'Vakumlu Döküm Makinesi',
    category: 'Döküm ve Kumlama Sistemleri',
    description: 'Dental ve mücevher döküm için vakumlu döküm makinesi.',
    specifications: {
      'Vakum': '0.1 mbar',
      'Sıcaklık': '1200°C',
      'Kapasite': '100g metal',
      'Kontrol': 'Dijital',
      'Güvenlik': 'Otomatik kapanma',
      'Boyutlar': '40x30x50 cm'
    },
    price: '₺85,000 - ₺120,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'new'
  },
  {
    id: '42',
    model: 'YEKLAB YK-SAND50',
    name: 'Kumlama Kabini',
    category: 'Döküm ve Kumlama Sistemleri',
    description: 'Basınçlı kumlama kabini, gözlük ve eldiven dahil.',
    specifications: {
      'Hacim': '50 Litre',
      'Basınç': '2-8 bar',
      'Aydınlatma': 'LED',
      'Filtre': 'Toz toplama',
      'Boyutlar': '60x50x60 cm',
      'Aksesuar': 'Tabanca ve hortum'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '43',
    model: 'YEKLAB YK-INDUC',
    name: 'İndüksiyon Eritme Fırını',
    category: 'Döküm ve Kumlama Sistemleri',
    description: 'Yüksek frekanslı indüksiyon eritme fırını.',
    specifications: {
      'Güç': '15 kW',
      'Frekans': '30-80 kHz',
      'Kapasite': '2 kg',
      'Sıcaklık': '1600°C',
      'Soğutma': 'Su soğutmalı',
      'Kontrol': 'Dokunmatik panel'
    },
    price: '₺150,000 - ₺200,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '44',
    model: 'YEKLAB YK-POLISH',
    name: 'Parlatma Makinesi',
    category: 'Döküm ve Kumlama Sistemleri',
    description: 'Çift diskli parlatma makinesi, toz toplama sistemi.',
    specifications: {
      'Motor Gücü': '1.5 kW',
      'Disk Çapı': '200 mm',
      'Devir': '2850 rpm',
      'Toz Toplama': 'Dahili',
      'Boyutlar': '80x40x120 cm',
      'Güvenlik': 'Koruyucu kapak'
    },
    price: '₺35,000 - ₺45,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },

  // EK ÜRÜNLER
  {
    id: '45',
    model: 'YEKLAB YK-PUMP01',
    name: 'Vakum Pompası',
    category: 'Genel Laboratuvar',
    description: 'Yağsız diyafram vakum pompası, sessiz çalışma.',
    specifications: {
      'Vakum': '0.8 mbar',
      'Akış': '38 L/dk',
      'Güç': '550W',
      'Gürültü': '<47 dB',
      'Boyutlar': '35x25x30 cm',
      'Bakım': 'Yağsız'
    },
    price: '₺18,000 - ₺25,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '46',
    model: 'YEKLAB YK-ULTRA01',
    name: 'Ultrasonik Banyo',
    category: 'Sterilizasyon ve Temizlik',
    description: 'Dijital ultrasonik temizlik banyosu, ısıtmalı.',
    specifications: {
      'Hacim': '10 Litre',
      'Frekans': '40 kHz',
      'Güç': '240W',
      'Sıcaklık': 'Oda sıcaklığı - 80°C',
      'Timer': '1-30 dakika',
      'Boyutlar': '32x30x32 cm'
    },
    price: '₺12,000 - ₺18,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'none'
  },
  {
    id: '47',
    model: 'YEKLAB YK-SHAKE01',
    name: 'Çalkalamalı İnkübatör',
    category: 'Hücre Kültürü',
    description: 'Sıcaklık kontrollü çalkalamalı inkübatör.',
    specifications: {
      'Sıcaklık': '5°C - 70°C',
      'Çalkalama': '50-300 rpm',
      'Hacim': '200 Litre',
      'Orbit': '25 mm',
      'Boyutlar': '70x60x85 cm',
      'Kontrol': 'Mikroişlemci'
    },
    price: '₺65,000 - ₺85,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '48',
    model: 'YEKLAB YK-ROTARY01',
    name: 'Rotary Evaporatör',
    category: 'Analiz ve Ayırma',
    description: 'Çözücü geri kazanımı için rotary evaporatör.',
    specifications: {
      'Hacim': '1-5 Litre',
      'Devir': '10-280 rpm',
      'Sıcaklık': '180°C',
      'Vakum': '1 mbar',
      'Soğutucu': 'Kondenser dahil',
      'Kontrol': 'Dijital'
    },
    price: '₺45,000 - ₺65,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '49',
    model: 'YEKLAB YK-FREEZE01',
    name: 'Liyofilizatör',
    category: 'Genel Laboratuvar',
    description: 'Dondurarak kurutma sistemi, liyofilizatör.',
    specifications: {
      'Kapasite': '2 Litre',
      'Vakum': '0.1 mbar',
      'Sıcaklık': '-50°C',
      'Kondenser': '-85°C',
      'Boyutlar': '60x50x80 cm',
      'Kontrol': 'Dokunmatik'
    },
    price: '₺150,000 - ₺200,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '50',
    model: 'YEKLAB YK-HOMO01',
    name: 'Homojenizatör',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    description: 'Yüksek hızlı doku homojenizatörü.',
    specifications: {
      'Hız': '500-24000 rpm',
      'Kapasite': '0.2-50 ml',
      'Güç': '200W',
      'Prob': 'Paslanmaz çelik',
      'Boyutlar': '20x15x35 cm',
      'Kontrol': 'Dijital'
    },
    price: '₺25,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'new'
  },
  {
    id: '51',
    model: 'YEKLAB YK-SONICATOR',
    name: 'Sonikasyon Cihazı',
    category: 'Analiz ve Ayırma',
    description: 'Hücre parçalama için ultrasonik sonikasyon cihazı.',
    specifications: {
      'Frekans': '20 kHz',
      'Güç': '500W',
      'Prob': 'Titanyum',
      'Pulse': 'Ayarlanabilir',
      'Boyutlar': '25x20x40 cm',
      'Soğutma': 'Buz banyosu'
    },
    price: '₺35,000 - ₺50,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE'],
    label: 'popular'
  },
  {
    id: '52',
    model: 'YEKLAB YK-DISPENSER',
    name: 'Otomatik Dispenser',
    category: 'Genel Laboratuvar',
    description: 'Programlanabilir sıvı dispenseri, çok kanallı.',
    specifications: {
      'Kanal': '8 kanal',
      'Hacim': '0.5-5000 μl',
      'Hassasiyet': '±1%',
      'Program': '99 program',
      'Boyutlar': '30x25x40 cm',
      'Ekran': 'LCD'
    },
    price: '₺45,000 - ₺65,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    certificates: ['CE', 'ISO9001'],
    label: 'featured'
  },
  {
    id: '53',
    model: 'YEKLAB YK-PIPETTE-PASTEUR',
    name: "Pastör Pipeti (100'lü paket)",
    category: 'Hızlı Teslimat',
    description: 'Laboratuvar için tek kullanımlık pastör pipeti, steril paket. Bugün sipariş verin, hızlı kargo ile kısa sürede elinizde.',
    specifications: {
      'Uzunluk': '155 mm',
      'Malzeme': 'PPL Plastik',
      'Paket İçeriği': '100 adet',
      'Sterilizasyon': 'Steril-Değil'
    },
    price: '₺155',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE'],
    label: 'featured',
    fastDelivery: true,
    stock: 999,
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp']
  },
  {
    id: '54', 
    model: 'YEKLAB YK-MOISTURE',
    name: 'Nem Tayin Cihazı',
    category: 'Hızlı Teslimat',
    description: 'Halojenlı ısıtıcı ile hızlı nem tayini, dijital ekran. Stokta mevcut, hızlı teslimat.',
    specifications: {
      'Hassasiyet': '±0.01%',
      'Sıcaklık Aralığı': '50-200°C', 
      'Kapasite': '100g',
      'Ekran': 'LCD dokunmatik'
    },
    price: '₺55.000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    certificates: ['CE', 'ISO9001'],
    label: 'featured',
    fastDelivery: true,
    stock: 25,
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp']
  },
  {
    id: '55',
    model: 'YEKLAB YK-ASH7L', 
    name: 'Kül Fırını 7L',
    category: 'Hızlı Teslimat',
    description: 'Kül fırını, 7 litre hacim, 1100°C sıcaklık. Depoda hazır, hızlı kargo.',
    specifications: {
      'Sıcaklık Aralığı': 'Oda sıcaklığı - 1200°C',
      'Hacim': '7 Litre',
      'Kontrol': 'Dijital PID',
      'Rampa': 'Ayarlanabilir ısıtma'
    },
    price: '₺65.000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp', 
    certificates: ['CE', 'ISO9001'],
    label: 'popular',
    fastDelivery: true,
    stock: 10,
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp']
  },
  {
    id: '56',
    model: 'YEKLAB YEK-306',
    name: 'Oksijenli Kalorimetre',
    category: 'Ölçüm ve Analiz',
    description: 'Yakıt değeri ve ısıl değer tayini için hassas oksijenli kalorimetre. Otomatik ateşleme ve dijital kontrol sistemi.',
    specifications: {
      'Ölçüm Aralığı': '0-40,000 kJ/kg',
      'Hassasiyet': '±0.05%',
      'Örnek Miktarı': '0.5-2.0 g',
      'Basınç': '30 bar oksijen',
      'Kontrol': 'Tam otomatik',
      'Standart': 'ASTM D240, ISO 1928'
    },
    price: '$15,000',
    image: 'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi.jpg.avif',
    images: [
      'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi-2.jpg',
      'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi-3.jpg',
      'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi-4.jpg'
    ],
    certificates: ['CE', 'ISO9001', 'ASTM'],
    label: 'featured',
    featured: true
  }
];