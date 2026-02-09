import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const ensureEnvUrl = (value: string | undefined, key: string) => {
  const trimmed = value?.replace(/\/+$/, '') ?? '';
  if (!trimmed) {
    throw new Error(`${key} must be defined in the environment.`);
  }

  return trimmed;
};

const catalogApiUrl = ensureEnvUrl(process.env.NEXT_PUBLIC_CATALOG_API_URL, 'NEXT_PUBLIC_CATALOG_API_URL');
const ordersApiUrl = ensureEnvUrl(process.env.NEXT_PUBLIC_ORDERS_API_URL, 'NEXT_PUBLIC_ORDERS_API_URL');
const inventoryApiUrl = ensureEnvUrl(
  process.env.NEXT_PUBLIC_INVENTORY_API_URL,
  'NEXT_PUBLIC_INVENTORY_API_URL'
);

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
