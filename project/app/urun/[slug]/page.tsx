import { notFound } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaCreditCard, FaUniversity, FaTruck } from 'react-icons/fa';
import Header from '@/components/Header';
import { products, Product } from '@/products/data';
import { productSlug } from '@/lib/slug';

// Generate all product pages at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: productSlug(product),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find(p => productSlug(p) === params.slug);
  if (!product) {
    return {
      title: 'Ürün Bulunamadı - YEKLAB',
      description: 'Aradığınız ürün bulunamadı.'
    };
  }
  
  return {
    title: `${product.model} ${product.name} | YEKLAB`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.model} ${product.name}`,
      description: product.description,
      images: [product.image],
    },
  };
}

// Main page component
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => productSlug(p) === params.slug);
  
  if (!product) {
    notFound();
  }

  const isFastDelivery = product.fastDelivery && (product.stock || 0) > 0;
  const priceNumber = (product.price || '').replace(/[^\d.]/g, '').split('-')[0] || '0';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.model} ${product.name}`,
    description: product.description,
    sku: product.model,
    brand: { "@type": "Brand", name: "YEKLAB" },
    category: product.category,
    image: [product.image],
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: priceNumber,
      availability: "https://schema.org/InStock",
      url: `https://yeklab.com/urun/${productSlug(product)}`
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10 pt-24">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">Anasayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:underline">Ürünler</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image} 
                alt={`${product.model} ${product.name}`} 
                width={600}
                height={384}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {isFastDelivery && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-green-600 text-white px-3 py-2 rounded-full font-bold text-sm">
                    ⚡ STOKTA MEVCUT
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-2 rounded-full font-bold text-sm">
                    📦 Aynı Gün Kargo
                  </span>
                </div>
              )}
            </div>
            
            {/* Certificates */}
            {product.certificates.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {product.certificates.map((cert, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 font-mono mb-2">{product.model}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
              
              {/* Price */}
              <p className="text-3xl font-bold text-blue-600 mb-4">{product.price}</p>
            </div>

            {/* Label */}
            {product.label !== 'none' && (
              <div className="inline-block">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  product.label === 'featured' ? 'bg-orange-500 text-white' :
                  product.label === 'new' ? 'bg-blue-500 text-white' :
                  product.label === 'popular' ? 'bg-green-500 text-white' :
                  'bg-gray-400 text-white'
                }`}>
                  {product.label === 'featured' ? 'Öne Çıkan' :
                   product.label === 'new' ? 'Yeni Ürün' :
                   product.label === 'popular' ? 'Popüler' : ''}
                </span>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-col gap-4">
              {isFastDelivery ? (
                <>
                  <a
                    href={`https://wa.me/905308906613?text=${encodeURIComponent(`Hızlı Sipariş: ${product.model} ${product.name} - Stok: ${product.stock}`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />
                    Hızlı Sipariş Ver
                  </a>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <FaCreditCard />
                      İyzico ile Öde
                    </button>
                    <button className="bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <FaUniversity />
                      IBAN Bilgisi
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a
                    href={`https://wa.me/905308906613?text=${encodeURIComponent(`Merhaba, ${product.model} ${product.name} hakkında bilgi almak istiyorum.`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />
                    WhatsApp ile İletişim
                  </a>
                  <a
                    href="tel:+905308906613"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Hemen Ara
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Teknik Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <dt className="text-sm font-semibold text-gray-700 mb-1">{key}</dt>
                <dd className="text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Delivery Info */}
        {isFastDelivery && (
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
              <FaTruck className="text-emerald-600" />
              📦 Hızlı Teslimat Bilgileri
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">Teslimat</h3>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Hızlı kargo (3 iş günü içinde)</li>
                  <li>• Stok durumu: {product.stock} adet mevcut</li>
                  <li>• Özel ambalajlama</li>
                  <li>• Takip numarası ile kargo takibi</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-700 mb-2">Ödeme</h3>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• İyzico güvenli ödeme</li>
                  <li>• Havale/FAST seçeneği</li>
                  <li>• WhatsApp ile hızlı sipariş</li>
                  <li>• Kapıda ödeme (şehir içi)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Related Category Link */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            {product.category} Kategorisi
          </h3>
          <p className="text-blue-800 mb-4">
            Bu ürün {product.category.toLowerCase()} kategorisinde yer almaktadır. 
            YEKLAB olarak bu kategoride geniş ürün yelpazesi sunmaktayız.
          </p>
          <Link 
            href="/products" 
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Tüm ürünleri görüntüle →
          </Link>
        </div>

        <Script 
          id="ld-product" 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      </main>
    </>
  );
}