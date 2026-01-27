document.addEventListener('DOMContentLoaded', () => {
    // Whiteout transition effect on load
    const whiteout = document.querySelector('.whiteout-overlay');
    whiteout.style.opacity = '1';
    setTimeout(() => {
        whiteout.style.opacity = '0';
    }, 200);

    // Occasional whiteout flash
    setInterval(() => {
        if (Math.random() > 0.98) {
            whiteout.style.opacity = '0.3';
            setTimeout(() => {
                whiteout.style.opacity = '0';
            }, 50);
        }
    }, 1000);

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Fix: Close menu when link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
            document.body.style.overflow = '';
        });
    });

    // Random RGB split intensification on scroll
    window.addEventListener('scroll', () => {
        const title = document.querySelector('.hero-title');
        const offset = Math.min(20, window.pageYOffset / 50);
        title.style.setProperty('--glitch-offset', `${offset}px`);
    });
});
