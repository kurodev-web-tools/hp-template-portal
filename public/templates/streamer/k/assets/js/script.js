document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isOpen));
            menu.classList.toggle('is-open', !isOpen);
            document.body.classList.toggle('menu-open', !isOpen);
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('.honor-panel, .order-card, .follow-card, .archive-strip, .audience-contact, .clip-card');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealTargets.forEach((target) => observer.observe(target));
    }

    const form = document.querySelector('[data-contact-form]');
    if (form) {
        const status = form.querySelector('.form-status');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (status) {
                status.textContent = '入力内容を確認しました。実サイトでは送信前確認または外部フォームへ接続します。';
            }
        });
    }
});
