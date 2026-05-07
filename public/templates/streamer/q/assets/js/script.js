document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tabs = Array.from(document.querySelectorAll('[data-quest-tab]'));
    const panels = Array.from(document.querySelectorAll('.reveal-panel'));
    const sealButtons = Array.from(document.querySelectorAll('[data-seal-button]'));

    document.body.classList.add('is-ready');

    const activateTab = (hash) => {
        tabs.forEach((tab) => {
            tab.classList.toggle('is-active', tab.getAttribute('href') === hash);
        });
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activateTab(tab.getAttribute('href'));
        });
    });

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.2
        });

        panels.forEach((panel) => observer.observe(panel));
    } else {
        panels.forEach((panel) => panel.classList.add('is-visible'));
    }

    sealButtons.forEach((button) => {
        button.addEventListener('pointerdown', () => {
            if (prefersReducedMotion) return;
            button.classList.remove('is-stamped');
            window.requestAnimationFrame(() => button.classList.add('is-stamped'));
        });

        button.addEventListener('animationend', () => {
            button.classList.remove('is-stamped');
        });
    });

    window.addEventListener('hashchange', () => {
        activateTab(window.location.hash || '#active-quest');
    });

    activateTab(window.location.hash || '#active-quest');
});
