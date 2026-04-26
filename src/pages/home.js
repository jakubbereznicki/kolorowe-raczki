import { elFromHTML } from './_helpers.js';

/** Zdjęcia z katalogu treści (tymczasowe — do wymiany) */
const SLIDE_IMAGES = [
  'content-site/Zaj%C4%99cia%20cykliczne%20w%20plac%C3%B3wkach/podstrona/FB_IMG_1742389521939.jpg',
  'content-site/Pakiety%20urodzinowe/podstrona/DSC00010.JPG',
  'content-site/Dzienny%20opiekun/podstrona/IMG_20251118_085211.jpg',
];

const SLIDE_TEXTS = [
  'Centrum Rozwoju Twojego Dziecka „Kolorowe Rączki” to miejsce stworzone z myślą o dzieciach od urodzenia do 12 lat.',
  'Wspieramy rozwój najmłodszych poprzez zajęcia, warsztaty, eventy oraz codzienną opiekę w kameralnych grupach. Organizujemy urodziny, nocowanki, wyjazdy oraz animacje na weselach, chrzcinach i innych wydarzeniach.',
  'W ramach Dziennego Opiekuna „Kolorowe Rączki” zapewniamy opiekę maksymalnie dla 5 dzieci, dbając o domową atmosferę, bliskość i indywidualne podejście oparte na rodzicielstwie bliskości.',
];

const iconPuzzle = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>';
const iconHeart = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
const iconPeople = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>';
const iconStar = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
const iconPalette = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 22C6.49 22 2 17.51 2 12S6.04 2 11.5 2c5.51 0 10 4.04 10 9 0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.46.64 1.05.64 1.66 0 1.38-1.12 2.51-2.5 2.51zm-.5-18C7.36 4 4 7.36 4 11.5S7.81 20 12 20c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.81-7-8.5-7z"/><circle cx="6.5" cy="11.5" r="1.5"/><circle cx="9.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></svg>';
const iconSprout = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>';
const iconGroups = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73L18 18H6l.01-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.6-.91 4.23-.91zM4 13c1.1 0 2-.9 2-2 0-1.1-.9-2-2-2s-2 .9-2 2c0 1.1.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2 0-1.1-.9-2-2-2s-2 .9-2 2c0 1.1.9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>';
const iconSun = () =>
  '<svg class="iconSvg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>';
const iconArrow = () =>
  '<svg class="homeHeroCta__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5"/></svg>';
const iconCalendar = () =>
  '<svg class="homeHeroCta__icon homeHeroCta__icon--cal" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
const chevL = () =>
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const chevR = () =>
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** Główny tytuł baneru (mockup: kolorowe słowa, druga linia od „rozwijają”) */
const heroMainTitle = (isH1) => {
  const t = isH1 ? 'h1' : 'h2';
  return `<${t} class="homeHeroBanner__title">
    <span class="homeHeroBanner__titleLine">Miejsce, gdzie dzieci</span>
    <span class="homeHeroBanner__titleLine homeHeroBanner__titleLine--second">
      <span class="homeHeroBanner__titleWord homeHeroBanner__titleWord--green">rozwijają</span>
      <span class="homeHeroBanner__titleWord">swoje</span>
      <span class="homeHeroBanner__titleWord homeHeroBanner__titleWord--red">pasje!</span>
    </span>
  </${t}>`;
};

/**
 * Konfiguracja kafelków w sekcji "Nasze zajęcia".
 * Dodaj `description` + `featured: true` żeby rozwinąć kafelek (zdjęcie + tytuł + opis).
 * Dodaj nowy obiekt na końcu, żeby pojawił się kolejny kafelek.
 */
const OFFERS = [
  {
    slug: 'warsztaty-okazjonalne',
    label: 'Warsztaty okazjonalne',
    image: 'content-site/Warsztaty%20okazjonalne/podstrona/1776859333132.JPG',
    description:
      'Kreatywne i sensoryczne warsztaty tematyczne — pachnące mydełka glicerynowe, malowana ceramika, mandale na kamieniach i sezonowe ozdoby świąteczne. Mamy też spotkania na Dzień Mamy, Babci czy 11 listopada.',
    featured: true,
  },
  {
    slug: 'warsztaty-w-kolorowych-raczkach',
    label: 'Warsztaty w Kolorowych Rączkach',
    image: 'content-site/Warsztaty%20w%20kolorowych%20r%C4%85czkach/podstrona/IMG-20251025-WA0017.jpg',
  },
  {
    slug: 'zajecia-cykliczne-w-placowkach',
    label: 'Zajęcia cykliczne w placówkach',
    image: 'content-site/Zaj%C4%99cia%20cykliczne%20w%20plac%C3%B3wkach/podstrona/sensoplastyka(5).jpg',
  },
  {
    slug: 'pakiety-urodzinowe',
    label: 'Pakiety urodzinowe',
    image: 'content-site/Pakiety%20urodzinowe/podstrona/DSC05927.JPG',
    description:
      'Tematyczne urodziny dopasowane do wieku jubilata — sensoplastyka i muzyka dla maluchów, magic masa, eksperymenty, mali piraci czy superbohaterowie dla starszaków. Ponad 10 motywów do wyboru, animator, tańce i foto strefa w pakiecie.',
    featured: true,
  },
  {
    slug: 'dzienny-opiekun',
    label: 'Dzienny opiekun',
    image: 'content-site/Dzienny%20opiekun/podstrona/IMG_20251014_132654.jpg',
  },
  {
    slug: 'polkolonie',
    label: 'Półkolonie',
    image: 'content-site/P%C3%B3%C5%82kolonie/podstrona/1776858150808.jpg',
  },
];

