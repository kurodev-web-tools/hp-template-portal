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
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            baseDelay: 0
        };
        const settings = { ...defaults, ...options };

        let elements;
        if (typeof selector === 'string') {
            elements = document.querySelectorAll(selector);
        } else if (selector instanceof Element) {
            elements = [selector];
        } else if (selector instanceof NodeList || Array.isArray(selector)) {
            elements = selector;
        } else {
            return;
        }

        elements.forEach(el => {
            el.style.overflow = 'hidden';
            el.style.wordBreak = 'keep-all'; // Ensure words stay together unless broken by wbr/br

            // 1. Capture original nodes before we empty the container
            // We clone the childNodes to avoid issues when we empty el
            const originalNodes = Array.from(el.childNodes).map(node => node.cloneNode(true));

            // 2. Clear container
            el.innerHTML = '';

            // 3. Recursive walker
            let globalCharIndex = 0;

            function processNode(node, parent) {
                if (node.nodeType === Node.TEXT_NODE) {
                    // It's text, blast it apart by words first
                    // Coalesce all whitespace (spaces, newlines, tabs) into a single space,
                    // just like native HTML rendering behavior.
                    const normalizedText = node.textContent.replace(/\s+/g, ' ');

                    // Split by whitespace but keep delimiters to handle spaces
                    // This allows us to wrap "words" in nowrap containers
                    const parts = normalizedText.split(/(\s+)/);

                    parts.forEach(part => {
                        // Skip empty
                        if (!part) return;

                        // Check if it's whitespace
                        if (part.match(/^\s+$/)) {
                            // It's space/newline. 
                            // Render spaces individually as breakable inline-blocks (same as before)
                            // We don't wrap these in a nowrap container so line breaks can happen here.
                            [...part].forEach(char => {
                                if (char === '\n') return;

                                const span = document.createElement('span');
                                span.innerText = char;
                                span.style.display = 'inline-block';
                                span.style.opacity = '0';
                                span.style.filter = 'blur(10px)';
                                span.style.transform = 'translateY(20px)';
                                span.style.transition = `all ${settings.duration}ms ${settings.easing}`;
                                span.style.transitionDelay = `${settings.baseDelay + globalCharIndex * settings.delay}ms`;

                                // Explicit width for spaces
                                span.style.width = '0.25em';

                                parent.appendChild(span);
                                globalCharIndex++;
                            });
                        } else {
                            // It's a word! Wrap it to prevent breaking inside.
                            const wordWrapper = document.createElement('span');
                            wordWrapper.style.display = 'inline-block';
                            wordWrapper.style.whiteSpace = 'nowrap';
                            // wordWrapper.style.verticalAlign = 'top'; // Optional: ensure alignment

                            [...part].forEach(char => {
                                const span = document.createElement('span');
                                span.innerText = char;
                                span.style.display = 'inline-block';
                                span.style.opacity = '0';
                                span.style.filter = 'blur(10px)';
                                span.style.transform = 'translateY(20px)';
                                span.style.transition = `all ${settings.duration}ms ${settings.easing}`;
                                span.style.transitionDelay = `${settings.baseDelay + globalCharIndex * settings.delay}ms`;

                                wordWrapper.appendChild(span);
                                globalCharIndex++;
                            });

                            parent.appendChild(wordWrapper);
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // It's an element (like <br>, <wbr>, <span>)
                    const tagName = node.tagName.toLowerCase();

                    if (tagName === 'br' || tagName === 'wbr') {
                        // Void elements: just append the clone
                        parent.appendChild(node.cloneNode(true));
                    } else {
                        // Container elements: clone structure, recurse children
                        const newContainer = node.cloneNode(false); // shallow clone (attributes only)
                        parent.appendChild(newContainer);

                        // Process children of this node
                        Array.from(node.childNodes).forEach(child => processNode(child, newContainer));
                    }
                }
            }

            // 4. Start processing
            originalNodes.forEach(node => processNode(node, el));

            // 5. Trigger animation on scroll
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

                        // Preserve non-numeric suffix but ignore commas (formatting)
                        const suffix = targetText.replace(/[0-9,]/g, '');
                        // Format number with commas
                        el.innerText = start.toLocaleString() + suffix;

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

    /**
     * Liquid Metal Effect (iOS26 Style)
     * Renders fluid metaballs with chromatic aberration and high gloss.
     * Uses 2D Canvas for performance.
     * Returns a controller object { destroy: Function }
     */
    static LiquidMetal(selector, options = {}) {
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
            // Re-init blobs might be jarring, just resize canvas and let blobs float
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

    /**
     * Shooting Stars Effect
     * Spawns falling stars occasionally for ambient wonder.
     * Lightweight DOM-based implementation.
     */
    static ShootingStars(selector, options = {}) {
        const container = document.querySelector(selector);
        if (!container) return;

        const defaults = {
            frequency: 3000, // ms
            color: 'rgba(200, 240, 255, 0.8)',
            trailLength: 150
        };
        const settings = { ...defaults, ...options };

        // Ensure container relative/absolute for positioning
        const computedStyle = window.getComputedStyle(container);
        if (computedStyle.position === 'static') {
            container.style.position = 'relative';
        }

        // Add CSS styles dynamically if not present
        if (!document.getElementById('shooting-star-style')) {
            const style = document.createElement('style');
            style.id = 'shooting-star-style';
            style.textContent = `
                .shooting-star {
                    position: absolute;
                    height: 2px;
                    background: linear-gradient(-45deg, rgba(255,255,255,1), rgba(0,0,255,0));
                    border-radius: 999px;
                    filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
                    animation: tail 3s ease-in-out infinite, shooting 3s ease-in-out infinite;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 0;
                }
                @keyframes tail {
                    0% { width: 0; }
                    30% { width: 100px; }
                    100% { width: 0; }
                }
                @keyframes shooting {
                    0% { transform: translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateX(-300px) translateY(300px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        function spawnStar() {
            const star = document.createElement('div');
            star.classList.add('shooting-star');

            // Random start position (top-right focused)
            // We want them to fall from top right to bottom left mostly
            const startX = Math.random() * container.clientWidth;
            const startY = Math.random() * (container.clientHeight / 2); // Top half

            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;

            // Randomize animation duration slightly
            const duration = 2000 + Math.random() * 2000;
            star.style.animationDuration = `${duration}ms`;
            star.style.animationDelay = '0ms'; // Start immediately

            container.appendChild(star);

            // Cleanup
            star.addEventListener('animationend', () => {
                star.remove();
            });

            // Fallback cleanup
            setTimeout(() => {
                if (container.contains(star)) star.remove();
            }, duration + 100);
        }

        // Loop
        const interval = setInterval(spawnStar, settings.frequency);

        // Immediate spawn
        spawnStar();

        return {
            destroy: () => clearInterval(interval)
        };
    }

    /**
     * Particles (Star Field) Effect
     * Deep space ambience with mouse interaction.
     */
    static Particles(selector, options = {}) {
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
        // Density based count or fixed limit
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

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        init();
        animate();

        return {
            destroy: () => {
                window.removeEventListener('resize', init);
                cancelAnimationFrame(animationId);
                if (container.contains(canvas)) container.removeChild(canvas);
            }
        };
    }

    /**
     * Spotlight Effect
     * Creates a radial gradient that follows the mouse to simulate a flashlight.
     */
    static Spotlight(selector, options = {}) {
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
}

// Export to global scope
window.PremiumEffects = PremiumEffects;
