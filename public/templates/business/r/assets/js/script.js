document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggles = document.querySelectorAll('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu-panel]');
    const backdrop = document.querySelector('[data-menu-backdrop]');
    const links = document.querySelectorAll('[data-menu-panel] a[href]');
    const setOpen = (open) => {
        if (!menu || !backdrop) return;
        menu.classList.toggle('is-open', open);
        backdrop.classList.toggle('is-open', open);
        toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
        body.style.overflow = open ? 'hidden' : '';
    };
    toggles.forEach((toggle) => toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true')));
    backdrop?.addEventListener('click', () => setOpen(false));
    links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 768) setOpen(false); });
    document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
});
