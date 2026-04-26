/**
 * Wsparcie dla GitHub Pages (project site: /repo-name/…):
 * w index.html ustawiany jest <base id="app-base"> tak, by względne URL-e
 * wskazywały katalog repozytorium, a nie korzeń domeny github.io.
 */

function stripTrailingSlash(path) {
  if (!path || path.length <= 1) return path;
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * Segment ścieżki aplikacji bez końcowego slasha, np. "" lub "/kolorowe-raczki".
 * Pusty string = serwis na root (localhost, własna domena na root).
 */
export function getBasePath() {
  const el = document.getElementById('app-base');
  if (!el) return '';
  const raw = el.getAttribute('href') || '/';
  try {
    const u = new URL(raw, window.location.origin);
    const p = stripTrailingSlash(u.pathname);
    return p === '/' ? '' : p;
  } catch {
    return '';
  }
}

export function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

/**
 * Pathname względem routingu SPA (np. "/", "/rezerwacje"), bez segmentu repo na GitHub Pages.
 */
export function getAppPathname() {
  const base = getBasePath();
  let path = normalizePath(window.location.pathname);
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/';
  }
  return normalizePath(path);
}

/**
 * Ścieżka absolutna od roota serwisu (np. "/assets/x") → z prefiksem repo na GitHub Pages.
 * Względne ścieżki i pełne URL-e zwraca bez zmian.
 */
export function resolveAppUrl(path) {
  if (path == null || path === '') return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('//')) return path;
  if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('mailto:') || path.startsWith('tel:'))
    return path;
  if (!path.startsWith('/')) return path;
  const base = getBasePath();
  if (!base) return path;
  return base + path;
}
