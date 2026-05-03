import { elFromHTML } from './_helpers.js';
import { resolveAppUrl } from '../js/basePath.js';

const BASE = 'content-site/dzienny-opiekun/podstrona/';

const PHOTOS = {
  hero:    BASE + 'IMG_20251014_132654.jpg',
  feat1:   BASE + 'IMG_20251014_132754.jpg',
  feat2:   BASE + 'IMG_20251021_162358.jpg',
  feat3:   BASE + 'IMG_20251021_164446.jpg',
  feat4:   BASE + 'IMG_20251107_095435.jpg',
  feat5:   BASE + 'IMG_20251113_105337.jpg',
  feat6:   BASE + 'IMG_20251113_105348.jpg',
  sub1:    BASE + 'IMG_20251125_094725.jpg',
  sub2:    BASE + 'IMG_20251127_083126.jpg',
  sub3:    BASE + 'IMG_20251118_085211.jpg',
  sub4:    BASE + 'IMG_20251118_085318.jpg',
  bot1:    BASE + 'IMG_20251113_160207.jpg',
  bot2:    BASE + 'IMG_20251113_160302.jpg',
  bot3:    BASE + 'IMG_20251117_105523.jpg',
};

function p(key) {
  return resolveAppUrl(PHOTOS[key]);
}

// ─── SVG ikony ──────────────────────────────────────────────────────────────

const iconGroup = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05C16.17 14.09 17 15.15 17 16.5V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>`;

const iconHands = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>`;

const iconHeart = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
  </svg>`;

const iconHome = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>`;

const iconStar = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>`;

const iconHandshake = (cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11 6H9L7 4H3L1 6v4l2 2h2v5l2 2h2l2-2 4 1 4-2v-2h1l2-2V8l-2-2h-2l-2 2h-2l-2-2zm0 2l2 2h2l2-2h1l1 1v2l-1 1h-2v3l-3 1-5-1v-6H7L6 9V7h1l2 2zm-4 0H6v2h1V8z"/>
  </svg>`;

const FEATURES = [
  {
    icon: (c) => iconGroup(c),
    color: 'green',
    title: 'Mała, kameralna grupa',
    photo: 'feat1',
    text: 'W przeciwieństwie do dużych placówek, opiekun dzienny pracuje z niewielką liczbą dzieci. Dzięki temu Twój maluch nie jest „jednym z wielu" – każde dziecko otrzymuje maksimum uwagi, bliskości i indywidualnego wsparcia, którego tak bardzo potrzebuje na tym etapie.',
  },
  {
    icon: (c) => iconHands(c),
    color: 'coral',
    title: 'Adaptacja z rodzicem – bez stresu i pośpiechu',
    photo: 'feat2',
    text: 'Wiemy, jak trudne bywają rozstania. Dlatego proces adaptacji prowadzimy wspólnie z Tobą. Wierzymy, że obecność rodzica w pierwszych dniach daje dziecku niezbędny „bezpieczny port", z którego powoli i odważnie może zacząć eksplorować nowe otoczenie.',
  },
  {
    icon: (c) => iconHeart(c),
    color: 'sky',
    title: 'Bliskość to nasz fundament',
    photo: 'feat3',
    text: 'W naszej opiece stawiamy na relację. Przytulenie, wspólne czytanie książeczek i reagowanie na emocje dziecka są dla nas równie ważne, co zajęcia edukacyjne. Budujemy poczucie bezpieczeństwa, które jest kluczem do zdrowego rozwoju.',
  },
  {
    icon: (c) => iconHome(c),
    color: 'sky',
    title: 'Domowa atmosfera i spokój',
    photo: 'feat4',
    text: 'To idealne rozwiązanie dla maluszków, które źle znoszą nadmiar bodźców. Mniej hałasu i stały rytm dnia sprawiają, że dzieci czują się u nas jak w domu.',
  },
  {
    icon: (c) => iconStar(c),
    color: 'yellow',
    title: 'Indywidualne podejście do rozwoju',
    photo: 'feat5',
    text: 'W małej grupie mamy czas, by podążać za dzieckiem. Rozwój emocjonalny, społeczny i motoryczny odbywa się w naturalnym tempie, dopasowanym do możliwości Twojego malucha – bez presji i pośpiechu.',
  },
  {
    icon: (c) => iconHandshake(c),
    color: 'coral',
    title: 'Partnerstwo z rodzicami',
    photo: 'feat6',
    text: 'Wierzymy w bliską współpracę. Codzienny kontakt, wymiana spostrzeżeń i wzajemne zaufanie sprawiają, że masz realny wpływ na to, jak wygląda dzień Twojej pociechy. Jesteśmy zespołem, który gra do jednej bramki – dla dobra Twojego dziecka.',
  },
];

