'use client';

import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/905308906613?text=${encodeURIComponent(t('whatsappMessage'))}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        {/* Main WhatsApp Button */}
        <div className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse-subtle">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        {/* Red Badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          1
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp ile iletişim
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </a>
      
      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 5s infinite;
        }
      `}</style>
    </div>
  );
}