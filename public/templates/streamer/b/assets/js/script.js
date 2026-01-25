document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bg = document.querySelector('.parallax-bg');
        bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });

    // HP Bar Animation on Load
    const hpFill = document.querySelector('.hp-fill');
    setTimeout(() => {
        hpFill.style.width = '85%';
    }, 500);

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Smooth reveal for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.loot-item, .lore-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
