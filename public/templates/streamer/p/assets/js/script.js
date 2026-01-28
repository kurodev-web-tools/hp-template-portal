document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
        });
    });

    // Hover sound effect (Optional if we want pure CSS vibe, but adds retro feel)
    // We won't load audio files to keep it simple, but we can vibrate
    document.querySelectorAll('a, button, .pixel-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (navigator.vibrate) navigator.vibrate(5);
        });
    });

    // Reveal Animation (Step-like)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pixel-card, .item-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.2s steps(5), transform 0.2s steps(5)';
        observer.observe(el);
    });
});
