
// Global Toggle Function
window.toggleMenu = function() {
    const sidebar = document.querySelector('.saas-sidebar');
    const toggle = document.querySelector('.saas-mobile-toggle');
    if (sidebar) {
        sidebar.classList.toggle('active');
        
        if (toggle) {
            const icon = toggle.querySelector('.material-icons');
            if (icon) {
                icon.textContent = sidebar.classList.contains('active') ? 'close' : 'menu';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ===== Smart SaaS Theme Effects =====
    if (window.PremiumEffects) {
        // Crisp modern reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 1500 });

        // Tilt for dashboard cards
        PremiumEffects.Tilt('.stat-card, .f-item', { max: 5, scale: 1.05 });
    }

    // ===== Sidebar Active State Sync =====
    const sections = document.querySelectorAll('section');
    const sideLinks = document.querySelectorAll('.sidebar-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        sideLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ===== Mobile Sidebar Logic =====
    const sidebar = document.querySelector('.saas-sidebar');
    const toggle = document.querySelector('.saas-mobile-toggle');

    if (sidebar) {
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                if (toggle) {
                    const icon = toggle.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            });
        });
    }
});
