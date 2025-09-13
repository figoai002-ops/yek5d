import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import ClientLogos from '@/components/ClientLogos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '@/products/data';
import { FaTruck } from 'react-icons/fa';

function HizliTeslimatSection() {
  const fastProducts = products.filter(p => p.fastDelivery && (p.stock || 0) > 0).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-900 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">⚡ Hızlı Teslimat Ürünleri</h2>
          <p className="text-xl text-gray-700 mb-2">3 iş günü içinde kargoya teslim</p>
          <p className="text-lg text-gray-600">Stokta mevcut, hemen gönderi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {fastProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md p-6 transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                  STOKTA MEVCUT
                </span>
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  Hızlı Kargo
                </span>
              </div>

              <div className="h-32 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 mb-2 min-h-[2.5rem]">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{product.description}</p>
                <div className="text-lg font-bold text-emerald-600 mb-3">{product.price}</div>
                
                <a
                  href={`https://wa.me/905308906613?text=${encodeURIComponent(`Hızlı Sipariş: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors text-center block mt-auto"
                >
                  Hemen Sipariş Ver
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/hizli-teslimat"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaTruck />
            Tüm Hızlı Teslimat Ürünlerini Görüntüle →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBadges />
      <Products />
      <HizliTeslimatSection />
      <Testimonials />
      <ClientLogos />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}