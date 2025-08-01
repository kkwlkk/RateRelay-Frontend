/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    turbopack: {
      rules: {
        '*.md': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  async rewrites() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const hangfireBaseUrl = isDevelopment 
      ? 'http://localhost:5206'
      : process.env.HANGFIRE_URL || 'http://localhost:5000';
    
    return [
      {
        source: '/admin/hangfire/:path*',
        destination: `${hangfireBaseUrl}/hangfire/:path*`
      },
      {
        source: '/hangfire/:path*',
        destination: `${hangfireBaseUrl}/hangfire/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/admin/hangfire/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
        ],
      },
      {
        source: '/hangfire/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;