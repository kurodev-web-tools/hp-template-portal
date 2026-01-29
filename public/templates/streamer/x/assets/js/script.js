document.addEventListener('DOMContentLoaded', () => {
    // Shockwave Effect on Scroll
    const container = document.querySelector('.snap-container');
    const wave = document.querySelector('.shockwave-overlay');
    let isScrolling;

    // Mobile Menu
    const toggle = document.querySelector('.menu-btn');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // Added

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'menu';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close when clicking a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active'); // Added
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }


    // Detect section change
    let currentSection = 0;
    const sections = document.querySelectorAll('.snap-section');

    // Track user interaction to allow vibration
    let userInteracted = false;
    const enableInteraction = () => { userInteracted = true; };
    document.addEventListener('click', enableInteraction, { once: true });
    document.addEventListener('touchstart', enableInteraction, { once: true });

    const header = document.querySelector('.xtreme-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger shockwave
                wave.classList.remove('shockwave-active');
                void wave.offsetWidth; // Trigger reflow
                wave.classList.add('shockwave-active');

                // Header Theme Switching (Invert colors on white sections)
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                const isEvenSection = sectionIndex % 2 !== 0; // Sections 2, 4... are index 1, 3...
                if (header) {
                    header.classList.toggle('header-invert', isEvenSection);
                }

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
