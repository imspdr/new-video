import { useState, FC, useEffect } from 'react';

import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ModalProvider, ThemeProvider, ToastProvider } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useDisplayStocks } from './hooks/useDisplayStocks';
import { useStocks } from './hooks/useKospiData';
import { DetailPage } from './pages/DetailPage';
import ListPage from './pages/ListPage';
import { LayoutContainer, MainContent } from './styled';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/kospi200' : '/';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <BrowserRouter basename={basename}>
              <AppLayout />
            </BrowserRouter>
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppLayout: FC = () => {
  const navigate = useNavigate();
  const { isPc } = useDeviceType();
  const { data: stocks } = useStocks();
  const [isFolded, setIsFolded] = useState(!isPc);
  const { searchOptions } = useDisplayStocks(stocks ?? []);

  // Update isFolded when device type changes
  useEffect(() => {
    setIsFolded(!isPc);
  }, [isPc]);

  const handleStockClick = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <LayoutContainer>
      <Header
        onHomeClick={() => navigate('/list')}
        searchOptions={searchOptions}
        onSearchSelect={(opt) => handleStockClick(opt.value)}
      />
      <MainContent isFolded={isFolded}>
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:code" element={<DetailPage />} />
          <Route path="/" element={<Navigate to="/list" replace />} />
        </Routes>
      </MainContent>
      <Sidebar isFolded={isFolded} onToggleFold={() => setIsFolded(!isFolded)} />
    </LayoutContainer>
  );
};

export default App;
