import React from 'react';
import { createRoot } from 'react-dom/client';
import LatestBanner from './exports/LatestBanner';

const TestWidgets = () => {
  return (
    <div style={{ padding: '40px', background: '#121212', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ color: 'white', marginBottom: '40px' }}>Widget Test Page</h1>
      <LatestBanner />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<TestWidgets />);
}
