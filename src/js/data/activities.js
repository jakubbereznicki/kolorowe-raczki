export const activities = [
  {
    id: 'plastyczne-1',
    title: 'Plastyczne: kolorowe kolaże',
    time: '16:15',
    date: offsetDateISO(2),
    tag: 'plastyczne',
  },
  {
    id: 'ruchowe-1',
    title: 'Ruchowe: tor przeszkód (gr. 5–7)',
    time: '17:10',
    date: offsetDateISO(3),
    tag: 'ruchowe',
  },
  {
    id: 'jezykowe-1',
    title: 'Angielski przez zabawę (gr. 4–6)',
    time: '15:30',
    date: offsetDateISO(4),
    tag: 'językowe',
  },
  {
    id: 'warsztaty-1',
    title: 'Warsztaty rodzinne: sensoryka (0–3)',
    time: '10:30',
    date: offsetDateISO(6),
    tag: 'warsztaty',
  },
  {
    id: 'plastyczne-2',
    title: 'Plastyczne: malowanie na dużym formacie',
    time: '16:00',
    date: offsetDateISO(9),
    tag: 'plastyczne',
  },
  {
    id: 'ruchowe-2',
    title: 'Ruchowe: gry zespołowe (8–12)',
    time: '18:00',
    date: offsetDateISO(10),
    tag: 'ruchowe',
  },
];

function offsetDateISO(days) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

