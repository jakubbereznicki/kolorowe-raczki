let observer = null;

function ensureObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.classList.add('is-visible');
        // Animacja jednorazowa: po pojawieniu się sekcji odpinamy obserwację,
        // żeby przy scrollu w górę element nie znikał ani nie odpalał animacji
        // ponownie. Raz pokazany — zostaje.
        observer.unobserve(el);
      }
    },
    // Trigger a bit later so animation starts when element is clearly visible
    { threshold: 0.28, rootMargin: '0px 0px -18% 0px' },
  );
  return observer;
}

// Tylko kierunkowe warianty animujemy. Bezwartościowy `data-reveal` istnieje
// w starszym markupie (np. nagłówki sekcji na home) — jest świadomie ignorowany,
// żeby cała sekcja nie wjeżdżała przy scrollu.
const REVEAL_SELECTOR = '[data-reveal="left"]:not(.is-visible), [data-reveal="right"]:not(.is-visible), [data-reveal="down"]:not(.is-visible)';

/** Po `pageLoaderDismissed` ustawiane na `html` — wtedy dopiero IO obserwuje elementy z `data-defer-boot-reveal` (hero po loaderze). */
const PAGE_LOADER_REVEAL_READY = 'pageLoaderRevealReady';

function deferBootRevealPending() {
  return !document.documentElement.dataset[PAGE_LOADER_REVEAL_READY];
}

export function refreshRevealOnScroll(root = document) {
  const obs = ensureObserver();
  root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (el.hasAttribute('data-defer-boot-reveal') && deferBootRevealPending()) return;
    obs.observe(el);
  });

  if (!deferBootRevealPending()) {
    flushDeferBootRevealNearViewport(root);
    requestAnimationFrame(() => flushDeferBootRevealNearViewport(root));
  }
}

/**
 * Po pierwszym wejściu elementy `[data-defer-boot-reveal]` zaczynają się pod wysokim hero.
 * Zwykły IO (threshold + ujemny rootMargin) nie zdąży uznać ich za „w widoku”, więc
 * zostają na opacity: 0 jakby layoutu nie było — dopóki użytkownik nie przescrolluje.
 * Jednorazowy „buffers” w pikselach rejestruje lekko wyżej wysunięty content jako już wpisujący się w viewport.
 */
function flushDeferBootRevealNearViewport(scope) {
  if (deferBootRevealPending()) return;
  const obs = ensureObserver();
  if (!scope) return;
  /** ~pół ekranu: starczy żeby sekcja od razu pod hero znów była widoczna przy starcie bez scrollowania */
  const fudgePx = Math.min(520, Math.round(window.innerHeight * 0.5));

  scope.querySelectorAll('[data-defer-boot-reveal]').forEach((el) => {
    if (el.classList.contains('is-visible')) return;
    const reveal = el.getAttribute('data-reveal');
    if (reveal !== 'left' && reveal !== 'right' && reveal !== 'down') return;

    const r = el.getBoundingClientRect();
    const overlapsExpanded =
      r.top < window.innerHeight + fudgePx &&
      r.bottom > -fudgePx &&
      r.left < window.innerWidth &&
      r.right > 0;
    if (!overlapsExpanded) return;

    el.classList.add('is-visible');
    obs.unobserve(el);
  });
}

export function initRevealOnScroll() {
  document.addEventListener(
    'pageLoaderDismissed',
    () => {
      document.documentElement.dataset[PAGE_LOADER_REVEAL_READY] = 'true';
      const scope = document.getElementById('app') ?? document;
      refreshRevealOnScroll(scope);
    },
    { once: true },
  );

  refreshRevealOnScroll(document);
}
