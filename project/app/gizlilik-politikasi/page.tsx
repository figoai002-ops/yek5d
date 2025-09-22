import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';

export default function GizlilikPolitikasiPage() {
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
            <p className="text-gray-600">
              Kişisel verilerinizi nasıl koruduğumuz ve kullandığımız
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
                <h2 className="text-xl font-semibold text-gray-900">Gizlilik Taahhüdümüz</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  YEKLAB olarak, kişisel verilerinizin gizliliğini korumayı taahhüt ediyoruz. 
                  Bu politika, kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve 
                  koruduğumuzu açıklar.
                </p>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuata 
                  tam uyum sağlıyoruz.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Database className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Topladığımız Bilgiler</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>Hizmetlerimizi sunabilmek için aşağıdaki bilgileri topluyoruz:</p>
                
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800 mb-2">Kimlik Bilgileri:</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Ad, soyad</li>
                    <li>E-posta adresi</li>
                    <li>Telefon numarası</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800 mb-2">Adres Bilgileri:</h4>
                  <ul className="list-disc list-inside space-y-1 text-green-700">
                    <li>Teslimat adresi</li>
                    <li>Fatura adresi</li>
                    <li>Şehir, ilçe, posta kodu</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold text-purple-800 mb-2">İşlem Bilgileri:</h4>
                  <ul className="list-disc list-inside space-y-1 text-purple-700">
                    <li>Sipariş geçmişi</li>
                    <li>Ödeme bilgileri (güvenli şekilde)</li>
                    <li>Site kullanım verileri</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Eye className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Bilgileri Nasıl Kullanıyoruz</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>Topladığımız bilgileri şu amaçlarla kullanıyoruz:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Siparişlerinizi işleme almak ve teslim etmek</li>
                  <li>Müşteri hizmetleri desteği sağlamak</li>
                  <li>Hesap güvenliğinizi sağlamak</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                  <li>İzniniz dahilinde kampanya bildirimleri göndermek</li>
                  <li>Hizmet kalitemizi geliştirmek</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <Lock className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Veri Güvenliği</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Verilerinizin güvenliği için en yüksek standartları uyguluyoruz:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔐 SSL Şifreleme</h4>
                    <p className="text-sm text-gray-600">
                      Tüm veri transferleri 256-bit SSL ile korunur
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🛡️ Güvenli Sunucular</h4>
                    <p className="text-sm text-gray-600">
                      Verileriniz güvenli veri merkezlerinde saklanır
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔑 Erişim Kontrolü</h4>
                    <p className="text-sm text-gray-600">
                      Sadece yetkili personel verilerinize erişebilir
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔄 Düzenli Yedekleme</h4>
                    <p className="text-sm text-gray-600">
                      Verileriniz düzenli olarak yedeklenir
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600 font-semibold">5</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Çerezler (Cookies)</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Web sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Gerekli çerezler:</strong> Sitenin temel işlevselliği için</li>
                  <li><strong>Analitik çerezler:</strong> Site kullanımını analiz etmek için</li>
                  <li><strong>Tercih çerezleri:</strong> Kişiselleştirilmiş deneyim için</li>
                </ul>
                <p>
                  Çerez ayarlarınızı tarayıcınızdan kontrol edebilirsiniz.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold">6</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Haklarınız</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>KVKK kapsamında sahip olduğunuz haklar:</p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                    <li>Kişisel verilerinizin işlenme amacını öğrenme</li>
                    <li>Yurt içindeki üçüncü kişilere aktarılıp aktarılmadığını öğrenme</li>
                    <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                    <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">İletişim</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Gizlilik politikamız veya kişisel verilerinizle ilgili sorularınız için:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">E-posta</p>
                        <p className="text-blue-600">y.emrekaranfil@yeklab.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">Telefon</p>
                        <p className="text-gray-600">+90 (XXX) XXX XX XX</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Veri Sorumlusu:</strong> YEKLAB<br />
                      <strong>Adres:</strong> YEKLAB Merkez Ofis
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-semibold">8</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Politika Değişiklikleri</h2>
              </div>
              <div className="ml-11 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. 
                  Önemli değişiklikler olması durumunda sizi bilgilendireceğiz.
                </p>
                <p>
                  Bu sayfayı düzenli olarak kontrol etmenizi öneririz.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>KVKK uyumlu politika</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 mr-2" />
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