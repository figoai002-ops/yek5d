'use client';

import { Users, Clock, Headphones, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';

function CountUp({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="text-3xl font-bold text-gray-900">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
      number: 444,
      suffix: '+',
      text: t('happyCustomers').replace('444+', ''),
      delay: 0
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
      number: 7,
      suffix: '',
      text: t('yearsExperience').replace('7', ''),
      delay: 200
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
      number: 24,
      suffix: '/7',
      text: t('support247').replace('24/7', ''),
      delay: 400
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
      number: 2,
      suffix: '',
      text: t('yearWarranty').replace('2', ''),
      delay: 600
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-300"
              style={{
                animation: `fadeInUp 0.8s ease-out ${badge.delay}ms both`
              }}
            >
              {badge.icon}
              <div className="mb-2">
                <CountUp
                  end={badge.number} 
                  suffix={badge.suffix}
                  duration={2000}
                />
              </div>
              <div className="text-sm text-gray-600">
                {badge.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}