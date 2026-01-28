document.addEventListener('DOMContentLoaded', () => {
    // Shockwave Effect on Scroll
    const container = document.querySelector('.snap-container');
    const wave = document.querySelector('.shockwave-overlay');
    let isScrolling;

    // Mobile Menu
    const toggle = document.querySelector('.menu-btn');
    const menu = document.querySelector('.mobile-menu');

    // Toggle Menu
    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'menu';
    });

    // Close on Link Click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'menu';
        });
    });

    // Detect section change
    let currentSection = 0;
    const sections = document.querySelectorAll('.snap-section');

    // Track user interaction to allow vibration
    let userInteracted = false;
    const enableInteraction = () => { userInteracted = true; };
    document.addEventListener('click', enableInteraction, { once: true });
    document.addEventListener('touchstart', enableInteraction, { once: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger shockwave
                wave.classList.remove('shockwave-active');
                void wave.offsetWidth; // Trigger reflow
                wave.classList.add('shockwave-active');

                // Haptics - only if user has interacted
                // Double check with userActivation API if available to prevent console noise
                const isActive = userInteracted || (navigator.userActivation && navigator.userActivation.hasBeenActive);

                if (navigator.vibrate && isActive) {
                    try {
                        navigator.vibrate(20);
                    } catch (e) {
                        console.debug('Vibration blocked', e);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});
