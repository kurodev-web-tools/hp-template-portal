document.addEventListener('DOMContentLoaded', () => {
    // Warp Speed / Starfield
    if (window.PremiumEffects) {
        // Using Hyperspeed but slowly to simulate drifting
        const starfield = PremiumEffects.Hyperspeed('#starfield', {
            count: 200,
            speed: 0.5, // Slow drift
            starColor: '#ffffff'
        });
    }

    // Snap Scroll Observer to trigger zoom/fade
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.snap-section').forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = menu.querySelectorAll('a');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
        });
    });
});
