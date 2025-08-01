import { isStaging } from "@/utils/environment";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  async rewrites() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const hangfireBaseUrl = (() => {
      if (isStaging()) {
        if (!process.env.HANGFIRE_URL || process.env.HANGFIRE_URL === '') {
          throw new Error("HANGFIRE_URL is not defined");
        }

        return process.env.HANGFIRE_URL;
      }

      if (isDevelopment) {
        return 'http://localhost:5206';
      }

      if (!process.env.HANGFIRE_URL || process.env.HANGFIRE_URL === '') {
        throw new Error("HANGFIRE_URL is not defined");
      }

      return process.env.HANGFIRE_URL;
    })();

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