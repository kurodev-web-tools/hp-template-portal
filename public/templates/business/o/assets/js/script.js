document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const menuToggle = document.querySelector('.organic-mobile-toggle');
    const menuPanel = document.querySelector('.organic-mobile-menu');
    const backdrop = document.querySelector('.organic-menu-backdrop');
    // Force light theme
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('template-o-theme');

    const mobileToggle = document.querySelector('.organic-mobile-toggle');
    const mobileMenu = document.querySelector('.organic-mobile-menu');
    const menuBackdrop = document.querySelector('.organic-menu-backdrop');

    if (mobileToggle && mobileMenu && menuBackdrop) {
        const toggleMenu = (show) => {
            const isExpanding = show !== undefined ? show : mobileToggle.getAttribute('aria-expanded') === 'false';
            mobileToggle.setAttribute('aria-expanded', isExpanding);
            mobileMenu.classList.toggle('active', isExpanding);
            menuBackdrop.classList.toggle('active', isExpanding);
            document.body.style.overflow = isExpanding ? 'hidden' : '';
        };

        mobileToggle.addEventListener('click', () => toggleMenu());
        menuBackdrop.addEventListener('click', () => toggleMenu(false));

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Scroll reveal
    const observerOptions = {
        threshold: 0.1,
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

    document.querySelectorAll('.organic-panel, .reveal-up').forEach(el => {
        observer.observe(el);
    });
});
