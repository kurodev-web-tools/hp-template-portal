
// Define toggleMenu globally for the onclick attribute
window.toggleMenu = function() {
    const menu = document.querySelector('.neon-mobile-menu');
    const toggle = document.querySelector('.neon-mobile-toggle');
    if (menu) {
        menu.classList.toggle('is-active');
        
        // Toggle icon
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = menu.classList.contains('is-active') ? 'close' : 'menu';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ===== Neon Theme Effects =====
    if (window.PremiumEffects) {
        // High impact reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 1500 });

        // Tilt for terminal and cards
        PremiumEffects.Tilt('.terminal-window, .vibe-card', { max: 10, scale: 1.02, speed: 1000 });
    }

    // ===== Mobile Menu Auto-Close =====
    const menu = document.querySelector('.neon-mobile-menu');
    const toggle = document.querySelector('.neon-mobile-toggle');

    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-active');
                if (toggle) {
                    const icon = toggle.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            });
        });
    }

    // ===== Scrolling Sidebar Highlight =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-nav a'); // Updated selector to match .nav class or wrapper

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            link.style.textShadow = '';
            if (link.getAttribute('href').includes(current)) {
                link.style.color = '#00FFFF'; // Cyan
                link.style.textShadow = '0 0 10px #00FFFF';
            }
        });
    });
});
