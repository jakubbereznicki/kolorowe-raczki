/**
 * Skanuje `Kolorowe centrum - strona internetowa/<temat>/{strona główna|podstrona}/`
 * i zapisuje manifest do assets/content-manifest.json
 */
import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import { PDFParse } from 'pdf-parse';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'Kolorowe centrum - strona internetowa');
const OUT = join(ROOT, 'assets', 'content-manifest.json');

const HOME_NAME = 'strona główna';
const SUB_NAME = 'podstrona';

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
const PDF_EXT = new Set(['.pdf']);

const PL_MAP = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

function slugify(dirName) {
  let s = dirName.toLowerCase();
  for (const [pl, lat] of Object.entries(PL_MAP)) {
    s = s.split(pl).join(lat);
  }
  return s
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function fileType(ext) {
  const e = ext.toLowerCase();
  if (PDF_EXT.has(e)) return 'pdf';
  if (IMG_EXT.has(e)) return 'image';
  return 'other';
}

function buildContentUrl(topicName, ...segments) {
  const parts = [topicName, ...segments].filter(Boolean);
  return (
    '/content-site/' +
    parts.map((p) => encodeURIComponent(p)).join('/')
  );
}

/**
 * Wyciąga zwykły tekst z PDF (strona — do osadzenia w HTML).
 * Puste przy skanie bez warstwy tekstowej / błędzie odczytu.
 */
async function extractPdfText(filePath) {
  let parser;
  try {
    const buf = await readFile(filePath);
    parser = new PDFParse({ data: buf });
    const { text } = await parser.getText();
    return String(text || '')
      .replace(/\r\n/g, '\n')
      .replace(/[\t\f\v]+/g, ' ')
      .trim();
  } catch {
    return '';
  } finally {
    if (parser) await parser.destroy();
  }
}

async function listMediaFiles(topicLabel, subFolderName) {
  const dirPath = join(CONTENT_DIR, topicLabel, subFolderName);
  try {
    const names = await readdir(dirPath);
    const out = [];
    for (const name of names) {
      if (name.startsWith('.')) continue;
      const full = join(dirPath, name);
      const st = await stat(full);
      if (!st.isFile()) continue;
      const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : '';
      const type = fileType(ext);
      if (type === 'other') continue;
      const entry = {
        name,
        type,
        url: buildContentUrl(topicLabel, subFolderName, name),
      };
      if (type === 'pdf') {
        // eslint-disable-next-line no-await-in-loop
        entry.text = await extractPdfText(full);
      }
      out.push(entry);
    }
    return out;
  } catch {
    return [];
  }
}

async function main() {
  let entries;
  try {
    entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Brak katalogu treści — pusty manifest:', CONTENT_DIR);
    await mkdir(join(ROOT, 'assets'), { recursive: true });
    const empty = { topics: [], generated: new Date().toISOString(), error: 'content_dir_missing' };
    await writeFile(OUT, JSON.stringify(empty, null, 2), 'utf8');
    return;
  }

  const topics = [];

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const label = ent.name;
    const slug = slugify(label);
    if (!slug) continue;

    let homeFiles = [];
    let subFiles = [];
    try {
      if (await stat(join(CONTENT_DIR, label, HOME_NAME)).then((s) => s.isDirectory())) {
        homeFiles = await listMediaFiles(label, HOME_NAME);
      }
    } catch {
      /* no strona główna */
    }
    try {
      if (await stat(join(CONTENT_DIR, label, SUB_NAME)).then((s) => s.isDirectory())) {
        subFiles = await listMediaFiles(label, SUB_NAME);
      }
    } catch {
      /* no podstrona */
    }

    const hasHome = homeFiles.length > 0;
    const hasSub = subFiles.length > 0;
    if (!hasHome && !hasSub) continue;

    topics.push({
      slug,
      label,
      hasHome,
      hasSub,
      homeFiles,
      subFiles,
    });
  }

  topics.sort((a, b) => a.label.localeCompare(b.label, 'pl'));

  const manifest = {
    generated: new Date().toISOString(),
    topics,
  };

  await mkdir(join(ROOT, 'assets'), { recursive: true });
  await writeFile(OUT, JSON.stringify(manifest, null, 2), 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Zapisano ${OUT} (${topics.length} tematów).`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
