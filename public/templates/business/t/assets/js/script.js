
// Global Toggle Function (Robust)
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault(); // Prevent double firing on touch
        event.stopPropagation();
    }

    const menu = document.querySelector('.trust-mobile-menu');
    const toggle = document.querySelector('.trust-mobile-toggle');
    
    if (menu) {
        menu.classList.toggle('active');
        
        // Icon switch
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
            }
        }

        // Lock body scroll
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ===== Trust Theme Effects =====
    if (window.PremiumEffects) {
        // Solid reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 2000 });

        // Tilt for robust solution cards
        PremiumEffects.Tilt('.solution-card', { max: 5, scale: 1.02 });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.trust-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // ===== Status Indicator Animation =====
    const indicator = document.querySelector('.status-indicator');
    if (indicator) {
        setInterval(() => {
            indicator.style.opacity = indicator.style.opacity === '0.3' ? '1' : '0.3';
        }, 1000);
    }

    // ===== Mobile Menu Logic =====
    const toggleBtn = document.querySelector('.trust-mobile-toggle');
    const menu = document.querySelector('.trust-mobile-menu');

    // Fix: Remove inline onclick to prevent double-firing
    if (toggleBtn && toggleBtn.hasAttribute('onclick')) {
        toggleBtn.removeAttribute('onclick');
    }

    // Add click event listener (Single source of truth)
    if (toggleBtn) {
        if (!toggleBtn.dataset.listenerAttached) {
            toggleBtn.addEventListener('click', (e) => {
                 if (window.toggleMenu) window.toggleMenu(e);
            });
            toggleBtn.dataset.listenerAttached = 'true';
        }
    }
    
    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = ''; // Release lock
                if (toggleBtn) {
                     const icon = toggleBtn.querySelector('.material-icons');
                     if (icon) icon.textContent = 'menu';
                }
            });
        });
    }
});
