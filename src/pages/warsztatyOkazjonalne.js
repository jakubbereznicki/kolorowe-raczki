import { elFromHTML } from './_helpers.js';

const BASE = 'content-site/warsztaty-okazjonalne/podstrona/resize/';

// ─── Dane warsztatów ──────────────────────────────────────────────────────────
const CREATIVE_WORKSHOPS = [
  {
    title: 'Tęczowe Kostki Glicerynowe',
    desc: 'Własnoręczne tworzenie pachnących i kolorowych mydełek w fantazyjnych kształtach.',
    accent: 'coral',
    img: BASE + '1776859333215.webp',
  },
  {
    title: 'Aromatyczne Płótna',
    desc: 'Projektowanie i malowanie unikalnych wzorów na ekologicznych torbach bawełnianych.',
    accent: 'green',
    img: BASE + 'IMG_7284.webp',
  },
  {
    title: 'Laboratorium Naturalnego Piękna',
    desc: 'Warsztaty tworzenia bezpiecznych, domowych kosmetyków z naturalnych składników.',
    accent: 'sky',
    img: BASE + '1776859333349.webp',
  },
  {
    title: 'Sensoplastyczna Kraina Wyobraźni',
    desc: 'Wielozmysłowa przygoda z kolorami i teksturami dla najmłodszych odkrywców.',
    accent: 'yellow',
    img: BASE + '1776859333132.webp',
  },
  {
    title: 'Mali Odkrywcy Skarbów Ziemi',
    desc: 'Fascynujące zajęcia geologiczne, podczas których poznajemy tajemnice minerałów i skał.',
    accent: 'sky',
    img: BASE + 'IMG_7285.webp',
  },
  {
    title: 'Zapachowa Magia Domu',
    desc: 'Komponowanie własnych zapachów i tworzenie stylowych dyfuzorów z patyczkami.',
    accent: 'coral',
    img: BASE + '1776859333631.webp',
  },
  {
    title: 'Artystyczne Kubki i Ceramika',
    desc: 'Warsztaty malowania porcelany, dzięki którym każdy przedmiot staje się dziełem sztuki.',
    accent: 'green',
    img: BASE + '1776859333596.webp',
  },
  {
    title: 'Malowana Natura na Kamieniach',
    desc: 'Wyciszające tworzenie kolorowych mandali na gładkich kamieniach rzecznych.',
    accent: 'yellow',
    img: BASE + 'IMG_7285.webp',
  },
];

// Kolory ikon
const AC = {
  coral:  { bg: 'rgba(232,93,77,.13)',  color: '#e85d4d' },
  green:  { bg: 'rgba(141,182,65,.14)', color: '#7aa335' },
  sky:    { bg: 'rgba(58,163,217,.13)', color: '#2a8cc8' },
  yellow: { bg: 'rgba(240,193,75,.15)', color: '#a07800' },
};

