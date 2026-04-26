// Cykl kolorów liter w napisie marki — kolejne litery dostają kolejne klasy.
// Klasy odpowiadają kolorom z logo (zielony, koralowy, żółty, niebieski, pomarańczowy)
// — definicje barw mieszczą się w `header.scss`.
const COLOR_CYCLE = ['green', 'coral', 'yellow', 'sky', 'orange'];

/**
 * Renderuje napis marki literą-po-literze z rotującą paletą kolorów.
 * Spacje pomijane są w cyklu kolorów (każda widoczna litera dostaje przewidywalny
 * kolor niezależnie od liczby spacji w tekście) i renderowane są jako osobny
 * `.brandText__sp`, żeby zachować stałą szerokość mimo rodzicielskiego flex/inline-flex.
 *
 * @param {string} text — tekst do wyświetlenia (domyślnie "Kolorowe rączki")
 * @param {Document | HTMLElement} [root=document] — kontekst dla zapytania `[data-brand-text]`
 */
export function decorateBrandText(text = 'Kolorowe rączki', root = document) {
  const slot = root.querySelector('[data-brand-text]');
  if (!slot) return;
  // Idempotencja — jeśli już wypełniony (np. po hot reloadzie), nie duplikujemy.
  if (slot.childElementCount > 0) return;

  const frag = document.createDocumentFragment();
  let visibleIdx = 0;

  for (const ch of text) {
    if (ch === ' ') {
      const sp = document.createElement('span');
      sp.className = 'brandText__sp';
      sp.setAttribute('aria-hidden', 'true');
      frag.appendChild(sp);
      continue;
    }
    const letter = document.createElement('span');
    const color = COLOR_CYCLE[visibleIdx % COLOR_CYCLE.length];
    letter.className = `brandText__l brandText__l--${color}`;
    letter.textContent = ch;
    frag.appendChild(letter);
    visibleIdx += 1;
  }

  slot.replaceChildren(frag);
}
