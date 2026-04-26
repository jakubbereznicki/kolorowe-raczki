import { activities } from './data/activities.js';

let calendarState = new WeakMap();

const DOW = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'];

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function sameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, 0);
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1, 12, 0, 0, 0);
}

function plMonthTitle(d) {
  const fmt = new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric' });
  const s = fmt.format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function eventsFor(dateISO) {
  return activities.filter((a) => a.date === dateISO).sort((a, b) => a.time.localeCompare(b.time));
}

function renderEvents(target, dateISO) {
  if (!target) return;
  const list = eventsFor(dateISO);
  const pretty = new Intl.DateTimeFormat('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }).format(
    new Date(dateISO + 'T12:00:00'),
  );

  if (list.length === 0) {
    target.innerHTML = `
      <h3 class="eventsTitle">Wydarzenia</h3>
      <div class="muted">Brak wydarzeń na <strong>${pretty}</strong>.</div>
    `;
    return;
  }

  target.innerHTML = `
    <h3 class="eventsTitle">Wydarzenia</h3>
    <div class="muted" style="margin-bottom:10px">Dzień: <strong>${pretty}</strong></div>
    ${list
      .map(
        (e) => `
        <div class="eventItem">
          <div style="font-weight:950;letter-spacing:-.02em">${e.title}</div>
          <div class="eventMeta"><span class="dotMini"></span> ${e.time}</div>
        </div>
      `,
      )
      .join('')}
  `;
}

function renderCalendar(root, state) {
  const monthStart = startOfMonth(state.month);
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  // Monday-based index: 0..6
  const firstDow = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - firstDow);

  const title = plMonthTitle(monthStart);
  const cells = [];

  // DOW header
  for (const d of DOW) {
    cells.push(`<div class="calCell calDow">${d}</div>`);
  }

  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const inMonth = sameMonth(d, monthStart);
    const dISO = isoDate(d);
    const hasEvents = eventsFor(dISO).length > 0;

    const classes = [
      'calCell',
      !inMonth ? 'isMuted' : '',
      dISO === isoDate(today) ? 'isToday' : '',
      dISO === state.selectedISO ? 'isSelected' : '',
    ]
      .filter(Boolean)
      .join(' ');

    cells.push(`
      <button class="${classes}" type="button" data-day="${dISO}" aria-label="Dzień ${d.getDate()}">
        <div class="calDay">${d.getDate()}</div>
        ${hasEvents ? '<div class="dotMini" aria-hidden="true"></div>' : ''}
      </button>
    `);
  }

  root.innerHTML = `
    <div class="calHeader">
      <button class="iconBtn" type="button" aria-label="Poprzedni miesiąc" data-cal-prev>‹</button>
      <div class="calTitle">${title}</div>
      <button class="iconBtn" type="button" aria-label="Następny miesiąc" data-cal-next>›</button>
    </div>
    <div class="calGrid">${cells.join('')}</div>
  `;
}

export function initCalendar(scope = document) {
  const root = scope.querySelector?.('[data-calendar]') || scope.closest?.('[data-calendar]');
  if (!root) return;
  if (calendarState.has(root)) return;

  const eventsEl = scope.querySelector?.('[data-events]') || document.querySelector('[data-events]');

  const now = new Date();
  now.setHours(12, 0, 0, 0);

  const state = {
    month: startOfMonth(now),
    selectedISO: isoDate(now),
    eventsEl,
  };

  calendarState.set(root, state);
  renderCalendar(root, state);
  renderEvents(eventsEl, state.selectedISO);

  root.addEventListener('click', (e) => {
    const t = e.target;
    const dayBtn = t?.closest?.('[data-day]');
    if (dayBtn) {
      state.selectedISO = dayBtn.getAttribute('data-day') || state.selectedISO;
      renderCalendar(root, state);
      renderEvents(eventsEl, state.selectedISO);
      return;
    }
    if (t?.closest?.('[data-cal-prev]')) {
      state.month = addMonths(state.month, -1);
      renderCalendar(root, state);
      return;
    }
    if (t?.closest?.('[data-cal-next]')) {
      state.month = addMonths(state.month, 1);
      renderCalendar(root, state);
      return;
    }
  });
}

