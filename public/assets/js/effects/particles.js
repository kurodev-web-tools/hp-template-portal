/**
 * Particles Effect
 * Renders interactive floating particles using Canvas 2D.
 */
export function Particles(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Allow clicks through
    canvas.style.zIndex = options.zIndex || '0';

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;

    const particles = [];
    const limit = options.limit || 150;
    const mouse = { x: null, y: null };

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * (options.speed || 0.2);
            this.vy = (Math.random() - 0.5) * (options.speed || 0.2);
            this.size = Math.random() * 1.5 + 0.5; // 0.5 - 2.0
            this.baseColor = options.color || 'rgba(255, 255, 255, 0.5)';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Mouse Repulse
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 100;

                if (distance < forceDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (forceDistance - distance) / forceDistance;
                    const directionX = forceDirectionX * force * 0.5; // Repulse strength
                    const directionY = forceDirectionY * force * 0.5;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.baseColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;

        particles.length = 0;
        const count = Math.min(limit, Math.floor(width / 10)); // Responsive count
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    const onResize = () => init();
    const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
        mouse.x = null;
        mouse.y = null;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    init();
    animate();

    return {
        destroy: () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(animationId);
            if (container.contains(canvas)) container.removeChild(canvas);
        }
    };
}
