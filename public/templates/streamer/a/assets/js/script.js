document.addEventListener('DOMContentLoaded', () => {
    // Initialize Premium Effects
    if (window.PremiumEffects) {
        // Fix: Call as static method, not constructor
        PremiumEffects.BlurText('.hero-title', {
            delay: 40,
            duration: 1200
        });
    }

    // Mobile Menu Toggle (Neon Drawer)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        function toggleMenu(e) {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            // Icon switch
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'visibility';

            // Body Scroll Lock
            document.body.style.overflow = isActive ? 'hidden' : '';
        }

        toggle.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'visibility';

                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside (on the backdrop if not full height)
        // Since we are using a drawer that might not be full height, clicking the upper part (backdrop) should close it?
        // But currently the menu is 'fixed bottom' and 'min-height: 400px'. It doesn't have a separate backdrop element in HTML.
        // We can add a click listener to the window/body to close if clicking outside the menu, but the menu itself takes up space.
        // Let's stick to the requested logic.
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

    // ============================================
    // RGB GLITCH MOBILE AUTO-EFFECT
    // ============================================
    
    // Mobile: Auto-trigger glitch effect at random intervals
    if (window.innerWidth <= 768) {
        const glitchElements = document.querySelectorAll('.glitch-hover, .btn-neon, .hero-title, .glitch-text');
        
        function triggerRandomGlitch() {
            if (glitchElements.length === 0) return;
            
            // Pick a random element
            const randomIndex = Math.floor(Math.random() * glitchElements.length);
            const element = glitchElements[randomIndex];
            
            // Add glitch-active class
            element.classList.add('glitch-active');
            
            // Ensure data-text attribute exists for pseudo-elements
            if (!element.getAttribute('data-text')) {
                element.setAttribute('data-text', element.textContent || '');
            }
            
            // Remove after 200ms
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 200);
            
            // Schedule next glitch (2000ms ~ 5000ms random interval)
            const nextInterval = Math.random() * 3000 + 2000;
            setTimeout(triggerRandomGlitch, nextInterval);
        }
        
        // Start the glitch loop after initial delay
        setTimeout(triggerRandomGlitch, 3000);
    }
});
