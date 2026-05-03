import { elFromHTML } from './_helpers.js';

const MEMBERS = [
  {
    id: 'nataliia',
    name: 'Nataliia Serbai',
    role: 'Założycielka Centrum Rozwoju „Kolorowe Rączki"',
    roleExtra: 'Manager Football Baby & Football Academy Żórawina',
    accent: 'green',
    paragraphs: [
      'Jestem założycielką Centrum Rozwoju Dziecka „Kolorowe Rączki" – miejsca stworzonego z myślą o wspieraniu dzieci i ich rodzin w harmonijnym, bezpiecznym i świadomym rozwoju.',
      'Pełnię również funkcję managera pięciu oddziałów Football Baby oraz Football Academy w Żórawinie, gdzie wspieram rozwój sportowy dzieci oraz budowanie ich pewności siebie poprzez ruch, zabawę i relację.',
      'Jestem mamą dwóch chłopców, co jeszcze bardziej pogłębia moje zrozumienie potrzeb dzieci i rodzin oraz codziennych wyzwań rodzicielstwa.',
      'W swojej pracy specjalizuję się we wspieraniu rodzin w świadomym rodzicielstwie, rozwoju emocjonalnym i edukacyjnym dzieci oraz w budowaniu zdrowych relacji rodzic–dziecko. Łączę podejście edukacyjne, rozwojowe i sportowe, tworząc spójny model wsparcia dla całej rodziny.',
      'W „Kolorowych Rączkach" prowadzimy również opiekę dzienną w kameralnych grupach – maksymalnie do 5 dzieci. Dzięki temu każde dziecko otrzymuje indywidualną uwagę, poczucie bezpieczeństwa oraz możliwość rozwoju w spokojnym, małym i przyjaznym środowisku.',
      'Szczególną wagę przykładam do procesu adaptacji dwustronnej – opartej na współpracy dziecka, rodzica i opiekuna. Wspieram podejście bliskościowe, które zakłada podążanie za potrzebami dziecka, budowanie bezpieczeństwa emocjonalnego oraz rozwój w jego własnym tempie.',
      'Tworzę miejsce, w którym dziecko może czuć się ważne, zauważone i bezpieczne – a rodzic ma pewność, że jego rozwój jest wspierany w najlepszy możliwy sposób.',
    ],
  },
  {
    id: 'emilia',
    name: 'Emilia Burzawa',
    role: 'Studentka terapii zajęciowej, trenerka piłki nożnej',
    roleExtra: 'Certyfikowana trenerka sensoplastyki oraz animatorka dziecięca',
    accent: 'coral',
    paragraphs: [
      'W swojej pracy łączy rozwój sensoryczny, aktywność fizyczną i twórczą ekspresję, tworząc bezpieczną, inspirującą przestrzeń dla dzieci. Stawia na indywidualne podejście, wzmacnianie pewności siebie oraz świadome wspieranie potencjału każdego dziecka.',
      'Z energią i zaangażowaniem buduje relacje, rozwijając poprzez zabawę, ruch i kreatywne działania. Specjalizuje się w integracji rodzinnej, wzmacnianiu więzi rodzic–dziecko oraz wspieraniu świadomego podejścia do rozwoju emocjonalnego, edukacyjnego i sportowego dziecka.',
      'Poprzez ruch, zabawę i kreatywne działania wspiera rozwój dzieci w sposób holistyczny i pełen uważności. Z energią i zaangażowaniem buduje relacje, tworząc atmosferę bezpieczeństwa, radości i rozwoju.',
    ],
  },
  {
    id: 'veronika',
    name: 'Veronika Sopilniak',
    role: 'Opiekun dzienny – Kolorowe Rączki',
    roleExtra: null,
    accent: 'sky',
    paragraphs: [
      'Wykształcenie wyższe pedagogiczne – nauczyciel edukacji wczesnoszkolnej oraz nauczyciel informatyki. Ukończone studia magisterskie z zakresu zarządzania w oświacie, ze specjalizacją w zarządzaniu personelem.',
      'Obecnie pełni funkcję opiekuna dziennego. Posiada kwalifikacje oraz przygotowanie do pracy z najmłodszymi dziećmi, zdobyte również poprzez ukończenie szkoły policealnej w kierunku opiekuna dziennego.',
      'Doświadczenie zawodowe obejmuje pracę w prywatnym przedszkolu, gdzie zdobyła praktyczne umiejętności w zakresie opieki, edukacji oraz wspierania rozwoju dzieci w wieku przedszkolnym.',
      'W pracy kieruje się indywidualnym podejściem do dziecka oraz współpracą z rodzicami. Wspiera proces adaptacji dziecka w sposób oparty na bezpieczeństwie, zaufaniu i relacji. Bliskie jest jej podejście oparte na świadomym i bliskościowym rodzicielstwie, które podkreśla znaczenie emocji, więzi i stabilnego rozwoju dziecka.',
    ],
  },
  {
    id: 'iwona',
    name: 'Iwona Juszczyk',
    role: 'Opiekun dzienny z ukończonym kursem opiekuna dziennego',
    roleExtra: 'Wieloletnie doświadczenie w pracy z najmłodszymi dziećmi',
    accent: 'yellow',
    paragraphs: [
      'Posiada 4-letnie doświadczenie w pracy w prywatnym żłobku, a także praktykę jako niania oraz pomoc nauczyciela w przedszkolu. Dzięki temu doskonale rozumie potrzeby dzieci w wieku żłobkowym i przedszkolnym oraz potrafi tworzyć dla nich bezpieczne, ciepłe i wspierające środowisko.',
      'Prywatnie mama dwójki dzieci, co dodatkowo wzmacnia jej empatię i intuicję w pracy z maluchami.',
      'Specjalizuje się w podejściu opartym na rodzicielstwie bliskościowym, stawiając na budowanie relacji, poczucia bezpieczeństwa oraz indywidualne podejście do każdego dziecka.',
    ],
  },
];

