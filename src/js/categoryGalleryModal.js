/** @type {HTMLElement|null} */
let modalEl = null;

/** @type {{ url: string; caption: string }[]} */
let currentImages = [];
let currentIndex = 0;

const chevL =
  '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
const chevR =
  '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

function buildModal() {
  const el = document.createElement('div');
  el.className = 'catGallery';
  el.hidden = true;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Galeria zdjęć');
  el.innerHTML = `
    <div class="catGalleryInner">
      <div class="catGalleryTopBar">
        <div class="catGalleryMeta">
          <span class="catGalleryTitle" data-cat-title></span>
          <span class="catGalleryCount" data-cat-count></span>
        </div>
        <button class="catGalleryClose" type="button" aria-label="Zamknij galerię" data-cat-close>×</button>
      </div>
      <div class="catGalleryStage">
        <button class="catGalleryNav catGalleryNav--prev" type="button" aria-label="Poprzednie zdjęcie" data-cat-prev>${chevL}</button>
        <div class="catGalleryImgWrap">
          <img class="catGalleryImg" alt="" data-cat-main-img />
        </div>
        <button class="catGalleryNav catGalleryNav--next" type="button" aria-label="Następne zdjęcie" data-cat-next>${chevR}</button>
      </div>
      <div class="catGalleryThumbs" data-cat-thumbs></div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

function getModal() {
  if (!modalEl) modalEl = buildModal();
  return modalEl;
}

function updateView() {
  const modal = getModal();
  const mainImg = modal.querySelector('[data-cat-main-img]');
  const countEl = modal.querySelector('[data-cat-count]');

  mainImg.style.opacity = '0';
  mainImg.onload = () => {
    mainImg.style.opacity = '1';
  };
  mainImg.src = currentImages[currentIndex].url;
  mainImg.alt = currentImages[currentIndex].caption || '';
  countEl.textContent = `${currentIndex + 1} / ${currentImages.length}`;

  modal.querySelectorAll('.catGalleryThumb').forEach((t, i) => {
    t.classList.toggle('is-active', i === currentIndex);
    if (i === currentIndex) {
      t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
}

function goTo(index) {
  currentIndex = ((index % currentImages.length) + currentImages.length) % currentImages.length;
  updateView();
}

function buildThumbs() {
  const modal = getModal();
  const thumbsEl = modal.querySelector('[data-cat-thumbs]');
  thumbsEl.innerHTML = '';

  currentImages.forEach((img, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'catGalleryThumb' + (i === 0 ? ' is-active' : '');
    btn.setAttribute('aria-label', `Zdjęcie ${i + 1}`);
    const image = document.createElement('img');
    image.src = img.url;
    image.alt = '';
    image.loading = 'lazy';
    image.decoding = 'async';
    btn.appendChild(image);
    btn.addEventListener('click', () => goTo(i));
    thumbsEl.appendChild(btn);
  });
}

export function openCategoryGallery({ title, images, startIndex = 0 }) {
  currentImages = images;
  currentIndex = startIndex;

  const modal = getModal();
  const titleEl = modal.querySelector('[data-cat-title]');
  if (titleEl) titleEl.textContent = title;

  buildThumbs();
  updateView();

  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('[data-cat-close]');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = getModal();
  modal.hidden = true;
  document.body.style.overflow = '';
}

export function initCategoryGallery() {
  document.addEventListener('click', (e) => {
    const modal = getModal();
    if (modal.hidden) return;

    if (e.target.closest('[data-cat-close]') || e.target === modal) {
      closeModal();
      return;
    }
    if (e.target.closest('[data-cat-prev]')) {
      goTo(currentIndex - 1);
      return;
    }
    if (e.target.closest('[data-cat-next]')) {
      goTo(currentIndex + 1);
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    const modal = getModal();
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });
}
