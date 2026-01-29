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

    // Mobile Menu (Pause Screen)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.contains('active');

            if (!isActive) {
                // Open with glitch
                menu.classList.add('animate-open');
                // Small delay to let the glitch start before showing the menu container
                requestAnimationFrame(() => {
                    menu.classList.add('active');
                });

                document.body.style.overflow = 'hidden';
                toggle.querySelector('.material-icons').textContent = 'close';

                // Cleanup animation class
                setTimeout(() => {
                    menu.classList.remove('animate-open');
                }, 500);

            } else {
                // Close immediately
                menu.classList.remove('active');
                document.body.style.overflow = '';
                toggle.querySelector('.material-icons').textContent = 'drag_handle';
            }
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'drag_handle';
            });
        });
    }

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
