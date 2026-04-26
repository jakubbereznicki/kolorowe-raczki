/**
 * Ładuje /assets/content-manifest.json (generowany: node scripts/build-content-manifest.mjs).
 */
let cache = null;

export async function loadContentManifest() {
  if (cache) return cache;
  const res = await fetch('/assets/content-manifest.json', { cache: 'no-store' });
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
