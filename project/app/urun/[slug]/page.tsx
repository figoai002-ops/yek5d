"use client";

import { notFound, useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Truck } from 'lucide-react';
import { FaWhatsapp, FaUniversity } from 'react-icons/fa';
import { getProductBySlug } from '@/data/products';
import Head from 'next/head';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/AddToCartButton';
import { QtyInput } from '@/components/QtyInput';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { tl } from '@/lib/format';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types/ecom';

interface PageProps {
  params: { slug: string };
}

// Product Image Gallery Component
const ProductImageGallery = React.memo(function ProductImageGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Ana resim + ek resimler
  const allImages = [product.image, ...(product.images || [])];
  
  return (
    <div className="space-y-4">
      {/* Ana görsel */}
      <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={allImages[selectedImage]}
          alt={product.name}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedImage === 0}
          quality={85}
        />
        <div className="absolute top-4 left-4 space-y-2">
          {product.isQuickDelivery && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              HIZLI TESLİMAT
            </Badge>
          )}
          {product.label && product.label !== 'none' && (
            <Badge 
              className={`block ${
                product.label === 'featured' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                product.label === 'new' ? 'bg-green-500 hover:bg-green-600 text-white' :
                product.label === 'popular' ? 'bg-red-500 hover:bg-red-600 text-white' :
                'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              {product.label === 'featured' ? 'ÖNE ÇIKAN' :
               product.label === 'new' ? 'YENİ' :
               product.label === 'popular' ? 'POPÜLER' : ''}
            </Badge>
          )}
          {product.shippingBadge && (
            <Badge variant="secondary" className="block">
              {product.shippingBadge}
            </Badge>
          )}
        </div>
        {/* Stok bilgisini sadece hızlı teslimat ürünlerinde göster */}
        {product.isQuickDelivery && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white">
              Stok: {product.stock}
            </Badge>
          </div>
        )}
        
        {/* Navigation arrows for images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedImage(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </>
        )}
        
        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {allImages.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 20vw"
                loading="lazy"
                quality={75}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default function ProductDetail({ params }: PageProps) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const foundProduct = getProductBySlug(params.slug);
    setProduct(foundProduct || null);
    setIsLoading(false);
  }, [params.slug]);

  // Hemen satın al fonksiyonu
  const handleBuyNow = () => {
    if (!product) return;
    
    // Ürünü sepete ekle (doğru miktarda)
    const cartItem = {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'number' ? product.price : 0,
      image: product.image,
      slug: product.slug,
      stock: product.stock,
      shortDesc: product.shortDesc,
      isQuickDelivery: product.isQuickDelivery || false
    };
    
    // Miktar kadar ekle
    for (let i = 0; i < qty; i++) {
      addItem(cartItem);
    }
    
    // Sepet sayfasına yönlendir
    router.push('/sepet');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto py-8 px-4 pt-24">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600">Yükleniyor...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    notFound();
  }

  // SEO için dinamik metadata
  const pageTitle = `${product.name} - YEKLAB Laboratuvar Cihazları`;
  const pageDescription = product.shortDesc || `${product.name} - Kaliteli laboratuvar ekipmanları. ${product.category || 'Laboratuvar cihazı'} kategorisinde güvenilir çözümler.`;
  const price = typeof product.price === 'number' ? `₺${product.price.toLocaleString('tr-TR')}` : product.price;
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${product.name}, ${product.category || 'laboratuvar'}, laboratuvar cihazı, ${product.specs?.Model || ''}, YEKLAB`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={`https://yeklab.com/urun/${params.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={typeof product.price === 'number' ? product.price.toString() : ''} />
        <meta property="product:price:currency" content="TRY" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={product.image} />
        <link rel="canonical" href={`https://yeklab.com/urun/${params.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": pageDescription,
              "image": product.image,
              "brand": {
                "@type": "Brand",
                "name": "YEKLAB"
              },
              "category": product.category || "Laboratuvar Ekipmanları",
              "offers": {
                "@type": "Offer",
                "price": typeof product.price === 'number' ? product.price : undefined,
                "priceCurrency": "TRY",
                "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "seller": {
                  "@type": "Organization",
                  "name": "YEKLAB"
                }
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "YEKLAB"
              }
            })
          }}
        />
      </Head>
      <Header />
      <main className="container mx-auto py-8 px-4 pt-24">
      <div className="flex items-center mb-6">
        <Link 
          href={product.isQuickDelivery ? "/hizli-teslimat" : "/products"}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {product.isQuickDelivery ? "Hızlı Teslimat" : "Ürünler"} Sayfasına Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <ProductImageGallery product={product} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {product.category && (
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
            )}
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {product.specs?.Model && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-800">Model:</span>
                  <span className="text-lg font-bold text-blue-900">{product.specs.Model}</span>
                </div>
              </div>
            )}
            
            {product.shortDesc && (
              <p className="text-muted-foreground text-lg mb-4">
                {product.shortDesc}
              </p>
            )}
            
            <div className="text-3xl font-bold text-red-600 mb-6">
              {typeof product.price === 'string' ? product.price : tl(product.price)}
            </div>
          </div>

          {/* Quick Delivery Badge */}
          {product.isQuickDelivery && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Hızlı Teslimat</span>
                </div>
                {product.deliveryETA && (
                  <p className="text-green-700 text-sm">{product.deliveryETA}</p>
                )}
                <p className="text-green-600 text-sm mt-1">
                  Hafta içi 16:00'a kadar verilen siparişler 3 gün içerisinde kargolanır
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            {product.purchasable !== false ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Adet:</span>
                  <QtyInput 
                    value={qty} 
                    onChange={setQty}
                    max={Math.min(product.stock, 99)}
                  />
                </div>
                
                <div className="space-y-3">
                  <AddToCartButton 
                    productId={product.id}
                    qty={qty}
                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg transform"
                  >
                    Sepete Ekle ({typeof product.price === 'number' ? tl(product.price * qty) : product.price})
                  </AddToCartButton>

                  <Button 
                    onClick={handleBuyNow}
                    className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg transform"
                  >
                    HEMEN SATIN AL
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    🔍 Bu ürün için detaylı bilgi ve fiyat teklifi almak için bizimle iletişime geçin.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    asChild
                    className="h-12 text-lg bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg transform text-white font-semibold rounded-full"
                  >
                    <Link href="/#contact" className="text-white">
                      Fiyat Teklifi İste
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="h-12 text-lg bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg transform text-white font-semibold rounded-full"
                  >
                    <a
                      href={`https://wa.me/905308906613?text=${encodeURIComponent(`${product.name} ürünü hakkında detaylı bilgi ve fiyat teklifi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-white"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
            
            {product.purchasable !== false && product.stock < 10 && product.stock > 0 && (
              <p className="text-amber-600 text-sm font-medium">
                ⚠️ Son {product.stock} adet kaldı!
              </p>
            )}
            
            {product.purchasable !== false && product.stock === 0 && (
              <p className="text-red-600 text-sm font-medium">
                😞 Bu ürün şu anda stokta bulunmuyor.
              </p>
            )}
          </div>

          {/* Product Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ürün Özellikleri</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium text-right">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shipping Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Kargo Bilgileri
              </h3>
              <div className="text-blue-800 text-sm space-y-1">
                <p>• 300 TL üzeri siparişlerde kargo ücretsiz</p>
                <p>• Hızlı teslimat ürünleri 3 gün içinde kargoya verilir</p>
                <p>• Standart kargo süresi 2-5 iş günüdür</p>
                <p>• Kargo takip numaranız SMS ile gönderilir</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Benzer Ürünler</h2>
          <Link href="/hizli-teslimat">
            <Button variant="outline">
              Tüm Hızlı Teslimat Ürünlerini Gör
            </Button>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}