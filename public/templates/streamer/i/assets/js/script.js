document.addEventListener('DOMContentLoaded', () => {
    // Initialize Sparkles Effect
    const sparkles = new SparklesEffect('#particles');

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'auto_fix_high';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'auto_fix_high';

                document.body.style.overflow = '';
            });
        });
    }

    // Hover effect for buttons (Simple bounce)
    document.querySelectorAll('.btn-idol').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px) scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });

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

    document.querySelectorAll('.profile-card, .fan-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});

// ============================================
// SPARKLES EFFECT - Kawaii Particle System
// ============================================

class SparklesEffect {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'sparkles-canvas';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Configuration
        this.colors = ['#ff9ecd', '#87cefa', '#ffffff']; // sakura-pink, accent-blue, white
        this.isMobile = window.innerWidth <= 768;
        
        // Particle settings
        this.particles = [];
        this.maxParticles = this.isMobile ? 30 : 80;
        this.mouse = { x: -1000, y: -1000 };
        this.lastMouseTime = 0;
        
        // Initialize
        this.resize();
        this.bindEvents();
        this.animate();
        
        // Start falling particles for mobile
        if (this.isMobile) {
            this.startFallingParticles();
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        // Resize handler
        window.addEventListener('resize', () => this.resize());

        // Mouse tracking for PC
        if (!this.isMobile) {
            document.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.lastMouseTime = Date.now();
                
                // Create trail particles
                if (Math.random() > 0.3) { // 70% chance to create particle
                    this.createTrailParticle(e.clientX, e.clientY);
                }
            }, { passive: true });
        }
    }

    createTrailParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift();
        }

        const particle = {
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 0.5, // Gravity
            size: Math.random() * 4 + 2,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            opacity: 1,
            type: this.getRandomShape(),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1
        };

        this.particles.push(particle);
    }

    createFallingParticle() {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift();
        }

        const particle = {
            x: Math.random() * this.canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 1,
            vy: Math.random() * 2 + 1, // Falling speed
            size: Math.random() * 6 + 3, // Larger for mobile
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            opacity: 0.8,
            type: this.getRandomShape(),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05
        };

        this.particles.push(particle);
    }

    startFallingParticles() {
        // Create particles continuously
        setInterval(() => {
            if (this.particles.length < this.maxParticles) {
                this.createFallingParticle();
            }
        }, 200);
    }

    getRandomShape() {
        const shapes = ['circle', 'star', 'cross', 'diamond'];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    drawShape(particle) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;

        switch (particle.type) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                ctx.fill();
                // Add glow
                ctx.shadowColor = particle.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
                break;

            case 'star':
                this.drawStar(ctx, 0, 0, 5, particle.size, particle.size / 2);
                break;

            case 'cross':
                const s = particle.size;
                ctx.fillRect(-s / 6, -s / 2, s / 3, s);
                ctx.fillRect(-s / 2, -s / 6, s, s / 3);
                break;

            case 'diamond':
                ctx.beginPath();
                ctx.moveTo(0, -particle.size / 2);
                ctx.lineTo(particle.size / 2, 0);
                ctx.lineTo(0, particle.size / 2);
                ctx.lineTo(-particle.size / 2, 0);
                ctx.closePath();
                ctx.fill();
                break;
        }

        ctx.restore();
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();

        // Add glow
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        // Update all particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            particle.opacity -= 0.005;

            // Remove if off screen or invisible
            if (particle.opacity <= 0 || particle.y > this.canvas.height + 10) {
                return false;
            }

            return true;
        });
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw all particles
        this.particles.forEach(particle => {
            this.drawShape(particle);
        });
    }

    animate() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}
