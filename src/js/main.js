import { initRouter } from './router.js';
import { initNav } from './nav.js';
import { buildNavFromManifest } from './navBuild.js';
import { loadContentManifest } from './content/manifest.js';
import { initRevealOnScroll } from './revealOnScroll.js';
import { initLightbox } from './galleryLightbox.js';
import { decorateBrandText } from './brandText.js';

document.querySelector('[data-year]')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));
decorateBrandText();

async function boot() {
  const manifest = await loadContentManifest();
  buildNavFromManifest(manifest);
  initNav();
  initLightbox();
  initRevealOnScroll();
  await initRouter();
}

void boot();

