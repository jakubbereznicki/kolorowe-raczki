/**
 * Ładuje assets/content-manifest.json (generowany: node scripts/build-content-manifest.mjs).
 * Ścieżka względna + <base> — działa na GitHub Pages (/repo-name/).
 */
let cache = null;

export async function loadContentManifest() {
  if (cache) return cache;
  const url = new URL('assets/content-manifest.json', document.baseURI).href;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    cache = { topics: [], generated: null, error: `HTTP ${res.status}` };
    return cache;
  }
  cache = await res.json();
  return cache;
}

export function getManifestCache() {
  return cache;
}