// ─── Ikony SVG (24×24 viewBox) ────────────────────────────────────────────────
const ICONS = {
  coral: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M12 2v20M3 7l9 5 9-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,
  green: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 3h12l2 9H4L6 3z" fill="currentColor" opacity=".3"/>
    <path d="M4 12h16l-1 8H5l-1-8z" fill="currentColor" opacity=".2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9 12V9a3 3 0 016 0v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  sky: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 21C5 15 8 8 17 6c-1.5 7-5 12-12 15z" fill="currentColor" opacity=".6"/>
    <path d="M5 21c3-2 7-7 11-15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  yellow: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" opacity=".35"/>
    <circle cx="12" cy="12" r="5.5" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity=".85"/>
  </svg>`,
};

// ─── Builder: karta warsztatu ─────────────────────────────────────────────────
function buildCard(w) {
  const ac = AC[w.accent];
  const icon = ICONS[w.accent];
  return `
    <article class="warsCard" data-reveal>
      <div class="warsCard__content">
        <div class="warsCard__iconWrap" style="background:${ac.bg};color:${ac.color}">
          ${icon}
        </div>
        <h3 class="warsCard__title">${w.title}</h3>
        <p class="warsCard__desc">${w.desc}</p>
      </div>
      <div class="warsCard__imgWrap">
        <img
          class="warsCard__img"
          src="${w.img}"
          alt="${w.title}"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>`;
}

// ─── Główny render ────────────────────────────────────────────────────────────
export function renderWarsztatyOkazjonalne() {
  const cards = CREATIVE_WORKSHOPS.map(buildCard).join('');

  return elFromHTML(`
    <div class="warsPage">

      <!-- ══ HERO ══════════════════════════════════════════════════════════════ -->
      <section class="section warsHero">
        <div class="container warsHero__grid">

          <div class="warsHero__text" data-reveal="left">
            <h1 class="warsHero__title">
              Warsztaty<br>
              <span class="warsHero__titleAccent">okazjonalne</span>
              <span aria-hidden="true" class="warsHero__emoji">✨</span>
            </h1>
            <p class="sectionLead">
              Zapraszamy do zapoznania się z naszymi kreatywnymi propozycjami.
              Organizujemy warsztaty tematyczne, sezonowe oraz wyjątkowe spotkania
              okolicznościowe!
            </p>
          </div>

          <div class="warsHero__imgWrap" data-reveal="right">
            <img
              class="warsHero__img"
              src="${BASE}1776859333132.webp"
              alt="Warsztaty okazjonalne – Kolorowe Rączki"
              loading="eager"
              decoding="async"
            />
          </div>

        </div>
      </section>

      <!-- ══ WARSZTATY KREATYWNE I SENSORYCZNE ══════════════════════════════════ -->
      <section class="section warsCreative">
        <div class="container">

          <div class="sectionHeader sectionHeader--center" data-reveal>
            <div>
              <div class="sectionKicker">
                <svg class="sectionKickerIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l2 5.5 6 .5-4.5 3.8 1.5 5.7L12 15.5l-5 3 1.5-5.7L4 9l6-.5L12 3z" fill="#f0c14b"/>
                </svg>
                Oferta warsztatowa
              </div>
              <h2 class="sectionTitle">
                Warsztaty <span class="warsCreative__accent">Kreatywne</span> i Sensoryczne
              </h2>
              <p class="sectionLead">Kreatywność, zmysły i dobra zabawa – połączenie, które rozwija!</p>
            </div>
          </div>

          <div class="warsGrid">
            ${cards}
          </div>

        </div>
      </section>

      <!-- ══ SEKCJA DOLNA: 3 KOLUMNY ════════════════════════════════════════════ -->
      <section class="section warsColumns">
        <div class="container warsColumns__grid">

          <!-- URODZINY -->
          <div class="warsCol warsCol--birthday" data-reveal>
            <div class="warsCol__head warsCol__head--coral">
              <span class="warsCol__headEmoji" aria-hidden="true">🎁</span>
              <h2 class="warsCol__headTitle">Urodziny z Kolorowe Rączki</h2>
            </div>
            <div class="warsCol__body">
              <p class="warsCol__desc">
                <strong>Urodzinowa Fabryka Kreatywności</strong> – specjalny pakiet
                warsztatowy dostosowany do wieku jubilata i gości (do wyboru: robienie
                slime, biżuterii lub eko-gadżetów).
              </p>
              <div class="warsCol__photo">
                <img
                  src="${BASE}1776859517605.webp"
                  alt="Urodziny z Kolorowe Rączki"
                  loading="lazy"
                  decoding="async"
                  class="warsCol__photoImg"
                />
              </div>
            </div>
          </div>

          <!-- WARSZTATY OKOLICZNOŚCIOWE I SEZONOWE -->
          <div class="warsCol warsCol--occasional" data-reveal>
            <div class="warsCol__head warsCol__head--coral">
              <span class="warsCol__headEmoji" aria-hidden="true">✨</span>
              <h2 class="warsCol__headTitle">Warsztaty Okolicznościowe i Sezonowe</h2>
            </div>
            <div class="warsCol__body">
              <ul class="warsOccList" role="list">
                <li class="warsOccItem">
                  <div class="warsOccItem__texts">
                    <h3 class="warsOccItem__title">Serce dla Mamy i Taty</h3>
                    <p class="warsOccItem__desc">Tworzenie unikalnych upominków (np. biżuterii, ramek lub lasów w słoiku) z okazji Dnia Mamy.</p>
                  </div>
                  <div class="warsOccItem__photo">
                    <img src="${BASE}1776859333631.webp" alt="Serce dla Mamy i Taty" loading="lazy" decoding="async"/>
                  </div>
                </li>
                <li class="warsOccItem">
                  <div class="warsOccItem__texts">
                    <h3 class="warsOccItem__title">Herbaciane Opowieści dla Babci i Dziadka</h3>
                    <p class="warsOccItem__desc">Komponowanie autorskich mieszanek herbat i ozdabianie słoiczków jako prezentów na Dzień Babci i Dziadka.</p>
                  </div>
                  <div class="warsOccItem__photo">
                    <img src="${BASE}1776859333349.webp" alt="Herbaciane Opowieści" loading="lazy" decoding="async"/>
                  </div>
                </li>
                <li class="warsOccItem">
                  <div class="warsOccItem__texts">
                    <h3 class="warsOccItem__title">Biało-Czerwone Inspiracje</h3>
                    <p class="warsOccItem__desc">Warsztaty patriotyczne z okazji 11 listopada: tworzenie nowoczesnych kotylionów, przypinek i patriotycznych dekoracji.</p>
                  </div>
                  <div class="warsOccItem__photo">
                    <img src="${BASE}IMG_7745.webp" alt="Biało-Czerwone Inspiracje" loading="lazy" decoding="async"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- WIELKANOC I BOŻE NARODZENIE -->
          <div class="warsCol warsCol--holiday" data-reveal>
            <div class="warsCol__head warsCol__head--green">
              <span class="warsCol__headEmoji" aria-hidden="true">🌿</span>
              <h2 class="warsCol__headTitle">Wielkanoc i Boże Narodzenie</h2>
            </div>
            <div class="warsCol__body">

              <div class="warsHoliItem">
                <h3 class="warsHoliItem__title">Wiosna w Kolorze</h3>
                <p class="warsHoliItem__desc">Warsztaty wielkanocne: zdobienie gigantycznych pisanek, tworzenie palm i ekologicznych stroików.</p>
                <div class="warsHoliItem__photo">
                  <img
                    class="warsHoliItem__img"
                    src="${BASE}IMG_7398.webp"
                    alt="Wiosna w Kolorze – warsztaty wielkanocne"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div class="warsHoliItem">
                <h3 class="warsHoliItem__title">Warsztat Kreatywnych Ozdób Choinkowych</h3>
                <p class="warsHoliItem__desc">Magiczne zajęcia z dekorowania bombek, tworzenia naturalnych łańcuchów i ozdób z masy solnej lub drewna.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- ══ CTA ═══════════════════════════════════════════════════════════════ -->
      <section class="warsCta">
        <div class="container warsCta__grid">

          <div class="warsCta__text" data-reveal="left">
            <h2 class="warsCta__title">
              Zarezerwuj
              <span class="warsCta__accent">warsztaty</span><br>
              dla swojego dziecka!
            </h2>
            <p class="warsCta__lead">
              Liczba miejsc ograniczona – zapewniamy kameralną atmosferę
              i niezapomniane wrażenia.
            </p>
            <a href="/rezerwacje" data-link class="btn btnPrimary warsCta__btn">
              Zarezerwuj miejsce
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          <div class="warsCta__photos" data-reveal="right">
            <div class="warsCta__photo warsCta__photo--1">
              <img src="${BASE}1776859517478.webp" alt="" loading="lazy" decoding="async"/>
            </div>
            <div class="warsCta__photo warsCta__photo--2">
              <img src="${BASE}IMG_7702.webp" alt="" loading="lazy" decoding="async"/>
            </div>
            <div class="warsCta__photo warsCta__photo--3">
              <img src="${BASE}1776859517769.webp" alt="" loading="lazy" decoding="async"/>
            </div>
            <div class="warsCta__rainbow" aria-hidden="true">
              <svg viewBox="0 0 140 70" fill="none">
                <path d="M10 65a60 60 0 01120 0" stroke="#e85d4d" stroke-width="7" stroke-linecap="round"/>
                <path d="M20 65a50 50 0 01100 0" stroke="#f0c14b" stroke-width="7" stroke-linecap="round"/>
                <path d="M30 65a40 40 0 0180 0" stroke="#8db641" stroke-width="7" stroke-linecap="round"/>
                <path d="M40 65a30 30 0 0160 0" stroke="#3aa3d9" stroke-width="7" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

        </div>
      </section>

    </div>
  `);
}
