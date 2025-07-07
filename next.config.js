/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects()
  {
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
  allowedDevOrigins: [
    "http://192.168.19.127:3000",
    "http://localhost:3000"
  ],
}

module.exports = nextConfig