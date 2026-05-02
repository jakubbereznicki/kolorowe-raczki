const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'/%3E";

let observer = null;

function loadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) return;
  img.src = src;
  img.removeAttribute('data-src');
  img.classList.add('lazyImg--loaded');
}

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(/** @type {HTMLImageElement} */ (entry.target));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '150px 0px' },
    );
  }
  return observer;
}

/**
 * Obserwuje wszystkie img[data-src] wewnątrz `root`.
 * Wywołuj po każdym renderowaniu nowej zawartości.
 * @param {Element|Document} [root]
 */
export function initLazyImages(root = document) {
  const imgs = Array.from(root.querySelectorAll('img[data-src]'));
  if (!imgs.length) return;

  if (!('IntersectionObserver' in window)) {
    imgs.forEach(loadImage);
    return;
  }

  const obs = getObserver();
  imgs.forEach((img) => obs.observe(img));
}

export { PLACEHOLDER };
