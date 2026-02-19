/**
 * Tilt Effect
 * Applies a 3D tilt effect to elements on hover.
 */
export function Tilt(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    const max = options.max || 10; // Max tilt in degrees
    const perspective = options.perspective || 1000; // CSS perspective
    const scale = options.scale || 1.05; // Scale on hover

    elements.forEach(el => {
        el.style.transformStyle = 'preserve-3d'; // Ensure 3D

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -max; // Invert Y for correct tilt
            const rotateY = ((x - centerX) / centerX) * max;

            // Fast transition for movement
            el.style.transition = 'transform 0.1s ease-out';
            el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        });

        el.addEventListener('mouseleave', () => {
            // Slower easing for return
            el.style.transition = 'transform 0.5s ease-out';
            el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });

        el.addEventListener('mouseenter', () => {
            // Reset transition to be fast on enter
            el.style.transition = 'transform 0.1s ease-out';
        });
    });
}
