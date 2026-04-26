function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Wypełnia [data-nav-list] z manifestu: tylko tematy z hasSub, plus Rezerwacje. „Oferta” jako grupa rozwijana.
 * @param {{ topics?: Array<{ slug: string; label: string; hasSub: boolean }> }} manifest
 */
export function buildNavFromManifest(manifest) {
  const list = document.querySelector('[data-nav-list]');
  if (!list) return;

  const topics = (manifest?.topics || []).filter((t) => t.hasSub);
  list.replaceChildren();

  const liHome = document.createElement('li');
  liHome.className = 'navItem';
  liHome.innerHTML = '<a class="navLink" href="/" data-link>Strona główna</a>';
  list.appendChild(liHome);

  if (topics.length) {
    const li = document.createElement('li');
    li.className = 'navItem hasDropdown';
    li.setAttribute('data-dropdown', '');
    li.innerHTML = `
      <button class="navLink navLinkBtn" type="button" aria-expanded="false" data-dropdown-toggle>
        Oferta
        <span class="chev" aria-hidden="true"></span>
      </button>
      <ul class="dropdown" data-dropdown-menu>
        ${topics
          .map(
            (t) =>
              `<li><a class="dropdownLink" href="/${esc(t.slug)}" data-link>${esc(
                t.label,
              )}</a></li>`,
          )
          .join('')}
      </ul>
    `;
    list.appendChild(li);
  }

  const liR = document.createElement('li');
  liR.className = 'navItem';
  liR.innerHTML = '<a class="navLink" href="/rezerwacje" data-link>Rezerwacje</a>';
  list.appendChild(liR);
}
