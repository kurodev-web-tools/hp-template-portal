document.addEventListener('DOMContentLoaded', () => {
    // Premium Effects
    if (window.PremiumEffects) {
        // Fix: Call as static method
        PremiumEffects.BlurText('.hero-title', {
            delay: 60,
            duration: 1500
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop propagation
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'movie_filter';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close when link clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'movie_filter';
                document.body.style.overflow = '';
            });
        });
    }

    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.vibe-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // ============================================
    // COLOR FLOW - Interactive CSS Variables
    // ============================================
    
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let scrollRatio = 0;
    let rafId = null;
    let isUpdating = false;
    
    // Update CSS variables with smooth interpolation
    function updateCSSVariables() {
        // Smooth interpolation for mouse movement (ease-out effect)
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;
        
        // Calculate scroll ratio (0.0 to 1.0)
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollRatio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        
        // Set CSS custom properties on body
        document.body.style.setProperty('--mouse-x', mouseX.toFixed(3));
        document.body.style.setProperty('--mouse-y', mouseY.toFixed(3));
        document.body.style.setProperty('--scroll-ratio', scrollRatio.toFixed(3));
        
        isUpdating = false;
    }
    
    function scheduleUpdate() {
        if (!isUpdating) {
            isUpdating = true;
            rafId = requestAnimationFrame(updateCSSVariables);
        }
    }
    
    // Mouse move event (PC)
    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX / window.innerWidth;
        targetMouseY = e.clientY / window.innerHeight;
        scheduleUpdate();
    }, { passive: true });
    
    // Scroll event (Mobile & PC)
    window.addEventListener('scroll', () => {
        scheduleUpdate();
    }, { passive: true });
    
    // Initial update
    updateCSSVariables();
});
