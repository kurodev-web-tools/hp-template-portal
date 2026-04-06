document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.querySelector('.wa-mobile-toggle');
    const menuPanel = document.querySelector('.wa-mobile-menu');
    const backdrop = document.querySelector('.wa-menu-backdrop');
    const mobileLinks = document.querySelectorAll('.wa-mobile-menu a[href]');

    markCurrentDesktopNavLink();

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
        if (window.innerWidth >= 768) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
});

function markCurrentDesktopNavLink() {
    const currentFile = getCurrentPageFileName();
    const navLinks = document.querySelectorAll('header nav a[href], .wa-mobile-menu a[href]');

    navLinks.forEach((link) => {
        const hrefFile = getFileNameFromHref(link.getAttribute('href'));
        const isCurrent = hrefFile === currentFile;

        if (isCurrent) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function getCurrentPageFileName() {
    const pathname = window.location.pathname || '';
    const fileName = pathname.split('/').pop();

    if (!fileName || !fileName.includes('.')) {
        return 'index.html';
    }

    return fileName.toLowerCase();
}

function getFileNameFromHref(href) {
    if (!href) return '';

    const cleanHref = href.split('#')[0].split('?')[0];
    const fileName = cleanHref.split('/').pop();

    return (fileName || '').toLowerCase();
}

