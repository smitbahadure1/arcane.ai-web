/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for better Netlify compatibility
  swcMinify: true,

  // Image configuration
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },

  // Optimize for Netlify
  experimental: {
    // Enable optimizations for better performance
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },

  // Build optimization
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig
