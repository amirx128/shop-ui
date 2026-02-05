import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const catalogApiUrl =
  process.env.NEXT_CATALOG_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:5201';
const ordersApiUrl =
  process.env.NEXT_PUBLIC_ORDERS_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:5401';
const inventoryApiUrl =
  process.env.NEXT_PUBLIC_INVENTORY_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:5301';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CATALOG_API_URL: catalogApiUrl,
    NEXT_PUBLIC_ORDERS_API_URL: ordersApiUrl,
    NEXT_PUBLIC_INVENTORY_API_URL: inventoryApiUrl,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5201',
        pathname: '/api/catalog/images/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/catalog/images/:path*',
        destination: `${catalogApiUrl}/api/catalog/images/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
