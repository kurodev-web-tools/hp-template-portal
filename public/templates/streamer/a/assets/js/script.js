document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const revealTargets = document.querySelectorAll('.reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12,
        });

        revealTargets.forEach((target) => revealObserver.observe(target));
    }

    const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function setActiveNav(id) {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', isActive);
        });
    }

    if ('IntersectionObserver' in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible && visible.target.id) {
                setActiveNav(visible.target.id);
            }
        }, {
            rootMargin: '-30% 0px -55% 0px',
            threshold: [0.1, 0.3, 0.6],
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            setActiveNav(targetId);
        });
    });

    setActiveNav('home');
});
