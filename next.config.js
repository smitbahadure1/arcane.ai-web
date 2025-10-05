/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Remove optimizeCss as it might cause issues
  },

  // Optimize images and static assets
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },

  // Output configuration for better Vercel compatibility
  output: 'standalone',
}

module.exports = nextConfig
