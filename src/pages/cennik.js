import { pageShell } from './_helpers.js';

export function renderCennik() {
  return pageShell({
    title: 'Cennik',
    lead: 'Przykładowy cennik do wizytówki — w docelowej wersji podmienisz go na realne pakiety.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Pakiety</h3>
          <div class="eventItem">
            <div style="font-weight:950;letter-spacing:-.02em">1 zajęcia / tydzień</div>
            <div class="eventMeta"><span class="dotMini"></span> 189 zł / miesiąc</div>
          </div>
          <div class="eventItem">
            <div style="font-weight:950;letter-spacing:-.02em">2 zajęcia / tydzień</div>
            <div class="eventMeta"><span class="dotMini"></span> 329 zł / miesiąc</div>
          </div>
          <div class="eventItem">
            <div style="font-weight:950;letter-spacing:-.02em">Nielimitowane wejścia</div>
            <div class="eventMeta"><span class="dotMini"></span> 459 zł / miesiąc</div>
          </div>
          <p class="muted" style="margin:12px 0 0">
            Ceny są przykładowe. W docelowej wersji dodajemy regulamin, zniżki dla rodzeństwa i opłaty wpisowe.
          </p>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Co wchodzi w cenę?</h3>
          <ul class="aboutList">
            <li><span class="check"></span>Materiały na zajęcia (w większości warsztatów)</li>
            <li><span class="check"></span>Dostęp do kalendarza i zapisów</li>
            <li><span class="check"></span>Kontakt z prowadzącym i feedback</li>
          </ul>
          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <a class="btn btnPrimary" href="zapisy" data-link>Zapisz dziecko</a>
            <a class="btn" href="#kontakt" data-link>Napisz do nas</a>
          </div>
        </div>
      </div>
    `,
  });
}

