document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.lounge-menu a, .topbar-nav a, .mobile-nav a');
    const revealTargets = document.querySelectorAll('.reveal-panel, .content-section, .reservation-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    body.classList.add('is-loaded');

    const closeMobileNav = () => {
        if (!menuToggle || !mobileNav) {
            return;
        }

        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
    };

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            mobileNav.classList.toggle('is-open', !expanded);
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMobileNav();
        });
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
    });

    revealTargets.forEach((target) => observer.observe(target));
});
