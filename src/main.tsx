import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import './styles/global.css';
import { ThemeProvider } from './lib/theme';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const pathname = window.location.pathname;
createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App initialPage={'timetable'} initialPath={pathname} />
    </ThemeProvider>
  </StrictMode>
);