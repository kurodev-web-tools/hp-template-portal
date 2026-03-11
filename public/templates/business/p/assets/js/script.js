window.toggleMenu = function () {
    const menu = document.querySelector('.pop-mobile-menu');
    const toggle = document.querySelector('.pop-mobile-toggle');
    if (!menu || !toggle) return;
    menu.classList.toggle('is-active');
    toggle.setAttribute('aria-expanded', menu.classList.contains('is-active') ? 'true' : 'false');
};

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const storageKey = 'pop-spark-theme';

    const applyTheme = (isDark) => {
        root.classList.toggle('dark', isDark);
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            const icon = button.querySelector('[data-theme-icon]');
            const label = button.querySelector('[data-theme-label]');
            button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            if (label) label.textContent = isDark ? 'Light' : 'Dark';
        });
    };

    const saved = localStorage.getItem(storageKey);
    applyTheme(saved ? saved === 'dark' : false);

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        button.addEventListener('click', () => applyTheme(!root.classList.contains('dark')));
    });

    document.querySelectorAll('.pop-mobile-menu a').forEach((link) => {
        link.addEventListener('click', () => {
            document.querySelector('.pop-mobile-menu')?.classList.remove('is-active');
        });
    });
});
