document.addEventListener('DOMContentLoaded', () => {
    // Flashlight Effect
    const overlay = document.querySelector('.darkness-overlay');
    
    if (window.matchMedia("(min-width: 769px)").matches) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            overlay.style.setProperty('--x', `${x}px`);
            overlay.style.setProperty('--y', `${y}px`);
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Random Creepy Sound or Effect (Visual only for now)
    setInterval(() => {
        if (Math.random() > 0.95) {
            document.body.style.filter = 'invert(1)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 50);
        }
    }, 5000);

    // Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scare-card, .secret-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
