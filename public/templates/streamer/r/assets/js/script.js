document.addEventListener('DOMContentLoaded', () => {
    const shell = document.querySelector('.dossier-shell');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!shell) {
        return;
    }

    shell.dataset.boot = 'ready';

    if (reduceMotion) {
        shell.classList.add('no-motion');
    }

    const revealTargets = document.querySelectorAll('[data-reveal]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.14,
            rootMargin: '0px 0px -10% 0px',
        });

        revealTargets.forEach((target) => observer.observe(target));
    }

    const navLinks = document.querySelectorAll('.dossier-nav nav a[href^="#"]');
    const sections = Array.from(navLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach((link) => {
                    link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, {
            threshold: 0.38,
        });

        sections.forEach((section) => navObserver.observe(section));
    }
});
