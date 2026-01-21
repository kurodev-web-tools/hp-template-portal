document.addEventListener('DOMContentLoaded', () => {
    // ===== Yield Theme Effects =====
    if (window.PremiumEffects) {
        // Sophisticated slow reveal
        PremiumEffects.BlurText('h1', { delay: 300, duration: 2500 });

        // Gentle tilt for panels
        PremiumEffects.Tilt('.panel, .stats-card', { max: 3, scale: 1.02 });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.yield-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ===== Panel Parallax =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const panelTop = document.querySelector('.p-top');
        const panelBottom = document.querySelector('.p-bottom');

        if (panelTop && panelBottom) {
            panelTop.style.transform = `translateY(${scrolled * -0.05}px)`;
            panelBottom.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.yield-mobile-toggle');
    const menu = document.querySelector('.yield-mobile-menu');

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
