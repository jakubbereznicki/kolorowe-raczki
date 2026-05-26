import { elFromHTML } from './_helpers.js';
import { resolveAppUrl } from '../js/basePath.js';

const BASE = 'content-site/polkolonie/podstrona/';

function img(name) {
  return resolveAppUrl(BASE + name);
}

const PHOTOS = {
  hero: '1776858150808.webp',
  offer: '1776858150859.webp',
  dayBg: '1776858151130.webp',
  quote: '1776858151081.webp',
  location: '1776858151449.webp',
};

const OFFER = [
  { label: 'gry i zabawy terenowe', accent: 'green', icon: 'tree' },
  { label: 'wycieczki', accent: 'pink', icon: 'bus' },
  { label: 'zajęcia sportowe', accent: 'yellow', icon: 'ball' },
  { label: 'zajęcia artystyczne', accent: 'sky', icon: 'palette' },
];

const DAY_STEPS = [
  { title: 'Poranek', desc: 'Powitanie, gry integracyjne i rozgrzewka.', icon: 'sun', accent: 'yellow' },
  { title: 'Aktywność', desc: 'Zajęcia sportowe i ruch na świeżym powietrzu.', icon: 'ball', accent: 'green' },
  { title: 'Kreatywność', desc: 'Warsztaty artystyczne pełne pomysłów.', icon: 'palette', accent: 'pink' },
  { title: 'Integracja', desc: 'Wspólne zabawy i dobra atmosfera w grupie.', icon: 'group', accent: 'sky' },
];

const TURNS = [
  { range: '06.07 – 10.07', accent: 'green' },
  { range: '13.07 – 17.07', accent: 'pink' },
  { range: '20.07 – 24.07', accent: 'yellow' },
  { range: '27.07 – 31.07', accent: 'green' },
  { range: '03.08 – 07.08', accent: 'pink' },
  { range: '17.08 – 21.08', accent: 'yellow' },
  { range: '24.08 – 28.08', accent: 'green' },
];

const ACCENTS = {
  green: { bg: 'rgba(141,182,65,.16)', border: 'rgba(141,182,65,.35)', color: '#5a7f2e', card: 'rgba(232,242,218,.85)' },
  pink:  { bg: 'rgba(232,93,140,.12)', border: 'rgba(232,93,140,.28)', color: '#c73d7a', card: 'rgba(255,238,245,.9)' },
  yellow:{ bg: 'rgba(240,193,75,.18)', border: 'rgba(240,193,75,.38)', color: '#9a7200', card: 'rgba(255,251,230,.92)' },
  sky:   { bg: 'rgba(58,163,217,.13)', border: 'rgba(58,163,217,.28)', color: '#2a8cc8', card: 'rgba(224,242,251,.88)' },
};

const ICONS = {
  tree: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l4 6H8l4-6zM7 11h10l-2 10H9L7 11z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  bus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="6" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 11h16M7 17h2M15 17h2M6 6l1-3h10l1 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  ball: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.5" opacity=".5"/></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3c-4.4 0-8 3.1-8 7.2 0 2.2 1.2 4.2 3.1 5.4.8.5 1.3 1.4 1.3 2.4 0 1.7 1.3 3 3 3h.6c3.3 0 6-2.7 6-6 0-.6.1-1.2.3-1.7C19.4 11.8 20 10.1 20 8.2 20 5.2 16.4 3 12 3z" stroke="currentColor" stroke-width="1.8"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  group: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  calendar: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  arrow: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="11" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005 5L15.5 12l4 1.5v3A2 2 0 0117.7 18 14 14 0 016 6.3 2 2 0 016.5 4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3 8l9 6 9-6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.6-9-9.5C1.5 6.8 4.5 4 7.8 4c1.8 0 3.4.9 4.2 2.2C12.8 4.9 14.4 4 16.2 4 19.5 4 22.5 6.8 21 10.5 19 15.4 12 20 12 20z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
};

function offerCard(item) {
  const ac = ACCENTS[item.accent];
  return `
    <li class="pkOfferCard pkOfferCard--${item.accent}">
      <div class="pkOfferCard__icon" style="background:${ac.bg};color:${ac.color}">
        ${ICONS[item.icon]}
      </div>
      <span class="pkOfferCard__label">${item.label}</span>
    </li>`;
}

