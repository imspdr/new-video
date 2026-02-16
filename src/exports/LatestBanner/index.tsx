import React from 'react';
import { ThemeProvider } from '@imspdr/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LatestBanner from './LatestBanner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const LatestBannerExport: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LatestBanner />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default LatestBannerExport;
