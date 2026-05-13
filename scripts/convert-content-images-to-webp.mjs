/**
 * Rekurencyjnie: jpg/jpeg/png → webp (delikatnie), szer. > MAX_WIDTH px → szer. MAX_WIDTH z zachowanym ratio.
 * gif/svg są pomijane. Oryginały bitmap są usuwane po udanym zapisie.
 */
import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'content-site');

const MAX_WIDTH = 2560;
const WEBP_QUALITY = 84;
const SKIP_EXT = new Set(['.webp', '.gif', '.svg', '.pdf']);

const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function convertFile(absPath) {
  const ext = extname(absPath).toLowerCase();
  if (!RASTER_EXT.has(ext)) return;

  const outPath = `${absPath.slice(0, -ext.length)}.webp`;

  try {
    let pipeline = sharp(absPath).rotate();
    const meta = await pipeline.metadata();
    const w = meta.width ?? 0;
    if (w > MAX_WIDTH) {
      pipeline = pipeline.resize({
        width: MAX_WIDTH,
        withoutEnlargement: false,
      });
    }

    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outPath);

    await unlink(absPath);
    const rel = absPath.startsWith(CONTENT_DIR) ? absPath.slice(CONTENT_DIR.length + 1) : absPath;
    console.log(`${rel.replace(/\\/g, '/')} → .webp (${w}px szer.)`);
  } catch (e) {
    console.error(`[POMINIĘTO / BŁĄD] ${absPath} — ${e.message}`);
    // nie przerywamy całego batcha (np. uszkodzony JPEG)
  }
}

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue;
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      await walk(full);
      continue;
    }
    const extLo = extname(ent.name).toLowerCase();
    if (SKIP_EXT.has(extLo) || extLo === '.json' || extLo === '.txt') continue;
    if (RASTER_EXT.has(extLo)) {
      await convertFile(full);
    }
  }
}

const mainAbs = CONTENT_DIR.replace(/\\/g, '/');

if (!(await exists(CONTENT_DIR))) {
  console.error('Brak katalogu:', mainAbs);
  process.exit(1);
}

await walk(CONTENT_DIR);
console.log('Gotowe:', mainAbs);
