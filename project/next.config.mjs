/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizeFonts: false,
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  compress: true,
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: 'memory' };
      config.infrastructureLogging = { level: 'error' };
    }
    return config;
  },
};

export default nextConfig;