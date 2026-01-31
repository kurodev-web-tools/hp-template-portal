document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'settings';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'settings';
                document.body.style.overflow = '';
            });
        });
    }


    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'settings';
        });
    });

    // Steam Particle Effect (Simple simulation)
    // In a real scenario, use PremiumEffects.Particles with "steam" settings
    // Here we assume simple fade-in for page transitions is enough based on "Signature" description "CSS Fade"

    // Page Transition Simulation
    const content = document.querySelector('.page-content');
    if (content) {
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.transition = 'opacity 1s ease';
            content.style.opacity = '1';
        }, 100);
    }

    // Initialize Mechanical Gear System
    const gearSystem = new MechanicalGearSystem();
});

// ============================================
// MECHANICAL GEAR SYSTEM - Steam & Rotation
// ============================================

class MechanicalGearSystem {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.gearLeft = document.querySelector('.gear-left');
        this.gearRight = document.querySelector('.gear-right');
        this.bgGears = document.querySelectorAll('.bg-gear');
        this.needle = document.querySelector('.needle');
        this.pressureGauge = document.querySelector('.pressure-gauge');
        
        // Rotation state
        this.currentRotation = 0;
        this.rotationSpeed = 0;
        this.idleSpeed = 0.5; // Degrees per frame when idling
        this.maxSpeed = 15;
        this.friction = 0.95; // Inertia factor
        this.acceleration = 0;
        
        // Pressure gauge state
        this.currentPressure = -45; // Needle angle
        this.maxPressure = 45;
        this.minPressure = -45;
        this.isOverdrive = false;
        
        // Scroll tracking
        this.lastScrollY = window.scrollY;
        this.scrollDelta = 0;
        
        // Mobile steam burst
        this.mobileRotation = 0;
        this.steamInterval = null;
        
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileMode();
        } else {
            this.setupPCMode();
        }
        
        // Start animation loop
        this.animate();
    }

    setupPCMode() {
        // Track scroll speed
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            this.scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
            this.lastScrollY = currentScrollY;
            
            // Add scroll velocity to gear speed
            const scrollSpeed = Math.min(this.scrollDelta * 0.5, this.maxSpeed);
            this.rotationSpeed = Math.max(this.rotationSpeed, scrollSpeed);
            
            // Update pressure gauge based on scroll speed
            const targetPressure = this.minPressure + (this.scrollDelta / 10);
            this.currentPressure = Math.min(targetPressure, this.maxPressure);
            
            // Check for overdrive
            if (this.currentPressure >= this.maxPressure - 5 && !this.isOverdrive) {
                this.triggerOverdrive();
            }
        }, { passive: true });
    }

    setupMobileMode() {
        // Setup for constant slow rotation
        this.rotationSpeed = 1; // Constant slow speed
        
        // Add steam burst effect every few seconds
        this.steamInterval = setInterval(() => {
            this.triggerMobileSteamBurst();
        }, 3000 + Math.random() * 2000); // 3-5 seconds interval
    }

    triggerOverdrive() {
        this.isOverdrive = true;
        
        // Add overdrive class
        if (this.pressureGauge) {
            this.pressureGauge.classList.add('overdrive');
        }
        
        // Create steam from multiple vents
        this.createSteamVent(window.innerWidth * 0.1, window.innerHeight * 0.9);
        this.createSteamVent(window.innerWidth * 0.9, window.innerHeight * 0.9);
        this.createSteamVent(window.innerWidth * 0.5, window.innerHeight * 0.95);
        
        // Remove overdrive after a while
        setTimeout(() => {
            this.isOverdrive = false;
            if (this.pressureGauge) {
                this.pressureGauge.classList.remove('overdrive');
            }
        }, 2000);
    }

    triggerMobileSteamBurst() {
        // Random position at bottom of screen
        const x = 50 + Math.random() * (window.innerWidth - 100);
        const y = window.innerHeight - 50;
        
        // Create burst effect
        this.createSteamBurst(x, y);
        
        // Schedule next burst (random interval)
        clearInterval(this.steamInterval);
        this.steamInterval = setInterval(() => {
            this.triggerMobileSteamBurst();
        }, 4000 + Math.random() * 3000); // 4-7 seconds
    }

    createSteamVent(x, y) {
        // Create multiple steam particles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createSteamParticle(x + (Math.random() - 0.5) * 40, y);
            }, i * 100);
        }
    }

    createSteamParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'steam-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = (30 + Math.random() * 20) + 'px';
        particle.style.height = particle.style.width;
        
        document.body.appendChild(particle);
        
        // Trigger animation
        requestAnimationFrame(() => {
            particle.classList.add('rising');
        });
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    createSteamBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'steam-burst';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        
        document.body.appendChild(burst);
        
        // Trigger animation
        requestAnimationFrame(() => {
            burst.classList.add('bursting');
        });
        
        // Add smaller particles around burst
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createSteamParticle(
                    x + (Math.random() - 0.5) * 60, 
                    y + (Math.random() - 0.5) * 20
                );
            }, i * 50);
        }
        
        // Remove burst element
        setTimeout(() => {
            burst.remove();
        }, 800);
    }

    updateGears() {
        if (this.isMobile) {
            // Mobile: Constant slow rotation
            this.mobileRotation += this.rotationSpeed;
            this.currentRotation = this.mobileRotation;
        } else {
            // PC: Inertia-based rotation
            // Apply friction to slow down
            this.rotationSpeed *= this.friction;
            
            // Ensure minimum idle speed
            if (this.rotationSpeed < this.idleSpeed) {
                this.rotationSpeed = this.idleSpeed;
            }
            
            // Update rotation
            this.currentRotation += this.rotationSpeed;
        }
        
        // Apply rotation to gears
        const rotationValue = this.currentRotation % 360;
        
        if (this.gearLeft) {
            this.gearLeft.style.setProperty('--gear-rotation', rotationValue + 'deg');
        }
        
        if (this.gearRight) {
            this.gearRight.style.setProperty('--gear-rotation', (-rotationValue) + 'deg');
        }
        
        // Update background gears (slower)
        this.bgGears.forEach((gear, index) => {
            const bgRotation = (this.currentRotation * (index % 2 === 0 ? 0.3 : -0.2)) % 360;
            gear.style.setProperty('--bg-gear-rotation', bgRotation + 'deg');
        });
    }

    updateGauge() {
        if (!this.needle) return;
        
        // PC: Return needle to idle position gradually
        if (!this.isMobile) {
            const idlePressure = -30; // Slightly above minimum
            this.currentPressure += (idlePressure - this.currentPressure) * 0.05;
        }
        
        // Apply rotation to needle
        this.needle.style.setProperty('--needle-rotation', this.currentPressure + 'deg');
    }

    animate() {
        this.updateGears();
        this.updateGauge();
        
        requestAnimationFrame(() => this.animate());
    }
}