const COLOR_MAP = {
  green:  { bg: 'rgba(141,182,65,.13)',  color: '#3a6b1a' },
  coral:  { bg: 'rgba(232,93,77,.12)',   color: '#b5342a' },
  sky:    { bg: 'rgba(58,163,217,.12)',  color: '#1a6e9e' },
  yellow: { bg: 'rgba(240,193,75,.15)',  color: '#856500' },
};

function featureCard(f) {
  const cm = COLOR_MAP[f.color];
  return `
    <article class="doCard" data-reveal>
      <div class="doCard__body">
        <div class="doCard__top">
          <div class="doCard__iconWrap" style="background:${cm.bg};color:${cm.color}">
            ${f.icon('doCard__icon')}
          </div>
          <h3 class="doCard__title">${f.title}</h3>
        </div>
        <p class="doCard__text">${f.text}</p>
      </div>
      <div class="doCard__imgWrap">
        <img class="doCard__img" src="${p(f.photo)}" alt="" loading="lazy" />
      </div>
    </article>`;
}

const iconCheck = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;

export function renderDziennyOpiekun() {
  const featureCards = FEATURES.map(featureCard).join('');

  return elFromHTML(`
    <div class="doPage">

      <!-- ══ HERO ══ -->
      <section class="doHero" aria-label="Dzienny Opiekun – wprowadzenie">
        <img class="doHero__bgImg" src="${p('bot2')}" alt="" aria-hidden="true" loading="eager" />
        <div class="doHero__overlay" aria-hidden="true"></div>
        <div class="container doHero__container">
          <nav class="doBreadcrumb" aria-label="Ścieżka nawigacji" data-reveal="down">
            <a class="doBreadcrumb__link" href="." data-link>Strona główna</a>
            <span class="doBreadcrumb__sep" aria-hidden="true">›</span>
            <span class="doBreadcrumb__current">Dzienny Opiekun</span>
          </nav>
          <div class="doHero__glass" data-reveal="up">
            <div class="doHero__glassInner">
              <h1 class="doHero__title">
                Dzienny <span class="doHero__titleAccent">Opiekun</span>
              </h1>
              <p class="doHero__lead">
                Dlaczego opiekun dzienny to <strong>najlepszy start</strong> dla Twojego dziecka?
              </p>
              <p class="doHero__sub">
                Wybór pierwszej opieki to jedna z najważniejszych decyzji dla rodzica.
                W naszej kameralnej placówce łączymy profesjonalizm z domowym ciepłem,
                tworząc most między bezpiecznymi ramionami mamy&nbsp;i&nbsp;taty a wielkim światem.
              </p>
            </div>
            <div class="doHero__glassAccent" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      <!-- ══ CO NAS WYRÓŻNIA ══ -->
      <section class="section doFeatures">
        <div class="container">
          <div class="sectionHeader" data-reveal="left">
            <div>
              <h2 class="sectionTitle">Co nas wyróżnia?</h2>
            </div>
          </div>
          <div class="doFeaturesGrid">
            ${featureCards}
          </div>
        </div>
      </section>

      <!-- ══ DOFINANSOWANIE ══ -->
      <section class="doSubsidy" aria-label="Dofinansowanie Aktywnie w żłobku">
        <img class="doSubsidy__bgImg" src="${p('bot1')}" alt="" aria-hidden="true" loading="lazy" />
        <div class="doSubsidy__overlay" aria-hidden="true"></div>
        <div class="container doSubsidy__container">
          <div class="doSubsidy__inner">
            <div class="doSubsidy__content" data-reveal="left">
              <div class="doSubsidy__kicker">Program rządowy</div>
              <h2 class="doSubsidy__title">Skorzystaj z dofinansowania<br>„Aktywnie w żłobku"</h2>
              <p class="doSubsidy__lead">
                Profesjonalna i kameralna opieka jest teraz bardziej dostępna niż kiedykolwiek.
                Nasza placówka uczestniczy w programie rządowym, który realnie obniża koszty
                ponoszone przez rodziców.
              </p>
              <ul class="doSubsidy__list">
                <li class="doSubsidy__item">
                  <span class="doSubsidy__checkIcon">${iconCheck}</span>
                  <div>
                    <strong>1500 zł miesięcznie</strong> – taką kwotę dofinansowania możesz
                    otrzymać na opiekę u opiekuna dziennego.
                  </div>
                </li>
                <li class="doSubsidy__item">
                  <span class="doSubsidy__checkIcon">${iconCheck}</span>
                  <div>
                    <strong>Dostępność</strong> – program obejmuje również nasze usługi, dzięki
                    czemu płacisz znacznie mniej za najwyższą jakość opieki.
                  </div>
                </li>
                <li class="doSubsidy__item">
                  <span class="doSubsidy__checkIcon">${iconCheck}</span>
                  <div>
                    <strong>Proste formalności</strong> – pomagamy przejść przez proces uzyskania
                    wsparcia.
                  </div>
                </li>
              </ul>
              <p class="doSubsidy__cta">
                Zapewnij swojemu dziecku opiekę pełną miłości i uwagi, na jaką zasługuje.<br>
                <strong>Zapraszamy do kontaktu i odwiedzin!</strong>
              </p>
            </div>
            <div class="doSubsidy__gallery" data-reveal="right">
              <img class="doSubsidy__galleryImg" src="${p('sub1')}" alt="" loading="lazy" />
              <img class="doSubsidy__galleryImg" src="${p('sub2')}" alt="" loading="lazy" />
              <img class="doSubsidy__galleryImg" src="${p('sub3')}" alt="" loading="lazy" />
              <img class="doSubsidy__galleryImg" src="${p('sub4')}" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- ══ OPIS + CENNIK ══ -->
      <section class="section doBottom">
        <div class="container">
          <div class="doBottom__grid">

            <!-- Opis -->
            <div class="doBottom__desc" data-reveal="left">
              <h2 class="doBottom__title">Dzienny Opiekun<br>„Kolorowe Rączki"</h2>
              <div class="doBottom__textBlock">
                <p>W „Kolorowych Rączkach" oferujemy kameralną opiekę dzienną dla najmłodszych
                dzieci w grupach do 5 osób, co pozwala nam zapewnić pełne bezpieczeństwo,
                indywidualne podejście i bliską relację z każdym dzieckiem.</p>
                <p>Naszą siłą jest wykwalifikowana kadra – pracujemy z dziećmi w oparciu o
                różnorodne metody rozwojowe, prowadząc zajęcia sensoryczne, rytmiczne, muzyczne
                oraz wspierające rozwój mowy.</p>
                <p>Stawiamy na rodzicielstwo bliskości, łagodną – dwustronną adaptację (zarówno
                dziecka, jak i rodzica) oraz domową, ciepłą atmosferę. Każdego dnia dbamy o
                kontakt z naturą poprzez spacery i aktywność na świeżym powietrzu.</p>
                <p>Korzystamy również z dofinansowania „Aktywnie w żłobku", dzięki czemu nasza
                opieka jest jeszcze bardziej dostępna dla rodziców. Tworzymy miejsce, w którym
                dziecko czuje się bezpieczne, ważne i swobodnie się rozwija.</p>
              </div>
              <div class="doBottom__photos">
                <img class="doBottom__photo" src="${p('bot1')}" alt="" loading="lazy" />
                <img class="doBottom__photo" src="${p('bot2')}" alt="" loading="lazy" />
                <img class="doBottom__photo" src="${p('bot3')}" alt="" loading="lazy" />
              </div>
            </div>

            <!-- Cennik -->
            <div class="doBottom__pricing" data-reveal="right">
              <h2 class="doBottom__title">Cennik – Dzienny Opiekun<br>„Kolorowe Rączki"</h2>
              <div class="doPricing">
                <div class="doPricing__row">
                  <span class="doPricing__label">Czesne miesięczne</span>
                  <span class="doPricing__value">2200 zł</span>
                </div>
                <div class="doPricing__row doPricing__row--discount">
                  <span class="doPricing__label">Dofinansowanie „Aktywnie w żłobku"</span>
                  <span class="doPricing__value doPricing__value--discount">–1500 zł</span>
                </div>
                <div class="doPricing__row doPricing__row--highlight">
                  <span class="doPricing__label">Realny koszt dla rodzica</span>
                  <span class="doPricing__value doPricing__value--highlight">700 zł / miesiąc</span>
                </div>
                <div class="doPricing__row">
                  <span class="doPricing__label">Wyżywienie</span>
                  <span class="doPricing__value">14 zł / dzień</span>
                </div>
                <div class="doPricing__row">
                  <span class="doPricing__label">Wpisowe (jednorazowe)</span>
                  <span class="doPricing__value">500 zł</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  `);
}
