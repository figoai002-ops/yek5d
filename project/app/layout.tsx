import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Use system fonts for better performance
const systemFont = localFont({
  src: [
    {
      path: '../public/fonts/system.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'sans-serif'
  ],
  display: 'swap',
  variable: '--font-system'
});

export const metadata: Metadata = {
  title: {
    default: 'YEKLAB - Laboratuvar Cihazları ve Ekipmanları',
    template: '%s | YEKLAB'
  },
  description: 'Türkiye\'nin önde gelen laboratuvar cihazları tedarikçisi. CE sertifikalı, kaliteli ve güvenilir laboratuvar ekipmanları.',
  keywords: 'laboratuvar cihazları, laboratuvar ekipmanları, fırın, inkübatör, sterilizatör, YEKLAB',
  authors: [{ name: 'YEKLAB' }],
  creator: 'YEKLAB',
  publisher: 'YEKLAB',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://yeklab.com',
    siteName: 'YEKLAB',
    title: 'YEKLAB - Laboratuvar Cihazları ve Ekipmanları',
    description: 'Türkiye\'nin önde gelen laboratuvar cihazları tedarikçisi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YEKLAB - Laboratuvar Cihazları',
    description: 'Kaliteli laboratuvar ekipmanları',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${systemFont.variable} font-system`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}