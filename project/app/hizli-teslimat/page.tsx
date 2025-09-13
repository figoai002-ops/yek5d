import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { products, Product } from '@/products/data';
import { FaWhatsapp, FaCreditCard, FaUniversity, FaTruck } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Hızlı Teslimat Laboratuvar Malzemeleri - 3 Gün Kargo | YEKLAB',
  description: 'Stokta mevcut laboratuvar ürünleri. 3 iş günü içinde kargoya teslim. İyzico, IBAN ve WhatsApp ödeme seçenekleri.',
  keywords: 'hızlı teslimat, laboratuvar malzemeleri, aynı gün kargo, stok, YEKLAB',
  openGraph: {
    title: 'Hızlı Teslimat Laboratuvar Ürünleri | YEKLAB',
    description: '3 iş günü içinde kargoya teslim. Stokta mevcut laboratuvar ürünleri.',
  }
};

export default function HizliTeslimatPage() {
  const fastProducts = products.filter(p => p.fastDelivery && (p.stock ?? 0) > 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16">
        <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">⚡ Hızlı Teslimat Ürünleri</h1>
            <p className="text-xl opacity-90 mb-2">Stokta Mevcut - Hızlı Kargo</p>
            <p className="text-lg opacity-80">3 iş günü içinde kargoya teslim edilir</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <FaTruck /> Hızlı Kargo (3 gün)
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <FaCreditCard /> İyzico Güvencesi
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <FaUniversity /> IBAN Seçeneği
              </span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {fastProducts.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">⚡ STOKTA MEVCUT</span>
                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">📦 Hızlı Kargo</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">Stok: {product.stock}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.25rem]">
                    {product.model} {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
                    {product.description}
                  </p>

                  <div className="text-2xl font-bold text-emerald-600 mb-4">{product.price}</div>

                  <div className="mt-auto space-y-2">
                    <a
                      href={`https://wa.me/905308906613?text=${encodeURIComponent(`Hızlı Sipariş: ${product.name} - Model: ${product.model}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp /> Hızlı Sipariş Ver
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="h-10 bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                        <FaCreditCard className="text-xs" /> İyzico
                      </button>
                      <button className="h-10 bg-gray-700 hover:bg-gray-800 text-white px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                        <FaUniversity className="text-xs" /> IBAN
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Ödeme Seçenekleri</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-xl">
                <FaWhatsapp className="text-3xl text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">WhatsApp Siparişi</h3>
                <p className="text-sm text-gray-600">Hızlı iletişim ve sipariş takibi</p>
              </div>
              <div className="text-center p-6 border rounded-xl">
                <FaCreditCard className="text-3xl text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">İyzico Güvenli Ödeme</h3>
                <p className="text-sm text-gray-600">3D Secure, taksit seçenekleri</p>
              </div>
              <div className="text-center p-6 border rounded-xl">
                <FaUniversity className="text-3xl text-gray-700 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">IBAN / Havale</h3>
                <p className="text-sm text-gray-600">Banka havalesi ve FAST</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}