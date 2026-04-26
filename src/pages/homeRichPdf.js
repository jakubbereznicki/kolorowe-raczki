import { escapeHtml } from './pdfTextHtml.js';

const IMG_FALLBACK = '/assets/hero-kids.jpg';

/** @type {Record<string, string>} */
const ICONS = {
  heart:
    '<svg class="homeRichIconSvg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  puzzle:
    '<svg class="homeRichIconSvg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>',
  people:
    '<svg class="homeRichIconSvg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
  star:
    '<svg class="homeRichIconSvg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  sprout:
    '<svg class="homeRichIconSvg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2L4 5.5V9c0 4.1 2.6 7.8 6.5 9.1V20h-2v2h7v-2h-2v-1.9c3.9-1.3 6.5-5 6.5-9.1V5.5L12 2z"/></svg>',
  palette:
    '<svg class="homeRichIconSvg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.64-.05-.05-.1-.1-.16-.16a2.4 2.4 0 0 1-.5-1.4c0-1.12.88-2 1.99-2H17c2.76 0 5-2.25 5-5 0-4.42-4.48-7.5-9.99-7.5zM7.5 11C6.67 11 6 10.33 6 9.5S6.67 8 7.5 8 9 8.67 9 9.5 8.33 11 7.5 11z"/></svg>',
};

const ROTATING_ICONS = ['heart', 'puzzle', 'people', 'star', 'sprout', 'palette'];

