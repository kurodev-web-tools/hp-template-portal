document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const menuToggle = document.querySelector('.wide-mobile-toggle');
    const menuPanel = document.querySelector('.wide-mobile-menu');
    const backdrop = document.querySelector('.wide-menu-backdrop');
    const mobileLinks = document.querySelectorAll('.wide-mobile-menu a[href]');
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');
    const storageKey = 'wide-horizon-theme';

    const updateThemeButtons = (isDark) => {
        themeToggles.forEach((button) => {
            button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            const icon = button.querySelector('[data-theme-icon]');
            const label = button.querySelector('[data-theme-label]');
            if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            if (label) label.textContent = isDark ? 'Light' : 'Dark';
        });
    };

    const applyTheme = (isDark) => {
        root.classList.toggle('dark', isDark);
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        updateThemeButtons(isDark);
    };

    const closeMenu = () => {
        if (!menuToggle || !menuPanel || !backdrop) return;
        menuToggle.classList.remove('active');
        menuPanel.classList.remove('active');
        backdrop.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menuToggle || !menuPanel || !backdrop) return;
        const isOpen = menuToggle.classList.toggle('active');
        menuPanel.classList.toggle('active', isOpen);
        backdrop.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    const savedTheme = localStorage.getItem(storageKey);
    applyTheme(savedTheme ? savedTheme === 'dark' : false);

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
    themeToggles.forEach((button) => {
        button.addEventListener('click', () => applyTheme(!root.classList.contains('dark')));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});
