import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@imspdr/ui';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
}
