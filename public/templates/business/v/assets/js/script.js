document.addEventListener('DOMContentLoaded', () => {
    // ===== Vivid Theme Effects =====
    if (window.PremiumEffects) {
        // High tension reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 800 });

        // Harsh tilt for blocks
        PremiumEffects.Tilt('.block, .g-card', { max: 5, scale: 0.98, speed: 2000 });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.vivid-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.vivid-mobile-toggle');
    const menu = document.querySelector('.vivid-mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            // No icon change requested for V, but let's keep it consistent
            const btnText = toggle.textContent.trim();
            // toggle.textContent = menu.classList.contains('active') ? 'CLOSE' : 'MENU'; 
            // Actually Template V uses Material Icons if I added it... Let's check my HTML.
            // Oh, I added <span class="material-icons">menu</span>.
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

    // ===== Block Scroll Reveal =====
    const blocks = document.querySelectorAll('.block');
    window.addEventListener('scroll', () => {
        blocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                block.style.opacity = '1';
                block.style.transform = block.classList.contains('b-magenta') ? 'translateY(60px)' : 'translateY(0)';
            }
        });
    });
});
