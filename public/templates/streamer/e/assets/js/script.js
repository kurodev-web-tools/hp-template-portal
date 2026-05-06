document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#mobile-menu');
    const revealTargets = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    body.classList.add('is-loaded');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const nextState = !menu.classList.contains('active');
            menu.classList.toggle('active', nextState);
            menu.setAttribute('aria-hidden', String(!nextState));
            toggle.setAttribute('aria-expanded', String(nextState));
            toggle.setAttribute('aria-label', nextState ? 'Close navigation' : 'Open navigation');
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menu.setAttribute('aria-hidden', 'true');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Open navigation');
            });
        });
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
    });

    revealTargets.forEach((target) => observer.observe(target));
});