function dayCard(step) {
  const ac = ACCENTS[step.accent];
  return `
    <article class="pkDayCard">
      <div class="pkDayCard__icon" style="background:${ac.bg};color:${ac.color}">
        ${ICONS[step.icon]}
      </div>
      <h3 class="pkDayCard__title">${step.title}</h3>
      <p class="pkDayCard__desc">${step.desc}</p>
    </article>`;
}

function awaitsItem(item) {
  const ac = ACCENTS[item.accent];
  return `
    <li class="pkAwaits__item">
      <span class="pkAwaits__icon" style="background:${ac.bg};color:${ac.color}">
        ${ICONS[item.icon]}
      </span>
      <span class="pkAwaits__label">${item.label}</span>
    </li>`;
}

function turnCard(t) {
  const ac = ACCENTS[t.accent];
  return `
    <li class="pkTurnCard" style="background:${ac.card};border-color:${ac.border}">
      <span class="pkTurnCard__icon" style="background:${ac.bg};color:${ac.color}">${ICONS.calendar}</span>
      <span class="pkTurnCard__range">${t.range}</span>
    </li>`;
}

export function renderPolkolonie() {
  const offerHtml = OFFER.map(offerCard).join('');
  const dayHtml = DAY_STEPS.map(dayCard).join('');
  const turnsHtml = TURNS.map(turnCard).join('');
  const awaitsHtml = OFFER.map(awaitsItem).join('');

  return elFromHTML(`
    <div class="pkPage">

      <section class="pkHero" aria-label="Półkolonie Letnie 2026">
        <div class="container pkHero__grid">
          <div class="pkHero__text" data-reveal="left">
            <nav class="pkBreadcrumb" aria-label="Ścieżka nawigacji">
              <a class="pkBreadcrumb__link" href="." data-link>Strona główna</a>
              <span class="pkBreadcrumb__sep" aria-hidden="true">›</span>
              <span class="pkBreadcrumb__current">Półkolonie</span>
            </nav>
            <h1 class="pkHero__title">
              Mistrzowie<br>
              <span class="pkHero__titleAccent">Formy i Wyobraźni</span>
              <span class="pkHero__spark" aria-hidden="true">☀️</span>
            </h1>
            <p class="pkHero__subtitle">Półkolonie Letnie 2026</p>
            <p class="pkHero__lead">
              Zapraszamy dzieci w wieku 6–12 lat na wyjątkowe, sportowo-artystyczne
              półkolonie organizowane przez Kolorowe Rączki – Centrum Rozwoju Twojego Dziecka.
            </p>
            <p class="pkHero__sub">
              To idealna propozycja na aktywne, kreatywne i pełne radości wakacje! Każdy
              turnus to bogaty program zajęć, który rozwija zarówno sprawność fizyczną,
              jak i wyobraźnię dzieci.
            </p>
            <div class="pkHero__actions">
              <a class="btn btnPrimary pkHero__btn" href="tel:+48788047214">
                Zapisz dziecko ${ICONS.arrow}
              </a>
              <a class="btn btnOutlineDark pkHero__btn" href="#terminy">
                ${ICONS.calendar} Zobacz terminy
              </a>
            </div>
          </div>
          <div class="pkHero__media" data-reveal="right">
            <div class="pkHero__imgWrap">
              <img
                class="pkHero__img"
                src="${img(PHOTOS.hero)}"
                alt="Dzieci podczas letnich półkolonii"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section pkOffer" aria-labelledby="pk-offer-title">
        <div class="container pkOffer__grid">
          <div class="pkOffer__photo" data-reveal="left">
            <img src="${img(PHOTOS.offer)}" alt="" loading="lazy" decoding="async" />
          </div>
          <div class="pkOffer__content" data-reveal="right">
            <h2 class="pkSectionTitle" id="pk-offer-title">
              Co oferujemy?
              <span class="pkSectionSpark" aria-hidden="true">✨</span>
            </h2>
            <p class="pkSectionLead">Program pełen wrażeń, w tym:</p>
            <ul class="pkOfferGrid" role="list">
              ${offerHtml}
            </ul>
          </div>
        </div>
      </section>

      <section class="pkDay" aria-labelledby="pk-day-title">
        <img class="pkDay__bg" src="${img(PHOTOS.dayBg)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div class="pkDay__overlay" aria-hidden="true"></div>
        <div class="container pkDay__inner">
          <h2 class="pkDay__title" id="pk-day-title" data-reveal>
            Dzień pełen <span class="pkDay__titleAccent">przygód</span>
          </h2>
          <div class="pkDay__cards">
            ${dayHtml}
          </div>
        </div>
      </section>

      <section class="section pkAwaits" aria-labelledby="pk-awaits-title">
        <div class="container">
          <h2 class="pkSectionTitle pkSectionTitle--center" id="pk-awaits-title" data-reveal>
            Co czeka na uczestników?
            <span class="pkSectionSpark" aria-hidden="true">✨</span>
          </h2>
          <ul class="pkAwaits__list" role="list">
            ${awaitsHtml}
          </ul>
        </div>
      </section>

      <section class="section pkTurns" id="terminy" aria-labelledby="pk-turns-title">
        <div class="container">
          <h2 class="pkSectionTitle pkSectionTitle--center" id="pk-turns-title" data-reveal>
            Terminy <span class="pkTurns__accent">turnusów</span>
            <span class="pkSectionSpark" aria-hidden="true">📅</span>
          </h2>
          <ul class="pkTurns__grid" role="list">
            ${turnsHtml}
          </ul>
        </div>
      </section>

      <section class="pkQuote" aria-label="O półkoloniach">
        <img class="pkQuote__bg" src="${img(PHOTOS.quote)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div class="pkQuote__overlay" aria-hidden="true"></div>
        <div class="container pkQuote__inner">
          <blockquote class="pkQuote__box" data-reveal>
            <span class="pkQuote__heart" aria-hidden="true">${ICONS.heart}</span>
            <p class="pkQuote__text">
              Każdy turnus to bogaty program zajęć, który rozwija zarówno
              <strong>sprawność fizyczną</strong>, jak i <strong>wyobraźnię</strong> dzieci.
            </p>
          </blockquote>
        </div>
      </section>

      <section class="section pkContact" aria-labelledby="pk-contact-title">
        <div class="container">
          <div class="pkContact__panel" data-reveal>
            <div class="pkContact__body">
              <div class="pkContact__content">
                <h2 class="pkContact__panelTitle" id="pk-contact-title">Lokalizacja i kontakt</h2>
                <div class="pkContact__details">
                  <div class="pkContact__row">
                    <span class="pkContact__icon pkContact__icon--green">${ICONS.pin}</span>
                    <div>
                      <strong>Lokalizacja:</strong><br>
                      Wrocław, ul. Nenckiego 127/5
                    </div>
                  </div>
                  <div class="pkContact__row">
                    <span class="pkContact__icon pkContact__icon--green">${ICONS.phone}</span>
                    <div>
                      <strong>Zapisy i kontakt:</strong><br>
                      Telefon: <a href="tel:+48788047214">788 047 214</a><br>
                      E-mail: <a href="mailto:biuro.kolorowecentrum@gmail.com">biuro.kolorowecentrum@gmail.com</a>
                    </div>
                  </div>
                </div>
                <div class="pkContact__cta">
                  <p class="pkContact__ctaKicker">Liczba miejsc ograniczona!</p>
                  <p class="pkContact__ctaText">
                    Zadbaj o niezapomniane wakacje swojego dziecka – liczba miejsc jest ograniczona!
                  </p>
                  <a class="btn btnPrimary pkContact__btn" href="tel:+48788047214">
                    Zapisz dziecko już dziś!
                  </a>
                  <p class="pkContact__ctaFoot">Do zobaczenia na półkoloniach! <span aria-hidden="true">⭐</span></p>
                </div>
              </div>
              <div class="pkContact__photo">
                <img src="${img(PHOTOS.location)}" alt="Kolorowe Rączki — lokalizacja" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `);
}
