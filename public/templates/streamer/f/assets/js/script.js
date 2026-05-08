document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const revealTargets = document.querySelectorAll(
        '.deck-panel, .content-band, .contact-dock, .module-card, .live-demo, .next-stream, .schedule-card, .project-grid article, .archive-grid a, .social-links a'
    );

    revealTargets.forEach((target) => {
        target.setAttribute('data-reveal', '');
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

        revealTargets.forEach((target) => observer.observe(target));
    }

    const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });

        sections.forEach((section) => navObserver.observe(section));
    }
});
