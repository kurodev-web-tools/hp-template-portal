
// Global Toggle Function
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const menu = document.querySelector('.urban-mobile-menu');
    const toggle = document.querySelector('.urban-mobile-toggle');
    
    if (menu) {
        menu.classList.toggle('active');
        
        // Scroll Lock
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Icon Toggle
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
            }
        }
    }
};

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

    // ===== Mobile Menu Logic (Robust) =====
    const toggleBtn = document.querySelector('.urban-mobile-toggle');
    const menu = document.querySelector('.urban-mobile-menu');

    if (toggleBtn) {
        // Remove inline handler just in case
        toggleBtn.removeAttribute('onclick');
        // Add listener
        toggleBtn.addEventListener('click', window.toggleMenu);
    }

    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Use the global function logic or manually close
                menu.classList.remove('active');
                document.body.style.overflow = '';
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            });
        });
    }
});
