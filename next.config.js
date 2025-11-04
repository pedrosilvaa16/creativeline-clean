/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.creativeline.studio',
        pathname: '/wp-content/**',
      },
      // (opcional) se algum dia servires mídia pelo domínio principal:
      {
        protocol: 'https',
        hostname: 'creativeline.studio',
        pathname: '/wp-content/**',
      },
      // (opcional) para avatars do autor (WordPress/Gravatar)
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
    ],
  },
};

module.exports = nextConfig;
