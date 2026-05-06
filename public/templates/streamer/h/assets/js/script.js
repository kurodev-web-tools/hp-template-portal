document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-ready');

    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const willOpen = mobileMenu.hasAttribute('hidden');
            mobileMenu.toggleAttribute('hidden', !willOpen);
            menuButton.setAttribute('aria-expanded', String(willOpen));
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.setAttribute('hidden', '');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const floors = Array.from(document.querySelectorAll('.floor-list li'));
    const navLinks = floors
        .map((item) => item.querySelector('a'))
        .filter(Boolean);

    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => setCurrentFloor(link));
        link.addEventListener('focus', () => setCurrentFloor(link));
    });

    const observedSections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && observedSections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            const activeLink = navLinks.find((link) => link.getAttribute('href') === `#${visible.target.id}`);
            if (activeLink) setCurrentFloor(activeLink);
        }, {
            rootMargin: '-30% 0px -55% 0px',
            threshold: [0.1, 0.25, 0.5],
        });

        observedSections.forEach((section) => observer.observe(section));
    }

    function setCurrentFloor(activeLink) {
        floors.forEach((item) => item.classList.toggle('is-current', item.contains(activeLink)));
    }
});
