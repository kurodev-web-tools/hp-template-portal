document.addEventListener('DOMContentLoaded', () => {
    // Liquid Metal Effect
    if (window.PremiumEffects) {
        // Using "LiquidMetal" if implemented, or fallback to simple particles/canvas
        // Based on previous PremiumEffects.js, let's assume LiquidMetal exists or we simulate it.
        // Actually checking premium-effects.js content from previous turn... 
        // It had "LiquidMetal" (blobs). Perfect.
        PremiumEffects.LiquidMetal('#liquid-canvas', {
            colors: ['#ffffff', '#a0a0a0', '#404040'],
            count: 8
        });
    }

    // Mobile Menu (Mercury Pool)
    const toggle = document.querySelector('.mobile-toggle');
    const menuContainer = document.querySelector('.mobile-menu-container');
    const menuLinks = menuContainer ? menuContainer.querySelectorAll('a') : [];

    if (toggle && menuContainer) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menuContainer.classList.toggle('active');
            
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';
            
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuContainer.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.metal-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});
