'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { MiniCart } from './MiniCart';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { 
      name: 'Hızlı Teslimat', 
      href: '/hizli-teslimat', 
      special: true,
      'aria-label': 'Hızlı teslimat ürünleri'
    },
    { name: 'Ürünler', href: '/products' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '#contact' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo - Sadece yazı */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-blue-600">YEKLAB</span>
            <span className="hidden sm:inline text-xs text-gray-500">Laboratuvar Çözümleri</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              item.special ? (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-label={item['aria-label']}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                  style={{ textDecoration: 'none !important' }}
                >
                  <span className="text-base">⚡</span>
                  <span>{item.name}</span>
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                  style={{ textDecoration: 'none !important' }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Language Switcher, MiniCart & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button className="px-2 py-1 text-xs font-medium bg-white text-blue-600 rounded shadow-sm">
                TR
              </button>
              <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">
                EN
              </button>
            </div>

            {/* Mini Cart */}
            <MiniCart />

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Menüyü aç/kapat"
            >
              {isOpen ? (
                <X className="w-6 h-6 transform transition-transform duration-200" />
              ) : (
                <Menu className="w-6 h-6 transform transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={isOpen ? "fixed inset-0 z-[100]" : "hidden"}>
          {/* KARARTMA */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />

          {/* MENÜ PANELİ */}
          <aside
            className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl
                       border-r border-gray-100 flex flex-col overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Üst bar */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-blue-600">YEKLAB</span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 hover:bg-gray-100"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            {/* Linkler */}
            <nav className="p-4 space-y-2">
              <Link href="/" className="block py-2 no-underline" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Ana Sayfa</Link>
              <Link
                href="/hizli-teslimat"
                aria-label="Hızlı teslimat ürünleri"
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 py-2 font-medium no-underline"
                style={{ textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                ⚡ <span>Hızlı Teslimat</span>
              </Link>
              <Link href="/products" className="block py-2 no-underline" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Ürünler</Link>
              <Link href="/about" className="block py-2 no-underline" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>Hakkımızda</Link>
              <Link href="/contact" className="block py-2 no-underline" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>İletişim</Link>
            </nav>
          </aside>
        </div>
      </div>
    </header>
  );
}