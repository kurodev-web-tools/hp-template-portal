document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.querySelector('.vivid-mobile-toggle');
    const menuPanel = document.querySelector('.vivid-mobile-menu');
    const backdrop = document.querySelector('.vivid-menu-backdrop');
    const mobileLinks = document.querySelectorAll('.vivid-mobile-menu a[href]');

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

    menuToggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});

