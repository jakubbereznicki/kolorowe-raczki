import { elFromHTML } from './_helpers.js';

/**
 * Zastępcza strona — docelowo iframe z zewnętrznym kalendarzem rezerwacji.
 */
export function renderRezerwacje() {
  return elFromHTML(`
    <div>
      <section class="section" aria-label="Rezerwacje">
        <div class="container" style="max-width: 900px">
          <div class="sectionHeader" data-reveal>
            <div>
              <div class="pill">Rezerwacje</div>
              <h1 class="sectionTitle" style="margin:0 0 10px">Zarezerwuj termin</h1>
              <p class="sectionLead" style="margin:0">Tutaj w docelowej wersji wkleisz iframe z kalendarzem (zewnętrzny system rezerwacji). Poniżej zarezerwowany obszar o stałej minimalnej wysokości.</p>
            </div>
          </div>
          <div class="card rezerwacjeEmbed" data-iframe-placeholder data-reveal style="padding:0; overflow:hidden; min-height: 420px; background: linear-gradient(180deg, #f3f6eb, #fff); border: 1px dashed rgba(122, 163, 53, 0.35)">
            <div style="display:grid; place-items:center; min-height:420px; padding: 32px; text-align:center; color: rgba(30, 45, 39, 0.55); font-weight: 700; font-size: 15px">
              <div>
                <p style="margin:0 0 8px">Miejsce na iframe kalendarza</p>
                <p style="margin:0; font-size: 13px; font-weight: 600">(wstaw w kodzie: <code>src/components/rezerwacje</code> lub w tym pliku w kontener poniżej)</p>
              </div>
            </div>
            <!--
              Przykład po otrzymaniu src od dostawcy:
              <iframe title="Kalendarz rezerwacji" class="rezerwacjeIframe" src="https://…" loading="lazy"></iframe>
            -->
          </div>
        </div>
      </section>
    </div>
  `);
}
