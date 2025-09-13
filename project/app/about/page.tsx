'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { 
  Award, 
  Users, 
  Clock, 
  Shield, 
  CheckCircle, 
  Target, 
  Heart, 
  Lightbulb, 
  UserCheck,
  Building,
  GraduationCap,
  Hospital,
  Factory,
  Landmark
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('vizyon');

  const stats = [
    { icon: <Clock className="w-8 h-8 text-blue-600" />, number: '7+', text: 'Yıl Tecrübe' },
    { icon: <Users className="w-8 h-8 text-blue-600" />, number: '500+', text: 'Ürün Çeşidi' },
    { icon: <Heart className="w-8 h-8 text-blue-600" />, number: '5000+', text: 'Mutlu Müşteri' },
    { icon: <Shield className="w-8 h-8 text-blue-600" />, number: '81', text: 'İlde Teslimat' },
    { icon: <CheckCircle className="w-8 h-8 text-blue-600" />, number: '48', text: 'Saat İçinde Kargo' },
    { icon: <Award className="w-8 h-8 text-blue-600" />, number: '2', text: 'Yıl Garanti' },
    { icon: <Users className="w-8 h-8 text-blue-600" />, number: '10+', text: 'Uzman Kadro' },
    { icon: <Clock className="w-8 h-8 text-blue-600" />, number: '24/7', text: 'Teknik Destek' }
  ];

  const values = [
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: 'Kalite',
      description: 'ISO 9001:2015 kalite yönetim sistemine sahip firmamız, sadece CE sertifikalı ve uluslararası standartlara uygun ürünleri portföyüne dahil etmektedir.'
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Güvenilirlik',
      description: '7 yıllık sektör tecrübemiz ve 5000+ mutlu müşterimiz ile güvenilirliğimizi kanıtlamış durumdayız.'
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-blue-600" />,
      title: 'İnovasyon',
      description: 'Sürekli gelişen teknolojiye ayak uydurarak, en yeni laboratuvar teknolojilerini Türkiye\'ye kazandırıyoruz.'
    },
    {
      icon: <UserCheck className="w-12 h-12 text-blue-600" />,
      title: 'Müşteri Odaklılık',
      description: '7/24 teknik destek hattımız ve uzman kadromuz ile müşterilerimizin ihtiyaçlarına hızlı çözümler üretiyoruz.'
    }
  ];

  const sectors = [
    {
      icon: <GraduationCap className="w-16 h-16 text-blue-600" />,
      title: 'Üniversiteler ve Araştırma Merkezleri',
      description: 'Türkiye\'nin önde gelen üniversiteleri ve TÜBİTAK gibi araştırma kurumlarının laboratuvar ihtiyaçlarını karşılıyoruz.'
    },
    {
      icon: <Hospital className="w-16 h-16 text-blue-600" />,
      title: 'Sağlık Sektörü',
      description: 'Hastaneler, özel laboratuvarlar ve tanı merkezlerine medikal laboratuvar ekipmanları tedarik ediyoruz.'
    },
    {
      icon: <Factory className="w-16 h-16 text-blue-600" />,
      title: 'Endüstri ve Üretim',
      description: 'Gıda, ilaç, kimya, tekstil ve otomotiv sektörlerindeki kalite kontrol laboratuvarlarına çözümler sunuyoruz.'
    },
    {
      icon: <Landmark className="w-16 h-16 text-blue-600" />,
      title: 'Kamu Kurumları',
      description: 'Bakanlıklar, belediyeler ve kamu laboratuvarlarının güvenilir tedarikçisiyiz.'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Geniş Ürün Yelpazesi',
      description: 'Temel laboratuvar ekipmanlarından ileri teknoloji analiz cihazlarına kadar her ihtiyaca uygun ürünler'
    },
    {
      title: 'Rekabetçi Fiyatlar',
      description: 'Doğrudan ithalat ve güçlü tedarikçi ağımız sayesinde en uygun fiyat garantisi'
    },
    {
      title: 'Hızlı Teslimat',
      description: 'Stoklu ürünlerde 48 saat içinde kargo, 81 ile kesintisiz teslimat'
    },
    {
      title: 'Teknik Destek',
      description: 'Kurulum, kullanım eğitimi ve satış sonrası 7/24 teknik destek hizmeti'
    },
    {
      title: 'Garanti ve Servis',
      description: 'Tüm ürünlerimizde minimum 2 yıl garanti ve 10 yıl yedek parça bulunabilirlik garantisi'
    }
  ];

  const certificates = [
    'ISO 9001:2015 Kalite Yönetim Sistemi',
    'CE Uygunluk Sertifikaları',
    'Ticaret Bakanlığı Güvenilir Tedarikçi Sertifikası',
    'TÜRKAK Akredite Laboratuvar Tedarikçisi'
  ];

  const team = [
    '3 Biyomedikal Mühendisi',
    '2 Kimya Mühendisi',
    '2 Teknik Servis Uzmanı',
    '2 Satış Danışmanı',
    '1 Lojistik Koordinatörü'
  ];

  const csr = [
    'Üniversite laboratuvarlarına bağış programları',
    'Öğrenci staj programları',
    'Bilimsel kongre ve sempozyum sponsorlukları',
    'Çevre dostu ambalaj kullanımı',
    'Atık elektronik ekipman geri dönüşüm programı'
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                7 Yıllık Tecrübemizle<br />Bilimin Hizmetindeyiz
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                YEKLAB olarak, Türkiye'nin dört bir yanındaki laboratuvarlara kaliteli ekipman ve çözümler sunuyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 -mt-10 relative z-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              2018 yılında kurulan YEKLAB, laboratuvar cihazları ve ekipmanları sektöründe önde gelen deneyimi ile Türkiye'nin önde gelen tedarikçilerinden biridir. Üniversiteler, araştırma merkezleri, hastaneler ve endüstriyel kalite kontrol laboratuvarlarına hizmet veren firmamız, 500'ü aşkın ürün çeşidi ile sektörün güvenilir çözüm ortağı konumundadır.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sayılarla YEKLAB
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Vizyon & Misyon
              </h2>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('vizyon')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'vizyon'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Vizyonumuz
                </button>
                <button
                  onClick={() => setActiveTab('misyon')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'misyon'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Misyonumuz
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {activeTab === 'vizyon' ? (
                <div className="text-center">
                  <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Türkiye'de bilimsel araştırma ve kalite kontrol süreçlerinin gelişimine katkıda bulunarak, uluslararası standartlarda laboratuvar çözümleri sunan lider tedarikçi olmak.
                  </p>
                </div>
              ) : (
                <div>
                  <Heart className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <ul className="space-y-4 text-lg text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      Yüksek kaliteli laboratuvar ekipmanlarını uygun fiyatlarla sunmak
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      Müşterilerimize hızlı ve güvenilir teknik destek sağlamak
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      Bilimsel gelişmeleri yakından takip ederek ürün portföyümüzü güncellemek
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      Satış sonrası servis ve yedek parça garantisi ile müşteri memnuniyetini sürekli kılmak
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Değerlerimiz
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    {value.icon}
                    <h3 className="text-2xl font-bold text-gray-900 ml-4">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sectors */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hizmet Verdiğimiz Sektörler
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sectors.map((sector, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center mb-6">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {sector.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-center">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Neden YEKLAB?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates & Team */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Certificates */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Sertifikalar ve Belgelerimiz
                </h3>
                <ul className="space-y-4">
                  {certificates.map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <Award className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Ekibimiz
                </h3>
                <p className="text-gray-700 mb-6 text-center">
                  10 kişilik uzman kadromuz ile müşterilerimize en iyi hizmeti sunmak için çalışıyoruz:
                </p>
                <ul className="space-y-3">
                  {team.map((member, index) => (
                    <li key={index} className="flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{member}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CSR */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Kurumsal Sosyal Sorumluluk
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                YEKLAB olarak, bilimin ve eğitimin gelişimine katkıda bulunmayı kurumsal sorumluluğumuz olarak görüyoruz:
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {csr.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Laboratuvarınız İçin Doğru Çözüm Ortağı
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                7 yıllık tecrübemiz ve uzman kadromuzla, laboratuvar ihtiyaçlarınız için en uygun çözümleri sunmaya hazırız. Ürünlerimiz ve hizmetlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ürünlerimizi Keşfedin
                </Link>
                <a
                  href="https://wa.me/905551234567?text=Merhaba, laboratuvar ekipmanları hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Teklif Alın
                </a>
                <a
                  href="tel:+905551234567"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Bizi Arayın
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              YEKLAB Laboratuvar Cihazları
            </h3>
            <p className="text-gray-300">
              Kuruluş: 2018 | Adres: Macun mahallesi 228. cad no:8 Yenimahalle/Ankara
            </p>
          </div>
        </div>
      </div>
    </>
  );
}