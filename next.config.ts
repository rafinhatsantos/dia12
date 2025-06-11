/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Se estiver usando App Router
  },
  images: {
    domains: [], // Adicione domínios externos se necessário
    formats: ['image/webp', 'image/avif'],
  },
  // Configurações para o iframe do Spotify
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;