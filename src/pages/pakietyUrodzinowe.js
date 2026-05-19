import { elFromHTML } from './_helpers.js';
import { resolveAppUrl } from '../js/basePath.js';

const BASE = 'content-site/pakiety-urodzinowe/podstrona/';
const HERO_IMG = 'IMG_20250531_161513.webp';
const CTA_BG_IMG = 'IMG_20250520_183617_512.webp';

function img(name) {
  return resolveAppUrl(BASE + name);
}

const ICONS = {
  hand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 11V7.5a1.5 1.5 0 113 0V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M11 11V6a1.5 1.5 0 113 0v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M14 11V7.5a1.5 1.5 0 113 0V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M5 11v-1a2 2 0 012-2h1v8.5a3.5 3.5 0 007 0V11h1a2 2 0 012 2v4a5 5 0 01-5 5H9a4 4 0 01-4-4v-7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18a2 2 0 100-4 2 2 0 000 4zM17 16a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/><path d="M11 16V5l8-2v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.4 4.3L18 8.8l-3.5 2.5 1.3 4.3L12 13.8l-3.8 2.8 1.3-4.3L6 8.8l4.6-1.5L12 3z" fill="currentColor" opacity=".85"/><path d="M19 2v3M20.5 3.5H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 3h4v5l5.5 9.5a2 2 0 01-1.7 3H6.2a2 2 0 01-1.7-3L10 8V3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3c-4.4 0-8 3.1-8 7.2 0 2.2 1.2 4.2 3.1 5.4.8.5 1.3 1.4 1.3 2.4 0 1.7 1.3 3 3 3h.6c3.3 0 6-2.7 6-6 0-.6.1-1.2.3-1.7C19.4 11.8 20 10.1 20 8.2 20 5.2 16.4 3 12 3z" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="9.5" r="1.2" fill="currentColor"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="9.5" r="1.2" fill="currentColor"/></svg>`,
  hero: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4l2.2 4.5 5 .7-3.6 3.5.9 5.2L12 15.8l-4.5 2.1.9-5.2L4.8 9.2l5-.7L12 4z" fill="currentColor" opacity=".25"/><path d="M7 19h10l-1 3H8l-1-3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  chef: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10c0-2.8 2.7-5 6-5s6 2.2 6 5" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16v2a8 8 0 01-16 0v-2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 18v3h8v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 20c8-1 12-6 12-14 0 0-6 1-10 5S6 20 6 20z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 20c2-4 5-7 9-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  recycle: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l3-5 3 5M10 2v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 9l4 1-2 4.5M21 10h-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 17l-4-1 2-4.5M3 16h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22a7 7 0 007-7h-3.5a3.5 3.5 0 00-3.5 3.5V22z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  circus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 20l2-10 4 4 4-4 2 10" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="2" r="1" fill="currentColor"/></svg>`,
  pirate: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 14c0-4 3.5-7 7-7s7 3 7 7" stroke="currentColor" stroke-width="1.8"/><path d="M4 14h16l-1 4H5l-1-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="15" cy="13" r="1" fill="currentColor"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  group: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M14.5 19c.3-2.2 1.8-3.5 4-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  decor: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.8 5.5H19l-4.5 3.3 1.7 5.5L12 16.8 7.8 17.3l1.7-5.5L5 8.5h5.2L12 3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.4 5.8 6.3.5-4.8 4 1.8 6.1L12 16.8 6.3 19.4l1.8-6.1-4.8-4 6.3-.5L12 3z" fill="currentColor"/></svg>`,
  dance: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="5" r="2.2" fill="currentColor"/><path d="M12 7.5v5l-3 4M12 12.5l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 21l4-3 4 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  cake: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 13h12v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6z" stroke="currentColor" stroke-width="1.8"/><path d="M6 13c0-2.8 2.7-4 6-4s6 1.2 6 4" stroke="currentColor" stroke-width="1.8"/><path d="M10 9V7M14 9V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h4l1.5-2h5L16 8h4v10H4V8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3" stroke="currentColor" stroke-width="1.8"/></svg>`,
  calendar: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};

const ACCENTS = {
  purple: { bg: 'rgba(147,112,219,.14)', color: '#7b52b8' },
  pink:   { bg: 'rgba(232,93,140,.13)', color: '#c73d7a' },
  sky:    { bg: 'rgba(58,163,217,.13)', color: '#2a8cc8' },
  green:  { bg: 'rgba(141,182,65,.14)', color: '#5a7f2e' },
  yellow: { bg: 'rgba(240,193,75,.16)', color: '#9a7200' },
  coral:  { bg: 'rgba(232,93,77,.13)', color: '#c73d4a' },
  orange: { bg: 'rgba(255,152,60,.14)', color: '#c96a12' },
  blue:   { bg: 'rgba(58,120,217,.13)', color: '#2a5fc8' },
};

const PACKAGES = [
  {
    title: 'Sensoplastyka (1–3 lata)',
    desc: 'Zabawa kolorowymi masami i fakturami, rozwijanie zmysłów, motoryki i kreatywności maluchów.',
    accent: 'purple',
    icon: 'hand',
    img: 'IMG_20250520_183519_090.webp',
  },
  {
    title: 'Muzyczne (1–3 lata)',
    desc: 'Rytm, śpiew i instrumenty w radosnej zabawie — dzieci uczą się wyrażać emocje ruchem i dźwiękiem.',
    accent: 'pink',
    icon: 'music',
    img: 'IMG_20250520_183556_541.webp',
  },
  {
    title: 'Magic Masa (od 5 lat)',
    desc: 'Tworzenie magicznej masy i kreatywne zadania sensoryczne z efektami „wow”, które zachwycą małych odkrywców.',
    accent: 'sky',
    icon: 'sparkle',
    img: 'IMG_20250520_183607_591.webp',
  },
  {
    title: 'Eksperymenty (od 5 lat)',
    desc: 'Kolorowe reakcje, mini doświadczenia i fascynujące eksperymenty, które pokazują, jak działa świat w praktyce.',
    accent: 'green',
    icon: 'flask',
    img: 'DSC01604.webp',
  },
  {
    title: 'Artystyczne (od 5 lat)',
    desc: 'Malowanie, rysowanie i tworzenie własnych dzieł sztuki, rozwijanie wyobraźni i technik twórczych.',
    accent: 'yellow',
    icon: 'palette',
    img: 'IMG_20250520_183611_109.webp',
    surcharge: true,
  },
  {
    title: 'Superbohater (od 5 lat)',
    desc: 'Tworzenie masek i peleryn oraz udział w zadaniach pełnych przygód i wyzwań — idealne dla małych bohaterów.',
    accent: 'coral',
    icon: 'hero',
    img: 'DSC05938.webp',
  },
  {
    title: 'Kucharski (od 5 lat)',
    desc: 'Tworzenie własnych dzieł kulinarnych, dekorowanie i smakowanie smakołyków, nauka precyzji i współpracy.',
    accent: 'orange',
    icon: 'chef',
    img: 'IMG_20250531_145806.webp',
    surcharge: true,
  },
  {
    title: 'Ogrodniczy (od 5 lat)',
    desc: 'Sadzenie roślin, dekorowanie i zabawy w naturze, rozwijanie wrażliwości przyrodniczej.',
    accent: 'green',
    icon: 'leaf',
    img: 'DSC05927.webp',
    surcharge: true,
  },
  {
    title: 'Ekologiczny (od 5 lat)',
    desc: 'Zabawy z recyklingiem i proekologiczne zadania — dzieci uczą się odpowiedzialności i kreatywnego wykorzystania materiałów.',
    accent: 'green',
    icon: 'recycle',
    img: 'IMG_7643.webp',
    surcharge: true,
  },
  {
    title: 'Detektywistyczny (od 5 lat)',
    desc: 'Rozwiązywanie zagadek, szyfrów i poszukiwanie skarbów w drużynie małych detektywów.',
    accent: 'purple',
    icon: 'search',
    img: 'DSC00002.webp',
  },
  {
    title: 'Cyrkowe (od 4 lat)',
    desc: 'Żonglowanie, balans, mini występy i zabawy ruchowe, które rozwijają koordynację i pewność siebie.',
    accent: 'orange',
    icon: 'circus',
    img: 'IMG_20250520_183636_952.webp',
    surcharge: true,
  },
  {
    title: 'Piraci (od 4 lat)',
    desc: 'Gry ruchowe, przygody na „statku” i poszukiwanie skarbów — nauka współpracy i kreatywności.',
    accent: 'blue',
    icon: 'pirate',
    img: 'DSC05941.webp',
  },
];

const INCLUDED = [
  { label: 'Warsztaty i kreatywne zajęcia', icon: 'star', accent: 'yellow' },
  { label: 'Konkursy i zabawy', icon: 'star', accent: 'sky' },
  { label: 'Tańce z animatorem', icon: 'dance', accent: 'green' },
  { label: 'Poczęstunek (przygotowany przez rodziców)', icon: 'cake', accent: 'pink' },
  { label: 'Foto strefa', icon: 'camera', accent: 'purple' },
];

function buildPackageCard(pkg) {
  const ac = ACCENTS[pkg.accent];
  const surcharge = pkg.surcharge
    ? '<span class="puCard__pill">dopłata +100 zł</span>'
    : '';
  return `
    <article class="puCard" data-reveal>
      <div class="puCard__body">
        <div class="puCard__iconWrap" style="background:${ac.bg};color:${ac.color}">
          ${ICONS[pkg.icon]}
        </div>
        <h3 class="puCard__title">${pkg.title}</h3>
        <p class="puCard__desc">${pkg.desc}</p>
        ${surcharge}
      </div>
      <div class="puCard__imgWrap">
        <img
          class="puCard__img"
          src="${img(pkg.img)}"
          alt="${pkg.title}"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>`;
}

function buildIncludedItem(item) {
  const ac = ACCENTS[item.accent];
  return `
    <li class="puIncluded__item">
      <div class="puIncluded__icon" style="background:${ac.bg};color:${ac.color}">
        ${ICONS[item.icon]}
      </div>
      <span class="puIncluded__label">${item.label}</span>
    </li>`;
}

export function renderPakietyUrodzinowe() {
  const cards = PACKAGES.map(buildPackageCard).join('');
  const included = INCLUDED.map(buildIncludedItem).join('');

  return elFromHTML(`
    <div class="puPage">

      <section class="section puHero" aria-label="Pakiety urodzinowe">
        <div class="container">
          <nav class="puBreadcrumb" aria-label="Ścieżka nawigacji" data-reveal="down">
            <a class="puBreadcrumb__link" href="." data-link>Strona główna</a>
            <span class="puBreadcrumb__sep" aria-hidden="true">›</span>
            <span class="puBreadcrumb__current">Pakiety urodzinowe</span>
          </nav>

          <div class="puHero__grid">
            <div class="puHero__text" data-reveal="left">
              <h1 class="puHero__title">
                Pakiety<br>
                <span class="puHero__titleAccent">urodzinowe</span>
                <span class="puHero__spark" aria-hidden="true">✨</span>
              </h1>
              <p class="puHero__kicker">Urodziny w Kolorowych Rączkach – pakiety tematyczne</p>
              <p class="puHero__lead">Wybierz temat, który sprawi, że ten dzień będzie wyjątkowy!</p>
              <p class="puHero__sub">Kreatywne warsztaty, mnóstwo zabawy i niezapomniane wspomnienia!</p>
            </div>

            <div class="puHero__imgWrap" data-reveal="right">
              <img
                class="puHero__img"
                src="${img(HERO_IMG)}"
                alt="Urodziny w Kolorowych Rączkach – dekoracje i balony"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section puPackages" aria-label="Pakiety tematyczne">
        <div class="container">
          <div class="puGrid">
            ${cards}
          </div>
        </div>
      </section>

      <section class="puIncluded" aria-labelledby="pu-included-title">
        <img
          class="puIncluded__bg"
          src="${img('DSC05944.webp')}"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div class="puIncluded__overlay" aria-hidden="true"></div>
        <div class="container puIncluded__inner">
          <h2 class="puIncluded__title" id="pu-included-title" data-reveal>
            W każdym pakiecie zapewniamy:
            <span class="puIncluded__spark" aria-hidden="true">✨</span>
          </h2>
          <ul class="puIncluded__list" role="list">
            ${included}
          </ul>
        </div>
      </section>

      <section class="section puDetails" aria-labelledby="pu-details-title">
        <div class="container puDetails__grid">
          <div class="puDetails__photo" data-reveal="left">
            <img
              src="${img('IMG_20251010_220026.webp')}"
              alt="Dzieci przy urodzinowym stole"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="puDetails__content" data-reveal="right">
            <div class="puDetails__panel">
              <h2 class="puDetails__title" id="pu-details-title">
                Szczegóły organizacyjne
                <span class="puDetails__spark" aria-hidden="true">✨</span>
              </h2>
              <ul class="puDetails__list" role="list">
                <li class="puDetails__item">
                  <span class="puDetails__icon puDetails__icon--green">${ICONS.clock}</span>
                  <div class="puDetails__itemText">
                    <strong>Czas trwania:</strong> 2h – 850 zł | 2,5h – 950 zł
                  </div>
                </li>
                <li class="puDetails__item">
                  <span class="puDetails__icon puDetails__icon--sky">${ICONS.group}</span>
                  <div class="puDetails__itemText">
                    <strong>Maks. 12 dzieci</strong> (każde dodatkowe płatne)
                  </div>
                </li>
                <li class="puDetails__item">
                  <span class="puDetails__icon puDetails__icon--yellow">${ICONS.decor}</span>
                  <div class="puDetails__itemText">
                    <strong>Temat dekoracji i foto strefy wybierają rodzice</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="puCta" aria-label="Rezerwacja urodzin">
        <img
          class="puCta__bg"
          src="${img(CTA_BG_IMG)}"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div class="puCta__overlay" aria-hidden="true"></div>
        <div class="container puCta__grid">
          <div class="puCta__text" data-reveal="left">
            <h2 class="puCta__title">Zarezerwuj niezapomniane urodziny już dziś!</h2>
            <p class="puCta__lead">
              Podaruj swojemu dziecku dzień pełen radości, kolorów i wyjątkowych chwil!
            </p>
            <a href="rezerwacje" data-link class="btn btnPrimary puCta__btn">
              ${ICONS.calendar}
              Zarezerwuj termin
            </a>
          </div>
          <div class="puCta__imgWrap" data-reveal="right">
            <img
              class="puCta__img"
              src="${img('IMG-20250629-WA0019.webp')}"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

    </div>
  `);
}
