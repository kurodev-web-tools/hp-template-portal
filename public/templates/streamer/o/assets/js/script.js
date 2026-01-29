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

    // Mobile Menu (Planetary Ring)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    // Parallax Effect Variables
    const systemContainer = document.querySelector('.system-container');
    let mouseX = 0, mouseY = 0;

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active', isActive);
            toggle.querySelector('.material-icons').textContent = isActive ? 'close_fullscreen' : 'rocket_launch';

            // Add/Remove Parallax Listeners

            // Add/Remove Parallax Listeners
            if (isActive) {
                document.addEventListener('mousemove', handleParallax);
                document.addEventListener('touchmove', handleTouchParallax, { passive: false });
            } else {
                document.removeEventListener('mousemove', handleParallax);
                document.removeEventListener('touchmove', handleTouchParallax);
                // Reset transform
                if (systemContainer) systemContainer.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.querySelector('.material-icons').textContent = 'rocket_launch';
                document.removeEventListener('mousemove', handleParallax);
                document.removeEventListener('mousemove', handleParallax);
                document.removeEventListener('touchmove', handleTouchParallax);
            });
        });
    }

    function handleParallax(e) {
        if (!systemContainer) return;
        const x = (window.innerWidth / 2 - e.clientX) / 20;
        const y = (window.innerHeight / 2 - e.clientY) / 20;
        systemContainer.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    }

    function handleTouchParallax(e) {
        if (!systemContainer) return;
        // e.preventDefault(); // Prevent scroll while interacting? Maybe not necessary if menu covers all
        const touch = e.touches[0];
        const x = (window.innerWidth / 2 - touch.clientX) / 20;
        const y = (window.innerHeight / 2 - touch.clientY) / 20;
        systemContainer.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    }
});
