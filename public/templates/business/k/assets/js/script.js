document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });

        // Close menu when clicking links
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuToggle.querySelector('i').textContent = 'menu';
            });
        });
    }

    // --- Premium Effects Initialization ---
    // Note: Depends on premium-effects.js being loaded

    // 1. BlurText Effect for headings
    if (window.PremiumEffects && window.PremiumEffects.BlurText) {
        // Pass selector instead of element
        window.PremiumEffects.BlurText('.blur-text', {
            duration: 1.2,
            blur: 10,
            stagger: 0.1
        });
    }

    // 2. CountUp for stats
    if (window.PremiumEffects && window.PremiumEffects.CountUp) {
        const countElements = document.querySelectorAll('.count-up');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Pass specific selector or unique ID for the library to find it
                    // Or check if the library supports element.
                    // Based on subagent, it likely wants a selector.
                    // Let's ensure each has a unique ID or use a specific class pattern.
                    if (!el.id) {
                        el.id = 'count-up-' + Math.random().toString(36).substr(2, 9);
                    }
                    const targetValue = parseInt(el.getAttribute('data-target'), 10);
                    window.PremiumEffects.CountUp('#' + el.id, {
                        end: targetValue,
                        duration: 2.5,
                        suffix: el.getAttribute('data-suffix') || ''
                    });
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        countElements.forEach(el => observer.observe(el));
    }

    // 3. Tilt Effect for library cards
    if (window.PremiumEffects && window.PremiumEffects.Tilt) {
        window.PremiumEffects.Tilt('.tilt-card', {
            max: 10,
            perspective: 1000,
            scale: 1.02
        });
    }

    // --- Smooth Page Transition ---
    document.body.classList.add('fade-in');

    // --- Smart Hide Portal Button ---
    let lastScroll = 0;
    const portalBtn = document.querySelector('.portal-nav-back');
    if (portalBtn) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                portalBtn.classList.add('hidden');
            } else {
                portalBtn.classList.remove('hidden');
            }
            lastScroll = currentScroll;
        });
    }
});
