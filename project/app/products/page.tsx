'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Search, Grid, List, Filter } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { products } from '@/data/products';
import type { Product } from '@/types/ecom';
import { useLanguage } from '@/contexts/LanguageContext';
import { tl } from '@/lib/format';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique categories from products
  const categories = [
    'Tümü', 
    'Satın Alınabilir',
    'Hızlı Teslimat',
    ...Array.from(new Set(products.map(p => p.category).filter(c => c && c !== 'Hızlı Teslimat')))
  ];
  
  const getCategoryCount = (category: string) => {
    if (category === 'Tümü') return products.length;
    if (category === 'Satın Alınabilir') return products.filter(p => p.purchasable).length;
    if (category === 'Hızlı Teslimat') return products.filter(p => p.isQuickDelivery && (p.stock || 0) > 0).length;
    return products.filter(p => p.category === category).length;
  };

  // Filter and sort products
  const processedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tümü' || 
                             product.category === selectedCategory ||
                             (selectedCategory === 'Satın Alınabilir' && product.purchasable) ||
                             (selectedCategory === 'Hızlı Teslimat' && product.isQuickDelivery && (product.stock || 0) > 0);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // YEK-306 Kalorimetre öncelik (model adına göre)
      // Priority sorting removed for simplification
      
      // Sonra hızlı teslimat öncelik
      const aFast = a.isQuickDelivery ? 1 : 0;
      const bFast = b.isQuickDelivery ? 1 : 0;
      if (aFast !== bFast) return bFast - aFast;
      
      // Sonra featured öncelik
      const aFeatured = 0; // Simplified
      const bFeatured = 0; // Simplified
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;

      // Normal sıralama
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price': {
          // Fiyat stringlerinden ilk sayıyı çıkarıp karşılaştır
          const aPrice = typeof a.price === 'string' ? 
            parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '')) : a.price;
          const bPrice = typeof b.price === 'string' ? 
            parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '')) : b.price;
          return aPrice - bPrice;
        }
        case 'category': return (a.category || '').localeCompare(b.category || '');
        default: return 0;
      }
    });

  // 1) Desktop chip bar: Daha fazla / Daha az
  useEffect(() => {
    const chipsBar = document.querySelector('.category-pills');
    const chipsBtn = document.getElementById('chipsToggle');

    if (!chipsBar || !chipsBtn) return;

    const handleChipsToggle = () => {
      const isExp = chipsBar.classList.toggle('expanded');
      chipsBtn.textContent = isExp ? 'Daha az göster' : 'Daha fazla';
      chipsBtn.setAttribute('aria-expanded', String(isExp));
    };

    chipsBtn.addEventListener('click', handleChipsToggle);
    return () => chipsBtn.removeEventListener('click', handleChipsToggle);
  }, []);

  // 2) Mobile drawer: Filtreler aç/kapat
  useEffect(() => {
    const openBtn = document.getElementById('openFilters');
    const closeBtn = document.getElementById('closeFilters');
    const drawer = document.getElementById('drawer');
    const dim = document.getElementById('drawerDim');

    if (!openBtn || !drawer || !dim) return;

    const lockBody = (lock: boolean) => { document.body.style.overflow = lock ? 'hidden' : ''; };

    const closeDrawer = () => {
      drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
      dim.classList.remove('open');    dim.setAttribute('aria-hidden','true');
      lockBody(false);
    };
    const openDrawer = () => {
      drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
      dim.classList.add('open');    dim.setAttribute('aria-hidden','false');
      lockBody(true);
    };
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };

    openBtn.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    dim.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      openBtn.removeEventListener('click', openDrawer);
      closeBtn?.removeEventListener('click', closeDrawer);
      dim.removeEventListener('click', closeDrawer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!mounted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600">Ürünler yükleniyor...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Laboratuvar Cihazları &amp; Ekipmanları
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mt-4 text-center">
              Yüksek kaliteli laboratuvar cihazları ve ekipmanları ile araştırma ve analiz süreçlerinizi destekliyoruz.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium shadow-sm bg-white/20 text-white border border-white/30">
                CE Sertifikalı
              </span>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium shadow-sm bg-white/20 text-white border border-white/30">
                ISO 9001
              </span>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium shadow-sm bg-green-600 text-white border border-green-700">
                2 YIL GARANTİ
              </span>
            </div>
          </div>
        </div>
        {/* Filters Section */}
        <div className="filter-section w-full px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* Toolbar */}
            <div className="toolbar flex flex-wrap items-center gap-3 mb-4">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ürün, model veya kategori ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">İsme Göre</option>
                <option value="price">Fiyata Göre</option>
                <option value="category">Kategoriye Göre</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg border ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button className="view-btn lg:hidden p-2 rounded-lg border bg-white text-gray-600 border-gray-300" id="openFilters" aria-controls="drawer">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="category-pills">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category || '')}
                  className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                  <span className="category-count">({getCategoryCount(category || '')})</span>
                </button>
              ))}
            </div>
            
            <button className="show-more hidden lg:block" id="chipsToggle" aria-expanded="false">
              Daha fazla
            </button>
          </div>
        </div>
        {/* Hızlı Teslimat Banner */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold text-green-800">Hızlı Teslimat Ürünleri</h3>
                <p className="text-sm text-green-600">Stokta mevcut, 3 gün içinde kargo</p>
              </div>
            </div>
            <Link 
              href="/hizli-teslimat"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <FaTruck /> Hızlı Teslimata Git
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <p className="text-gray-600">
              {processedProducts.length} ürün bulundu
              {selectedCategory !== 'Tümü' && ` - ${selectedCategory}`}
              {searchTerm && ` - "${searchTerm}" için`}
            </p>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="h-48 bg-gray-100 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.isQuickDelivery && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          ⚡ Hızlı
                        </span>
                      )}
                      {product.label && product.label !== 'none' && (
                        <span className={`text-white text-xs px-2 py-1 rounded-full font-bold ${
                          product.label === 'featured' ? 'bg-yellow-500' :
                          product.label === 'new' ? 'bg-green-600' :
                          product.label === 'popular' ? 'bg-red-500' :
                          'bg-gray-500'
                        }`}>
                          {product.label === 'featured' ? 'ÖNE ÇIKAN' :
                           product.label === 'new' ? 'YENİ' :
                           product.label === 'popular' ? 'POPÜLER' : ''}
                        </span>
                      )}
                    </div>
                    {product.purchasable && (
                      <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white">
                        Satın Alınabilir
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h3>
                    {product.specs?.Model && (
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        Model: {product.specs.Model}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow min-h-[2.5rem]">
                      {product.shortDesc}
                    </p>
                    <div className="text-lg font-bold text-blue-600 mb-3">
                      {typeof product.price === 'number' ? tl(product.price) : product.price}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/urun/${product.slug}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 text-center transition-colors"
                      >
                        Detaylar
                      </Link>
                      
                      {product.purchasable ? (
                        // Satın alınabilir ürünler için sepete ekle butonu
                        <div className="flex-shrink-0">
                          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            Sepete Ekle
                          </button>
                        </div>
                      ) : (
                        // Satın alınamayan ürünler için WhatsApp
                        <a
                          href={`https://wa.me/905308906613?text=${encodeURIComponent(`Merhaba, ${product.name} hakkında bilgi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out hover:shadow-lg transform flex items-center gap-2"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                          İletişim
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {processedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={192}
                        height={128}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {product.category}
                            </span>
                            {product.purchasable && (
                              <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white">
                                Satın Alınabilir
                              </span>
                            )}
                            {product.isQuickDelivery && (
                              <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                                Hızlı Teslimat
                              </span>
                            )}
                            {product.label && product.label !== 'none' && (
                              <span className={`ml-2 text-white text-xs px-2 py-1 rounded-full font-bold ${
                                product.label === 'featured' ? 'bg-yellow-500' :
                                product.label === 'new' ? 'bg-green-600' :
                                product.label === 'popular' ? 'bg-red-500' :
                                'bg-gray-500'
                              }`}>
                                {product.label === 'featured' ? 'ÖNE ÇIKAN' :
                                 product.label === 'new' ? 'YENİ' :
                                 product.label === 'popular' ? 'POPÜLER' : ''}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          {product.specs?.Model && (
                            <p className="text-sm text-blue-600 font-medium mb-2">
                              Model: {product.specs.Model}
                            </p>
                          )}
                          <p className="text-gray-600 mb-3">
                            {product.shortDesc}
                          </p>
                          <div className="text-2xl font-bold text-blue-600">
                            {typeof product.price === 'number' ? tl(product.price) : product.price}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 md:w-48">
                          <Link
                            href={`/urun/${product.slug}`}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 text-center transition-colors"
                          >
                            Detayları Görüntüle
                          </Link>
                          
                          {product.purchasable ? (
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                              Sepete Ekle
                            </button>
                          ) : (
                            <a
                              href={`https://wa.me/905308906613?text=${encodeURIComponent(`Merhaba, ${product.name} hakkında bilgi almak istiyorum.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out hover:shadow-lg transform flex items-center justify-center gap-2"
                            >
                              <FaWhatsapp className="w-4 h-4" />
                              İletişim
                            </a>
                          )}
                        </div>
                        {product.isQuickDelivery && (
                          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            ⚡ Hızlı
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {processedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ürün bulunamadı
              </h3>
              <p className="text-gray-600">
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </p>
            </div>
          )}
        
        </div>
      </div>
      <Footer />
    </>
  );
}
