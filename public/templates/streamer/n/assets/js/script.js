document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Random Neon Flicker
    const title = document.querySelector('.hero-title');
    setInterval(() => {
        if (Math.random() > 0.9) {
            title.style.opacity = (Math.random() * 0.5) + 0.5;
            setTimeout(() => {
                title.style.opacity = 1;
            }, 50);
        }
    }, 100);

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

    document.querySelectorAll('.sign-board, .social-btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
});
