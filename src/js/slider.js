const sliderState = new WeakMap();

const AUTOPLAY_MS = 6500;
const TRANSITION_MS = 500;

function clampIndex(i, len) {
  return ((i % len) + len) % len;
}

function setActive(slides, dots, idx) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.toggle('isActive', i === idx);
  }
  if (dots) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].setAttribute('aria-current', i === idx ? 'true' : 'false');
    }
  }
}

function buildDots(root, slideCount, onPick) {
  const dotsWrap = root.querySelector('[data-dots]');
  if (!dotsWrap) return null;
  dotsWrap.replaceChildren();
  const dots = [];
  for (let i = 0; i < slideCount; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dot';
    b.setAttribute('aria-label', `Slajd ${i + 1}`);
    b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    b.addEventListener('click', () => onPick(i));
    dots.push(b);
    dotsWrap.appendChild(b);
  }
  return dots;
}

/**
 * Pre-decode obrazy slajdów, żeby pierwsza zmiana slajdu nie blokowała klatki
 * animacji synchronicznym dekodowaniem JPG-a (slajdy 2/3 mają loading="lazy"
 * i decoding="async"). Decode robimy fire-and-forget — błędy ignorujemy.
 */
function predecodeImages(slides) {
  for (const slide of slides) {
    const img = slide.querySelector('img');
    if (!img || typeof img.decode !== 'function') continue;
    img.decode().catch(() => {});
  }
}

export function initSlider(scope = document) {
  const slider = scope.querySelector?.('[data-slider]') || scope.closest?.('[data-slider]');
  if (!slider) return;
  if (sliderState.has(slider)) return;

  const slides = Array.from(slider.querySelectorAll('[data-slide]'));
  if (slides.length <= 1) return;

  const reducedMotion =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const state = {
    index: 0,
    slides,
    dots: null,
    timer: null,
    paused: false,
    busy: false,
    busyUntil: 0,
  };

  const goTo = (target, fromUser) => {
    const next = clampIndex(target, slides.length);
    if (next === state.index) {
      if (fromUser) restartAutoplay();
      return;
    }
    // W trakcie cross-fade ignorujemy kolejne kliknięcia, żeby nie stackować animacji.
    const now = performance.now();
    if (state.busy && now < state.busyUntil) {
      return;
    }
    state.busy = true;
    state.busyUntil = now + TRANSITION_MS;
    state.index = next;
    setActive(slides, state.dots, state.index);
    if (fromUser) restartAutoplay();
  };

  state.dots = buildDots(slider, slides.length, (i) => goTo(i, true));

  const prev = slider.querySelector('[data-prev]');
  const next = slider.querySelector('[data-next]');

  prev?.addEventListener('click', () => goTo(state.index - 1, true));
  next?.addEventListener('click', () => goTo(state.index + 1, true));

  const stopAutoplay = () => {
    if (state.timer) {
      window.clearTimeout(state.timer);
      state.timer = null;
    }
  };

  const scheduleAutoplay = () => {
    stopAutoplay();
    if (reducedMotion) return;
    state.timer = window.setTimeout(() => {
      state.timer = null;
      if (!state.paused && document.visibilityState !== 'hidden') {
        goTo(state.index + 1, false);
      }
      scheduleAutoplay();
    }, AUTOPLAY_MS);
  };

  function restartAutoplay() {
    scheduleAutoplay();
  }

  slider.addEventListener('mouseenter', () => {
    state.paused = true;
  });
  slider.addEventListener('mouseleave', () => {
    state.paused = false;
  });
  slider.addEventListener('focusin', () => {
    state.paused = true;
  });
  slider.addEventListener('focusout', () => {
    state.paused = false;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAutoplay();
    } else if (!state.timer) {
      scheduleAutoplay();
    }
  });

  sliderState.set(slider, state);

  setActive(slides, state.dots, 0);
  predecodeImages(slides);
  scheduleAutoplay();
}