const ACCENTS = {
  green:  { pill: '#e8f0d8', pillText: '#3a6b1a', line: '#8db641', bg: 'rgba(141,182,65,0.06)'  },
  coral:  { pill: '#ffe8e5', pillText: '#b5342a', line: '#e85d4d', bg: 'rgba(232,93,77,0.05)'   },
  sky:    { pill: '#e0f2fb', pillText: '#1a6e9e', line: '#3aa3d9', bg: 'rgba(58,163,217,0.05)'  },
  yellow: { pill: '#fff6dd', pillText: '#856500', line: '#f0c14b', bg: 'rgba(240,193,75,0.06)'  },
};

const DECO_SHAPES = {
  green:  `<svg class="teamCard__deco" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="38" fill="none" stroke="#8db641" stroke-width="2" stroke-dasharray="6 6" opacity=".35"/></svg>`,
  coral:  `<svg class="teamCard__deco" viewBox="0 0 80 80" aria-hidden="true"><rect x="4" y="4" width="72" height="72" rx="20" fill="none" stroke="#e85d4d" stroke-width="2" stroke-dasharray="6 6" opacity=".35"/></svg>`,
  sky:    `<svg class="teamCard__deco" viewBox="0 0 80 80" aria-hidden="true"><polygon points="40,4 76,60 4,60" fill="none" stroke="#3aa3d9" stroke-width="2" stroke-dasharray="6 6" opacity=".35"/></svg>`,
  yellow: `<svg class="teamCard__deco" viewBox="0 0 80 80" aria-hidden="true"><path d="M40 6 l9 25h26l-21 15 8 25-22-16-22 16 8-25L5 31h26z" fill="none" stroke="#f0c14b" stroke-width="2" stroke-dasharray="5 5" opacity=".35"/></svg>`,
};

function buildCard(member, idx) {
  const ac = ACCENTS[member.accent];
  const deco = DECO_SHAPES[member.accent];
  const isEven = idx % 2 === 1;

  const paras = member.paragraphs
    .map((p) => `<p class="teamCard__para">${p}</p>`)
    .join('');

  const roleExtra = member.roleExtra
    ? `<div class="teamCard__roleExtra">${member.roleExtra}</div>`
    : '';

  return `
    <article class="teamCard${isEven ? ' teamCard--reverse' : ''}" data-reveal style="--ac-pill:${ac.pill};--ac-pill-text:${ac.pillText};--ac-line:${ac.line};--ac-bg:${ac.bg}">
      <div class="teamCard__photoWrap">
        ${deco}
        <div class="teamCard__photoPlaceholder" aria-label="Zdjęcie ${member.name}">
          <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" class="teamCard__photoIcon">
            <circle cx="32" cy="22" r="13" fill="currentColor" opacity=".18"/>
            <ellipse cx="32" cy="52" rx="22" ry="14" fill="currentColor" opacity=".12"/>
          </svg>
        </div>
      </div>
      <div class="teamCard__body">
        <div class="teamCard__pill" style="background:var(--ac-pill);color:var(--ac-pill-text)">Zespół Kolorowych Rączek</div>
        <h2 class="teamCard__name">${member.name}</h2>
        <div class="teamCard__role">${member.role}</div>
        ${roleExtra}
        <div class="teamCard__divider" style="background:var(--ac-line)"></div>
        <div class="teamCard__text">${paras}</div>
      </div>
    </article>`;
}

export function renderOnas() {
  const cards = MEMBERS.map((m, i) => buildCard(m, i)).join('');

  return elFromHTML(`
    <div class="onasPage">
      <section class="section onasPage__section">
        <div class="container">
          <div class="sectionHeader" data-reveal="left">
            <div>
              <div class="pill">Kolorowe Centrum</div>
              <h1 class="sectionTitle">O nas</h1>
              <p class="sectionLead">Poznaj zespół, który każdego dnia tworzy przestrzeń bezpiecznego, radosnego i świadomego rozwoju dla Twojego dziecka.</p>
            </div>
          </div>
          <div class="teamList">
            ${cards}
          </div>
        </div>
      </section>
    </div>
  `);
}
