
// Global Toggle Function
window.toggleMenu = function(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const menu = document.querySelector('.xtreme-mobile-menu');
    const toggle = document.querySelector('.xtreme-mobile-toggle');
    
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
    const container = document.querySelector('.xtreme-snap-container');
    const sections = document.querySelectorAll('.snap-section');
    const navLinks = document.querySelectorAll('.nav-id');

    // ===== Snap Sync Navigation =====
    if (container) {
        container.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (container.scrollTop >= sectionTop - container.offsetHeight / 2) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Scroll to section on link click (Unified)
    const allLinks = document.querySelectorAll('.nav-id, .xtreme-mobile-menu a');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            
            // Close menu if open
            const menu = document.querySelector('.xtreme-mobile-menu');
            const toggle = document.querySelector('.xtreme-mobile-toggle');
            if(menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                if(toggle) {
                    const icon = toggle.querySelector('.material-icons');
                    if(icon) icon.textContent = 'menu';
                }
            }

            if (target && container) {
                container.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.xtreme-header');
    if (container) {
        container.addEventListener('scroll', () => {
            if (container.scrollTop > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }

    // ===== Mobile Menu Logic (Robust) =====
    const toggleBtn = document.querySelector('.xtreme-mobile-toggle');
    const menu = document.querySelector('.xtreme-mobile-menu');

    if (toggleBtn) {
        toggleBtn.removeAttribute('onclick');
        toggleBtn.addEventListener('click', window.toggleMenu);
    }

    // ===== Xtreme Theme Effects =====
    if (window.PremiumEffects) {
        // Harsh quick reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 800 });

        // Tilt for cards
        PremiumEffects.Tilt('.x-card', { max: 10, scale: 1.05 });
    }
});
