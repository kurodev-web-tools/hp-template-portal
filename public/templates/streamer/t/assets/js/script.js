document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.logic-page');
    const toggle = document.querySelector('[data-menu-toggle]');
    const drawer = document.querySelector('[data-mobile-drawer]');
    const navLinks = Array.from(document.querySelectorAll('.logic-nav__links a'));
    const drawerLinks = Array.from(document.querySelectorAll('.mobile-drawer a'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));

    if (page) {
        window.requestAnimationFrame(() => page.classList.add('is-ready'));
    }

    function closeDrawer() {
        if (!toggle || !drawer) return;
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'メニューを開く');
    }

    if (toggle && drawer) {
        toggle.addEventListener('click', () => {
            const willOpen = !drawer.classList.contains('is-open');
            drawer.classList.toggle('is-open', willOpen);
            toggle.setAttribute('aria-expanded', String(willOpen));
            toggle.setAttribute('aria-label', willOpen ? 'メニューを閉じる' : 'メニューを開く');
        });

        drawerLinks.forEach((link) => {
            link.addEventListener('click', closeDrawer);
        });
    }

    if ('IntersectionObserver' in window && navLinks.length > 0 && sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            const id = visible.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
        }, {
            rootMargin: '-35% 0px -52% 0px',
            threshold: [0.08, 0.25, 0.5],
        });

        sections.forEach((section) => observer.observe(section));
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeDrawer();
        }
    });
});
