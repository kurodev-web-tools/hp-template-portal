document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.querySelector('.saas-mobile-toggle');
    const sidebar = document.querySelector('.saas-sidebar');
    const backdrop = document.querySelector('.saas-backdrop');
    const mobileLinks = document.querySelectorAll('.saas-sidebar a[href]');

    const closeMenu = () => {
        if (!menuToggle || !sidebar || !backdrop) return;
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!menuToggle || !sidebar || !backdrop) return;
        const isOpen = menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active', isOpen);
        backdrop.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    mobileLinks.forEach((link) => link.addEventListener('click', () => {
        if (window.innerWidth < 1280) closeMenu();
    }));

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});

