(() => {
    const storageKey = 'template-m-theme';

    function applyTheme(theme) {
        const root = document.documentElement;
        const isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);

        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            button.setAttribute('aria-label', isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
        });

        document.querySelectorAll('[data-theme-icon]').forEach((icon) => {
            icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        });

        document.querySelectorAll('[data-theme-label]').forEach((label) => {
            label.textContent = isDark ? 'Light' : 'Dark';
        });
    }

    function resolveInitialTheme() {
        const saved = window.localStorage.getItem(storageKey);
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('header nav');
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        const navLinks = document.querySelectorAll('header nav a[href]');

        const closeMenu = () => {
            menuToggle?.classList.remove('active');
            nav?.classList.remove('mobile-open');
            backdrop?.classList.add('hidden');
            document.body.style.overflow = '';
        };

        const toggleMenu = () => {
            if (!menuToggle || !nav || !backdrop) return;
            const isOpen = menuToggle.classList.toggle('active');
            nav.classList.toggle('mobile-open', isOpen);
            backdrop.classList.toggle('hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        applyTheme(resolveInitialTheme());

        menuToggle?.addEventListener('click', toggleMenu);
        backdrop?.addEventListener('click', closeMenu);
        navLinks.forEach((link) => link.addEventListener('click', closeMenu));

        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.addEventListener('click', () => {
                const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
                window.localStorage.setItem(storageKey, nextTheme);
                applyTheme(nextTheme);
            });
        });

        document.querySelectorAll('[data-current-year]').forEach((node) => {
            node.textContent = String(new Date().getFullYear());
        });

        document.querySelectorAll('[data-demo-form]').forEach((form) => {
            form.addEventListener('submit', (event) => event.preventDefault());
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal-up').forEach((element) => observer.observe(element));

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    });
})();
