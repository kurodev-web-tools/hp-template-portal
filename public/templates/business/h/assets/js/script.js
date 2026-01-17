/* =========================================
   Template H (High-end) - Scripts
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.querySelector('.luxury-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Parallax Effect for Backgrounds
    const parallaxBgs = document.querySelectorAll('.parallax-bg, .split-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxBgs.forEach(bg => {
            // Simple parallax by translating background slightly slower than scroll
            // Note: For background-image, we often use background-position-y or transform
            // implementing via transform on the element itself if it's absolute
            // In CSS, .hero-bg is absolute high. 
            // Let's assume .hero-bg is an element we can move

            if (bg.classList.contains('hero-bg')) {
                bg.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    });
});
