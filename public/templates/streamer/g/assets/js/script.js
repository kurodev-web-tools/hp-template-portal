document.addEventListener('DOMContentLoaded', () => {
    // Whiteout transition effect on load
    const whiteout = document.querySelector('.whiteout-overlay');
    whiteout.style.opacity = '1';
    setTimeout(() => {
        whiteout.style.opacity = '0';
    }, 200);

    // Occasional whiteout flash
    setInterval(() => {
        if (Math.random() > 0.98) {
            whiteout.style.opacity = '0.3';
            setTimeout(() => {
                whiteout.style.opacity = '0';
            }, 50);
        }
    }, 1000);

    // Mobile Menu (System Crash)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();

            // If already active, just close it
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'fingerprint';
                document.body.style.overflow = '';
                return;
            }

            // Trigger Crash Sequence
            document.body.classList.add('crashing');

            // Audio glitch effect placeholder (optional)
            // if (window.AudioContext) { ... }

            setTimeout(() => {
                document.body.classList.remove('crashing');
                menu.classList.add('active');
                toggle.classList.add('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'close';

                document.body.style.overflow = 'hidden';
            }, 300); // 300ms crash duration
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'fingerprint';

                document.body.style.overflow = '';
            });
        });
    }


    // Random RGB split intensification on scroll
    window.addEventListener('scroll', () => {
        const title = document.querySelector('.hero-title');
        const offset = Math.min(20, window.pageYOffset / 50);
        title.style.setProperty('--glitch-offset', `${offset}px`);
    });

    // Initialize Active Glitch Effect
    const activeGlitch = new ActiveGlitch();
});

// ============================================
// ACTIVE GLITCH (Error Jitter) EFFECT
// ============================================

class ActiveGlitch {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.body = document.body;
        this.heroTitle = document.querySelector('.hero-title');
        this.glitchElements = document.querySelectorAll('.glitch-effect, .hero-title');
        
        // Mouse tracking
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
        this.velocity = 0;
        this.lastMoveTime = Date.now();
        
        // Glitch state
        this.isGlitching = false;
        this.glitchIntensity = 0;
        this.rafId = null;
        
        // Clip-path variations
        this.clipPatterns = [
            'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            'polygon(0 0, 100% 0, 100% 33%, 0 66%)',
            'polygon(0 33%, 100% 0, 100% 66%, 0 100%)',
            'polygon(0 0, 50% 0, 100% 50%, 100% 100%, 50% 100%, 0 50%)',
            'polygon(25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%, 0 25%)',
            'polygon(0 10%, 100% 0, 90% 100%, 10% 90%)',
            'polygon(10% 0, 90% 10%, 100% 90%, 0 100%)'
        ];
        
        this.init();
    }
    
    init() {
        if (this.isMobile) {
            this.initMobileGlitches();
        } else {
            this.initPCGlitches();
        }
        
        // Start animation loop
        this.animate();
    }
    
    initPCGlitches() {
        // Track mouse velocity
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            const dt = Math.max(1, now - this.lastMoveTime) / 1000; // seconds
            
            // Calculate velocity
            const dx = e.clientX - this.mouse.prevX;
            const dy = e.clientY - this.mouse.prevY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            this.velocity = distance / dt;
            
            // Update mouse position
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.lastMoveTime = now;
        }, { passive: true });
        
        // Add micro-noise class for static state
        this.body.classList.add('micro-noise');
    }
    
    initMobileGlitches() {
        // Random epileptic glitches
        const triggerGlitch = () => {
            this.triggerEpilepticGlitch();
            
            // Schedule next glitch (1-4 seconds)
            const nextDelay = 1000 + Math.random() * 3000;
            setTimeout(triggerGlitch, nextDelay);
        };
        
        // Start after initial delay
        setTimeout(triggerGlitch, 2000);
    }
    
    triggerEpilepticGlitch() {
        const duration = 150 + Math.random() * 200; // 150-350ms
        const startTime = Date.now();
        
        // Apply heavy glitch
        this.body.classList.add('rgb-split-max');
        this.body.classList.add('screen-distort');
        
        // Random clip-path
        const randomClip = this.clipPatterns[Math.floor(Math.random() * this.clipPatterns.length)];
        this.body.style.setProperty('--glitch-clip', randomClip);
        
        // Apply to hero title
        if (this.heroTitle) {
            const randomSkew = (Math.random() - 0.5) * 10;
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 10;
            this.body.style.setProperty('--glitch-skew', `${randomSkew}deg`);
            this.body.style.setProperty('--glitch-x', `${randomX}px`);
            this.body.style.setProperty('--glitch-y', `${randomY}px`);
        }
        
        // End glitch after duration
        setTimeout(() => {
            this.body.classList.remove('rgb-split-max');
            this.body.classList.remove('screen-distort');
            this.body.style.setProperty('--glitch-clip', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)');
            this.body.style.setProperty('--glitch-skew', '0deg');
            this.body.style.setProperty('--glitch-x', '0px');
            this.body.style.setProperty('--glitch-y', '0px');
        }, duration);
    }
    
    calculateGlitchIntensity() {
        if (this.isMobile) return 0;
        
        // Decay velocity over time
        const now = Date.now();
        const timeSinceMove = (now - this.lastMoveTime) / 1000;
        
        if (timeSinceMove > 0.1) {
            this.velocity *= 0.9; // Decay
        }
        
        // Normalize velocity to 0-1 range (0-2000 pixels/second)
        const normalizedVelocity = Math.min(1, this.velocity / 2000);
        return normalizedVelocity;
    }
    
    animate() {
        if (!this.isMobile) {
            const intensity = this.calculateGlitchIntensity();
            
            if (intensity > 0.3) {
                // Active glitch based on mouse speed
                const skew = (Math.random() - 0.5) * intensity * 15;
                const x = (Math.random() - 0.5) * intensity * 20;
                const y = (Math.random() - 0.5) * intensity * 10;
                const rgbSplit = intensity * 20;
                
                this.body.style.setProperty('--glitch-skew', `${skew}deg`);
                this.body.style.setProperty('--glitch-x', `${x}px`);
                this.body.style.setProperty('--glitch-y', `${y}px`);
                this.body.style.setProperty('--glitch-rgb-split', `${rgbSplit}px`);
                
                // Random clip-path for high intensity
                if (intensity > 0.7 && Math.random() > 0.7) {
                    const clip = this.clipPatterns[Math.floor(Math.random() * this.clipPatterns.length)];
                    this.body.style.setProperty('--glitch-clip', clip);
                }
            } else {
                // Reset for static/micro-glitch state
                this.body.style.setProperty('--glitch-skew', '0deg');
                this.body.style.setProperty('--glitch-x', '0px');
                this.body.style.setProperty('--glitch-y', '0px');
                this.body.style.setProperty('--glitch-rgb-split', '0px');
                this.body.style.setProperty('--glitch-clip', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)');
            }
        }
        
        this.rafId = requestAnimationFrame(() => this.animate());
    }
}
