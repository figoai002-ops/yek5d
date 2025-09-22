import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Shield } from 'lucide-react';

export default function KullanimKosullariPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center">
            <Link 
              href="/odeme"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Geri Dön</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kullanım Koşulları</h1>
            <p className="text-gray-600">
              YEKLAB hizmetlerini kullanırken uymanız gereken kurallar
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Son güncellenme: 16 Eylül 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border-0 p-8 space-y-8">
            
            {/* Section 1 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Genel Hükümler</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Bu kullanım koşulları, YEKLAB ("Şirket", "biz", "bizim") tarafından sunulan 
                  laboratuvar ekipmanları e-ticaret platformu ve ilgili hizmetlerin kullanımını düzenler.
                </p>
                <p>
                  Web sitemizi kullanarak, bu koşulları kabul etmiş sayılırsınız. 
                  Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayın.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Hizmet Kapsamı</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  YEKLAB, laboratuvar ekipmanları, malzemeleri ve ilgili ürünlerin satışını yapmaktadır. 
                  Hizmetlerimiz aşağıdakileri içerir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Laboratuvar ekipmanları satışı</li>
                  <li>Teknik destek ve danışmanlık hizmetleri</li>
                  <li>Ürün garantisi ve satış sonrası hizmetler</li>
                  <li>Hızli teslimat seçenekleri</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Kullanıcı Yükümlülükleri</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>Sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Doğru ve güncel bilgiler sağlamak</li>
                  <li>Yasal yaş sınırlamarına uymak (18 yaş ve üzeri)</li>
                  <li>Ürünleri amacına uygun kullanmak</li>
                  <li>Ödeme yükümlülüklerini zamanında yerine getirmek</li>
                  <li>Telif hakları ve fikri mülkiyet haklarına saygı göstermek</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-semibold">4</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Sipariş ve Ödeme</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Tüm siparişler onayımıza tabidir. Ürün fiyatları ve stok durumu değişebilir. 
                  Ödeme işlemleri güvenli SSL teknolojisi ile korunmaktadır.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kredi kartı ödemeleri PayTR güvencesi altındadır</li>
                  <li>Havale/EFT ödemelerinde %3 indirim uygulanır</li>
                  <li>Faturalar yasal mevzuata uygun düzenlenir</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600 font-semibold">5</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">İade ve Değişim</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Ürünlerin iadesinde 14 günlük yasal süre geçerlidir. 
                  İade koşulları aşağıdaki gibidir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ürün orijinal ambalajında ve kullanılmamış durumda olmalıdır</li>
                  <li>Teknik cihazlar için özel iade koşulları geçerlidir</li>
                  <li>İade kargo masrafları müşteriye aittir</li>
                  <li>Hasarlı ürünler 7 gün içinde bildirilmelidir</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold">6</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Sorumluluk Sınırları</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  YEKLAB, hizmet kesintileri, veri kaybı veya dolaylı zararlardan 
                  sorumlu değildir. Sorumluluğumuz, ürün bedeli ile sınırlıdır.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-teal-600 font-semibold">7</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">İletişim</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Bu kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>E-posta:</strong> y.emrekaranfil@yeklab.com</p>
                  <p><strong>Telefon:</strong> +90 (XXX) XXX XX XX</p>
                  <p><strong>Adres:</strong> YEKLAB Merkez Ofis</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Scale className="w-4 h-4 mr-2" />
                  <span>Bu koşullar Türk hukuku kapsamında geçerlidir</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>YEKLAB © 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}