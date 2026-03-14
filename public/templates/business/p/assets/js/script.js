window.toggleMenu = function () {
    const menu = document.querySelector('.pop-mobile-menu');
    const toggle = document.querySelector('.pop-mobile-toggle');
    if (!menu || !toggle) return;
    menu.classList.toggle('is-active');
    toggle.setAttribute('aria-expanded', menu.classList.contains('is-active') ? 'true' : 'false');
};

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    // Force light theme
    root.classList.remove('dark');
    localStorage.removeItem('pop-spark-theme');

    const menuToggle = document.querySelector('.pop-menu-toggle');
    const menuLayer = document.querySelector('.pop-menu-layer');
    const menuLinks = document.querySelectorAll('.pop-menu-nav a');

    if (menuToggle && menuLayer) {
        const toggleMenu = (show) => {
            const isExpanding = show !== undefined ? show : menuToggle.getAttribute('aria-expanded') === 'false';
            menuToggle.setAttribute('aria-expanded', isExpanding);
            menuLayer.classList.toggle('active', isExpanding);
            document.body.style.overflow = isExpanding ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', () => toggleMenu());
        menuLinks.forEach((link) => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Scroll trigger animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.brutalist-border, .reveal-pop').forEach(el => {
        observer.observe(el);
    });
});
