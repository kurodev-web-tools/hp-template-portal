document.addEventListener('DOMContentLoaded', () => {
    // ===== Urban Theme Effects =====
    if (window.PremiumEffects) {
        // High impact reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 1200 });

        // Tilt for art cards and form
        PremiumEffects.Tilt('.urban-art-card, .taped-form-wrap', { max: 10, scale: 1.05, speed: 1000 });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.urban-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ===== Scroll Parallax for Hero Image =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-image-tilted');
        if (heroImg) {
            heroImg.style.transform = `rotate(5deg) translateY(${scrolled * -0.05}px)`;
        }
    });

    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.urban-mobile-toggle');
    const menu = document.querySelector('.urban-mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
            });
        });
    }
});
