import { FC, useState } from "react";

import { BrowserRouter, useNavigate } from "react-router-dom";
import { Layout, ModalProvider, ThemeProvider, ToastProvider } from "@imspdr/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListPage from "./pages/ListPage";
import HeaderSearch from "./components/HeaderSearch";

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
  const basename = process.env.NODE_ENV === "production" ? "/new-video" : "/";

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
  const [search, setSearch] = useState("");

  return (
    <Layout
      title="NEW VIDEO"
      onHomeClick={() => navigate("/")}
      middleContent={
        <HeaderSearch
          placeholder="검색"
          onChange={setSearch}
        />
      }
    >
      <ListPage searchQuery={search} />
    </Layout>
  );
};

export default App;
