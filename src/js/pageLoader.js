/** Tymczasowo: `true` = loader zostaje na ekranie. Ustaw `false`, gdy przywrócisz zamykanie. */
const KEEP_LOADER_VISIBLE = false;

/** Napis jak w brandingu; każda litera — kolor z palety (cykl). */
const LOADER_PHRASE = 'Kolorowe rączki';
const CHAR_COLORS = ['#7aa335', '#f0c14b', '#2a8cc8', '#e85d4d'];
const STAGGER_MS = 90;
const CHAR_ANIM_MS = 420;
const HOLD_AFTER_LAST_MS = 480;
const EXIT_TRANSITION_MS = 450;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function loaderMinDurationMs() {
  if (prefersReducedMotion()) return 320;
  const n = LOADER_PHRASE.length;
  return Math.max(0, (n - 1) * STAGGER_MS) + CHAR_ANIM_MS + HOLD_AFTER_LAST_MS;
}

function fillLoaderChars(root) {
  const mount = root.querySelector('[data-loader-word]');
  if (!mount) return;

  [...LOADER_PHRASE].forEach((ch, i) => {
    const span = document.createElement('span');
    const isSpace = ch === ' ';
    span.className = isSpace ? 'pageLoader__space' : 'pageLoader__char';
    span.style.setProperty('--i', String(i));
    if (!isSpace) {
      span.style.setProperty('--char-color', CHAR_COLORS[i % CHAR_COLORS.length]);
    }
    span.textContent = isSpace ? '\u00A0' : ch;
    mount.appendChild(span);
  });
}

/**
 * Uruchamia boot aplikacji i ukrywa loader dopiero po min. czasie animacji
 * (oraz po zakończeniu bootu — żeby uniknąć pustego #app).
 * @param {() => Promise<void>} appBoot
 */
export async function runWithPageLoader(appBoot) {
  const root = document.getElementById('pageLoader');
  if (!root) {
    await appBoot();
    queueMicrotask(() => {
      document.dispatchEvent(new CustomEvent('pageLoaderDismissed', { bubbles: true }));
    });
    return;
  }

  document.body.setAttribute('aria-busy', 'true');
  document.documentElement.classList.add('pageLoader-active');

  const reduce = prefersReducedMotion();
  if (reduce) root.classList.add('pageLoader--reduce');

  fillLoaderChars(root);

  requestAnimationFrame(() => {
    root.classList.add('pageLoader--animating');
  });

  const minMs = loaderMinDurationMs();
  const started = performance.now();

  let bootError = null;
  try {
    await appBoot();
  } catch (e) {
    bootError = e;
  }

  const elapsed = performance.now() - started;
  const remaining = Math.max(0, minMs - elapsed);
  if (remaining > 0) {
    await new Promise((r) => {
      setTimeout(r, remaining);
    });
  }

  document.body.removeAttribute('aria-busy');
  document.documentElement.classList.remove('pageLoader-active');

  if (!KEEP_LOADER_VISIBLE) {
    root.classList.add('pageLoader--done');
    await new Promise((resolve) => {
      const t = setTimeout(resolve, EXIT_TRANSITION_MS + 80);
      root.addEventListener(
        'transitionend',
        () => {
          clearTimeout(t);
          resolve();
        },
        { once: true },
      );
    });

    root.remove();
    document.dispatchEvent(new CustomEvent('pageLoaderDismissed', { bubbles: true }));
  }

  if (bootError) throw bootError;
}
