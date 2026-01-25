document.addEventListener('DOMContentLoaded', () => {
    // Initialize Premium Effects
    if (window.PremiumEffects) {
        new PremiumEffects.BlurText('.hero-title', {
            delay: 40,
            duration: 1200
        });
    }

    // Mobile Menu Toggle
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu.querySelectorAll('a');

    function toggleMenu() {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    toggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
            document.body.style.overflow = '';
        });
    });

    // Intersection Observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});
