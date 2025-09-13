'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ClientLogos() {
  const { t } = useLanguage();

  const clients = [
    'Sancak Enerji',
    'Akçadağ Grup',
    'Gönençler Madencilik',
    'Tüsa Denim',
    'SS SOMA NAKLİYECİLER KOOPERATİFİ',
    'Zonkar Enerji',
    'Kuzey Trakya Enerji',
    'Mutlucan Tuz Maden'
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('clientsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                  <span className="text-lg font-bold text-blue-600 group-hover:text-blue-700">
                    {client.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors leading-tight">
                  {client}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 font-medium">
            {t('andMoreCompanies')}
          </p>
        </div>
      </div>
    </section>
  );
}