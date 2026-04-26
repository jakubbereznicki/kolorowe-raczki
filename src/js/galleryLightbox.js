function qs(sel) {
  return document.querySelector(sel);
}

export function initLightbox() {
  const root = qs('[data-lightbox]');
  const img = qs('[data-lightbox-img]');
  const caption = qs('[data-lightbox-caption]');
  const closeBtn = qs('[data-lightbox-close]');

  if (!root || !img || !caption || !closeBtn) return;

  const open = ({ src, alt, text }) => {
    img.src = src;
    img.alt = alt || '';
    caption.textContent = text || '';
    root.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    root.hidden = true;
    img.removeAttribute('src');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const target = e.target;
    const item = target?.closest?.('[data-gallery-item]');
    if (item) {
      const src = item.getAttribute('data-src');
      const alt = item.getAttribute('data-alt') || '';
      const text = item.getAttribute('data-caption') || '';
      if (src) open({ src, alt, text });
      return;
    }

    if (target === root || target?.closest?.('[data-lightbox-close]')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!root.hidden && e.key === 'Escape') close();
  });

  // Keyboard support for gallery items (Enter/Space)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const target = e.target;
    const item = target?.closest?.('[data-gallery-item]');
    if (!item) return;
    e.preventDefault();
    const src = item.getAttribute('data-src');
    const alt = item.getAttribute('data-alt') || '';
    const text = item.getAttribute('data-caption') || '';
    if (src) open({ src, alt, text });
  });
}

