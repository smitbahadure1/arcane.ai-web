/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC for faster builds
  swcMinify: true,

  // Image configuration
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
}

module.exports = nextConfig
