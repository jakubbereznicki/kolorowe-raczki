import { elFromHTML } from './_helpers.js';

export function renderPolitykaPrywatnosci() {
  return elFromHTML(`
    <div>
      <section class="section" aria-labelledby="pp-tytul">
        <div class="container" style="max-width: 860px">
          <div class="sectionHeader" data-reveal="left">
            <div>
              <div class="pill">Dokumenty</div>
              <h1 class="sectionTitle" id="pp-tytul" style="margin: 8px 0 0">Polityka Prywatności</h1>
            </div>
          </div>

          <div class="ppContent" data-reveal>

            <p class="ppLead">Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych przez Użytkowników w związku z korzystaniem ze strony internetowej Kolorowe Centrum.</p>

            <h2 class="ppHeading">1. Administrator danych osobowych</h2>
            <p>Administratorem danych osobowych jest <strong>Kolorowe Centrum „Kolorowe Rączki"</strong> z siedzibą przy ul. Nenckiego 127/5, 52-212 Wrocław, e-mail: <a class="ppLink" href="mailto:biuro.kolorowecentrum@gmail.com">biuro.kolorowecentrum@gmail.com</a>, tel. <a class="ppLink" href="tel:+48788047214">+48 788 047 214</a>.</p>

            <h2 class="ppHeading">2. Cele i podstawy przetwarzania danych</h2>
            <p>Dane osobowe przetwarzane są w następujących celach:</p>
            <ul class="ppList">
              <li>odpowiedzi na wiadomości przesłane przez formularz kontaktowy (podstawa: art. 6 ust. 1 lit. b RODO — niezbędność do podjęcia działań przed zawarciem umowy lub art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes administratora),</li>
              <li>realizacji usług (zajęć, warsztatów, rezerwacji) — podstawa: art. 6 ust. 1 lit. b RODO,</li>
              <li>wypełnienia obowiązków prawnych ciążących na administratorze — art. 6 ust. 1 lit. c RODO.</li>
            </ul>

            <h2 class="ppHeading">3. Zakres zbieranych danych</h2>
            <p>Za pośrednictwem formularza kontaktowego zbieramy: imię i nazwisko, adres e-mail, numer telefonu oraz treść wiadomości.</p>

            <h2 class="ppHeading">4. Okres przechowywania danych</h2>
            <p>Dane przechowywane są przez okres niezbędny do realizacji celu, w którym zostały zebrane, a po jego osiągnięciu — przez czas wynikający z przepisów prawa lub przez okres przedawnienia ewentualnych roszczeń.</p>

            <h2 class="ppHeading">5. Prawa przysługujące osobom, których dane dotyczą</h2>
            <p>Każda osoba, której dane dotyczą, ma prawo do:</p>
            <ul class="ppList">
              <li>dostępu do swoich danych oraz otrzymania ich kopii,</li>
              <li>sprostowania (poprawiania) swoich danych,</li>
              <li>usunięcia danych (prawo do bycia zapomnianym),</li>
              <li>ograniczenia przetwarzania danych,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania danych,</li>
              <li>wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
            <p>W celu realizacji powyższych praw prosimy o kontakt pod adresem: <a class="ppLink" href="mailto:biuro.kolorowecentrum@gmail.com">biuro.kolorowecentrum@gmail.com</a>.</p>

            <h2 class="ppHeading">6. Odbiorcy danych</h2>
            <p>Dane mogą być przekazywane podmiotom świadczącym usługi na rzecz Administratora (np. dostawcy usług e-mail, hostingu). Dane nie są przekazywane do państw trzecich poza Europejskim Obszarem Gospodarczym.</p>

            <h2 class="ppHeading">7. Pliki cookies</h2>
            <p>Strona może wykorzystywać pliki cookies w celach technicznych (zapewnienie prawidłowego działania strony). Użytkownik może w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce.</p>

            <h2 class="ppHeading">8. Zmiany Polityki Prywatności</h2>
            <p>Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O wszelkich zmianach Użytkownicy będą informowani poprzez zamieszczenie zaktualizowanej wersji na stronie internetowej.</p>

            <p class="ppDate">Ostatnia aktualizacja: maj 2026</p>
          </div>
        </div>
      </section>
    </div>
  `);
}
