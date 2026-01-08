import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import ServiceWorkerRegister from './service-worker-register';

export const metadata: Metadata = {
  title: 'Kaleskechi',
  description:
    "A beautiful and attractive children's world, a place for dreams and creativity!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <ServiceWorkerRegister />
      <Providers>{children}</Providers>
    </body>
  );
}
