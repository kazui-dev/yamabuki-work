import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ThemeProvider } from './lib/theme';
import { parsePath } from './lib/history';
import { PAGE_METADATA } from './constants/metadata';
import type { PageID } from './types';

export type RenderResult = {
  html: string;
  page: PageID;
  title: string;
  ogTitle: string;
  description: string;
};

export const renderPage = (pathname: string): RenderResult => {
  const { page } = parsePath(pathname);
  const meta = PAGE_METADATA[page];
  const ogTitle = meta.ogTitle ?? meta.title;

  const html = renderToString(
    <StrictMode>
      <ThemeProvider>
        <App initialPage={page} initialPath={pathname} />
      </ThemeProvider>
    </StrictMode>
  );

  return {
    html,
    page,
    title: meta.title,
    ogTitle,
    description: meta.description,
  };
};