function stripPageMarkers(text) {
  return String(text || '')
    .replace(/--\s*\d+\s+of\s+\d+\s+--/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function reflowBlock(block) {
  return String(block || '')
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');
}

/**
 * @param {string} block
 * @returns {string[]}
 */
function paragraphsFromBlock(block) {
  const one = reflowBlock(block);
  if (!one) return [];
  return one
    .split(/(?<=[.!?])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ„"(\[])/u)
    .map((p) => p.trim())
    .filter(Boolean);
}

const CHECK_START = /^[\s\uFEFF]*[✓✔•]\s*/u;

/**
 * Linie z ✔/•/– jako lista; reszta → opcjonalny outro
 */
function parseChecklistBlock(block) {
  const lines = block.split('\n').map((l) => l.trim());
  const items = [];
  const rest = [];
  for (const line of lines) {
    if (!line) continue;
    if (CHECK_START.test(line)) {
      items.push(line.replace(CHECK_START, '').trim());
    } else {
      rest.push(line);
    }
  }
  return { items, tail: reflowBlock(rest.join('\n')) || null };
}

/**
 * Główny podział (O nas, oferty) — wykrywa „Dlaczego…?”, listę, „Z nami…”.
 * @param {string} raw
 */
function parseStructured(raw) {
  const clean = stripPageMarkers(raw);
  if (!clean) return null;

  const dIdx = clean.search(/\b[Dd]laczego\b/);
  if (dIdx < 0) return null;

  const qEnd = clean.indexOf('?', dIdx);
  if (qEnd < 0) return null;

  const zIdx = clean.indexOf('Z nami', qEnd);
  const head = clean.slice(0, dIdx).trim();
  const whyHeading = clean.slice(dIdx, qEnd + 1).trim();
  const afterWhy = (zIdx > qEnd ? clean.slice(qEnd + 1, zIdx) : clean.slice(qEnd + 1)).trim();
  const outro = zIdx > qEnd ? clean.slice(zIdx).trim() : null;

  const { items, tail } = parseChecklistBlock(afterWhy);
  if (items.length < 2) return null;

  const parts = head.split(/\n*DO WYBORU\n*/i);
  const intro = reflowBlock(parts[0] || '');
  const hasKicker = parts.length > 1;
  const afterKicker = hasKicker ? reflowBlock(parts.slice(1).join('\n') || '') : '';

  const finalOutro = outro || tail;
  return {
    type: 'structured',
    intro,
    kicker: hasKicker ? 'DO WYBORU' : null,
    afterKicker: hasKicker ? afterKicker : null,
    whyHeading,
    listItems: items,
    outro: finalOutro,
  };
}

/**
 * Fallback: kilka sekcji z rotującymi ikonami (bez pudełka scroll).
 * @param {string} raw
 */
function parseCardFallback(raw) {
  const clean = stripPageMarkers(raw);
  if (!clean) return { type: 'empty' };

  const chunks = clean.split(/\n\n+/).map((b) => reflowBlock(b)).filter(Boolean);
  if (!chunks.length) return { type: 'empty' };

  const cards = [];
  for (let i = 0; i < chunks.length; i += 1) {
    const iconKey = ROTATING_ICONS[i % ROTATING_ICONS.length];
    const text = chunks[i];
    if (text.length < 20 && cards.length) {
      cards[cards.length - 1].text += ` ${text}`;
    } else {
      cards.push({ icon: iconKey, text });
    }
  }
  if (cards.length > 4) {
    const merged = [];
    for (let i = 0; i < cards.length; i += 1) {
      if (i % 2 && merged.length) merged[merged.length - 1].text += ` ${cards[i].text}`;
      else merged.push(cards[i]);
    }
    return { type: 'cards', cards: merged.slice(0, 4) };
  }
  return { type: 'cards', cards: cards.slice(0, 4) };
}

function pHtml(s) {
  return `<p class="homeRichP">${escapeHtml(s)}</p>`;
}

/**
 * @param {object} p
 * @param {string} [p.heroImageUrl]
 * @param {string} p.topicLabel
 * @param {string} p.linkSub
 * @param {string} p.pdfName
 * @param {string} p.pdfUrl
 * @param {boolean} p.hasSub
 * @param {string} p.text
 * @param {boolean} [p.isSubpage] — brak CTA „Pełna strona” (np. w widoku /slug)
 */
export function buildHomeRichPdfHtml(p) {
  const { heroImageUrl, topicLabel, linkSub, pdfName, pdfUrl, hasSub, text, isSubpage } = p;
  const img = escapeHtml(heroImageUrl || IMG_FALLBACK);
  const showSubLink = hasSub && !isSubpage;
  const structured = parseStructured(text);
  if (structured) {
    const s = /** @type {Exclude<ReturnType<typeof parseStructured>, null>} */ (structured);
    const introParas = paragraphsFromBlock(s.intro).map((t) => pHtml(t)).join('');
    const midParts = [];
    if (s.kicker) midParts.push(`<p class="homeRichKicker">${escapeHtml(s.kicker)}</p>`);
    if (s.afterKicker) midParts.push(...paragraphsFromBlock(s.afterKicker).map((t) => pHtml(t)));
    const midHtml = midParts.join('');
    const listHtml = s.listItems
      .map(
        (it) => `
        <li class="homeRichCheckItem">
          <span class="homeRichCheck" aria-hidden="true"></span>
          <span class="homeRichCheckText">${escapeHtml(it)}</span>
        </li>`,
      )
      .join('');

    const outroH = s.outro ? pHtml(s.outro) : '';

    return `
      <div class="homeRich${isSubpage ? ' homeRich--sub' : ''}" data-reveal>
        <p class="homeRichMeta">${escapeHtml(pdfName)}</p>
        <div class="homeRichHero">
          <div class="homeRichHero__text">
            <div class="homeRichIntro">${introParas}</div>
            <div class="homeRichBlock">${midHtml}</div>
          </div>
          <div class="homeRichHero__media" aria-hidden="true">
            <img class="homeRichHero__img" src="${img}" alt="" width="800" height="600" loading="lazy" />
            <p class="homeRichImgCap">${escapeHtml(topicLabel)}</p>
          </div>
        </div>
        <div class="homeRichWhy">
          <h3 class="homeRichWhy__title">${escapeHtml(s.whyHeading)}</h3>
          <ul class="homeRichCheckList" role="list">${listHtml}</ul>
        </div>
        ${outroH ? `<div class="homeRichOutro">${outroH}</div>` : ''}
        <div class="homeRichActions">
          ${showSubLink ? `<a class="btn btnPrimary" href="${escapeHtml(linkSub)}" data-link>Pełna strona</a>` : ''}
          <a class="btn btnOutlineDark" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener">Pobierz PDF</a>
        </div>
      </div>`;
  }

  const cards = parseCardFallback(text);
  if (cards.type === 'empty' && String(text || '').trim()) {
    const one = pHtml(reflowBlock(stripPageMarkers(text)));
    return `
      <div class="homeRich${isSubpage ? ' homeRich--sub' : ''}" data-reveal>
        <p class="homeRichMeta">${escapeHtml(pdfName)}</p>
        <div class="homeRichHero">
          <div class="homeRichHero__text homeRichHero__text--wide">${one}</div>
          <div class="homeRichHero__media" aria-hidden="true">
            <img class="homeRichHero__img" src="${img}" alt="" width="800" height="600" loading="lazy" />
          </div>
        </div>
        <div class="homeRichActions">
          ${showSubLink ? `<a class="btn btnPrimary" href="${escapeHtml(linkSub)}" data-link>Pełna strona</a>` : ''}
          <a class="btn btnOutlineDark" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener">Pobierz PDF</a>
        </div>
      </div>`;
  }
  if (cards.type !== 'cards' || !cards.cards?.length) {
    return `
      <div class="homeRich homeRich--plain" data-reveal>
        <p class="homeRichMeta">${escapeHtml(pdfName)}</p>
        <p class="muted">Brak odczytanego tekstu. <a class="footerLink" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener">Otwórz PDF</a></p>
      </div>`;
  }

  const cardBlocks = cards.cards
    .map((c, i) => {
      const ic = ICONS[c.icon] || ICONS.heart;
      return `
        <div class="homeRichCard" data-reveal>
          <div class="homeRichCard__icon" aria-hidden="true">${ic}</div>
          <p class="homeRichCard__text">${escapeHtml(c.text)}</p>
        </div>`;
    })
    .join('');

  return `
    <div class="homeRich${isSubpage ? ' homeRich--sub' : ''}" data-reveal>
      <p class="homeRichMeta">${escapeHtml(pdfName)}</p>
      <div class="homeRichHero homeRichHero--cardsOnly">
        <div class="homeRichHero__media homeRichHero__media--tall" aria-hidden="true">
          <img class="homeRichHero__img" src="${img}" alt="" width="800" height="600" loading="lazy" />
        </div>
        <div class="homeRichCardGrid" role="list">${cardBlocks}</div>
      </div>
      <div class="homeRichActions">
        ${showSubLink ? `<a class="btn btnPrimary" href="${escapeHtml(linkSub)}" data-link>Pełna strona</a>` : ''}
        <a class="btn btnOutlineDark" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener">Pobierz PDF</a>
      </div>
    </div>`;
}
