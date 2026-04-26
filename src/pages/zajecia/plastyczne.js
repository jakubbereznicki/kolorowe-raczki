import { pageShell } from '../_helpers.js';

export function renderZajeciaPlastyczne() {
  return pageShell({
    title: 'Zajęcia plastyczne',
    lead: 'Kolory, faktury i kreatywność. Dużo tworzenia, mało “odtwarzania”.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Dla kogo?</h3>
          <ul class="aboutList">
            <li><span class="check"></span>4–6 lat: rysunek + prace manualne</li>
            <li><span class="check"></span>7–9 lat: techniki mieszane</li>
            <li><span class="check"></span>10–12 lat: projekty tematyczne</li>
          </ul>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Co robimy na zajęciach?</h3>
          <p class="muted" style="margin:0">
            Malowanie, kolaże, podstawy kompozycji, prace przestrzenne. Każdy uczestnik wychodzi z własną pracą.
          </p>
          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <a class="btn btnPrimary" href="/zapisy" data-link>Zapisz dziecko</a>
            <a class="btn" href="/#galeria" data-link>Zobacz galerię</a>
          </div>
        </div>
      </div>
    `,
  });
}

