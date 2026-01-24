
// Custom Toggle Logic
window.toggleMenu = function() {
    const menu = document.querySelector('.organic-mobile-menu');
    const toggle = document.querySelector('.organic-mobile-toggle');
    if (menu) {
        menu.classList.toggle('active');
        
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = menu.classList.contains('active') ? 'close' : 'menu_open';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ===== Organic Theme Effects =====
    if (window.PremiumEffects) {
        // Soft reveal
        PremiumEffects.BlurText('h1', { delay: 300, duration: 2500 });

        // Gentle tilt for session cards
        PremiumEffects.Tilt('.session-item', { max: 5, scale: 1.05 });
    }

    // ===== Mobile Menu Auto-Close =====
    const menu = document.querySelector('.organic-mobile-menu');
    const toggle = document.querySelector('.organic-mobile-toggle');
    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                if (toggle) {
                     const icon = toggle.querySelector('.material-icons');
                     if (icon) icon.textContent = 'menu_open';
                }
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
