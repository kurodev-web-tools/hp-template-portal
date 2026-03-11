document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const storageKey = 'business-n-theme';
    const storedTheme = localStorage.getItem(storageKey);

    if (storedTheme === 'light') {
        root.classList.remove('dark');
    } else {
        root.classList.add('dark');
    }

    const updateThemeUi = () => {
        const isDark = root.classList.contains('dark');
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            const icon = button.querySelector('.material-symbols-outlined');
            const label = button.querySelector('[data-theme-label]');
            if (icon) {
                icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
            if (label) {
                label.textContent = isDark ? 'Light' : 'Dark';
            }
        });
    };

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const nextDark = !root.classList.contains('dark');
            root.classList.toggle('dark', nextDark);
            localStorage.setItem(storageKey, nextDark ? 'dark' : 'light');
            updateThemeUi();
        });
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href]').forEach((link) => {
        if (link.getAttribute('href') === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
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

    updateThemeUi();
});
