document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.body.dataset.bootState = 'ready';
        return;
    }

    window.setTimeout(() => {
        document.body.dataset.bootState = 'ready';
    }, 90);

    const panels = document.querySelectorAll('.terminal-panel');
    panels.forEach((panel) => {
        panel.addEventListener('pointerenter', () => {
            panel.dataset.active = 'true';
        });
        panel.addEventListener('pointerleave', () => {
            delete panel.dataset.active;
        });
    });
});
