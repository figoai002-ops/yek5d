'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [soldCount, setSoldCount] = useState(3);

  useEffect(() => {
    // Check if we need to update the sold count (once per day)
    const lastUpdate = localStorage.getItem('yeklab-last-update');
    const today = new Date().toDateString();
    
    if (lastUpdate !== today) {
      // Generate random number between 2-5
      const newCount = Math.floor(Math.random() * 4) + 2;
      setSoldCount(newCount);
      localStorage.setItem('yeklab-sold-count', newCount.toString());
      localStorage.setItem('yeklab-last-update', today);
    } else {
      // Use stored count
      const storedCount = localStorage.getItem('yeklab-sold-count');
      if (storedCount) {
        setSoldCount(parseInt(storedCount));
      }
    }
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        {/* very subtle background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(60% 40% at 10% 0%, rgba(59,130,246,.08), transparent), radial-gradient(60% 40% at 90% 0%, rgba(16,185,129,.08), transparent)'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">YEKLAB</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Bilimsel Mükemmellik için Profesyonel Laboratuvar Ekipmanları
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://wa.me/905308906613?text=Merhaba%2C%20YEKLAB%20ekibiyle%20ileti%C5%9Fime%20ge%C3%A7mek%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 font-semibold transition"
            >
              WhatsApp İletişim
            </a>
            <a
              href="tel:+905308906613"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition"
            >
              Hemen Ara
            </a>
          </div>
        </div>
      </section>

      {/* Sales Counter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-700">
            <span className="mr-2">🔥</span> Bugün 3 adet satıldı
          </div>
        </div>
      </div>
    </>
  );
}