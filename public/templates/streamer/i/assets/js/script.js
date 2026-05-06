document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const badge = document.querySelector('[data-live-badge]');

    if (badge) {
        const isLive = document.body.dataset.streamStatus === 'live';
        badge.textContent = isLive ? 'Live now' : 'Next stage open';
    }

    const revealTargets = document.querySelectorAll('.profile-grid article, .clip-grid article, .schedule-board__rows article');

    if (!reducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.16 });

        revealTargets.forEach((target) => {
            target.classList.add('reveal-item');
            observer.observe(target);
        });
    }
});
