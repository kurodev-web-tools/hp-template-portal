document.addEventListener('DOMContentLoaded', () => {
    // ===== Zen Theme Effects =====
    if (window.PremiumEffects) {
        // Serene slow reveal
        PremiumEffects.BlurText('h1', { delay: 500, duration: 4000 });

        // No tilt for Zen (maintain stillness)
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.zen-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ===== Scroll Sync for Vertical Nav =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.vertical-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.opacity = '0.4';
            link.style.fontWeight = 'normal';
            if (link.getAttribute('href').includes(current)) {
                link.style.opacity = '1';
                link.style.fontWeight = '600';
            }
        });
    });

    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.zen-mobile-toggle');
    const menu = document.querySelector('.zen-mobile-menu');

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
