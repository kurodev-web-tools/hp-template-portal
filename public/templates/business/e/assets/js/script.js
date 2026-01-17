/**
 * Template E (Eco) - Specific Script
 * Enhancements for organic interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Parallax logic for blob image if needed
    const blob = document.querySelector('.blob-image');

    if (blob) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.1;
            // Gentle rotation
            blob.style.transform = `rotate(${rate * 0.05}deg)`;
        });
    }
});
