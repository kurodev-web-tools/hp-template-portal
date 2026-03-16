document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href]').forEach((link) => {
        if (link.getAttribute('href') === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });

    const closeMenu = () => {
        if (!menuToggle || !menu || !backdrop) return;
        menuToggle.classList.remove('active');
        menu.classList.remove('mobile-open');
        backdrop.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menuToggle || !menu || !backdrop) return;
        const isOpen = !menu.classList.contains('mobile-open');
        menuToggle.classList.toggle('active', isOpen);
        menu.classList.toggle('mobile-open', isOpen);
        backdrop.classList.toggle('hidden', !isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
    });

    const closeMenu = () => {
        if (!menuToggle || !menu || !backdrop) return;
        menuToggle.classList.remove('active');
        menu.classList.remove('mobile-open');
        backdrop.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menuToggle || !menu || !backdrop) return;
        const isOpen = !menu.classList.contains('mobile-open');
        menuToggle.classList.toggle('active', isOpen);
        menu.classList.toggle('mobile-open', isOpen);
        backdrop.classList.toggle('hidden', !isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
    });

    if (window.PremiumEffects) {
        PremiumEffects.BlurText('.blur-target', {
            delay: 16,
            duration: 700,
            baseDelay: 100
        });

        if (PremiumEffects.Tilt) {
            PremiumEffects.Tilt('.tilt-card', {
                max: 8,
                scale: 1.01,
                speed: 800
            });
        }
    }
});

