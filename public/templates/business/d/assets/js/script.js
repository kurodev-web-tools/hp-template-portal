/**
 * Template D (Dynamic) - Specific Script
 * Handles the static mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDynamicMobileMenu();
});

window.addEventListener('load', () => {
    cleanupDynamicInjectedMobileMenu();
});

function initDynamicMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle[aria-controls="dynamic-mobile-menu"]');
    const menu = document.querySelector('header nav');
    const backdrop = document.querySelector('#dynamic-mobile-backdrop');
    const links = document.querySelectorAll('header nav a[href]');
    cleanupDynamicInjectedMobileMenu();

    const closeMenu = () => {
        if (!toggle || !menu || !backdrop) return;
        toggle.classList.remove('active');
        menu.classList.remove('mobile-open');
        backdrop.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        if (!toggle || !menu || !backdrop) return;
        const isOpen = !menu.classList.contains('mobile-open');
        toggle.classList.toggle('active', isOpen);
        menu.classList.toggle('mobile-open', isOpen);
        backdrop.classList.toggle('hidden', !isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('mobile-menu-active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', closeMenu);
    links.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) closeMenu();
    });
}

function cleanupDynamicInjectedMobileMenu() {
    document.querySelectorAll('.mobile-menu-toggle:not([aria-controls="dynamic-mobile-menu"])').forEach((el) => el.remove());
    document.querySelectorAll('.mobile-menu-backdrop:not(#dynamic-mobile-backdrop)').forEach((el) => el.remove());
}
