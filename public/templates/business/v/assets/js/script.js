
// Global Toggle Function
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const menu = document.querySelector('.vivid-mobile-menu');
    const toggle = document.querySelector('.vivid-mobile-toggle');
    
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

    // ===== RGB Shift on Scroll (Wow Factor) =====
    // Apply slight RGB shift filter or transform on scroll
    let isScrolling;
    window.addEventListener('scroll', () => {
        document.body.style.textShadow = '2px 0 var(--color-magenta), -2px 0 var(--color-yellow)';
        
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            document.body.style.textShadow = 'none';
        }, 100);
    });

    // ===== Mobile Menu Logic (Robust) =====
    const toggleBtn = document.querySelector('.vivid-mobile-toggle');
    const menu = document.querySelector('.vivid-mobile-menu');

    if (toggleBtn) {
        toggleBtn.removeAttribute('onclick');
        toggleBtn.addEventListener('click', window.toggleMenu);
    }

    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                if (toggleBtn) {
                    const icon = toggleBtn.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
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
