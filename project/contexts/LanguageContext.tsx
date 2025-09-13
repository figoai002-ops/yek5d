'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Header
    home: 'Ana Sayfa',
    products: 'Ürünler',
    about: 'Hakkımızda',
    contact: 'İletişim',
    
    // Hero
    heroTitle: 'Bilimsel Mükemmellik için Profesyonel Laboratuvar Ekipmanları',
    heroSubtitle: 'Dünya çapında araştırma tesisleri için hassas enstrümanlar ve güvenilir çözümler',
    viewProducts: 'Ürünleri İncele',
    whatsappContact: 'WhatsApp İletişim',
    callNow: 'Hemen Ara',
    
    // Sales counter
    soldToday: 'Bugün {count} adet satıldı',
    
    // Trust badges
    happyCustomers: '444+ Mutlu Müşteri',
    yearsExperience: '7 Yıllık Deneyim',
    support247: '24/7 Destek',
    yearWarranty: '2 Yıl Garanti',
    
    // Products
    productsTitle: 'Ürünlerimiz',
    productsSubtitle: 'Laboratuvarınız için ihtiyacınız olan tüm ekipmanlar',
    dryingOvens: 'Kurutma Fırınları/Etüvler',
    dryingOvensDesc: 'Hassas sıcaklık kontrolü ile laboratuvar kurutma fırınları',
    incubators: 'İnkübatörler',
    incubatorsDesc: 'Mikroorganizma kültürü için profesyonel inkübatörler',
    sterilizers: 'Sterilizatörler',
    sterilizersDesc: 'Yüksek performanslı sterilizasyon cihazları',
    getPriceQuote: 'Fiyat Teklifi Al',
    peopleViewing: '{count} kişi inceliyor',
    fastDelivery: 'Hızlı Teslimat',
    inStock: 'Stokta',
    customProduction: 'Özel Üretim',
    
    // Contact
    contactTitle: 'İletişim',
    contactSubtitle: 'Bizimle iletişime geçin',
    name: 'Ad Soyad',
    phone: 'Telefon',
    email: 'E-posta',
    message: 'Mesaj',
    messagePlaceholder: 'Mesajınızı buraya yazın...',
    send: 'Gönder',
    sending: 'Gönderiliyor...',
    successMessage: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
    nameRequired: 'Ad soyad gereklidir',
    phoneRequired: 'Telefon numarası gereklidir',
    emailRequired: 'E-posta adresi gereklidir',
    emailInvalid: 'Geçerli bir e-posta adresi giriniz',
    messageRequired: 'Mesaj gereklidir',
    
    // Footer
    footerAbout: 'YEKLAB olarak, laboratuvar ekipmanları alanında kaliteli hizmet sunmaktayız.',
    quickLinks: 'Hızlı Bağlantılar',
    contactInfo: 'İletişim Bilgileri',
    certificates: 'Sertifikalar',
    rights: 'Tüm hakları saklıdır.',

    // Testimonials
    testimonialsTitle: 'Müşterilerimiz Ne Diyor',
    testimonial1: 'Profesyonel hizmet ve güvenilir laboratuvar çözümleri. Harika bir ortaklık!',
    testimonial2: 'YEKLAB ekipmanları sayesinde araştırmalarımızda büyük verimlilik elde ettik.',
    testimonial3: 'Kaliteli ürünler ve mükemmel müşteri desteği. Kesinlikle tavsiye ederim.',
    company1: 'Acıbadem Laboratuvarları',
    company2: 'İTÜ Biyomühendislik',
    company3: 'Medicana Sağlık Grubu',

    // WhatsApp
    whatsappMessage: 'Merhaba, laboratuvar ekipmanları hakkında bilgi almak istiyorum.',

    // Client Logos
    clientsTitle: 'Bizi Tercih Eden Firmalar',
    andMoreCompanies: 've 20+ firma'
  },
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Professional Laboratory Equipment for Scientific Excellence',
    heroSubtitle: 'Precision instruments and reliable solutions for research facilities worldwide',
    viewProducts: 'View Products',
    whatsappContact: 'WhatsApp Contact',
    callNow: 'Call Now',
    
    // Sales counter
    soldToday: '{count} sold today',
    
    // Trust badges
    happyCustomers: '444+ Happy Customers',
    yearsExperience: '7 Years Experience',
    support247: '24/7 Support',
    yearWarranty: '2 Year Warranty',
    
    // Products
    productsTitle: 'Our Products',
    productsSubtitle: 'All the equipment you need for your laboratory',
    dryingOvens: 'Drying Ovens',
    dryingOvensDesc: 'Laboratory drying ovens with precise temperature control',
    incubators: 'Incubators',
    incubatorsDesc: 'Professional incubators for microorganism culture',
    sterilizers: 'Sterilizers',
    sterilizersDesc: 'High-performance sterilization equipment',
    getPriceQuote: 'Get Price Quote',
    peopleViewing: '{count} people viewing',
    fastDelivery: 'Fast Delivery',
    inStock: 'In Stock',
    customProduction: 'Custom Production',
    
    // Contact
    contactTitle: 'Contact',
    contactSubtitle: 'Get in touch with us',
    name: 'Full Name',
    phone: 'Phone',
    email: 'Email',
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    send: 'Send',
    sending: 'Sending...',
    successMessage: 'Your message has been sent successfully! We will get back to you soon.',
    nameRequired: 'Full name is required',
    phoneRequired: 'Phone number is required',
    emailRequired: 'Email address is required',
    emailInvalid: 'Please enter a valid email address',
    messageRequired: 'Message is required',
    
    // Footer
    footerAbout: 'As YEKLAB, we provide quality service in the field of laboratory equipment.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    certificates: 'Certificates',
    rights: 'All rights reserved.',

    // Testimonials
    testimonialsTitle: 'What Our Customers Say',
    testimonial1: 'Professional service and reliable laboratory solutions. Great partnership!',
    testimonial2: 'Thanks to YEKLAB equipment, we achieved great efficiency in our research.',
    testimonial3: 'Quality products and excellent customer support. Definitely recommend.',
    company1: 'Acıbadem Laboratories',
    company2: 'ITU Bioengineering',
    company3: 'Medicana Health Group',

    // WhatsApp
    whatsappMessage: 'Hello, I would like to get information about laboratory equipment.',

    // Client Logos
    clientsTitle: 'Companies That Choose Us',
    andMoreCompanies: 'and 20+ companies'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('yeklab-language') as Language;
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('yeklab-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};