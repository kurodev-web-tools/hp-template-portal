/**
 * Liquid Metal Effect
 * Renders fluid metaballs using Canvas 2D.
 */
export function LiquidMetal(selector, options = {}) {
    const container = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (!container) return null;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    // Full fill
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = options.zIndex || '-1';
    canvas.style.pointerEvents = 'none'; // Ensure clicks pass through

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;

    const blobs = [];
    const COUNT = options.count || 6;
    const colors = options.colors || ['#00f2ff', '#7000ff', '#ff0055']; // Neon

    class Blob {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.r = Math.min(width, height) * (0.2 + Math.random() * 0.3); // Responsive radius
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce
            if (this.x < -this.r || this.x > width + this.r) this.vx *= -1;
            if (this.y < -this.r || this.y > height + this.r) this.vy *= -1;
        }

        draw(ctx) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');

            ctx.globalCompositeOperation = 'screen'; // Additive blending for light
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function resize() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function init() {
        for (let i = 0; i < COUNT; i++) {
            blobs.push(new Blob());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw blobs
        blobs.forEach(blob => {
            blob.update();
            blob.draw(ctx);
        });

        // Simulate specularity
        ctx.globalCompositeOperation = 'overlay';
        blobs.forEach(blob => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(blob.x - blob.vx * 10, blob.y - blob.vy * 10, blob.r * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    }

    const onResize = () => {
        resize();
    };

    window.addEventListener('resize', onResize);
    resize();
    init();
    animate();

    return {
        destroy: () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationId);
            if (container.contains(canvas)) {
                container.removeChild(canvas);
            }
        }
    };
}
