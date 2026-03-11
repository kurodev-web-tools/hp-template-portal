document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const menuToggle = document.querySelector('.precision-mobile-toggle');
    const menuPanel = document.querySelector('.precision-mobile-menu');
    const backdrop = document.querySelector('.precision-menu-backdrop');
    const menuLinks = document.querySelectorAll('.precision-mobile-menu a[href]');
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');
    const storageKey = 'quality-first-theme';

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
    applyTheme(savedTheme ? savedTheme === 'dark' : true);

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    themeToggles.forEach((button) => {
        button.addEventListener('click', () => applyTheme(!root.classList.contains('dark')));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});
