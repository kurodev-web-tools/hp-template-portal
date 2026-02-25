/**
 * Infinite Portfolio Theme - JS Effects
 * 特殊仕様: Canvas Z軸ワープスターフォース, SVG Constellation生成
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        initCustomCursor();
        initNavigation();
        initCanvasStarfield();
        initCountdown();
        initConstellationSVG();
    }

    // ============================================
    // Custom Cursor with LERP
    // ============================================
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        if (window.matchMedia('(pointer: coarse)').matches) {
            cursor.style.display = 'none';
            return;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        gsap.set(cursor, { x: cursorX, y: cursorY });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;

            gsap.set(cursor, { x: cursorX, y: cursorY, overwrite: true });
        });

        const updateHover = (isHover) => {
            if (isHover) cursor.classList.add('hover');
            else cursor.classList.remove('hover');
        };

        document.querySelectorAll('a, button, input, textarea, .star-node').forEach(el => {
            el.addEventListener('mouseenter', () => updateHover(true));
            el.addEventListener('mouseleave', () => updateHover(false));
        });
    }

    // ============================================
    // Navigation (Golden Master)
    // ============================================
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.background = 'rgba(11, 13, 23, 0.98)';
                    navMenu.style.padding = '3rem 2rem';
                    navMenu.style.gap = '2rem';
                    navMenu.style.borderBottom = '1px solid #22D3EE';
                    navMenu.style.textAlign = 'center';
                }
            });

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.innerWidth <= 768) navMenu.style.display = 'none';

                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        gsap.to(window, {
                            duration: 1.5,
                            scrollTo: target,
                            ease: 'power3.inOut'
                        });
                    }
                });
            });
        }
    }

    // ============================================
    // Canvas 3D Starfield (Warp Effect)
    // ============================================
    function initCanvasStarfield() {
        const canvas = document.getElementById('starfield');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Optimizing dot count for mobile
        const isMobile = window.innerWidth <= 768;
        const numStars = isMobile ? 300 : 800;
        const stars = [];
        let speed = 2; // base speed

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width - canvas.width / 2;
                this.y = Math.random() * canvas.height - canvas.height / 2;
                this.z = Math.random() * canvas.width;
                this.pz = this.z;
            }
            update() {
                this.z -= speed;
                if (this.z < 1) {
                    this.z = canvas.width;
                    this.x = Math.random() * canvas.width - canvas.width / 2;
                    this.y = Math.random() * canvas.height - canvas.height / 2;
                    this.pz = this.z;
                }
            }
            draw() {
                const sx = (this.x / this.z) * canvas.width + canvas.width / 2;
                const sy = (this.y / this.z) * canvas.height + canvas.height / 2;
                const r = Math.max(0.1, (1.5 - this.z / canvas.width));

                const px = (this.x / this.pz) * canvas.width + canvas.width / 2;
                const py = (this.y / this.pz) * canvas.height + canvas.height / 2;

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.strokeStyle = `rgba(224, 231, 255, ${r})`;
                ctx.lineWidth = r * 2;
                ctx.stroke();

                this.pz = this.z;
            }
        }

        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Return speed to base slowly
            if (speed > 2) speed -= 0.1;

            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        // Speed up on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            speed = 15; // Warp speed
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { speed = 2; }, 100);
        });
    }

    // ============================================
    // Countdown Animation
    // ============================================
    function initCountdown() {
        const valEl = document.querySelector('.countdown-val');
        if (!valEl) return;

        let obj = { val: 9999 };
        ScrollTrigger.create({
            trigger: '.about',
            start: 'top 50%',
            once: true,
            onEnter: () => {
                gsap.to(obj, {
                    val: 142, // Target arbitrary Light Years
                    duration: 3,
                    ease: "power2.out",
                    onUpdate: () => {
                        valEl.textContent = Math.floor(obj.val).toLocaleString();
                    }
                });
            }
        });
    }

    // ============================================
    // SVG Constellation Generator
    // ============================================
    function initConstellationSVG() {
        const svg = document.getElementById('constellation-svg');
        const container = document.querySelector('.starmap-container');
        const nodes = document.querySelectorAll('.star-node');
        if (!svg || !container || nodes.length === 0) return;

        function drawLines() {
            // Clear existing lines
            svg.innerHTML = '';
            const rect = container.getBoundingClientRect();

            // Define connections (just connecting them all purely sequentially or randomized)
            // Let's connect them sequentially 1->2, 2->3, etc. and maybe some cross links
            const positions = Array.from(nodes).map(node => {
                const nRect = node.getBoundingClientRect();
                return {
                    x: (nRect.left - rect.left) + (nRect.width / 2),
                    y: (nRect.top - rect.top) + (nRect.height / 2)
                };
            });

            // Draw sequence
            for (let i = 0; i < positions.length; i++) {
                const start = positions[i];
                // Connect to next
                if (i < positions.length - 1) {
                    createLine(start, positions[i + 1]);
                }
                // Connect to next+2 for webbing
                if (i < positions.length - 2) {
                    createLine(start, positions[i + 2]);
                }
            }
        }

        function createLine(p1, p2) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', p1.x);
            line.setAttribute('y1', p1.y);
            line.setAttribute('x2', p2.x);
            line.setAttribute('y2', p2.y);
            svg.appendChild(line);
        }

        // Draw initially and on resize
        drawLines();
        window.addEventListener('resize', drawLines);

        // Optional: Animate the lines drawing in
        gsap.from('#constellation-svg line', {
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 70%'
            },
            strokeDashoffset: 100,
            strokeDasharray: 100,
            duration: 2,
            stagger: 0.2,
            ease: "power1.inOut"
        });
    }

})();
