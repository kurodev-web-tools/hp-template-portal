/**
 * Premium Effects Library (Vanilla JS)
 * Ported from React Bits & Premium Aesthetics ideas.
 * 
 * Usage:
 * <script src="../../../assets/js/premium-effects.js"></script>
 * <script>
 *   new PremiumEffects.BlurText('.my-text', { delay: 50 });
 *   new PremiumEffects.Hyperspeed('.my-canvas-container');
 * </script>
 */

class PremiumEffects {

    /**
     * Blur Text Animation
     * Fades characters in from a blurred state.
     */
    static BlurText(selector, options = {}) {
        const defaults = {
            delay: 50,
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
        const settings = { ...defaults, ...options };

        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            el.style.overflow = 'hidden'; // Prevent scrollbars during transform

            // Wrap each letter
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.filter = 'blur(10px)';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all ${settings.duration}ms ${settings.easing}`;
                span.style.transitionDelay = `${index * settings.delay}ms`;
                if (char === ' ') span.style.width = '0.3em'; // Space preservation
                el.appendChild(span);
            });

            // Trigger animation on scroll or immediately
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const spans = entry.target.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.opacity = '1';
                            span.style.filter = 'blur(0px)';
                            span.style.transform = 'translateY(0)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(el);
        });
    }

    /**
     * Hyperspeed (Starfield Warp) Effect (Canvas)
     * Inspired by React Bits "Hyperspeed"
     */
    static Hyperspeed(containerSelector, options = {}) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        // CSS for standard full container fill
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
        const SPEED = options.speed || 15; // Z-speed

        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width;
            canvas.height = height;

            // Re-init stars if needed, or just let them loop
            if (stars.length === 0) initStars();
        }

        function initStars() {
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * width * 2, // Spread wider than screen
                    y: (Math.random() - 0.5) * height * 2,
                    z: Math.random() * 2000
                });
            }
        }

        function animate() {
            // Dark trail effect for "warp" feel
            ctx.fillStyle = `rgba(${options.bgColor || '26, 26, 26'}, 0.5)`; // Semi-transparent clear
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = options.starColor || '#FF4500'; // Theme primary

            const cx = width / 2;
            const cy = height / 2;

            stars.forEach(star => {
                // Move towards camera
                star.z -= SPEED;

                // Reset if passed camera
                if (star.z <= 0) {
                    star.z = 2000;
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                }

                // Project 3D to 2D
                const scale = 500 / star.z; // FOV
                const sx = cx + star.x * scale;
                const sy = cy + star.y * scale;
                const r = (1 - star.z / 2000) * 4; // Size based on proximity

                ctx.beginPath();
                ctx.arc(sx, sy, Math.max(0, r), 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }
    /**
     * Aurora Background Effect
     * Creates drifting blurred, colored ORBS to simulate aurora.
     * Lightweight alternative to WebGL.
     */
    static Aurora(selector, options = {}) {
        const container = document.querySelector(selector);
        if (!container) return;

        // Ensure container is relative/absolute and overflow hidden
        container.style.position = 'absolute';
        container.style.overflow = 'hidden';
        container.style.background = options.bg || 'transparent';

        const colors = options.colors || ['#ff0055', '#7000ff', '#00f2ff']; // Default Neon
        const orbs = [];

        // Create colored orbs
        colors.forEach((color, i) => {
            const orb = document.createElement('div');
            orb.style.position = 'absolute';
            orb.style.width = '60vw';
            orb.style.height = '60vw';
            orb.style.borderRadius = '50%';
            orb.style.background = color;
            orb.style.filter = 'blur(80px)';
            orb.style.opacity = '0.6';
            orb.style.mixBlendMode = 'overlay'; // or screen

            // Random start pos
            orb.style.top = Math.random() * 100 + '%';
            orb.style.left = Math.random() * 100 + '%';

            // Animation configs
            orb.dataset.vx = (Math.random() - 0.5) * 0.5; // Velocity
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

                // Bounce off edges (virtual edges wider than screen to hide turnaround)
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
    /**
     * Globe Effect (Canvas)
     * Renders a rotating 3D globe made of dots.
     */
    static Globe(selector, options = {}) {
        const container = document.querySelector(selector);
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const color = options.color || '#1E90FF';
        const bgColor = options.bg || '#0D1B2A';
        const size = options.size || 300; // Radius roughly

        let width, height;

        // Dot sphere
        const dots = [];
        const DOT_COUNT = 400;

        function initDots() {
            for (let i = 0; i < DOT_COUNT; i++) {
                // Spherical coordinates
                const theta = Math.random() * 2 * Math.PI; // Azimuth
                const phi = Math.acos((Math.random() * 2) - 1); // Elevation

                const r = size / 2; // Radius

                dots.push({
                    x: r * Math.sin(phi) * Math.cos(theta),
                    y: r * Math.sin(phi) * Math.sin(theta),
                    z: r * Math.cos(phi)
                });
            }
        }

        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            // Handle high DPI if needed, but keeping it simple for perf
            canvas.width = width;
            canvas.height = height;
        }

        let angle = 0;
        let isDragging = false;
        let startX = 0;
        let lastX = 0;

        // Interaction Handlers
        function onStart(e) {
            isDragging = true;
            startX = (e.touches ? e.touches[0].clientX : e.clientX);
            lastX = startX;
        }

        function onMove(e) {
            if (!isDragging) return;
            const x = (e.touches ? e.touches[0].clientX : e.clientX);
            const deltaX = x - lastX;
            angle += deltaX * 0.005; // Sensitivity
            lastX = x;
        }

        function onEnd() {
            isDragging = false;
        }

        container.addEventListener('mousedown', onStart);
        container.addEventListener('touchstart', onStart);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove);

        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);

        function animate() {
            // Clear
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = color;

            const cx = width / 2;
            const cy = height / 2;

            // Auto rotation if not dragging
            if (!isDragging) {
                angle += 0.002;
            }

            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            dots.forEach(dot => {
                // Rotate around Y axis
                const rotX = dot.x * cos - dot.z * sin;
                const rotZ = dot.z * cos + dot.x * sin;

                // Projection (Perspective)
                const dist = 500;
                const scale = dist / (dist - rotZ);

                const px = cx + rotX * scale;
                const py = cy + dot.y * scale;

                if (scale > 0) {
                    const alpha = (rotZ + size / 2) / size;
                    ctx.globalAlpha = Math.max(0.1, alpha + 0.5);

                    ctx.beginPath();
                    ctx.arc(px, py, 2 * scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        initDots();
        resize();
        animate();
    }
}

// Export to global scope
window.PremiumEffects = PremiumEffects;
