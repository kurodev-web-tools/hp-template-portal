document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const revealTargets = document.querySelectorAll('.panel-reveal');
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (motionReduced || !('IntersectionObserver' in window)) {
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
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.08,
        });

        revealTargets.forEach((target) => observer.observe(target));
    }

    const sections = document.querySelectorAll('section[id], article[id], main[id]');
    const navLinks = document.querySelectorAll('.rail-nav a');

    if ('IntersectionObserver' in window && navLinks.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            const activeEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!activeEntry) {
                return;
            }

            const id = activeEntry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`);
            });
        }, {
            threshold: [0.25, 0.5, 0.75],
        });

        sections.forEach((section) => navObserver.observe(section));
    }
});
