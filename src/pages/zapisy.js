import { pageShell } from './_helpers.js';

export function renderZapisy() {
  return pageShell({
    title: 'Zapisy',
    lead: 'Krótki formularz “na wizytówkę”. W realnym projekcie podepniemy API / CRM lub wysyłkę e‑mail.',
    childrenHTML: `
      <div class="grid2">
        <div class="card" data-reveal="left">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Zgłoszenie</h3>
          <form class="formGrid" data-demo-form>
            <div class="field">
              <label for="pName">Imię rodzica</label>
              <input id="pName" name="pName" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="phone">Telefon</label>
              <input id="phone" name="phone" inputmode="tel" autocomplete="tel" required />
            </div>
            <div class="field">
              <label for="kidAge">Wiek dziecka</label>
              <input id="kidAge" name="kidAge" inputmode="numeric" placeholder="np. 6" required />
            </div>
            <div class="field">
              <label for="pref">Preferowane zajęcia</label>
              <input id="pref" name="pref" placeholder="np. plastyczne, ruchowe…" />
            </div>
            <div class="field">
              <label for="msg">Wiadomość</label>
              <textarea id="msg" name="msg" placeholder="Kilka słów…"></textarea>
            </div>
            <div style="grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
              <button class="btn btnPrimary" type="submit">Wyślij zgłoszenie</button>
              <span class="muted" style="font-size:12px">To jest formularz demo (bez wysyłki).</span>
            </div>
          </form>
        </div>
        <div class="card" data-reveal="right">
          <h3 style="margin:0 0 10px;letter-spacing:-.02em">Jak to działa?</h3>
          <ul class="aboutList">
            <li><span class="check"></span>Wypełniasz zgłoszenie w 1 minutę</li>
            <li><span class="check"></span>Oddzwaniamy i dobieramy grupę wiekową</li>
            <li><span class="check"></span>Można umówić zajęcia próbne</li>
          </ul>
          <div style="margin-top:14px">
            <a class="btn" href="/#kalendarz" data-link>Zobacz kalendarz</a>
          </div>
        </div>
      </div>
    `,
  });
}

