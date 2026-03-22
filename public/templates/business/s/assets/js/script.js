document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggles = document.querySelectorAll('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu-panel]');
    const backdrop = document.querySelector('[data-menu-backdrop]');
    const links = document.querySelectorAll('[data-menu-panel] a[href]');
    const setOpen = (open) => {
        if (!menu || !backdrop) return;
        menu.classList.toggle('is-open', open);
        backdrop.classList.toggle('is-open', open);
        toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
        body.style.overflow = open ? 'hidden' : '';
    };
    toggles.forEach((toggle) => toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true')));
    backdrop?.addEventListener('click', () => setOpen(false));
    links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 768) setOpen(false); });
    document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
        Array.from(group.querySelectorAll('[data-reveal]')).forEach((node, index) => {
            if (!node.style.getPropertyValue('--reveal-delay')) {
                node.style.setProperty('--reveal-delay', `${index * 80}ms`);
            }
        });
    });

    if (prefersReducedMotion) {
        revealNodes.forEach((node) => node.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
    });

    revealNodes.forEach((node) => observer.observe(node));
});
