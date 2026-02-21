import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const ROUTES = ['/', '/map', '/survey', '/map/hall', '/map/318', '/map/317', '/map/316', '/map/315', '/map/pc_3'];
const SITE_URL = 'https://yamabuki.work';
const ENTRY_SERVER = '/src/entry-server.tsx';

const toPageUrl = (route) => `${SITE_URL}${route === '/' ? '/' : route}`;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');

const replaceMeta = (template, route, title, ogTitle, description) => {
  const effectiveOgTitle = ogTitle || title;
  let result = template.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(title)}</title>`);
  const metaTags = [
    { attr: 'name="description"', content: description },
    { attr: 'property="og:title"', content: effectiveOgTitle },
    { attr: 'property="og:url"', content: toPageUrl(route) },
  ];

  metaTags.forEach(({ attr, content }) => {
    const regex = new RegExp(`<meta\\s+${attr}\\s+content=["'][^"']*["']\\s*\\/?>`, 'i');
    result = result.replace(regex, `<meta ${attr} content="${escapeHtml(content)}" />`);
  });

  return result;
};

const replaceJsonLd = (template, route, title, description) => {
  const scriptRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i;
  const match = template.match(scriptRegex);
  if (!match) return template;

  const rawJson = match[1].trim();
  try {
    const data = JSON.parse(rawJson);
    data.name = title;
    data.description = description;
    data.url = toPageUrl(route);

    const jsonText = JSON.stringify(data, null, 2).replace(/<\//g, '<\\/');
    const indented = jsonText
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n');

    return template.replace(scriptRegex, `<script type="application/ld+json">\n${indented}\n    </script>`);
  } catch {
    return template;
  }
};

const replaceRoot = (template, appHtml) => {
  const emptyRootRegex = /<div id="root"><\/div>/i;
  if (!emptyRootRegex.test(template)) {
    throw new Error('Expected empty <div id="root"></div> in template.');
  }

  return template.replace(emptyRootRegex, () => `<div id="root">${appHtml}</div>`);
};

const loadRenderer = async () => {
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const module = await vite.ssrLoadModule(ENTRY_SERVER);
  return { renderPage: module.renderPage, vite };
};

const run = async () => {
  const { renderPage, vite } = await loadRenderer();

  try {
    const templatePath = path.join(distDir, 'index.html');
    const template = await readFile(templatePath, 'utf-8');

    await Promise.all(
      ROUTES.map(async (route) => {
        const { html, title, ogTitle, description } = renderPage(route);
        
        let pageHtml = replaceMeta(template, route, title, ogTitle, description);
        pageHtml = replaceJsonLd(pageHtml, route, title, description);
        pageHtml = replaceRoot(pageHtml, html);

        const outputPath =
          route === '/'
            ? path.join(distDir, 'index.html')
            : path.join(distDir, route.slice(1), 'index.html');

        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, pageHtml, 'utf-8');
        
        console.log(`✅ Pre-rendered: ${route} -> ${outputPath}`);
      })
    );
  } finally {
    await vite.close();
  }
};

run();