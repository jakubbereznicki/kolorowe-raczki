function closest(el, selector) {
  return el?.closest ? el.closest(selector) : null;
}

function setExpanded(btn, expanded) {
  btn?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function closeAllDropdowns(root = document) {
  root.querySelectorAll('[data-dropdown][data-open="true"]').forEach((dd) => {
    dd.dataset.open = 'false';
    const btn = dd.querySelector('[data-dropdown-toggle]');
    setExpanded(btn, false);
  });
}

/** Desktop ≥1024px: chowa <header.siteHeader przy scroll w dół, pokazuje przy scroll w górę / przy górze strony. */
function initSiteHeaderScrollHide(navMount) {
  const header = document.querySelector('.siteHeader');
  if (!header) return;

  const desktopMq = window.matchMedia('(min-width: 1024px)');
  const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prevScrollY = window.scrollY;
  let ticking = false;

  const revealHeader = () => {
    header.classList.remove('siteHeader--scrollHidden');
  };

  const hideHeader = () => {
    header.classList.add('siteHeader--scrollHidden');
    closeAllDropdowns(navMount ?? document);
  };

  function updateFromScroll() {
    ticking = false;

    if (!desktopMq.matches || reduceMq.matches) {
      revealHeader();
      prevScrollY = window.scrollY;
      return;
    }

    const y = window.scrollY;

    if (y <= 32) {
      revealHeader();
      prevScrollY = y;
      return;
    }

    const dy = y - prevScrollY;
    const dirThreshold = 2;

    if (dy > dirThreshold && y > 48) hideHeader();
    else if (dy < -dirThreshold) revealHeader();

    prevScrollY = y;
  }

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateFromScroll);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  const onMq = () => {
    prevScrollY = window.scrollY;
    if (!desktopMq.matches || reduceMq.matches) revealHeader();
  };

  desktopMq.addEventListener('change', onMq);
  reduceMq.addEventListener('change', onMq);
}

export function initNav() {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const isDesktop = window.matchMedia?.('(min-width: 1024px)');

  const setNavOpen = (open) => {
    if (!nav || !toggle) return;
    nav.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open) closeAllDropdowns(nav);
  };

  toggle?.addEventListener('click', () => {
    const open = nav?.dataset.open === 'true';
    setNavOpen(!open);
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const inNav = closest(target, '[data-nav]');
    const inDropdown = closest(target, '[data-dropdown]');

    // Close dropdowns when clicking outside nav/dropdowns
    if (!inNav && !inDropdown) {
      closeAllDropdowns(nav ?? document);
      return;
    }

    // Dropdown toggle
    const toggleBtn = closest(target, '[data-dropdown-toggle]');
    if (toggleBtn) {
      const dd = closest(toggleBtn, '[data-dropdown]');
      if (!dd) return;
      const open = dd.dataset.open === 'true';
      // close siblings
      dd.parentElement?.querySelectorAll?.('[data-dropdown][data-open="true"]').forEach((sib) => {
        if (sib !== dd) {
          sib.dataset.open = 'false';
          setExpanded(sib.querySelector('[data-dropdown-toggle]'), false);
        }
      });
      dd.dataset.open = open ? 'false' : 'true';
      setExpanded(toggleBtn, !open);
      return;
    }

    // If user clicked a normal link inside nav, close mobile nav
    const link = closest(target, 'a[data-link]');
    if (link && nav && toggle) {
      setNavOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns(nav ?? document);
      setNavOpen(false);
    }
  });

  // Desktop convenience: open dropdown on hover (still clickable)
  if (isDesktop?.matches) {
    const closeTimers = new WeakMap();
    const CLOSE_DELAY_MS = 180;

    const openDropdown = (dd) => {
      const t = closeTimers.get(dd);
      if (t) window.clearTimeout(t);
      closeTimers.delete(dd);
      dd.dataset.open = 'true';
      setExpanded(dd.querySelector('[data-dropdown-toggle]'), true);
    };

    const scheduleCloseDropdown = (dd) => {
      const existing = closeTimers.get(dd);
      if (existing) window.clearTimeout(existing);
      const t = window.setTimeout(() => {
        dd.dataset.open = 'false';
        setExpanded(dd.querySelector('[data-dropdown-toggle]'), false);
        closeTimers.delete(dd);
      }, CLOSE_DELAY_MS);
      closeTimers.set(dd, t);
    };

    document.querySelectorAll('[data-dropdown]').forEach((dd) => {
      dd.addEventListener('mouseenter', () => openDropdown(dd));
      dd.addEventListener('mouseleave', () => scheduleCloseDropdown(dd));

      // Safety: if user moves into dropdown list itself, keep it open
      dd.querySelector('[data-dropdown-menu]')?.addEventListener('mouseenter', () => openDropdown(dd));
      dd.querySelector('[data-dropdown-menu]')?.addEventListener('mouseleave', () => scheduleCloseDropdown(dd));
    });
  }

  initSiteHeaderScrollHide(nav ?? document);
}

