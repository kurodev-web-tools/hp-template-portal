/**
 * Template D (Dynamic) - Specific Script
 * Handles Parallax and ScrollSpy
 */

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initScrollSpy();
});

function initParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const heroContent = document.querySelector('.hero-content');

    if (!parallaxBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Simple parallax logic
        // Background moves slower than Scroll (0.5 speed)
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;

        // Hero content fades out and moves slightly up
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.dynamic-header nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Offset for fixed header (approx 100px)
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}
