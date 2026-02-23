/**
 * Aurora Background Effect
 * Creates drifting blurred, colored ORBS to simulate aurora.
 */
export function Aurora(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) return;

    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'absolute';
    }
    container.style.overflow = 'hidden';
    container.style.background = options.bg || 'transparent';

    const colors = options.colors || ['#ff0055', '#7000ff', '#00f2ff'];
    const orbs = [];

    colors.forEach((color, i) => {
        const orb = document.createElement('div');
        orb.style.position = 'absolute';
        orb.style.width = '60vw';
        orb.style.height = '60vw';
        orb.style.borderRadius = '50%';
        orb.style.background = color;
        orb.style.filter = 'blur(80px)';
        orb.style.opacity = '0.6';
        orb.style.mixBlendMode = 'overlay';

        orb.style.top = Math.random() * 100 + '%';
        orb.style.left = Math.random() * 100 + '%';

        orb.dataset.vx = (Math.random() - 0.5) * 0.5;
        orb.dataset.vy = (Math.random() - 0.5) * 0.5;
        orb.dataset.x = parseFloat(orb.style.left);
        orb.dataset.y = parseFloat(orb.style.top);

        container.appendChild(orb);
        orbs.push(orb);
    });

    function animate() {
        orbs.forEach(orb => {
            let x = parseFloat(orb.dataset.x);
            let y = parseFloat(orb.dataset.y);
            let vx = parseFloat(orb.dataset.vx);
            let vy = parseFloat(orb.dataset.vy);

            x += vx;
            y += vy;

            if (x < -50 || x > 100) vx *= -1;
            if (y < -50 || y > 100) vy *= -1;

            orb.dataset.x = x;
            orb.dataset.y = y;
            orb.dataset.vx = vx;
            orb.dataset.vy = vy;

            orb.style.left = x + '%';
            orb.style.top = y + '%';
        });
        requestAnimationFrame(animate);
    }

    animate();
}
