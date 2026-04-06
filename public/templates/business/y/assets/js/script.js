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

  const applyDepth = () => {
    const items = document.querySelectorAll('[data-depth]');
    const offset = Math.min(window.scrollY, 320);
    items.forEach((item) => {
      const depth = Number(item.getAttribute('data-depth') || 0);
      item.style.transform = `translate3d(0, ${offset * depth * -1}px, 0)`;
    });
  };

  const revealItems = document.querySelectorAll('.reveal');
  const applyStagger = (target) => {
    target.querySelectorAll('[data-stagger]').forEach((item) => {
      const step = Number(item.getAttribute('data-stagger') || 0);
      item.style.transitionDelay = `${step * 90}ms`;
      item.classList.add('is-staggered');
    });
  };

  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            applyStagger(entry.target);
            if (entry.target.hasAttribute('data-chart')) {
              entry.target.classList.add('is-live');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => {
      item.classList.add('is-visible');
      applyStagger(item);
      if (item.hasAttribute('data-chart')) {
        item.classList.add('is-live');
      }
    });
  }

  applyDepth();
  window.addEventListener('scroll', applyDepth, { passive: true });
})();
