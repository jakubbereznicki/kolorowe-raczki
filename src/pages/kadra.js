import { pageShell } from './_helpers.js';

export function renderKadra() {
  return pageShell({
    title: 'Kadra',
    lead: 'Poznaj dwie osoby, które prowadzą zajęcia w Kolorowym Centrum.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 6px;letter-spacing:-.02em">Emilia Kowalska</h3>
          <p class="muted" style="margin:0 0 10px">Zajęcia plastyczne.</p>
          <div class="eventMeta"><span class="dotMini"></span> Kreatywność, kolory i prace manualne.</div>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 6px;letter-spacing:-.02em">Natalia Nowak</h3>
          <p class="muted" style="margin:0 0 10px">Zajęcia języka angielskiego.</p>
          <div class="eventMeta"><span class="dotMini"></span> Angielski przez zabawę i osłuchanie.</div>
        </div>
      </div>
      <div style="margin-top:16px" data-reveal="down">
        <a class="btn btnPrimary" href="/zapisy" data-link>Zapisz dziecko</a>
      </div>
    `,
  });
}

