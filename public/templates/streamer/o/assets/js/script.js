document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-ready');

    const panels = document.querySelectorAll('.reveal-panel');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        panels.forEach((panel) => observer.observe(panel));
    } else {
        panels.forEach((panel) => panel.classList.add('is-visible'));
    }

    const filterButtons = document.querySelectorAll('[data-filter]');
    const missionItems = document.querySelectorAll('.mission-list [data-status]');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
            missionItems.forEach((item) => {
                item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.status !== filter);
            });
        });
    });
});
