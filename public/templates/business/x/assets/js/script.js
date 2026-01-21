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

    // Scroll to section on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
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

    // ===== Mobile Menu Logic =====
    const toggle = document.querySelector('.xtreme-mobile-toggle');
    const menu = document.querySelector('.xtreme-mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = menu.classList.contains('active') ? 'close' : 'menu';
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.getAttribute('href').substring(1);
                const target = document.getElementById(id);
                if (target && container) {
                    container.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
            });
        });
    }

    // ===== Xtreme Theme Effects =====
    if (window.PremiumEffects) {
        // Harsh quick reveal
        PremiumEffects.BlurText('h1', { delay: 100, duration: 800 });

        // Tilt for cards
        PremiumEffects.Tilt('.x-card', { max: 10, scale: 1.05 });
    }
});
