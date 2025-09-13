'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import Header from '@/components/Header';
import Link from 'next/link';
import { products, Product } from '@/products/data';
import { productSlug } from '@/lib/slug';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load icons
const Search = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Search })), { ssr: false });
const Grid = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Grid })), { ssr: false });
const List = dynamic(() => import('lucide-react').then(mod => ({ default: mod.List })), { ssr: false });
const Filter = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Filter })), { ssr: false });

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get unique categories from products
  const categories = ['Tümü', 'Hızlı Teslimat', ...Array.from(new Set(products.map(p => p.category).filter(c => c !== 'Hızlı Teslimat')))];
  
  const getCategoryCount = (category: string) => {
    if (category === 'Tümü') return products.length;
    if (category === 'Hızlı Teslimat') return products.filter(p => p.fastDelivery && (p.stock || 0) > 0).length;
    return products.filter(p => p.category === category).length;
  };

  // Filter and sort products
  const processedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tümü' || 
                             product.category === selectedCategory ||
                             (selectedCategory === 'Hızlı Teslimat' && product.fastDelivery && (product.stock || 0) > 0);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // YEK-306 Kalorimetre öncelik (model adına göre)
      if (a.model === 'YEKLAB YEK-306') return -1;
      if (b.model === 'YEKLAB YEK-306') return 1;
      
      // Sonra hızlı teslimat öncelik
      const aFast = a.fastDelivery ? 1 : 0;
      const bFast = b.fastDelivery ? 1 : 0;
      if (aFast !== bFast) return bFast - aFast;
      
      // Sonra featured öncelik
      const aFeatured = a.label === 'featured' ? 1 : 0;
      const bFeatured = b.label === 'featured' ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;

      // Normal sıralama
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price': return a.price.localeCompare(b.price);
        case 'category': return a.category.localeCompare(b.category);
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
                  onClick={() => setSelectedCategory(category)}
                  className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                  <span className="category-count">({getCategoryCount(category)})</span>
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
                <p className="text-sm text-green-600">Stokta mevcut, aynı gün kargo</p>
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
                    {product.fastDelivery && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        ⚡ Hızlı
                      </span>
                    )}
                    {product.label !== 'none' && (
                      <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                        product.label === 'featured' ? 'bg-orange-500 text-white' :
                        product.label === 'new' ? 'bg-blue-500 text-white' :
                        product.label === 'popular' ? 'bg-green-500 text-white' : ''
                      }`}>
                        {product.label === 'featured' ? 'Öne Çıkan' :
                         product.label === 'new' ? 'Yeni' :
                         product.label === 'popular' ? 'Popüler' : ''}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                      {product.model} {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow min-h-[2.5rem]">
                      {product.description}
                    </p>
                    <div className="text-lg font-bold text-blue-600 mb-3">
                      {product.price}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/urun/${productSlug(product)}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 text-center transition-colors"
                      >
                        Detaylar
                      </Link>
                      <a
                        href={`https://wa.me/905308906613?text=${encodeURIComponent(`Merhaba, ${product.model} ${product.name} hakkında bilgi almak istiyorum.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp flex-shrink-0"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        İletişim
                      </a>
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
                            {product.label !== 'none' && (
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                product.label === 'featured' ? 'bg-orange-500 text-white' :
                                product.label === 'new' ? 'bg-blue-500 text-white' :
                                product.label === 'popular' ? 'bg-green-500 text-white' : ''
                              }`}>
                                {product.label === 'featured' ? 'Öne Çıkan' :
                                 product.label === 'new' ? 'Yeni' :
                                 product.label === 'popular' ? 'Popüler' : ''}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {product.model} {product.name}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {product.description}
                          </p>
                          <div className="text-2xl font-bold text-blue-600">
                            {product.price}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 md:w-48">
                          <Link
                            href={`/urun/${productSlug(product)}`}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 text-center transition-colors"
                          >
                            Detayları Görüntüle
                          </Link>
                          <a
                            href={`https://wa.me/905308906613?text=${encodeURIComponent(`Merhaba, ${product.model} ${product.name} hakkında bilgi almak istiyorum.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                          >
                            <FaWhatsapp className="w-5 h-5" />
                            İletişim
                          </a>
                        </div>
                        {product.fastDelivery && (
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
    </>
  );
}
