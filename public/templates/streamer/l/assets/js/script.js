document.addEventListener('DOMContentLoaded', () => {
    // Starry Background
    if (window.PremiumEffects) {
        PremiumEffects.Particles('#stars-container', {
            limit: 200,
            color: 'rgba(255, 255, 255, 0.8)',
            speed: 0.1
        });
    }

    // Moon Phase Scroll Effect
    const moon = document.querySelector('.moon-phase');
    window.addEventListener('scroll', () => {
        const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        // Simulate phase change by shifting shadow
        const shadowX = -40 + (scrollPercent * 80); // -40 to +40
        moon.style.boxShadow = `inset ${shadowX}px 0px 60px rgba(0,0,0,0.9)`;
    });

    // Orbital Menu
    const orbitalToggle = document.querySelector('.orbital-toggle');
    const orbitalMenu = document.querySelector('.orbital-menu');
    const orbitalLinks = orbitalMenu ? orbitalMenu.querySelectorAll('a') : [];

    if (orbitalToggle && orbitalMenu) {
        orbitalToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = orbitalMenu.classList.toggle('active');
            
            // Icon Switch
            const icon = orbitalToggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!orbitalMenu.contains(e.target) && orbitalMenu.classList.contains('active')) {
                orbitalMenu.classList.remove('active');
                const icon = orbitalToggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
            }
        });

        // Close when link clicked
        orbitalLinks.forEach(link => {
            link.addEventListener('click', () => {
                orbitalMenu.classList.remove('active');
                const icon = orbitalToggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
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

    document.querySelectorAll('.moon-card, .schedule-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
