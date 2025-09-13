'use client';

import { Mail, Phone, MapPin, Award, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">{t('contactInfo')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+90 530 890 66 13</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@yekglobal.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">Ankara, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('products')}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Certificates */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">{t('certificates')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">ISO 9001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">CE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">TSE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2025 YEKLAB. {t('rights')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}