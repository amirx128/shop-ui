'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/pwa';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    registerServiceWorker();
  }, []);

  return null;
}
