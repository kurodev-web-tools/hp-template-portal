(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');
  const backdrop = document.querySelector('[data-menu-backdrop]');

  const closeMenu = () => {
    if (!toggle || !panel || !backdrop) return;
    toggle.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    if (!toggle || !panel || !backdrop) return;
    toggle.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  if (toggle && panel && backdrop) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);
    panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080) closeMenu();
    });
  }

  if (header) {
    const onScroll = () => {
      header.style.borderBottomColor = window.scrollY > 16 ? 'rgba(15, 29, 46, 0.10)' : 'rgba(255, 255, 255, 0.6)';
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
})();