function renderOfferCard(offer) {
  const isFeatured = Boolean(offer.featured);
  const descHtml =
    isFeatured && offer.description
      ? `<p class="homeOfertaCard__desc">${offer.description}</p>`
      : '';
  const featuredClass = isFeatured ? ' is-featured' : '';
  return `
    <a class="homeOfertaCard${featuredClass}" href="${offer.slug}" data-link data-reveal aria-label="${offer.label}">
      <div class="homeOfertaCard__media">
        <img
          class="homeOfertaCard__img"
          src="${offer.image}"
          alt=""
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
      </div>
      <div class="homeOfertaCard__body">
        <h3 class="homeOfertaCard__title">${offer.label}</h3>
        ${descHtml}
      </div>
      <span class="homeOfertaCard__cta" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h12m0 0l-5-5m5 5l-5 5"/></svg>
      </span>
    </a>`;
}

/**
 * Sekcja "Rozwój przez zabawę, radość na co dzień" — wartości skierowane na dziecko
 * (komplementarne do "Dlaczego nas", które mówi o firmie).
 *
 * Dodaj nowy obiekt — pojawi się kolejny element w siatce.
 */
const VALUES = [
  {
    title: 'Kreatywność',
    text: 'Każde dziecko tworzy, eksperymentuje i odkrywa własny styl artystyczny.',
    color: 'sky',
    Icon: iconPalette,
  },
  {
    title: 'Wyobraźnia',
    text: 'Sensoryczne zabawy i tematyczne scenariusze rozbudzają ciekawość świata.',
    color: 'green',
    Icon: iconSprout,
  },
  {
    title: 'Przyjaźń',
    text: 'Wspólne projekty uczą współpracy i budują pierwsze prawdziwe więzi.',
    color: 'coral',
    Icon: iconGroups,
  },
  {
    title: 'Radość',
    text: 'Po zajęciach dzieci wracają z uśmiechem i dumą z własnych prac.',
    color: 'yellow',
    Icon: iconSun,
  },
];

function renderValueItem(v) {
  return `
    <li class="homeWartosciItem" data-reveal>
      <span class="homeWartosciItem__icon homeWartosciItem__icon--${v.color}" aria-hidden="true">
        ${v.Icon()}
      </span>
      <h3 class="homeWartosciItem__title">${v.title}</h3>
      <p class="homeWartosciItem__desc">${v.text}</p>
    </li>`;
}

const FOUR_CARDS = [
  {
    title: 'Kameralnie',
    text: 'małe grupy i pełna uwaga dla dziecka',
    icon: 'green',
    Icon: iconPuzzle,
  },
  {
    title: 'Przestrzeń',
    text: 'ciepła, bezpieczna i wspierająca przestrzeń',
    icon: 'coral',
    Icon: iconHeart,
  },
  {
    title: 'Rozwój',
    text: 'rozwój przez zabawę i relację',
    icon: 'sky',
    Icon: iconPeople,
  },
  {
    title: 'Doświadczenie',
    text: 'doświadczenie w pracy z dziećmi i organizacji wydarzeń',
    icon: 'yellow',
    Icon: iconStar,
  },
];

/**
 * Tylko sekcja O nas (slider) + 4 kafle + podpis — reszta strony głównej na później.
 * @returns {Promise<HTMLElement>}
 */
