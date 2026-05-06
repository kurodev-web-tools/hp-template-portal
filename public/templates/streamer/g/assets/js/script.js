document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('[data-glitch-nav]');
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (toggle && menu) {
        const closeMenu = () => {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'メニューを開く');
            menu.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        };

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
            menu.classList.toggle('is-open', !isOpen);
            document.body.classList.toggle('menu-open', !isOpen);
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    const revealTargets = document.querySelectorAll('.reveal-on-load');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });

        revealTargets.forEach((target) => observer.observe(target));
    }

    let ticking = false;
    const updateNavState = () => {
        if (!nav) return;
        nav.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavState);
            ticking = true;
        }
    }, { passive: true });

    updateNavState();
});
