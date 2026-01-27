document.addEventListener('DOMContentLoaded', () => {
    // Initialize Premium Effects
    if (window.PremiumEffects) {
        // Fix: Call as static method, not constructor
        PremiumEffects.BlurText('.hero-title', {
            delay: 40,
            duration: 1200
        });
    }

    // Mobile Menu Toggle
    // Fix: Ensure toggle works even if moved in DOM
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu.querySelectorAll('a');

    if (toggle && menu) {
        function toggleMenu(e) {
            e.preventDefault(); // Prevent default touch behavior
            e.stopPropagation(); // Stop propagation
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // Add active class to button for animation

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';

            document.body.style.overflow = isActive ? 'hidden' : '';
        }

        toggle.addEventListener('click', toggleMenu);
        // Add touchstart for better mobile response
        // toggle.addEventListener('touchstart', toggleMenu, {passive: false});

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }

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
