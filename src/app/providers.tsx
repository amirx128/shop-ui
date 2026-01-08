'use client';

import ThemeRegistry from '@/lib/mui/ThemeRegistry';
import { ReactQueryProvider } from '@/lib/react-query/provider';
import { ReduxProvider } from '@/lib/redux/provider';
import ToastifyProvider from '@/lib/toastify/provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <ReduxProvider>
        <ReactQueryProvider>
          <ToastifyProvider>{children}</ToastifyProvider>
        </ReactQueryProvider>
      </ReduxProvider>
    </ThemeRegistry>
  );
}
