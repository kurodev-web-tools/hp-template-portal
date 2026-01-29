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

    // Mobile Menu (System Crash)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();

            // If already active, just close it
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'fingerprint';
                document.body.style.overflow = '';
                return;
            }

            // Trigger Crash Sequence
            document.body.classList.add('crashing');

            // Audio glitch effect placeholder (optional)
            // if (window.AudioContext) { ... }

            setTimeout(() => {
                document.body.classList.remove('crashing');
                menu.classList.add('active');
                toggle.classList.add('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'close';

                document.body.style.overflow = 'hidden';
            }, 300); // 300ms crash duration
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'fingerprint';

                document.body.style.overflow = '';
            });
        });
    }


    // Random RGB split intensification on scroll
    window.addEventListener('scroll', () => {
        const title = document.querySelector('.hero-title');
        const offset = Math.min(20, window.pageYOffset / 50);
        title.style.setProperty('--glitch-offset', `${offset}px`);
    });
});
