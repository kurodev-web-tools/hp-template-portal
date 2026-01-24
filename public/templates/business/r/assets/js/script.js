
// Global Toggle Function
window.toggleMenu = function() {
    const menu = document.querySelector('.royal-mobile-menu');
    const toggle = document.querySelector('.royal-mobile-toggle');
    if (menu) {
        menu.classList.toggle('active');
        
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ===== Royal Theme Effects =====
    if (window.PremiumEffects) {
        // Grand reveal
        PremiumEffects.BlurText('h1', { delay: 400, duration: 3000 });

        // Tilt for framed image
        PremiumEffects.Tilt('.sig-image-frame', { max: 3, scale: 1.02 });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.royal-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ===== Mobile Menu Auto-Close =====
    const menu = document.querySelector('.royal-mobile-menu');
    const toggle = document.querySelector('.royal-mobile-toggle');

    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                if (toggle) {
                     const icon = toggle.querySelector('.material-icons');
                     if (icon) icon.textContent = 'menu';
                }
            });
        });
    }

    // ===== Scroll Fade-in Ornament =====
    const sigImage = document.querySelector('.sig-image-frame');
    window.addEventListener('scroll', () => {
        if (sigImage) {
            const rect = sigImage.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                sigImage.style.opacity = '1';
                sigImage.style.transform = 'translateY(0)';
            }
        }
    });
});
