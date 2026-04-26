import { pageShell } from './_helpers.js';

export function renderOferta() {
  const page = pageShell({
    title: 'Oferta',
    lead: 'Zajęcia dopasowane do wieku i potrzeb dziecka — od kreatywności, przez ruch, po pierwsze kroki w językach.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 6px;letter-spacing:-.02em">Co robimy?</h3>
          <p class="muted" style="margin:0">
            Stawiamy na rozwój przez zabawę, małe grupy i ciepłą atmosferę. Każde zajęcia mają jasny cel, ale są prowadzone lekko i bez presji.
          </p>
          <ul class="aboutList">
            <li><span class="check"></span>Grupy 0–3, 4–6, 7–9, 10–12</li>
            <li><span class="check"></span>Regularny feedback dla rodziców</li>
            <li><span class="check"></span>Bezpieczna przestrzeń i doświadczona kadra</li>
          </ul>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 6px;letter-spacing:-.02em">Szybkie linki</h3>
          <p class="muted" style="margin:0 0 14px">Zobacz przykładowe ścieżki zajęć:</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            <a class="btn" href="zajecia/plastyczne" data-link>Plastyczne</a>
            <a class="btn" href="zajecia/ruchowe" data-link>Ruchowe</a>
            <a class="btn" href="zajecia/jezykowe" data-link>Językowe</a>
          </div>
          <div style="margin-top:14px">
            <a class="btn btnPrimary" href="zapisy" data-link>Zapisz dziecko</a>
          </div>
        </div>
      </div>
    `,
  });

  return page;
}

