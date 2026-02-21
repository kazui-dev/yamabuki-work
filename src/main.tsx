import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import './styles/global.css';
import { ThemeProvider } from './lib/theme';
import { parsePath } from './lib/history';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const pathname = window.location.pathname;
const { page } = parsePath(pathname);
const app = (
  <StrictMode>
    <ThemeProvider>
      <App initialPage={page} initialPath={pathname} />
    </ThemeProvider>
  </StrictMode>
);

if (rootElement.children.length > 0) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}