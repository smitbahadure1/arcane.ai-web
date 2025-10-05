/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment optimizations
  swcMinify: true,

  // Image optimization for Vercel
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },

  // Enable experimental features for Vercel
  experimental: {
    // Enable WebGL support for Vercel
    serverComponentsExternalPackages: ['canvas'],
  },

  // Optimize for Vercel's edge runtime
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig
