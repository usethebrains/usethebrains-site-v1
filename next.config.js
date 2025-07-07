/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/course',
        destination: '/courses',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  webpack: (config, { isServer, dev }) => {
    // Disable persistent cache to avoid file system issues
    config.cache = false;

    // Enhanced WebSocket configuration for development
    if (!isServer && dev) {
      config.watchOptions = {
        ...config.watchOptions,
        followSymlinks: false,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
        aggregateTimeout: 200,
        poll: 500,
      };
    }
    return config;
  },
}

module.exports = nextConfig