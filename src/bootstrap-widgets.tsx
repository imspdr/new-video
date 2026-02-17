import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@imspdr/ui';
import LatestBanner from './exports/LatestBanner';
import MiniVideoWidget from './exports/MiniVideoWidget';

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

const TestWidgets = () => {
  return (
    <div style={{
      padding: '40px',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
      background: '#f5f5f5'
    }}>
      <LatestBanner />
      <div style={{ width: '80px' }}>
        <MiniVideoWidget />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TestWidgets />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
