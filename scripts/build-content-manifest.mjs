/**
 * Skanuje `content-site/<temat-slug>/{strona-glowna|podstrona}/`
 * i zapisuje manifest do assets/content-manifest.json
 *
 * Foldery na dysku trzymamy jako ASCII-slug (bez spacji i polskich znaków),
 * żeby działały bez kombinowania na GitHub Pages (case-sensitive Linux).
 * Ładne nazwy do wyświetlania mapuje LABELS poniżej.
 */
import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { join, normalize } from 'node:path';
import { PDFParse } from 'pdf-parse';

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, 'content-site');
const OUT = join(ROOT, 'assets', 'content-manifest.json');

const HOME_NAME = 'strona-glowna';
const SUB_NAME = 'podstrona';

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
const PDF_EXT = new Set(['.pdf']);

/** Slug folderu na dysku → ładna nazwa do wyświetlenia. */
const LABELS = {
  'dzienny-opiekun': 'Dzienny opiekun',
  galeria: 'Galeria',
  kontakt: 'Kontakt',
  'o-nas': 'O nas',
  'pakiety-urodzinowe': 'Pakiety urodzinowe',
  polkolonie: 'Półkolonie',
  rezerwacje: 'Rezerwacje',
  'warsztaty-okazjonalne': 'Warsztaty okazjonalne',
  'warsztaty-w-kolorowych-raczkach': 'Warsztaty w Kolorowych Rączkach',
  'zajecia-cykliczne-w-placowkach': 'Zajęcia cykliczne w placówkach',
};

function prettyLabelFromSlug(slug) {
  if (LABELS[slug]) return LABELS[slug];
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
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

async function listMediaFiles(topicSlug, subFolderName) {
  const dirPath = join(CONTENT_DIR, topicSlug, subFolderName);
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
        url: buildContentUrl(topicSlug, subFolderName, name),
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
    const slug = ent.name;
    if (!/^[a-z0-9-]+$/.test(slug)) continue;
    const label = prettyLabelFromSlug(slug);

    let homeFiles = [];
    let subFiles = [];
    try {
      if (await stat(join(CONTENT_DIR, slug, HOME_NAME)).then((s) => s.isDirectory())) {
        homeFiles = await listMediaFiles(slug, HOME_NAME);
      }
    } catch {
      /* no strona-glowna */
    }
    try {
      if (await stat(join(CONTENT_DIR, slug, SUB_NAME)).then((s) => s.isDirectory())) {
        subFiles = await listMediaFiles(slug, SUB_NAME);
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
