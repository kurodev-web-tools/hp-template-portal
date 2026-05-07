document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const toggle = document.querySelector('.wide-nav__toggle');
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            toggle.setAttribute('aria-label', expanded ? 'メニューを開く' : 'メニューを閉じる');
            menu.hidden = expanded;
        });

        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'メニューを開く');
                menu.hidden = true;
            });
        });
    }

    const timelineCards = document.querySelectorAll('[data-panel]');
    timelineCards.forEach((card) => {
        card.addEventListener('pointerenter', () => {
            timelineCards.forEach((item) => item.classList.toggle('is-muted', item !== card));
        });
        card.addEventListener('pointerleave', () => {
            timelineCards.forEach((item) => item.classList.remove('is-muted'));
        });
    });
});
