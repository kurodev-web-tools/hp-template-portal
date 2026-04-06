(() => {
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

        menuToggle?.addEventListener('click', toggleMenu);
        backdrop?.addEventListener('click', closeMenu);
        navLinks.forEach((link) => link.addEventListener('click', closeMenu));

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
