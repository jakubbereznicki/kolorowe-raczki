import { pageShell } from '../_helpers.js';

export function renderZajeciaJezykowe() {
  return pageShell({
    title: 'Zajęcia językowe',
    lead: 'Pierwsze słówka i zwroty przez zabawę, ruch i piosenki. Zero stresu — dużo osłuchania.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Jak uczymy?</h3>
          <ul class="aboutList">
            <li><span class="check"></span>Rymowanki i piosenki</li>
            <li><span class="check"></span>Zabawy tematyczne (kolory, zwierzęta, jedzenie)</li>
            <li><span class="check"></span>Mini‑dialogi i scenki</li>
          </ul>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Dla kogo?</h3>
          <p class="muted" style="margin:0">
            Dla dzieci 4–10 lat. Dzielimy na grupy wiekowe i poziomowe, żeby każdy czuł się swobodnie.
          </p>
          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <a class="btn btnPrimary" href="/zapisy" data-link>Zapisz dziecko</a>
            <a class="btn" href="/#kontakt" data-link>Zapytaj o grupę</a>
          </div>
        </div>
      </div>
    `,
  });
}

