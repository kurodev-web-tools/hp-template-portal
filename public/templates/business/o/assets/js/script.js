document.addEventListener('DOMContentLoaded', () => {
    // ===== Organic Theme Effects =====
    if (window.PremiumEffects) {
        // Soft reveal
        PremiumEffects.BlurText('h1', { delay: 300, duration: 2500 });

        // Gentle tilt for session cards
        PremiumEffects.Tilt('.session-item', { max: 5, scale: 1.05 });
    }

    // ===== Mobile Menu Toggle =====
    const toggle = document.querySelector('.organic-mobile-toggle');
    const menu = document.querySelector('.organic-mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.querySelector('.material-icons').textContent =
                menu.classList.contains('active') ? 'close' : 'menu_open';
        });

        // Close menu on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.querySelector('.material-icons').textContent = 'menu_open';
            });
        });
    }

    // ===== Floating Parallax Logic =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const float1 = document.querySelector('.f1');
        const float2 = document.querySelector('.f2');

        if (float1 && float2) {
            float1.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
            float2.style.transform = `translateY(${scrolled * -0.05}px) rotate(${scrolled * -0.01}deg)`;
        }
    });
});
