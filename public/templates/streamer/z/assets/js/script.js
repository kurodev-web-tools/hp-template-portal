document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'circle';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'circle';
                document.body.style.overflow = '';
            });
        });
    }

    // Enso circle replay on click (optional interaction)
    const enso = document.querySelector('.enso-svg');
    if (enso) {
        enso.addEventListener('click', () => {
            const circle = enso.querySelector('circle');
            circle.style.animation = 'none';
            circle.offsetHeight; /* trigger reflow */
            circle.style.animation = 'draw 2s cubic-bezier(0.22, 1, 0.36, 1) forwards';
        });
    }
});

// ============================================
// ZEN INK SYSTEM - Ink Bleed Effect
// ============================================

class ZenInkSystem {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.washiBg = document.querySelector('.washi-bg');
        this.sections = document.querySelectorAll('.page-content .section-inner, .hero');
        this.enso = document.querySelector('.enso-svg');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.init();
    }

    init() {
        // Create ink canvas overlay
        this.createInkCanvas();

        if (this.isMobile) {
            this.setupMobileBleedIn();
        } else {
            this.setupPCInkDraw();
        }
    }

    createInkCanvas() {
        const canvas = document.createElement('div');
        canvas.className = 'ink-canvas';
        document.body.appendChild(canvas);
        this.inkCanvas = canvas;
    }

    setupPCInkDraw() {
        // Click to create ink drops
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav') || e.target.closest('.mobile-toggle')) return;
            this.createInkDrop(e.clientX, e.clientY);
        });

        // Drag to draw ink trails
        document.addEventListener('mousedown', (e) => {
            if (e.target.closest('.nav') || e.target.closest('.mobile-toggle')) return;
            this.isDrawing = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.lastTime = Date.now();
            this.lastVelocity = 0;
            this.lastAngle = null;
            this.createInkDrop(e.clientX, e.clientY);
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDrawing) return;

            const now = Date.now();
            const dt = now - this.lastTime;
            const dx = e.clientX - this.lastX;
            const dy = e.clientY - this.lastY;
            const distance = Math.hypot(dx, dy);

            // Create trail points along the path
            // Increased resolution: from 5px to 2px for ultimate smoothness
            if (distance > 2) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const velocity = distance / (dt || 1); // px per ms

                const steps = Math.floor(distance / 2);
                for (let i = 0; i < steps; i++) {
                    const t = i / steps;
                    const x = this.lastX + dx * t;
                    const y = this.lastY + dy * t;

                    // Simple Smoothing (EMA) for angle to prevent sudden "jumps" during curves
                    let smoothedAngle = angle;
                    if (this.lastAngle !== null) {
                        // Handle angle wrapping (e.g. 179 to -179)
                        let diff = angle - this.lastAngle;
                        if (diff > 180) diff -= 360;
                        if (diff < -180) diff += 360;
                        smoothedAngle = this.lastAngle + diff * t;
                    }

                    // Velocity smoothing
                    const smoothedVelocity = this.lastVelocity + (velocity - this.lastVelocity) * t;

                    this.createInkTrail(x, y, smoothedVelocity, smoothedAngle);
                }

                this.lastX = e.clientX;
                this.lastY = e.clientY;
                this.lastTime = now;
                this.lastVelocity = velocity;
                this.lastAngle = angle;
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
    }

    setupMobileBleedIn() {
        // Use IntersectionObserver for section bleed-in
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add bleed-in effect
                    entry.target.classList.add('bleeding');

                    // Create ink drops at section boundaries
                    const rect = entry.target.getBoundingClientRect();
                    this.createInkDrop(rect.left + rect.width / 2, rect.top + 50);

                    setTimeout(() => {
                        entry.target.classList.remove('bleeding');
                    }, 1500);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        this.sections.forEach(section => {
            section.classList.add('section-bleed-in');
            observer.observe(section);
        });
    }

    createInkDrop(x, y) {
        const drop = document.createElement('div');
        drop.className = 'ink-drop';

        // Random size for natural variation
        const size = 30 + Math.random() * 50;

        drop.style.width = size + 'px';
        drop.style.height = size + 'px';
        drop.style.left = (x - size / 2) + 'px';
        drop.style.top = (y - size / 2) + 'px';

        this.inkCanvas.appendChild(drop);

        // Trigger animation
        requestAnimationFrame(() => {
            drop.classList.add('spreading');
        });

        // Remove after animation
        setTimeout(() => {
            drop.remove();
        }, 3000);

        // Temporarily enhance washi background
        if (this.washiBg) {
            this.washiBg.classList.add('ink-active');
            setTimeout(() => {
                this.washiBg.classList.remove('ink-active');
            }, 2000);
        }
    }

    createInkTrail(x, y, velocity, angle) {
        const trail = document.createElement('div');
        trail.className = 'ink-trail';

        // Brush width/opacity varies with speed
        // Faster = thinner and lighter (Scored brush look)
        const scale = Math.max(0.2, 1 - (velocity * 0.2));
        const opacity = Math.max(0.1, 0.8 - (velocity * 0.1));

        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
        trail.style.opacity = opacity;

        this.inkCanvas.appendChild(trail);

        setTimeout(() => {
            trail.classList.add('drying');
            setTimeout(() => trail.remove(), 1200);
        }, 300); // Shorter lag before drying starts
    }
}

// Initialize
const zenInk = new ZenInkSystem();
