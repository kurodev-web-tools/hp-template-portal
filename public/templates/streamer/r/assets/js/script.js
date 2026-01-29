document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu (Night Vision)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');

            // Icon switch
            toggle.classList.toggle('active', isActive);
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'radar';

            // Play High-pitch Glitch Sound (Visual Metaphor)
            if (isActive) {
                // Flash body for impact
                document.body.style.filter = 'brightness(2) contrast(2)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 100);
            }

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }



    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.weapon-card, .intel-folder').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
