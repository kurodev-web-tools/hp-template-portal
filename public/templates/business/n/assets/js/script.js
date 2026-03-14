document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href]').forEach((link) => {
        if (link.getAttribute('href') === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });

    if (window.PremiumEffects) {
        PremiumEffects.BlurText('.blur-target', {
            delay: 16,
            duration: 700,
            baseDelay: 100
        });

        if (PremiumEffects.Tilt) {
            PremiumEffects.Tilt('.tilt-card', {
                max: 8,
                scale: 1.01,
                speed: 800
            });
        }
    }
});

