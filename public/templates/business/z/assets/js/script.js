
// Global Toggle Function
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const menu = document.querySelector('.zen-mobile-menu');
    const toggle = document.querySelector('.zen-mobile-toggle');
    
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

    // ===== Mobile Menu Logic (Robust) =====
    const toggleBtn = document.querySelector('.zen-mobile-toggle');
    const menu = document.querySelector('.zen-mobile-menu');

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
});
