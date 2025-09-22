import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

// Use system fonts for better performance - removing custom font for now
const systemFont = {
  variable: '--font-system'
};
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
    <html lang="tr" suppressHydrationWarning>
      <body className={`${systemFont.variable} font-system`} suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <Toaster />
          <SonnerToaster richColors position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}