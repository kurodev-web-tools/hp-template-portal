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
     * Returns an instance with setColor() for dynamic color changes.
     */
    static Hyperspeed(containerSelector, options = {}) {
        const container = document.querySelector(containerSelector);
        if (!container) return null;

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

        // Dynamic color state
        let currentColor = options.starColor || '#FFFFFF';
        const DEFAULT_COLOR = options.starColor || '#FFFFFF';

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
                    x: (Math.random() - 0.5) * width * 2,
                    y: (Math.random() - 0.5) * height * 2,
                    z: Math.random() * 2000
                });
            }
        }

        function animate() {
            // Dark trail effect for "warp" feel
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

        // Return instance with public methods
        return {
            setColor: (color) => { currentColor = color; },
            resetColor: () => { currentColor = DEFAULT_COLOR; },
            getColor: () => currentColor
        };
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

    /**
     * Magnetic Button Effect
     * Buttons that magnetically stick to the cursor movement.
     */
    static MagneticButton(selector, options = {}) {
        const buttons = document.querySelectorAll(selector);
        const sensitivity = options.sensitivity || 0.4; // movement strength

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * sensitivity}px, ${y * sensitivity}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    /**
     * CountUp Animation
     * Animates numbers from 0 to target value.
     */
    static CountUp(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        const duration = options.duration || 2000;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetText = el.innerText;
                    const target = parseInt(targetText.replace(/[^0-9]/g, ''), 10);

                    // If not a number, skip
                    if (isNaN(target)) return;

                    let start = 0;
                    const stepTime = Math.abs(Math.floor(duration / target));

                    // Simple interval for now, can be RAF for smoother high numbers
                    const timer = setInterval(() => {
                        start += Math.ceil(target / (duration / 16)); // approx 60fps
                        if (start > target) start = target;

                        // Preserve non-numeric suffix if any (e.g. "200+")
                        const suffix = targetText.replace(/[0-9]/g, '');
                        el.innerText = start + suffix;

                        if (start === target) {
                            clearInterval(timer);
                        }
                    }, 16);

                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        elements.forEach(el => observer.observe(el));
    }
    /**
     * 3D Tilt Effect
     * Tilts the element based on mouse position.
     */
    static Tilt(selector, options = {}) {
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
}

// Export to global scope
window.PremiumEffects = PremiumEffects;
