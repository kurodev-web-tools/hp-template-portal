/**
 * Hyperspeed (Starfield Warp) Effect (Canvas)
 * Returns an instance with setColor() for dynamic color changes.
 */
export function Hyperspeed(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return null;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = options.zIndex || '-1';

    const ctx = canvas.getContext('2d');

    let width, height;
    const stars = [];
    const STAR_COUNT = options.count || 300;
    const SPEED = options.speed || 15;

    let currentColor = options.starColor || '#FFFFFF';
    const DEFAULT_COLOR = options.starColor || '#FFFFFF';

    function resize() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        if (stars.length === 0) initStars();
    }

    function initStars() {
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: (Math.random() - 0.5) * width * 2,
                y: (Math.random() - 0.5) * height * 2,
                z: Math.random() * 2000
            });
        }
    }

    function animate() {
        ctx.fillStyle = `rgba(${options.bgColor || '10, 10, 10'}, 0.3)`;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = currentColor;

        const cx = width / 2;
        const cy = height / 2;

        stars.forEach(star => {
            star.z -= SPEED;
            if (star.z <= 0) {
                star.z = 2000;
                star.x = (Math.random() - 0.5) * width * 2;
                star.y = (Math.random() - 0.5) * height * 2;
            }
            const scale = 500 / star.z;
            const sx = cx + star.x * scale;
            const sy = cy + star.y * scale;
            const r = (1 - star.z / 2000) * 4;
            ctx.beginPath();
            ctx.arc(sx, sy, Math.max(0, r), 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    return {
        setColor: (color) => { currentColor = color; },
        resetColor: () => { currentColor = DEFAULT_COLOR; },
        getColor: () => currentColor
    };
}
