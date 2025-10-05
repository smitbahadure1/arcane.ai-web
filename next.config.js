/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Netlify deployment
  output: 'export',
  trailingSlash: true,

  // Image optimization for static export
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  
  // Webpack configuration for Netlify compatibility
  webpack: (config, { isServer }) => {
    // Fix for canvas in server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'canvas',
      });
    }

    return config;
  },
}

module.exports = nextConfig
