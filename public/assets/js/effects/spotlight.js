/**
 * Spotlight Effect
 * Creates a radial gradient that follows the mouse to simulate a flashlight.
 */
export function Spotlight(selector, options = {}) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
        // Ensure container relative for absolute positioning of spotlight
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }

        // Create spotlight element overlay
        const spotlight = document.createElement('div');
        spotlight.className = 'spotlight-overlay';
        spotlight.style.position = 'absolute';
        spotlight.style.inset = '0';
        spotlight.style.pointerEvents = 'none';
        spotlight.style.background = 'radial-gradient(circle 400px at 50% 50%, rgba(255,255,255,0.1), transparent)';
        spotlight.style.opacity = '0';
        spotlight.style.transition = 'opacity 0.3s';
        spotlight.style.zIndex = '1';

        // If element has border-radius, inherit it
        const borderRadius = getComputedStyle(el).borderRadius;
        spotlight.style.borderRadius = borderRadius;

        el.appendChild(spotlight);

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            spotlight.style.background = `radial-gradient(circle ${options.size || 300}px at ${x}px ${y}px, ${options.color || 'rgba(255, 255, 255, 0.15)'}, transparent)`;
            spotlight.style.opacity = '1';
        });

        el.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
    });
}
