/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify deployment configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'randomuser.me'],
  },

  // Disable static optimization for dynamic features
  generateBuildId: async () => {
    return 'build-cache-' + Date.now()
  }
}

module.exports = nextConfig