export async function renderHome() {
  const slidesHtml = SLIDE_TEXTS.map(
    (copy, i) => `
    <div class="homeAboutSlide${i === 0 ? ' isActive' : ''}" data-slide>
      <article class="homeHeroBanner" aria-label="O nas, slajd ${i + 1}">
        <div class="homeHeroBanner__inner">
          <div class="homeHeroBanner__textCol">
            <div class="homeHeroBanner__text">
              ${heroMainTitle(i === 0)}
              <p class="homeHeroBanner__lead">${copy}</p>
              <div class="homeHeroBanner__actions">
                <a class="btn btnPrimary homeHeroCta" href="#dlaczego-tytul" data-link>
                  <span>Zobacz zajęcia</span>
                  ${iconArrow()}
                </a>
                <a class="btn btnOutlineDark homeHeroCta" href="rezerwacje" data-link>
                  ${iconCalendar()}<span>Zarezerwuj miejsce</span>
                </a>
              </div>
            </div>
          </div>
          <div class="homeHeroBanner__media" aria-hidden="true">
            <img
              class="homeHeroBanner__img"
              src="${SLIDE_IMAGES[i]}"
              alt=""
              width="1200"
              height="800"
              loading="${i === 0 ? 'eager' : 'lazy'}"
              ${i === 0 ? 'fetchpriority="high"' : ''}
              decoding="async"
            />
          </div>
        </div>
      </article>
    </div>`,
  ).join('');

  const cardsHtml = FOUR_CARDS.map(
    (c) => `
    <div class="offerCard" data-reveal>
      <div class="iconBubble iconBubble--${c.icon}">${c.Icon()}</div>
      <h3>${c.title}</h3>
      <p>${c.text}</p>
    </div>`,
  ).join('');

  const offersHtml = OFFERS.map(renderOfferCard).join('');
  const valuesHtml = VALUES.map(renderValueItem).join('');

  const root = elFromHTML(`
    <div>
      <section class="section homeAbout" id="o-nas" aria-label="O nas">
        <div class="container homeAbout__container">
          <div class="homeAboutSlider" data-slider>
            <div class="homeAboutSlider__viewport" aria-roledescription="karuzela">
              ${slidesHtml}
            </div>
            <div class="homeAboutSlider__ui">
              <button type="button" class="homeAboutNavBtn" data-prev aria-label="Poprzedni slajd">
                ${chevL()}
              </button>
              <div class="homeAboutDots" data-dots></div>
              <button type="button" class="homeAboutNavBtn" data-next aria-label="Następny slajd">
                ${chevR()}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="dlaczego-tytul">
        <div class="container">
          <div class="sectionHeader sectionHeader--center" data-reveal>
            <div>
              <div class="homeDlaczegoLogo">
                <img
                  class="homeDlaczegoLogo__img"
                  src="assets/logo-kolorowe-raczki.png"
                  width="250"
                  height="250"
                  alt="Kolorowe Rączki"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 class="sectionTitle" id="dlaczego-tytul" style="max-width: 38ch; margin-left: auto; margin-right: auto">
                Tworzymy przestrzeń, w której dzieci czują się bezpieczne, ważne i swobodnie się rozwijają. Dlaczego wybierają nas rodzice?
              </h2>
            </div>
          </div>
          <div class="offersGrid">
            ${cardsHtml}
          </div>
          <p class="homeZnami" data-reveal>
            Z nami Twoje dziecko rośnie, rozwija się i jest naprawdę zaopiekowane.
          </p>
        </div>
      </section>

      <section class="section homeOferta" id="oferta" aria-labelledby="oferta-tytul">
        <div class="container">
          <div class="sectionHeader sectionHeader--center" data-reveal>
            <h2 class="sectionTitle" id="oferta-tytul">
              Nasze <span class="textAccentBlue">zajęcia</span>
            </h2>
          </div>
          <div class="homeOfertaGrid">
            ${offersHtml}
          </div>
        </div>
      </section>

      <section class="section homeWartosci" id="wartosci" aria-labelledby="wartosci-tytul">
        <div class="container">
          <div class="sectionHeader sectionHeader--center" data-reveal>
            <h2 class="sectionTitle" id="wartosci-tytul">
              Rozwój przez zabawę, <span class="textAccentCoral">radość</span> na co dzień!
            </h2>
          </div>
          <ul class="homeWartosciGrid">
            ${valuesHtml}
          </ul>
        </div>
      </section>
    </div>
  `);

  // Pre-decode obrazów kafelków oferty w idle time — dekodowanie JPG-ów
  // odbywa się przed momentem reveal-on-scroll, dzięki czemu cross-fade
  // (opacity 0→1 + translateY) nie konkuruje na main-threadzie z dekoderem
  // obrazów i nie generuje przycięć podczas wjazdu kafelków.
  const decodeOfferImages = () => {
    root.querySelectorAll('.homeOfertaCard__img').forEach((img) => {
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
    });
  };
  if (
    typeof window !== 'undefined' &&
    typeof window.requestIdleCallback === 'function'
  ) {
    window.requestIdleCallback(decodeOfferImages, { timeout: 1500 });
  } else {
    setTimeout(decodeOfferImages, 200);
  }

  return root;
}
