import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const CONTENT_DIR_NAME = 'content-site';
const CONTENT_PREFIX = '/content-site/';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;
const ROOT = process.cwd();

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const CONTENT_ROOT = join(ROOT, CONTENT_DIR_NAME);

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const cleaned = decoded.replaceAll('\\', '/');
  const full = normalize(join(root, cleaned));
  if (!full.startsWith(normalize(root))) return null;
  return full;
}

async function fileExists(path) {
  try {
    const s = await stat(path);
    return s.isFile();
  } catch {
    return false;
  }
}

/** Map `/content-site/...` to files under `content-site/`. */
function safeContentSitePath(urlPath) {
  if (!urlPath || !urlPath.startsWith(CONTENT_PREFIX)) return null;
  const rest = urlPath.slice(CONTENT_PREFIX.length).split('?')[0];
  const decoded = decodeURIComponent(rest);
  if (decoded.includes('..') || decoded.startsWith('/')) return null;
  const full = normalize(join(CONTENT_ROOT, decoded));
  const normContent = normalize(CONTENT_ROOT);
  if (!full.startsWith(normContent)) return null;
  return full;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = req.url || '/';

    const contentFile = safeContentSitePath(url);
    if (contentFile && (await fileExists(contentFile))) {
      const ext = extname(contentFile).toLowerCase();
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
      createReadStream(contentFile).pipe(res);
      return;
    }

    // Static files (project root)
    const directPath = safeJoin(ROOT, url);
    if (directPath && (await fileExists(directPath))) {
      const ext = extname(directPath).toLowerCase();
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
      createReadStream(directPath).pipe(res);
      return;
    }

    // Try /index.html for root
    if (url === '/' || url.startsWith('/#')) {
      const html = await readFile(join(ROOT, 'index.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': contentTypes['.html'] });
      res.end(html);
      return;
    }

    // SPA fallback: any "route" should return index.html
    const html = await readFile(join(ROOT, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': contentTypes['.html'] });
    res.end(html);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Server error: ${e instanceof Error ? e.message : String(e)}`);
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Dev server running on http://localhost:${PORT}`);
});

