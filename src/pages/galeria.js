import { elFromHTML } from './_helpers.js';
import { loadContentManifest } from '../js/content/manifest.js';
import { resolveAppUrl } from '../js/basePath.js';
import { openCategoryGallery } from '../js/categoryGalleryModal.js';

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function photoCount(n) {
  if (n === 1) return '1 zdjęcie';
  if (n >= 2 && n <= 4) return `${n} zdjęcia`;
  return `${n} zdjęć`;
}

export async function renderGaleria() {
  const manifest = await loadContentManifest();

  const topics = (manifest?.topics || [])
    .map((t) => ({
      ...t,
      images: (t.subFiles || [])
        .filter((f) => f.type === 'image')
        .map((f) => ({ url: resolveAppUrl(f.url), caption: t.label })),
    }))
    .filter((t) => t.images.length > 0);

  const cardsHtml = topics
    .map(
      (t, i) => `
      <button
        class="galeriaCategoryCard"
        type="button"
        data-cat-index="${i}"
        aria-label="Otwórz galerię: ${esc(t.label)} (${t.images.length} zdjęć)"
        data-reveal
      >
        <div class="galeriaCategoryCard__media">
          <img
            src="${esc(t.images[0].url)}"
            alt=""
            loading="lazy"
            decoding="async"
            width="600"
            height="450"
          />
          <span class="galeriaCategoryCard__badge">${photoCount(t.images.length)}</span>
        </div>
        <div class="galeriaCategoryCard__body">
          <h2 class="galeriaCategoryCard__title">${esc(t.label)}</h2>
          <span class="galeriaCategoryCard__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h12m0 0l-5-5m5 5l-5 5"/></svg>
          </span>
        </div>
      </button>`,
    )
    .join('');

  const root = elFromHTML(`
    <div>
      <section class="section" id="galeria" aria-labelledby="galeria-tytul">
        <div class="container">
          <div class="sectionHeader sectionHeader--center" data-reveal>
            <h1 class="sectionTitle" id="galeria-tytul">
              <span class="textAccentCoral">Galeria</span> zdjęć
            </h1>
            <p class="sectionLead">Wybierz kategorię i przeglądaj zdjęcia z naszych zajęć.</p>
          </div>
          <div class="galeriaCategoriesGrid">
            ${cardsHtml}
          </div>
        </div>
      </section>
    </div>
  `);

  root.querySelectorAll('[data-cat-index]').forEach((btn) => {
    const idx = Number(btn.getAttribute('data-cat-index'));
    const topic = topics[idx];
    btn.addEventListener('click', () => {
      openCategoryGallery({ title: topic.label, images: topic.images, startIndex: 0 });
    });
  });

  return root;
}
