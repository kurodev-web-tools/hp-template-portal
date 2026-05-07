(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function formatNumber(value, suffix = '') {
        return new Intl.NumberFormat('ja-JP').format(Math.round(value)) + suffix;
    }

    function animateMetric(element) {
        const target = Number(element.dataset.count);
        if (!Number.isFinite(target) || prefersReducedMotion) {
            return;
        }

        const suffix = element.textContent.includes('h') ? 'h' : '';
        const percent = element.querySelector('span');
        const percentText = percent ? percent.outerHTML : '';
        const startedAt = performance.now();
        const duration = 820;

        function tick(now) {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.innerHTML = `${formatNumber(target * eased, suffix)} ${percentText}`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('is-loaded');
        document.querySelectorAll('[data-count]').forEach(animateMetric);
    });
})();
