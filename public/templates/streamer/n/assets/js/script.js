document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scheduleItems = document.querySelectorAll('.schedule-list li');
    const navLinks = document.querySelectorAll('.neon-sign-nav a[href^="#"], .side-links a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((item) => item.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'page');
        });
    });

    if (!reducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        document.querySelectorAll('.profile-grid article, .clip-card, .mini-flyer, .booking-contact').forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        document.querySelectorAll('.profile-grid article, .clip-card, .mini-flyer, .booking-contact').forEach((element) => {
            element.classList.add('is-visible');
        });
    }

    scheduleItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            scheduleItems.forEach((entry) => entry.classList.remove('is-focused'));
            item.classList.add('is-focused');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('is-focused');
        });
    });
});
