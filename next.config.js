/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // This might help with CSS optimization
  },

  // Webpack configuration for better build compatibility
  webpack: (config, { isServer }) => {
    // Fix for canvas and WebGL in server-side rendering
    if (isServer) {
      config.externals.push({
        canvas: 'canvas',
        'utf-8-validate': 'commonjs utf-8-validate',
        'supports-color': 'commonjs supports-color',
        'bufferutil': 'commonjs bufferutil',
      });
    }

    return config;
  },

  // Optimize images and static assets
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
}

module.exports = nextConfig
