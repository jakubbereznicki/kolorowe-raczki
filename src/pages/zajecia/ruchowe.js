import { pageShell } from '../_helpers.js';

export function renderZajeciaRuchowe() {
  return pageShell({
    title: 'Zajęcia ruchowe',
    lead: 'Koordynacja, balans i energia w mądrym wydaniu — bez presji i porównań.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">W planie</h3>
          <ul class="aboutList">
            <li><span class="check"></span>Tory przeszkód i mini‑gry</li>
            <li><span class="check"></span>Ćwiczenia na równowagę</li>
            <li><span class="check"></span>Współpraca w grupie</li>
          </ul>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Dlaczego warto?</h3>
          <p class="muted" style="margin:0">
            Ruch poprawia koncentrację, pewność siebie i samopoczucie. A w wieku szkolnym — pomaga “rozładować” emocje.
          </p>
          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <a class="btn btnPrimary" href="zapisy" data-link>Zapisz dziecko</a>
            <a class="btn" href="#kalendarz" data-link>Sprawdź terminy</a>
          </div>
        </div>
      </div>
    `,
  });
}

