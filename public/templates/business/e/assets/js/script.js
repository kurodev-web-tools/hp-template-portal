document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const menuToggle = document.querySelector('.eco-mobile-toggle');
    const menuPanel = document.querySelector('.eco-mobile-menu');
    const backdrop = document.querySelector('.eco-menu-backdrop');
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');
    const menuLinks = document.querySelectorAll('.eco-mobile-menu a[href]');

    const applyTheme = (isDark) => {
        root.classList.toggle('dark', isDark);
        body.dataset.theme = isDark ? 'dark' : 'light';
        localStorage.setItem('eco-theme', isDark ? 'dark' : 'light');

        themeToggles.forEach((button) => {
            button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            const label = button.querySelector('[data-theme-label]');
            const icon = button.querySelector('[data-theme-icon]');

            if (label) {
                label.textContent = isDark ? 'Light' : 'Dark';
            }

            if (icon) {
                icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
        });
    };

    const closeMenu = () => {
        if (!menuToggle || !menuPanel || !backdrop) return;

        menuToggle.classList.remove('active');
        menuPanel.classList.remove('active');
        backdrop.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menuToggle || !menuPanel || !backdrop) return;

        const isOpen = menuToggle.classList.toggle('active');
        menuPanel.classList.toggle('active', isOpen);
        backdrop.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    const savedTheme = localStorage.getItem('eco-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    themeToggles.forEach((button) => {
        button.addEventListener('click', () => {
            applyTheme(!root.classList.contains('dark'));
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
});
