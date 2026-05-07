(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('.panel, .content-band article, .oracle-contact');

    revealTargets.forEach((target) => {
        target.setAttribute('data-reveal', '');
    });

    if (reducedMotion || !('IntersectionObserver' in window)) {
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
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12
    });

    revealTargets.forEach((target) => observer.observe(target));
})();
