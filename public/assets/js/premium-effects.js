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
}

// Export to global scope
window.PremiumEffects = PremiumEffects;
