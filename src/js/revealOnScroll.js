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

export function refreshRevealOnScroll(root = document) {
  const obs = ensureObserver();
  root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => obs.observe(el));
}

export function initRevealOnScroll() {
  refreshRevealOnScroll(document);
}
