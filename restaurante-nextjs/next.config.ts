import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de dominios permitidos para imágenes externas
  images: { 
    remotePatterns: [ 
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  // Cabeceras de seguridad básicas
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;