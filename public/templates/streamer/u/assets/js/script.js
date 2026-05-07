document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('#mobileNav');
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('is-open');
            body.classList.toggle('nav-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                body.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const menuLinks = document.querySelectorAll('.command-menu a');
    const sections = Array.from(menuLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && menuLinks.length && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                menuLinks.forEach((link) => {
                    link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, {
            rootMargin: '-38% 0px -52% 0px',
            threshold: 0.01,
        });

        sections.forEach((section) => observer.observe(section));
    }
});
