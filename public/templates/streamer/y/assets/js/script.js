document.addEventListener('DOMContentLoaded', () => {
    // Chart Background (Simple Line Chart Animation)
    const canvas = document.getElementById('chart-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        const points = [];
        const speed = 2;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            points.length = 0;
            let x = 0;
            let y = height / 2;
            while (x < width + 100) {
                points.push({ x, y });
                x += 20;
                y += (Math.random() - 0.4) * 50; // Tend upwards
                if (y < 0) y = height / 2;
                if (y > height) y = height / 2;
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 0; i < points.length; i++) {
                points[i].x -= speed;
                if (i > 0) ctx.lineTo(points[i].x, points[i].y);
            }

            ctx.strokeStyle = '#4caf50';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Recycle points
            if (points[0].x < -50) {
                points.shift();
                const last = points[points.length - 1];
                let nextY = last.y - (Math.random() - 0.4) * 50; // Upward bias
                // Keep within bounds somewhat
                if (nextY < height * 0.2) nextY = height * 0.5;
                if (nextY > height * 0.8) nextY = height * 0.5;
                points.push({ x: last.x + 20, y: nextY });
            }

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }

    // Count Up
    if (window.PremiumEffects) {
        PremiumEffects.CountUp('.count-up', { duration: 2500 });
    }

    // Mobile Menu (Stock Ticker)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // Added

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'trending_up';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when clicking outside sidebar (on the ticker bg)
        menu.addEventListener('click', (e) => {
            if (e.target === menu || e.target.classList.contains('ticker-bg') || e.target.closest('.ticker-content')) {
                menu.classList.remove('active');
                toggle.classList.remove('active'); // Added
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'trending_up';
                document.body.style.overflow = '';
            }
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active'); // Added
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'trending_up';
                document.body.style.overflow = '';
});

// ============================================
// WEALTH GLINT SYSTEM - Gold Light Sweep
// ============================================

class WealthGlintSystem {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.statCards = document.querySelectorAll('.stat-card');
        this.heroTitle = document.querySelector('.hero-title');
        this.btnYield = document.querySelector('.btn-yield');
        this.glintTargets = [];
        
        this.init();
    }

    init() {
        // Collect all glint targets
        this.glintTargets = [
            ...this.statCards,
            this.heroTitle,
            this.btnYield
        ].filter(el => el); // Remove nulls

        // Add glint-effect class to all targets
        this.glintTargets.forEach(target => {
            target.classList.add('glint-effect');
        });

        if (this.isMobile) {
            this.setupMobilePeriodicShimmer();
        } else {
            this.setupPCHoverGlint();
        }
    }

    setupPCHoverGlint() {
        // PC: Hover triggers light sweep
        this.glintTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                this.triggerLightSweep(target);
            });
        });
    }

    setupMobilePeriodicShimmer() {
        // Mobile: Random periodic shimmer every 5-8 seconds
        this.scheduleNextShimmer();
    }

    scheduleNextShimmer() {
        const delay = 5000 + Math.random() * 3000; // 5-8 seconds
        
        setTimeout(() => {
            this.triggerRandomShimmer();
            this.scheduleNextShimmer();
        }, delay);
    }

    triggerRandomShimmer() {
        // Pick 1-2 random targets to shimmer
        const numTargets = 1 + Math.floor(Math.random() * 2);
        const shuffled = [...this.glintTargets].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, numTargets);

        selected.forEach((target, index) => {
            setTimeout(() => {
                target.classList.add('shimmer-pulse');
                
                setTimeout(() => {
                    target.classList.remove('shimmer-pulse');
                }, 2000);
            }, index * 300);
        });
    }

    triggerLightSweep(element) {
        // Add sweeping class
        element.classList.add('sweeping');
        element.classList.add('highlighting');

        // Remove after animation completes
        setTimeout(() => {
            element.classList.remove('sweeping');
        }, 600);

        setTimeout(() => {
            element.classList.remove('highlighting');
        }, 900);
    }
}

// Initialize
const wealthGlint = new WealthGlintSystem();
        });
    }

    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card, .invest-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
