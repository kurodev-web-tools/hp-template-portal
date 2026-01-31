document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hex Grid Background Effect
    const hexGrid = new HexGridEffect('.circuit-bg');

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // For button animation if any

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'terminal';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'terminal';

                document.body.style.overflow = '';
            });
        });
    }

    // Animate numbers in footer status occasionally
    const statusText = document.querySelector('.widget-footer');
    if (statusText) {
        setInterval(() => {
            const code = Math.floor(Math.random() * 9000) + 1000;
            statusText.innerText = `STATUS: OPTIMAL // ENCRYPTION: ACTIVE // NODE_${code}`;
        }, 5000);
    }

    // Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.widget, .hero-widget').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});

// ============================================
// HEX GRID BACKGROUND EFFECT
// ============================================

class HexGridEffect {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'hex-canvas';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Configuration
        this.hexRadius = 30;
        this.hexHeight = this.hexRadius * 2;
        this.hexWidth = Math.sqrt(3) * this.hexRadius;
        this.gridColor = 'rgba(0, 242, 255, 0.1)';
        this.glowColor = '#00f2ff';
        this.isMobile = window.innerWidth <= 768;

        // Mouse tracking
        this.mouse = { x: -1000, y: -1000 };
        this.mouseTrail = []; // Array of {x, y, intensity, age}

        // Pulse effects for mobile
        this.pulses = []; // Array of {x, y, radius, maxRadius, intensity}

        // Hex grid data
        this.hexes = [];

        // Initialize
        this.resize();
        this.initHexGrid();
        this.bindEvents();
        this.animate();

        // Check mode initially
        this.handleModeSwitch();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cols = Math.ceil(this.canvas.width / (this.hexWidth * 0.75)) + 1;
        this.rows = Math.ceil(this.canvas.height / (this.hexHeight * 0.75)) + 1;

        // Update detected mode
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        if (wasMobile !== this.isMobile) {
            this.handleModeSwitch();
        }
    }

    handleModeSwitch() {
        if (this.isMobile) {
            this.startMobilePulses();
        } else {
            this.stopMobilePulses();
        }
    }

    initHexGrid() {
        this.hexes = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.hexWidth * 0.75;
                const y = row * this.hexHeight * 0.75 + (col % 2) * this.hexHeight * 0.25;
                this.hexes.push({ x, y, intensity: 0 });
            }
        }
    }

    bindEvents() {
        // Mouse tracking for PC (Always bound, but ignored in update if isMobile)
        window.addEventListener('mousemove', (e) => {
            if (this.isMobile) return; // Ignore on mobile

            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Add to trail
            this.mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                intensity: 1,
                age: 0
            });

            // Limit trail length
            if (this.mouseTrail.length > 10) {
                this.mouseTrail.shift();
            }
        }, { passive: true });

        // Resize handler
        window.addEventListener('resize', () => {
            this.resize();
            this.initHexGrid();
        });

        // Touch interaction (Tap triggers a ripple manually too)
        window.addEventListener('touchstart', (e) => {
            if (!this.isMobile) return;

            const touch = e.touches[0];
            this.createPulse(touch.clientX, touch.clientY);
        }, { passive: true });
    }

    startMobilePulses() {
        if (this.pulseInterval) return; // Already running

        // Create initial pulses
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.createPulse(), i * 1000);
        }

        // Continue creating pulses
        this.pulseInterval = setInterval(() => {
            if (this.pulses.length < 5) {
                this.createPulse();
            }
        }, 2000);
    }

    stopMobilePulses() {
        if (this.pulseInterval) {
            clearInterval(this.pulseInterval);
            this.pulseInterval = null;
        }
        this.pulses = [];
    }

    createPulse(x = null, y = null) {
        // use provided coords or random
        const px = x !== null ? x : Math.random() * this.canvas.width;
        const py = y !== null ? y : Math.random() * this.canvas.height;

        this.pulses.push({
            x: px,
            y: py,
            radius: 0,
            maxRadius: 150 + Math.random() * 100,
            intensity: 1,
            speed: 2 + Math.random() * 2
        });
    }

    drawHex(x, y, radius, intensity = 0) {
        const ctx = this.ctx;
        const angle = Math.PI / 3;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const hx = x + radius * Math.cos(angle * i - Math.PI / 6);
            const hy = y + radius * Math.sin(angle * i - Math.PI / 6);
            if (i === 0) {
                ctx.moveTo(hx, hy);
            } else {
                ctx.lineTo(hx, hy);
            }
        }
        ctx.closePath();

        if (intensity > 0) {
            // Glowing hex
            const alpha = intensity * 0.8;
            ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Fill with glow
            ctx.fillStyle = `rgba(0, 242, 255, ${alpha * 0.3})`;
            ctx.fill();

            // Add glow effect
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 15 * intensity;
            ctx.stroke();
            ctx.shadowBlur = 0;
        } else {
            // Normal hex
            ctx.strokeStyle = this.gridColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    update() {
        // Update mouse trail
        if (!this.isMobile) {
            this.mouseTrail = this.mouseTrail.filter(point => {
                point.age++;
                point.intensity = Math.max(0, 1 - point.age / 30);
                return point.intensity > 0;
            });
        }

        // Update pulses for mobile
        if (this.isMobile) {
            this.pulses = this.pulses.filter(pulse => {
                pulse.radius += pulse.speed;
                pulse.intensity = Math.max(0, 1 - pulse.radius / pulse.maxRadius);
                return pulse.intensity > 0;
            });
        }

        // Calculate intensity for each hex
        this.hexes.forEach(hex => {
            let maxIntensity = 0;

            if (!this.isMobile) {
                // Check mouse trail influence
                this.mouseTrail.forEach(point => {
                    const dist = this.getDistance(hex.x, hex.y, point.x, point.y);
                    const influenceRadius = 100;
                    if (dist < influenceRadius) {
                        const intensity = point.intensity * (1 - dist / influenceRadius);
                        maxIntensity = Math.max(maxIntensity, intensity);
                    }
                });

                // Direct mouse influence
                const mouseDist = this.getDistance(hex.x, hex.y, this.mouse.x, this.mouse.y);
                const mouseRadius = 80;
                if (mouseDist < mouseRadius) {
                    const intensity = 1 - mouseDist / mouseRadius;
                    maxIntensity = Math.max(maxIntensity, intensity);
                }
            } else {
                // Check pulse influence
                this.pulses.forEach(pulse => {
                    const dist = Math.abs(this.getDistance(hex.x, hex.y, pulse.x, pulse.y) - pulse.radius);
                    const waveWidth = 40;
                    if (dist < waveWidth) {
                        const intensity = pulse.intensity * (1 - dist / waveWidth);
                        maxIntensity = Math.max(maxIntensity, intensity);
                    }
                });
            }

            hex.intensity = maxIntensity;
        });
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw all hexes
        this.hexes.forEach(hex => {
            this.drawHex(hex.x, hex.y, this.hexRadius, hex.intensity);
        });
    }

    animate() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}
