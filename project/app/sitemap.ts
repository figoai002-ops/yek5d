import { products, Product } from '@/products/data';
import { productSlug } from '@/lib/slug';

export default function sitemap() {
  const base = 'https://yeklab.com'; // TODO: change to your real domain
  const productUrls = products.map(p => ({
    url: `${base}/urun/${productSlug(p)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [
    { 
      url: base, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'daily' as const,
      priority: 1.0 
    },
    { 
      url: `${base}/products`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'daily' as const,
      priority: 0.9 
    },
    ...productUrls,
  ];
}