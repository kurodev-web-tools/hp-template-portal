document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.removeItem('pop-spark-theme');

    const menu = document.querySelector('.pop-mobile-menu');
    const toggle = document.querySelector('.pop-mobile-toggle');
    const menuLinks = document.querySelectorAll('.pop-mobile-menu a[href]');

    const closeMenu = () => {
        if (!menu || !toggle) return;
        menu.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menu || !toggle) return;
        const isOpen = !menu.classList.contains('is-active');
        menu.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    window.toggleMenu = toggleMenu;
    toggle?.addEventListener('click', toggleMenu);
    menu?.addEventListener('click', (event) => {
        if (event.target === menu) closeMenu();
    });
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.brutalist-border, .reveal-pop').forEach((el) => {
        observer.observe(el);
    });
});