document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu (Night Vision)
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');

            // Icon switch
            toggle.classList.toggle('active', isActive);
            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'radar';

            // Play High-pitch Glitch Sound (Visual Metaphor)
            if (isActive) {
                // Flash body for impact
                document.body.style.filter = 'brightness(2) contrast(2)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 100);
            }

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }



    // Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.weapon-card, .intel-folder').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Initialize Radar Scan Effect
    const radarScan = new RadarScanEffect();
});

// ============================================
// RADAR SCAN EFFECT - Stealth Game Interface
// ============================================

class RadarScanEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.weaponCards = document.querySelectorAll('.weapon-card');
        this.stealthMeter = document.querySelector('.stealth-meter');
        this.scanBar = null;
        this.hudCursor = null;
        this.scanInterval = null;

        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileScan();
        } else {
            this.setupPCScan();
        }
    }

    setupPCScan() {
        // Create HUD cursor
        this.createHUDCursor();

        // Add hover effects to weapon cards
        this.weaponCards.forEach(card => {
            // Add binary overlay
            const binaryOverlay = document.createElement('div');
            binaryOverlay.className = 'binary-overlay';
            card.appendChild(binaryOverlay);

            // Mouse enter - night vision reveal
            card.addEventListener('mouseenter', () => {
                card.classList.add('night-vision-reveal');
                this.activateHUDCursor();
                this.fluctuateStealthMeter();
            });

            // Mouse leave - hide
            card.addEventListener('mouseleave', () => {
                card.classList.remove('night-vision-reveal');
                this.deactivateHUDCursor();
            });

            // Mouse move within card
            card.addEventListener('mousemove', (e) => {
                this.updateHUDCursor(e.clientX, e.clientY);
            });
        });
    }

    createHUDCursor() {
        this.hudCursor = document.createElement('div');
        this.hudCursor.className = 'hud-cursor';

        // Add crosshair segments
        const top = document.createElement('div');
        top.className = 'hud-crosshair-top';
        const bottom = document.createElement('div');
        bottom.className = 'hud-crosshair-bottom';
        const left = document.createElement('div');
        left.className = 'hud-crosshair-left';
        const right = document.createElement('div');
        right.className = 'hud-crosshair-right';

        this.hudCursor.appendChild(top);
        this.hudCursor.appendChild(bottom);
        this.hudCursor.appendChild(left);
        this.hudCursor.appendChild(right);

        document.body.appendChild(this.hudCursor);
    }

    activateHUDCursor() {
        if (this.hudCursor) {
            this.hudCursor.classList.add('active');
        }
    }

    deactivateHUDCursor() {
        if (this.hudCursor) {
            this.hudCursor.classList.remove('active');
        }
    }

    updateHUDCursor(x, y) {
        if (this.hudCursor) {
            this.hudCursor.style.left = x + 'px';
            this.hudCursor.style.top = y + 'px';
        }
    }

    setupMobileScan() {
        // Create radar sweep bar
        this.scanBar = document.createElement('div');
        this.scanBar.className = 'radar-sweep-bar';
        document.body.appendChild(this.scanBar);

        // Start periodic scanning
        this.startMobileScanLoop();
    }

    startMobileScanLoop() {
        // Initial scan after 2 seconds
        setTimeout(() => {
            this.triggerScan();
        }, 2000);

        // Repeat scan every 4 seconds
        this.scanInterval = setInterval(() => {
            this.triggerScan();
        }, 4000);
    }

    triggerScan() {
        // Animate scan bar
        this.scanBar.classList.add('scanning');

        // Trigger glow on elements when scan passes
        setTimeout(() => {
            this.weaponCards.forEach(card => {
                card.classList.add('scan-glow');

                // Remove glow after animation
                setTimeout(() => {
                    card.classList.remove('scan-glow');
                }, 500);
            });

            // Fluctuate stealth meter
            this.fluctuateStealthMeter();
        }, 800); // Sync with scan bar position

        // Remove scanning class after animation
        setTimeout(() => {
            this.scanBar.classList.remove('scanning');
        }, 2000);
    }

    fluctuateStealthMeter() {
        if (this.stealthMeter) {
            this.stealthMeter.classList.add('fluctuating');

            setTimeout(() => {
                this.stealthMeter.classList.remove('fluctuating');
            }, 500);
        }
    }
}
