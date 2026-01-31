document.addEventListener('DOMContentLoaded', () => {
    // Flashlight Effect
    const overlay = document.querySelector('.darkness-overlay');


    // Update variables on body to ensure inheritance works with @property
    window.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--x', `${e.clientX}px`);
        document.body.style.setProperty('--y', `${e.clientY}px`);
    });

    // Lights Toggle
    const lightBtn = document.querySelector('.lights-toggle');
    if (lightBtn) {
        lightBtn.addEventListener('click', () => {
            document.body.classList.toggle('lights-on');
            if (window.Haptics) window.Haptics.tap();

            const icon = lightBtn.querySelector('.material-icons');
            if (document.body.classList.contains('lights-on')) {
                icon.textContent = 'flashlight_off';
            } else {
                icon.textContent = 'highlight';
            }
        });
    }

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'priority_high';
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Fix: Close menu when link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.querySelector('.material-icons').textContent = 'priority_high';
            document.body.style.overflow = '';
        });
    });

    // Random Creepy Sound or Effect (Visual only for now)
    setInterval(() => {
        if (Math.random() > 0.95) {
            document.body.style.filter = 'invert(1)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 50);
        }
    }, 5000);

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

    document.querySelectorAll('.scare-card, .secret-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });

    // Initialize Lightning Storm Effect
    const lightningStorm = new LightningStorm();
});

// ============================================
// LIGHTNING STORM EFFECT
// ============================================

class LightningStorm {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.body = document.body;
        
        // Create lightning overlay if it doesn't exist
        this.lightningOverlay = document.querySelector('.lightning-overlay');
        if (!this.lightningOverlay) {
            this.lightningOverlay = document.createElement('div');
            this.lightningOverlay.className = 'lightning-overlay';
            this.body.insertBefore(this.lightningOverlay, this.body.firstChild);
        }
        
        // Create horror reveal message
        this.horrorReveal = document.querySelector('.horror-reveal');
        if (!this.horrorReveal) {
            this.horrorReveal = document.createElement('div');
            this.horrorReveal.className = 'horror-reveal';
            this.horrorReveal.innerText = 'THEY ARE WATCHING...';
            this.body.appendChild(this.horrorReveal);
        }
        
        this.horrorMessages = [
            'THEY ARE WATCHING...',
            'DON\'T LOOK BEHIND...',
            'IT KNOWS YOUR NAME...',
            'GET OUT NOW...',
            'TOO LATE...',
            'I SEE YOU...',
            'BEHIND YOU...'
        ];
        
        this.init();
    }
    
    init() {
        if (this.isMobile) {
            this.initMobileGlitches();
        } else {
            this.initPCGlitches();
        }
    }
    
    initPCGlitches() {
        // PC: 30% chance on hover over scare cards
        const scareCards = document.querySelectorAll('.scare-card');
        
        scareCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (Math.random() < 0.3) { // 30% chance
                    this.triggerLightning();
                }
            });
        });
    }
    
    initMobileGlitches() {
        // Mobile: Random interval 5-15 seconds
        const scheduleNextLightning = () => {
            const delay = 5000 + Math.random() * 10000; // 5-15 seconds
            setTimeout(() => {
                this.triggerLightning();
                scheduleNextLightning();
            }, delay);
        };
        
        // Start after initial delay
        setTimeout(scheduleNextLightning, 3000);
    }
    
    triggerLightning() {
        // Random horror message
        const randomMessage = this.horrorMessages[Math.floor(Math.random() * this.horrorMessages.length)];
        this.horrorReveal.innerText = randomMessage;
        
        // Activate lightning flash
        this.lightningOverlay.classList.add('flash-active');
        this.body.classList.add('flash-active');
        
        // Screen shake with slight delay
        setTimeout(() => {
            this.body.classList.add('screen-shake');
        }, 100);
        
        // Remove classes after animation
        setTimeout(() => {
            this.lightningOverlay.classList.remove('flash-active');
            this.body.classList.remove('flash-active');
            this.body.classList.remove('screen-shake');
        }, 500);
    }
}
