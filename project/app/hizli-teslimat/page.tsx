"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/AddToCartButton';
import { MiniCart } from '@/components/MiniCart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { tl } from '@/lib/format';
import { FaWhatsapp, FaCreditCard, FaUniversity, FaTruck, FaInfoCircle } from 'react-icons/fa';

export default function HizliTeslimat() {
  // Sadece purchasable ve isQuickDelivery olan ürünleri filtrele
  const quickProducts = products
    .filter((p) => p.purchasable && p.isQuickDelivery && (p.stock || 0) > 0)
    .sort((a, b) => {
      // Stok fazladan aza, sonra fiyat artan
      const stockDiff = (b.stock || 0) - (a.stock || 0);
      if (stockDiff !== 0) return stockDiff;
      const aPrice = typeof a.price === 'number' ? a.price : 0;
      const bPrice = typeof b.price === 'number' ? b.price : 0;
      return aPrice - bPrice;
    });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-14 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">⚡ Hızlı Teslimat Ürünleri</h1>
          <p className="text-lg md:text-xl opacity-95">
            Stokta mevcut ürünler — <strong>3 iş günü</strong> içinde kargoda
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <FaTruck /> Hızlı Kargo (3 gün)
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <FaCreditCard /> PayTR Güvencesi
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <FaUniversity /> IBAN / Havale
            </span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl text-sm">
            <FaInfoCircle className="opacity-90" />
            <span>Hafta içi 16:00'a kadar verilen siparişler aynı gün hazırlanır.</span>
          </div>
        </div>
      </section>

      {/* ÜRÜN LİSTESİ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold">
            Stoktan Teslim Ürünler <span className="text-gray-500">({quickProducts.length})</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-2 py-1 bg-white rounded-lg border">Sıralama: Stok → Fiyat</span>
            <Link href="/products" className="underline hover:no-underline">
              Tüm Ürünler
            </Link>
          </div>
        </div>

        {quickProducts.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center">
            <p className="text-lg font-medium mb-2">Şu anda hızlı teslimat için uygun ürün bulunamadı.</p>
            <p className="text-gray-600 mb-6">
              Yine de ihtiyacınız varsa bize yazın — stok ve teslim süresi teyit edelim.
            </p>
            <a
              href={`https://wa.me/905308906613?text=${encodeURIComponent('Hızlı teslimat için ürün talebim var.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95 text-white px-5 h-11 rounded-xl font-semibold transition-all duration-200 ease-in-out hover:shadow-lg transform"
            >
              <FaWhatsapp /> WhatsApp'tan Yaz
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {quickProducts.map((product) => {
              const lowStock = product.stock > 0 && product.stock <= 5;
              
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        ⚡ STOKTA
                      </span>
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        📦 Hızlı Kargo
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-white text-xs px-2 py-1 rounded-full ${lowStock ? 'bg-orange-500' : 'bg-black/70'}`}>
                        Stok: {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-2">
                      <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
                        {product.category || 'Laboratuvar'}
                      </span>
                    </div>

                    <Link href={`/urun/${product.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.25rem] hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Model Bilgisi */}
                    {product.specs?.Model && (
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          Model: {product.specs.Model}
                        </span>
                      </div>
                    )}

                    {product.shortDesc && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 overflow-hidden">{product.shortDesc}</p>
                    )}

                    <div className="text-2xl font-bold text-emerald-600 mb-4">{typeof product.price === 'number' ? tl(product.price) : product.price}</div>

                    <div className="mt-auto space-y-3">
                      {/* Ana Butonlar */}
                      <div className="grid grid-cols-2 gap-3">
                        <AddToCartButton 
                          productId={product.id}
                          className="h-11 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white rounded-xl font-semibold transition-all duration-200 ease-in-out hover:shadow-lg transform flex items-center justify-center"
                        >
                          SEPETE EKLE
                        </AddToCartButton>
                        
                        <Link
                          href={`/urun/${product.slug}`}
                          className="h-11 bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95 text-white rounded-xl font-semibold transition-all duration-200 ease-in-out hover:shadow-lg transform flex items-center justify-center"
                        >
                          HEMEN SATIN AL
                        </Link>
                      </div>

                      {/* Yüklü Sipariş Teklifi */}
                      <a
                        href={`https://wa.me/905308906613?text=${encodeURIComponent(`Toplu sipariş teklifi: ${product.name} - Yüklü miktarda alacağım, özel fiyat teklifi istiyorum`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        Yüklü miktarda alacağım, teklif istiyorum
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ÖDEME BİLGİLERİ */}
      <section className="bg-white py-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Ödeme ve Kargo Bilgileri</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-xl">
              <FaWhatsapp className="text-3xl text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">WhatsApp Sipariş</h3>
              <p className="text-sm text-gray-600">Hızlı iletişim ve sipariş takibi</p>
            </div>
            <div className="text-center p-6 border rounded-xl">
              <FaCreditCard className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">PayTR Güvenli Ödeme</h3>
              <p className="text-sm text-gray-600">3D Secure • Taksit seçenekleri</p>
            </div>
            <div className="text-center p-6 border rounded-xl">
              <FaUniversity className="text-3xl text-gray-800 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">IBAN / Havale</h3>
              <p className="text-sm text-gray-600">Banka havalesi ve FAST</p>
            </div>
          </div>
        </div>
      </section>

      {/* ALT CTA */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium">Acil teslimat ihtiyacınız mı var?</p>
          <a
            href={`https://wa.me/905308906613?text=${encodeURIComponent('Acil teslimat için stok ve süre bilgisi almak istiyorum.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 hover:scale-105 active:scale-95 px-5 h-11 rounded-xl font-semibold transition-all duration-200 ease-in-out hover:shadow-lg transform"
          >
            <FaWhatsapp /> WhatsApp'tan Yaz
          </a>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}