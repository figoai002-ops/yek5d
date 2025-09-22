import type { Product } from '@/types/ecom';
import { slugify } from '@/lib/slug';

export const products: Product[] = [
  // YEK-306 Kalorimetre - Yıldız Ürün (İlk sırada)
  {
    id: '053',
    slug: slugify('YEK-306 Oksijenli Kalorimetre'),
    name: 'YEK-306 Oksijenli Kalorimetre',
    category: 'Analiz Cihazları',
    price: '$16,500 - $18,500',
    image: 'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi.jpg.avif',
    images: [
      'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi-2.jpg',
      'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi-3.jpg',
      'https://ik.imagekit.io/qvtafpu3u/oksijenli-kalorimetre-yeklab-yek306-laboratuvar-cihazi-4.jpg'
    ],
    stock: 2,
    isQuickDelivery: true,
    shortDesc: 'Yakıt değeri ve ısıl değer tayini için hassas oksijenli kalorimetre. Kömür, biyokütle ve diğer yanıcı maddeler için ideal.',
    specs: {
      'Model': 'YEKLAB YEK-306',
      'Ölçüm Aralığı': '0-40,000 kJ/kg',
      'Hassasiyet': '±0.1%',
      'Numune Kapasitesi': '0.5-1.5 gram'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '001',
    slug: slugify('Kurutma Fırını 250°C'),
    name: 'Kurutma Fırını 250°C',
    category: 'Fırınlar ve Isıtma',
    price: '₺40,000 - ₺55,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 5,
    isQuickDelivery: false,
    shortDesc: 'Hassas sıcaklık kontrolü ile laboratuvar kurutma fırını.',
    specs: {
      'Model': 'YEKLAB YK-OVEN250',
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 250°C',
      'Hacim': '50 Litre'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '002',
    slug: slugify('Yüksek Sıcaklık Fırını 300°C'),
    name: 'Yüksek Sıcaklık Fırını 300°C',
    category: 'Fırınlar ve Isıtma',
    price: '₺55,000 - ₺65,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Yüksek sıcaklık uygulamaları için profesyonel kurutma fırını.',
    specs: {
      'Model': 'YEKLAB YK-OVEN300',
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 300°C',
      'Hacim': '75 Litre'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '003',
    slug: slugify('Kül Fırını 550°C'),
    name: 'Kül Fırını 550°C',
    category: 'Fırınlar ve Isıtma',
    price: '₺70,000 - ₺85,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Kül analizi ve yüksek sıcaklık uygulamaları için özel tasarım fırın.',
    specs: {
      'Model': 'YEKLAB YK-ASH550',
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 550°C',
      'Hacim': '30 Litre'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '004',
    slug: slugify('Kompakt Kurutma Fırını'),
    name: 'Kompakt Kurutma Fırını',
    category: 'Fırınlar ve Isıtma',
    price: '₺28,000 - ₺35,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 8,
    isQuickDelivery: false,
    shortDesc: 'Küçük laboratuvarlar için kompakt boyutlu kurutma fırını.',
    specs: {
      'Model': 'YEKLAB YK-OVEN180',
      'Sıcaklık Aralığı': 'Oda sıcaklığı +10°C - 180°C',
      'Hacim': '25 Litre'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '005',
    slug: slugify('Bakteriyoloji İnkübatörü'),
    name: 'Bakteriyoloji İnkübatörü',
    category: 'Hücre Kültürü',
    price: '₺45,000 - ₺55,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 4,
    isQuickDelivery: false,
    shortDesc: 'Bakteriyoloji çalışmaları için hassas sıcaklık kontrolü sağlayan inkübatör.',
    specs: {
      'Model': 'YEKLAB YK-INC37',
      'Sıcaklık Aralığı': '5°C - 70°C',
      'Hacim': '150 Litre'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '006',
    slug: slugify('CO2 İnkübatörü'),
    name: 'CO2 İnkübatörü',
    category: 'Hücre Kültürü',
    price: '₺95,000 - ₺135,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Hücre kültürü çalışmaları için CO2 kontrollü inkübatör.',
    specs: {
      'Model': 'YEKLAB YK-CO2INC',
      'Sıcaklık Aralığı': '5°C - 50°C',
      'CO2 Aralığı': '0-20%'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '007',
    slug: slugify('Soğutmalı İnkübatör'),
    name: 'Soğutmalı İnkübatör',
    category: 'Hücre Kültürü',
    price: '₺70,000 - ₺90,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Düşük sıcaklık uygulamaları için soğutmalı inkübatör.',
    specs: {
      'Model': 'YEKLAB YK-COOLINC',
      'Sıcaklık Aralığı': '-10°C - +60°C',
      'Hacim': '200 Litre'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '008',
    slug: slugify('Mini İnkübatör'),
    name: 'Mini İnkübatör',
    category: 'Hücre Kültürü',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 6,
    isQuickDelivery: false,
    shortDesc: 'Küçük hacimli numuneler için kompakt inkübatör.',
    specs: {
      'Model': 'YEKLAB YK-MINIINC',
      'Sıcaklık Aralığı': '5°C - 70°C',
      'Hacim': '50 Litre'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '009',
    slug: slugify('Otomatik Otoklavı 23L'),
    name: 'Otomatik Otoklavı 23L',
    category: 'Sterilizasyon ve Temizlik',
    price: '₺50,000 - ₺70,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 4,
    isQuickDelivery: false,
    shortDesc: 'Tam otomatik buhar sterilizatörü, kompakt tasarım.',
    specs: {
      'Model': 'YEKLAB YK-AUTO23L',
      'Hacim': '23 Litre',
      'Sıcaklık': '121°C - 134°C'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '010',
    slug: slugify('Otomatik Otoklavı 50L'),
    name: 'Otomatik Otoklavı 50L',
    category: 'Sterilizasyon ve Temizlik',
    price: '₺85,000 - ₺110,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Orta kapasiteli tam otomatik buhar sterilizatörü.',
    specs: {
      'Model': 'YEKLAB YK-AUTO50L',
      'Hacim': '50 Litre',
      'Sıcaklık': '121°C - 134°C'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '011',
    slug: slugify('UV Sterilizasyon Kabini'),
    name: 'UV Sterilizasyon Kabini',
    category: 'Sterilizasyon ve Temizlik',
    price: '₺18,000 - ₺28,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 10,
    isQuickDelivery: false,
    shortDesc: 'UV-C ışınları ile yüzey sterilizasyonu kabini.',
    specs: {
      'Model': 'YEKLAB YK-UV30',
      'UV Gücü': '30W',
      'Hacim': '100 Litre'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '012',
    slug: slugify('Plazma Sterilizatörü'),
    name: 'Plazma Sterilizatörü',
    category: 'Sterilizasyon ve Temizlik',
    price: '₺280,000 - ₺380,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 1,
    isQuickDelivery: false,
    shortDesc: 'Düşük sıcaklık plazma sterilizasyon sistemi.',
    specs: {
      'Model': 'YEKLAB YK-PLASMA',
      'Hacim': '100 Litre',
      'Sıcaklık': '45°C - 55°C'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '013',
    slug: slugify('Orbital Çalkalayıcı'),
    name: 'Orbital Çalkalayıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    price: '₺20,000 - ₺28,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 8,
    isQuickDelivery: false,
    shortDesc: 'Değişken hızlı orbital çalkalayıcı, dijital gösterge.',
    specs: {
      'Model': 'YEKLAB YK-SHAKE150',
      'Hız Aralığı': '30-300 rpm',
      'Platform': '30x30 cm'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '014',
    slug: slugify('Vorteks Karıştırıcı'),
    name: 'Vorteks Karıştırıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    price: '₺9,000 - ₺14,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 15,
    isQuickDelivery: false,
    shortDesc: 'Yüksek hızlı vorteks karıştırıcı, dokunmatik ve sürekli mod.',
    specs: {
      'Model': 'YEKLAB YK-VORTEX',
      'Hız': '0-3000 rpm',
      'Kapasite': '50ml tüp'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '015',
    slug: slugify('Manyetik Karıştırıcı'),
    name: 'Manyetik Karıştırıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    price: '₺14,000 - ₺20,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 12,
    isQuickDelivery: false,
    shortDesc: 'Isıtmalı manyetik karıştırıcı, dijital sıcaklık kontrolü.',
    specs: {
      'Model': 'YEKLAB YK-MAGSTIR',
      'Hız': '100-1500 rpm',
      'Sıcaklık': 'Oda sıcaklığı - 300°C'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '016',
    slug: slugify('Üstten Karıştırıcı'),
    name: 'Üstten Karıştırıcı',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 6,
    isQuickDelivery: false,
    shortDesc: 'Yüksek viskoziteli sıvılar için üstten karıştırıcı.',
    specs: {
      'Model': 'YEKLAB YK-OVERHEAD',
      'Hız': '50-2000 rpm',
      'Kapasite': '5 Litre'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '017',
    slug: slugify('Mikro Santrifüj'),
    name: 'Mikro Santrifüj',
    category: 'Santrifüj Sistemleri',
    price: '₺40,000 - ₺55,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 5,
    isQuickDelivery: false,
    shortDesc: 'Yüksek hızlı mikro santrifüj, 1.5/2.0 ml tüpler için.',
    specs: {
      'Model': 'YEKLAB YK-MICRO',
      'Maksimum Hız': '15,000 rpm',
      'Kapasite': '24 x 1.5/2.0 ml'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '018',
    slug: slugify('Klinik Santrifüj'),
    name: 'Klinik Santrifüj',
    category: 'Santrifüj Sistemleri',
    price: '₺32,000 - ₺45,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 7,
    isQuickDelivery: false,
    shortDesc: 'Klinik laboratuvarlar için çok amaçlı santrifüj.',
    specs: {
      'Model': 'YEKLAB YK-CLINICAL',
      'Maksimum Hız': '6,000 rpm',
      'Kapasite': '12 x 15 ml'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '019',
    slug: slugify('Yüksek Hızlı Santrifüj'),
    name: 'Yüksek Hızlı Santrifüj',
    category: 'Santrifüj Sistemleri',
    price: '₺170,000 - ₺220,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Araştırma laboratuvarları için yüksek hızlı santrifüj.',
    specs: {
      'Model': 'YEKLAB YK-HIGHSPEED',
      'Maksimum Hız': '25,000 rpm',
      'Sıcaklık Kontrolü': '4°C - 40°C'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '020',
    slug: slugify('Mini Santrifüj'),
    name: 'Mini Santrifüj',
    category: 'Santrifüj Sistemleri',
    price: '₺14,000 - ₺22,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 10,
    isQuickDelivery: false,
    shortDesc: 'Kompakt boyutlu mini santrifüj, PCR tüpleri için.',
    specs: {
      'Model': 'YEKLAB YK-MINI',
      'Maksimum Hız': '6,000 rpm',
      'Kapasite': '8 x 0.2 ml'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '021',
    slug: slugify('Saf Su Sistemi 10L/h'),
    name: 'Saf Su Sistemi 10L/h',
    category: 'Su Sistemleri',
    price: '₺50,000 - ₺70,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 4,
    isQuickDelivery: false,
    shortDesc: 'Laboratuvar için saf su üretim sistemi, 10 litre/saat.',
    specs: {
      'Model': 'YEKLAB YK-PURE10',
      'Kapasite': '10 L/h',
      'Saflık': 'Tip II (1-10 MΩ.cm)'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '022',
    slug: slugify('Ultra Saf Su Sistemi'),
    name: 'Ultra Saf Su Sistemi',
    category: 'Su Sistemleri',
    price: '₺95,000 - ₺135,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Ultra saf su üretimi için gelişmiş sistem.',
    specs: {
      'Model': 'YEKLAB YK-ULTRA',
      'Kapasite': '5 L/h',
      'Saflık': 'Tip I (>18.2 MΩ.cm)'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '023',
    slug: slugify('Su Distilasyon Cihazı'),
    name: 'Su Distilasyon Cihazı',
    category: 'Su Sistemleri',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 6,
    isQuickDelivery: false,
    shortDesc: 'Elektrikli su distilasyon cihazı, 4 litre/saat.',
    specs: {
      'Model': 'YEKLAB YK-DISTILL',
      'Kapasite': '4 L/h',
      'Saflık': '1-5 MΩ.cm'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '024',
    slug: slugify('Su Filtrasyon Sistemi'),
    name: 'Su Filtrasyon Sistemi',
    category: 'Su Sistemleri',
    price: '₺18,000 - ₺30,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 8,
    isQuickDelivery: false,
    shortDesc: 'Çok aşamalı su filtrasyon sistemi.',
    specs: {
      'Model': 'YEKLAB YK-FILTER',
      'Aşama': '5 aşamalı',
      'Kapasite': '20 L/h'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '025',
    slug: slugify('Masaüstü pH Metre'),
    name: 'Masaüstü pH Metre',
    category: 'Ölçüm ve Analiz',
    price: '₺9,000 - ₺15,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 15,
    isQuickDelivery: false,
    shortDesc: 'Yüksek hassasiyetli masaüstü pH/mV/sıcaklık ölçer.',
    specs: {
      'Model': 'YEKLAB YK-PH700',
      'pH Aralığı': '-2.00 - 16.00 pH',
      'Hassasiyet': '±0.01 pH'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '026',
    slug: slugify('İletkenlik Ölçer'),
    name: 'İletkenlik Ölçer',
    category: 'Ölçüm ve Analiz',
    price: '₺7,000 - ₺12,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 12,
    isQuickDelivery: false,
    shortDesc: 'Dijital iletkenlik/TDS/tuzluluk ölçer.',
    specs: {
      'Model': 'YEKLAB YK-COND500',
      'İletkenlik': '0-200 mS/cm',
      'Hassasiyet': '±1% FS'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '027',
    slug: slugify('UV-Vis Spektrofotometre'),
    name: 'UV-Vis Spektrofotometre',
    category: 'Ölçüm ve Analiz',
    price: '₺95,000 - ₺135,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Çift ışın UV-Vis spektrofotometre, geniş dalga boyu aralığı.',
    specs: {
      'Model': 'YEKLAB YK-SPECTRO',
      'Dalga Boyu': '190-1100 nm',
      'Hassasiyet': '±0.3 nm'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '028',
    slug: slugify('Analitik Terazi'),
    name: 'Analitik Terazi',
    category: 'Ölçüm ve Analiz',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 8,
    isQuickDelivery: false,
    shortDesc: 'Yüksek hassasiyetli analitik terazi, 0.1 mg okuma.',
    specs: {
      'Model': 'YEKLAB YK-BALANCE',
      'Kapasite': '220 g',
      'Okuma': '0.1 mg'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '029',
    slug: slugify('Biyolojik Mikroskop'),
    name: 'Biyolojik Mikroskop',
    category: 'Optik Cihazlar',
    price: '₺18,000 - ₺28,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 10,
    isQuickDelivery: false,
    shortDesc: 'LED aydınlatmalı biyolojik mikroskop, 40x-1000x büyütme.',
    specs: {
      'Model': 'YEKLAB YK-MICRO400',
      'Büyütme': '40x-1000x',
      'Aydınlatma': 'LED'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '030',
    slug: slugify('Stereo Mikroskop'),
    name: 'Stereo Mikroskop',
    category: 'Optik Cihazlar',
    price: '₺20,000 - ₺32,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 6,
    isQuickDelivery: false,
    shortDesc: 'Zoom stereo mikroskop, LED aydınlatma.',
    specs: {
      'Model': 'YEKLAB YK-STEREO',
      'Büyütme': '7x-45x',
      'Çalışma Mesafesi': '100 mm'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '031',
    slug: slugify('Dijital Mikroskop'),
    name: 'Dijital Mikroskop',
    category: 'Optik Cihazlar',
    price: '₺9,000 - ₺18,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 12,
    isQuickDelivery: false,
    shortDesc: 'USB dijital mikroskop, görüntü kayıt özellikli.',
    specs: {
      'Model': 'YEKLAB YK-DIGITAL',
      'Büyütme': '50x-1000x',
      'Çözünürlük': '2MP'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '032',
    slug: slugify('Floresan Mikroskop'),
    name: 'Floresan Mikroskop',
    category: 'Optik Cihazlar',
    price: '₺95,000 - ₺165,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Floresan mikroskop, çoklu filtre küpleri.',
    specs: {
      'Model': 'YEKLAB YK-FLUOR',
      'Büyütme': '40x-1000x',
      'Filtreler': 'DAPI, FITC, TRITC'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '033',
    slug: slugify('Çeker Ocak 1200mm'),
    name: 'Çeker Ocak 1200mm',
    category: 'Genel Laboratuvar',
    price: '₺50,000 - ₺75,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Kimyasal çeker ocak, değişken hava akımı.',
    specs: {
      'Model': 'YEKLAB YK-HOOD120',
      'Genişlik': '1200 mm',
      'Hava Akımı': '0.3-0.5 m/s'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '034',
    slug: slugify('Güvenlik Kabini'),
    name: 'Güvenlik Kabini',
    category: 'Genel Laboratuvar',
    price: '₺75,000 - ₺95,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Biyolojik güvenlik kabini, Class II.',
    specs: {
      'Model': 'YEKLAB YK-CABINET',
      'Sınıf': 'Class II A2',
      'HEPA Filtre': '%99.99'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '035',
    slug: slugify('Laboratuvar Yıkama Makinesi'),
    name: 'Laboratuvar Yıkama Makinesi',
    category: 'Genel Laboratuvar',
    price: '₺95,000 - ₺135,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Otomatik laboratuvar cam eşya yıkama makinesi.',
    specs: {
      'Model': 'YEKLAB YK-WASH',
      'Kapasite': '120 parça',
      'Program': '6 yıkama programı'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '036',
    slug: slugify('Derin Dondurucu -80°C'),
    name: 'Derin Dondurucu -80°C',
    category: 'Genel Laboratuvar',
    price: '₺170,000 - ₺220,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 1,
    isQuickDelivery: false,
    shortDesc: 'Ultra düşük sıcaklık derin dondurucu.',
    specs: {
      'Model': 'YEKLAB YK-FREEZE',
      'Sıcaklık': '-40°C - -86°C',
      'Hacim': '340 Litre'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '037',
    slug: slugify('Elektroforez Sistemi'),
    name: 'Elektroforez Sistemi',
    category: 'Analiz ve Ayırma',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 6,
    isQuickDelivery: false,
    shortDesc: 'Yatay elektroforez sistemi, DNA/RNA analizi.',
    specs: {
      'Model': 'YEKLAB YK-GEL200',
      'Jel Boyutu': '20x25 cm',
      'Voltaj': '5-300V'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '038',
    slug: slugify('HPLC Sistemi'),
    name: 'HPLC Sistemi',
    category: 'Analiz ve Ayırma',
    price: '₺280,000 - ₺380,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 1,
    isQuickDelivery: false,
    shortDesc: 'Yüksek performanslı sıvı kromatografi sistemi.',
    specs: {
      'Model': 'YEKLAB YK-CHROM',
      'Basınç': '400 bar',
      'Akış Hızı': '0.1-10 ml/dk'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '039',
    slug: slugify('Gaz Kromatografi'),
    name: 'Gaz Kromatografi',
    category: 'Analiz ve Ayırma',
    price: '₺200,000 - ₺270,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 1,
    isQuickDelivery: false,
    shortDesc: 'Gaz kromatografi sistemi, FID dedektör.',
    specs: {
      'Model': 'YEKLAB YK-GC',
      'Sıcaklık': '50-450°C',
      'Dedektör': 'FID'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '040',
    slug: slugify('PCR Termal Döngü Cihazı'),
    name: 'PCR Termal Döngü Cihazı',
    category: 'Analiz ve Ayırma',
    price: '₺70,000 - ₺95,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Programlanabilir PCR termal döngü cihazı.',
    specs: {
      'Model': 'YEKLAB YK-PCR',
      'Kapasite': '96 x 0.2 ml',
      'Sıcaklık': '4-99°C'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '041',
    slug: slugify('Vakumlu Döküm Makinesi'),
    name: 'Vakumlu Döküm Makinesi',
    category: 'Döküm ve Kumlama Sistemleri',
    price: '₺95,000 - ₺135,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Dental ve mücevher döküm için vakumlu döküm makinesi.',
    specs: {
      'Model': 'YEKLAB YK-CAST100',
      'Vakum': '0.1 mbar',
      'Sıcaklık': '1200°C'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '042',
    slug: slugify('Kumlama Kabini'),
    name: 'Kumlama Kabini',
    category: 'Döküm ve Kumlama Sistemleri',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 4,
    isQuickDelivery: false,
    shortDesc: 'Basınçlı kumlama kabini, gözlük ve eldiven dahil.',
    specs: {
      'Model': 'YEKLAB YK-SAND50',
      'Hacim': '50 Litre',
      'Basınç': '2-8 bar'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '043',
    slug: slugify('İndüksiyon Eritme Fırını'),
    name: 'İndüksiyon Eritme Fırını',
    category: 'Döküm ve Kumlama Sistemleri',
    price: '₺170,000 - ₺220,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 1,
    isQuickDelivery: false,
    shortDesc: 'Yüksek frekanslı indüksiyon eritme fırını.',
    specs: {
      'Model': 'YEKLAB YK-INDUC',
      'Güç': '15 kW',
      'Sıcaklık': '1600°C'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '044',
    slug: slugify('Parlatma Makinesi'),
    name: 'Parlatma Makinesi',
    category: 'Döküm ve Kumlama Sistemleri',
    price: '₺40,000 - ₺55,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 5,
    isQuickDelivery: false,
    shortDesc: 'Çift diskli parlatma makinesi, toz toplama sistemi.',
    specs: {
      'Model': 'YEKLAB YK-POLISH',
      'Motor Gücü': '1.5 kW',
      'Disk Çapı': '200 mm'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '045',
    slug: slugify('Vakum Pompası'),
    name: 'Vakum Pompası',
    category: 'Genel Laboratuvar',
    price: '₺20,000 - ₺30,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 8,
    isQuickDelivery: false,
    shortDesc: 'Yağsız diyafram vakum pompası, sessiz çalışma.',
    specs: {
      'Model': 'YEKLAB YK-PUMP01',
      'Vakum': '0.8 mbar',
      'Akış': '38 L/dk'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '046',
    slug: slugify('Ultrasonik Banyo'),
    name: 'Ultrasonik Banyo',
    category: 'Sterilizasyon ve Temizlik',
    price: '₺14,000 - ₺22,000',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 10,
    isQuickDelivery: false,
    shortDesc: 'Dijital ultrasonik temizlik banyosu, ısıtmalı.',
    specs: {
      'Model': 'YEKLAB YK-ULTRA01',
      'Hacim': '10 Litre',
      'Frekans': '40 kHz'
    },
    purchasable: false,
    label: 'none'
  },
  {
    id: '047',
    slug: slugify('Çalkalamalı İnkübatör'),
    name: 'Çalkalamalı İnkübatör',
    category: 'Hücre Kültürü',
    price: '₺70,000 - ₺95,000',
    image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 2,
    isQuickDelivery: false,
    shortDesc: 'Sıcaklık kontrollü çalkalamalı inkübatör.',
    specs: {
      'Model': 'YEKLAB YK-SHAKE01',
      'Sıcaklık': '5°C - 70°C',
      'Çalkalama': '50-300 rpm'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '048',
    slug: slugify('Rotary Evaporatör'),
    name: 'Rotary Evaporatör',
    category: 'Analiz ve Ayırma',
    price: '₺50,000 - ₺75,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Çözücü geri kazanımı için rotary evaporatör.',
    specs: {
      'Model': 'YEKLAB YK-ROTARY01',
      'Hacim': '1-5 Litre',
      'Devir': '10-280 rpm'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '049',
    slug: slugify('Liyofilizatör'),
    name: 'Liyofilizatör',
    category: 'Genel Laboratuvar',
    price: '₺170,000 - ₺220,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 1,
    isQuickDelivery: false,
    shortDesc: 'Dondurarak kurutma sistemi, liyofilizatör.',
    specs: {
      'Model': 'YEKLAB YK-FREEZE01',
      'Kapasite': '2 Litre',
      'Vakum': '0.1 mbar'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '050',
    slug: slugify('Homojenizatör'),
    name: 'Homojenizatör',
    category: 'Karıştırıcılar ve Çalkalayıcılar',
    price: '₺28,000 - ₺40,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 5,
    isQuickDelivery: false,
    shortDesc: 'Yüksek hızlı doku homojenizatörü.',
    specs: {
      'Model': 'YEKLAB YK-HOMO01',
      'Hız': '500-24000 rpm',
      'Kapasite': '0.2-50 ml'
    },
    purchasable: false,
    label: 'new'
  },
  {
    id: '051',
    slug: slugify('Sonikasyon Cihazı'),
    name: 'Sonikasyon Cihazı',
    category: 'Analiz ve Ayırma',
    price: '₺40,000 - ₺60,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 4,
    isQuickDelivery: false,
    shortDesc: 'Hücre parçalama için ultrasonik sonikasyon cihazı.',
    specs: {
      'Model': 'YEKLAB YK-SONICATOR',
      'Frekans': '20 kHz',
      'Güç': '500W'
    },
    purchasable: false,
    label: 'popular'
  },
  {
    id: '052',
    slug: slugify('Otomatik Dispenser'),
    name: 'Otomatik Dispenser',
    category: 'Genel Laboratuvar',
    price: '₺50,000 - ₺75,000',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 3,
    isQuickDelivery: false,
    shortDesc: 'Programlanabilir sıvı dispenseri, çok kanallı.',
    specs: {
      'Model': 'YEKLAB YK-DISPENSER',
      'Kanal': '8 kanal',
      'Hacim': '0.5-5000 μl'
    },
    purchasable: false,
    label: 'featured'
  },
  {
    id: '054',
    slug: slugify('Pastör Pipeti'),
    name: "Pastör Pipeti (100'lü paket)",
    category: 'Laboratuvar Sarf Malzemeleri',
    price: 180,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 999,
    isQuickDelivery: true,
    shortDesc: 'Laboratuvar için tek kullanımlık pastör pipeti.',
    specs: {
      'Model': 'YEKLAB YK-PIPETTE-PASTEUR'
    },
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp'],
    label: 'none'
  },
  {
    id: '055',
    slug: slugify('Nem Tayin Cihazı'),
    name: 'Nem Tayin Cihazı',
    category: 'Ölçüm ve Analiz',
    price: 60000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 25,
    isQuickDelivery: true,
    shortDesc: 'Halojenlı ısıtıcı ile hızlı nem tayini, dijital ekran. Stokta mevcut, hızlı teslimat.',
    specs: {
      'Model': 'YEKLAB YK-MOISTURE',
      'Hassasiyet': '±0.01%',
      'Sıcaklık Aralığı': '50-200°C'
    },
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp'],
    label: 'none'
  },
  {
    id: '056',
    slug: slugify('Kül Fırını 7L'),
    name: 'Kül Fırını 7L',
    category: 'Fırınlar ve Isıtma',
    price: 70000,
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&format=webp',
    stock: 10,
    isQuickDelivery: true,
    shortDesc: 'Kül fırını, 7 litre hacim, 1100°C sıcaklık. Depoda hazır, hızlı kargo.',
    specs: {
      'Model': 'YEKLAB YK-ASH7L',
      'Sıcaklık Aralığı': 'Oda sıcaklığı - 1200°C',
      'Hacim': '7 Litre'
    },
    purchasable: true,
    paymentMethods: ['iyzico', 'iban', 'whatsapp'],
    label: 'none'
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};
