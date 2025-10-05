/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize build performance
  swcMinify: true,

  // Enable build caching
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },

  // Optimize bundle splitting
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },

  // Static export optimization
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'randomuser.me'],
  },

  // Reduce build complexity
  webpack: (config, { isServer }) => {
    // Optimize for faster builds
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      };
    }

    return config;
  },
}

module.exports = nextConfig
