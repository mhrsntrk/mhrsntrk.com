const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  images: {
    domains: ['i.scdn.co', 'res.cloudinary.com', 'api.qrserver.com'] // Spotify Album Art & Cloudinary & QR Code
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      });
    }

    return config;
  }
};
