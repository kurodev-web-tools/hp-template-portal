document.addEventListener('DOMContentLoaded', () => {
    // Flashlight Effect
    const overlay = document.querySelector('.darkness-overlay');


    // Update variables on body to ensure inheritance works with @property
    window.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--x', `${e.clientX}px`);
        document.body.style.setProperty('--y', `${e.clientY}px`);
    });

    // Lights Toggle
    const lightBtn = document.querySelector('.lights-toggle');
    if (lightBtn) {
        lightBtn.addEventListener('click', () => {
            document.body.classList.toggle('lights-on');
            if (window.Haptics) window.Haptics.tap();

            const icon = lightBtn.querySelector('.material-icons');
            if (document.body.classList.contains('lights-on')) {
                icon.textContent = 'flashlight_off';
            } else {
                icon.textContent = 'highlight';
            }
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'priority_high';
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
