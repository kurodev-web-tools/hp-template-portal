document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('#mobileMenu');

    body.classList.add('is-loaded');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isOpen));
            mobileMenu.classList.toggle('is-open', !isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('is-open');
            });
        });
    }

    document.querySelectorAll('.schedule-list li, .schedule-board li').forEach((item, index) => {
        item.style.setProperty('--panel-index', index.toString());
    });
});
