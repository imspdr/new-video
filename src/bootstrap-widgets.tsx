import React from 'react';
import { createRoot } from 'react-dom/client';
import LatestBanner from './exports/LatestBanner';

const TestWidgets = () => {
  return (
    <div style={{ padding: '40px', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <LatestBanner />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<TestWidgets />);
}
