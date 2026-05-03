import { getAppPathname, getBasePath, normalizePath } from './basePath.js';
import { loadContentManifest } from './content/manifest.js';

/** Ten sam rachunek co getAppPathname, ale z dowolnego href (względny do <base>). */
function hrefToAppPath(href) {
  try {
    const u = new URL(href, document.baseURI);
    let p = normalizePath(u.pathname);
    const base = getBasePath();
    if (base && p.startsWith(base)) p = p.slice(base.length) || '/';
    return normalizePath(p);
  } catch {
    return null;
  }
}
import { renderHome } from '../pages/home.js';
import { renderRezerwacje } from '../pages/rezerwacje.js';
import { renderTopicSubpage } from '../pages/topicSubpage.js';
import { renderGaleria } from '../pages/galeria.js';
import { renderPolitykaPrywatnosci } from '../pages/politykaPrywatnosci.js';
import { renderOnas } from '../pages/onas.js';
import { renderDziennyOpiekun } from '../pages/dziennyOpiekun.js';
import { refreshRevealOnScroll } from './revealOnScroll.js';
import { initCalendar } from './calendar.js';
import { initSlider } from './slider.js';
import { initLazyImages } from './lazyImages.js';

let routes = [];

function buildRoutes(manifest) {
  const m = manifest?.topics || [];
  const out = [
    { path: '/', title: 'Kolorowe Centrum — strona główna', render: () => renderHome() },
    { path: '/rezerwacje', title: 'Rezerwacje — Kolorowe Centrum', render: () => renderRezerwacje() },
    { path: '/galeria', title: 'Galeria — Kolorowe Centrum', render: () => renderGaleria() },
    { path: '/polityka-prywatnosci', title: 'Polityka Prywatności — Kolorowe Centrum', render: () => renderPolitykaPrywatnosci() },
    { path: '/o-nas', title: 'O nas — Kolorowe Centrum', render: () => renderOnas() },
    { path: '/dzienny-opiekun', title: 'Dzienny Opiekun — Kolorowe Centrum', render: () => renderDziennyOpiekun() },
  ];
  for (const t of m) {
    if (!t.hasSub) continue;
    out.push({
      path: `/${t.slug}`,
      title: `${t.label} — Kolorowe Centrum`,
      render: () => renderTopicSubpage(t),
    });
  }
  return out;
}

function setActiveLinks(pathname) {
  document.querySelectorAll('a[data-link]').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (!href || href.startsWith('http://') || href.startsWith('https://')) {
      a.removeAttribute('aria-current');
      return;
    }
    if (href.includes('#')) {
      a.removeAttribute('aria-current');
      return;
    }
    const linkPath = hrefToAppPath(href);
    if (linkPath == null) {
      a.removeAttribute('aria-current');
      return;
    }
    if (linkPath === pathname) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function scrollToHash(hash) {
  if (!hash) return;
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function renderCurrent() {
  const app = document.getElementById('app');
  if (!app) return;

  const pathname = getAppPathname();
  const hash = window.location.hash;

  const route = routes.find((r) => r.path === pathname) || routes[0];
  document.title = route.title;

  const node = await route.render();
  app.replaceChildren(node);

  setActiveLinks(pathname);

  app.querySelectorAll('form[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert('To jest formularz demo — w docelowej wersji podpinamy wysyłkę.');
    });
  });

  initCalendar(app);
  initSlider(app);
  refreshRevealOnScroll(app);
  initLazyImages(app);

  requestAnimationFrame(() => scrollToHash(hash));
}

function navigate(to) {
  const url = new URL(to, document.baseURI);
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  void renderCurrent();
}

export async function initRouter() {
  const manifest = await loadContentManifest();
  routes = buildRoutes(manifest);

  document.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[data-link]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    if (href.startsWith('http://') || href.startsWith('https://')) return;

    e.preventDefault();
    navigate(href);
  });

  window.addEventListener('popstate', () => void renderCurrent());
  window.addEventListener('hashchange', () => void renderCurrent());

  void renderCurrent();
}
