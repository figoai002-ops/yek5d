'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, Product } from '@/products/data';
import { ClientOnly } from './ClientOnly';

export default function Products() {
  return (
    <ClientOnly
      fallback={
        <section id="products" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ürünlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Yükleniyor...
              </p>
            </div>
          </div>
        </section>
      }
    >
      <ProductsContent />
    </ClientOnly>
  );
}

function ProductsContent() {
  const { t } = useLanguage();
  const [viewingCounts, setViewingCounts] = useState([8, 23, 5]);

  type ProductCategory = {
    id: number;
    title: string;
    countKey: number;
    label: string;
    labelColor: string;
    price: string;
    description: string;
    icon: string;
    bgColor: string;
  };

  const getWhatsAppMessage = (category: ProductCategory): string => {
    const title = category.title;
    if (title.includes("YEK-306")) {
      return `YEK-306 Oksijenli Kalorimetre hakkında detaylı bilgi ve fiyat teklifi almak istiyorum.`;
    }
    return `${title} ürünü hakkında bilgi ve fiyat teklifi almak istiyorum.`;
  };

  const waLinkFor = (category: ProductCategory) =>
    `https://wa.me/905308906613?text=${encodeURIComponent(getWhatsAppMessage(category))}`;

  const productCategories: ProductCategory[] = [
    {
      id: 1,
      title: 'Kurutma Fırınları/Etüvler',
      countKey: 0,
      label: 'Stokta',
      labelColor: 'bg-green-500',
      price: '₺40,000 - ₺250,000',
      description: 'YEKLAB YK-OVEN serisi - Hassas sıcaklık kontrolü ile laboratuvar kurutma fırınları',
      icon: '🔥',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      id: 2,
      title: 'YEK-306 Oksijenli Kalorimetre',
      countKey: 1,
      label: 'Hızlı Teslimat',
      labelColor: 'bg-blue-500',
      price: '$16,500 - $18,500',
      description: 'YEKLAB YEK-306 - Kömür/biyokütle için yüksek hassasiyetli kalori tayini. Basınçlı O2, otomatik karıştırma.',
      icon: '⚡',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 3,
      title: 'Sterilizatörler',
      countKey: 2,
      label: 'Popüler',
      labelColor: 'bg-purple-500',
      price: '₺65,000 - ₺380,000',
      description: 'YEKLAB YK-AUTO serisi - Yüksek performanslı sterilizasyon cihazları ve otoklavlar',
      icon: '🛡️',
      bgColor: 'from-blue-50 to-cyan-50'
    }
  ];

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    // Her kategori için rastgele güncelleme intervali oluştur
    productCategories.forEach((_: ProductCategory, index: number) => {
      const updateCount = () => {
        setViewingCounts((prev: number[]) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(Math.random() * 50) + 1; // 1-50 arası rastgele sayı
          return newCounts;
        });
        
        // Bir sonraki güncelleme için 5-15 saniye arası rastgele süre
        const nextUpdate = Math.floor(Math.random() * 10000) + 5000; // 5000-15000ms
        intervals[index] = setTimeout(updateCount, nextUpdate);
      };
      
      // İlk güncelleme için rastgele gecikme (0-5 saniye)
      const initialDelay = Math.floor(Math.random() * 5000);
      intervals[index] = setTimeout(updateCount, initialDelay);
    });

    // Cleanup function
    return () => {
      intervals.forEach(interval => clearTimeout(interval));
    };
  }, []);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('productsTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('productsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((category: ProductCategory) => (
            <div
              key={category.id}
              className={`bg-gradient-to-br ${category.bgColor} rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100`}
            >
              {/* Header - Sol tarafta count ve label, sağ tarafta icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-2">
                  {/* Dinamik count - mevcut viewingCounts sistemini kullan */}
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold w-fit">
                    {t('peopleViewing').replace('{count}', viewingCounts[category.countKey]?.toString() || '0')}
                  </span>
                  {/* İkinci label */}
                  <span className={`${category.labelColor} text-white px-3 py-1 rounded-full text-xs font-medium w-fit`}>
                    {category.label}
                  </span>
                </div>
                {/* Icon sağ üst köşede */}
                <div className="text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {category.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {category.title}
                </h3>
                
                <div className="text-2xl font-bold text-blue-600">
                  {category.price}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <a
                  href={waLinkFor(category)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out flex items-center justify-center gap-2 hover:shadow-lg transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Fiyat Teklifi Al
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Ürün sayısını dinamik yap */}
        <div className="text-center mt-16">
          <div className="max-w-md mx-auto mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Daha Fazla Ürün Arıyorsunuz?
            </h3>
            <p className="text-gray-600 text-sm">
              Geniş ürün yelpazemizi keşfedin
            </p>
          </div>
          
          <a
            href="/products"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
            </svg>
            Tüm Ürünleri Görüntüle
            <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
              {products.length} Ürün
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}