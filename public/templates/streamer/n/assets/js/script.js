document.addEventListener('DOMContentLoaded', () => {
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
            if (icon) icon.textContent = isActive ? 'close' : 'fluorescent';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'fluorescent';

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

    document.querySelectorAll('.sign-board, .social-btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // Initialize Neon Flicker Effect
    const neonFlicker = new NeonFlickerEffect();
});

// ============================================
// NEON FLICKER EFFECT - Unstable Light Animation
// ============================================

class NeonFlickerEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.targetElements = document.querySelectorAll('.hero-title, .neon-sign');
        this.flickerIntervals = new Map();
        this.mobileRandomInterval = null;

        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileFlicker();
        } else {
            this.setupPCFlicker();
        }
    }

    setupPCFlicker() {
        this.targetElements.forEach(element => {
            // Mouse enter - start intense flickering
            element.addEventListener('mouseenter', () => {
                this.startFlicker(element);
            });

            // Mouse leave - stop flickering
            element.addEventListener('mouseleave', () => {
                this.stopFlicker(element);
            });
        });
    }

    setupMobileFlicker() {
        // Scroll-triggered flicker for visible elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start flickering when element comes into view
                    setTimeout(() => {
                        this.startFlicker(entry.target);
                    }, Math.random() * 500);
                } else {
                    this.stopFlicker(entry.target);
                }
            });
        }, { threshold: 0.3 });

        this.targetElements.forEach(element => {
            observer.observe(element);
        });

        // Random interval flicker for all elements
        this.startRandomMobileFlicker();
    }

    startRandomMobileFlicker() {
        const randomFlicker = () => {
            const randomElement = this.targetElements[Math.floor(Math.random() * this.targetElements.length)];

            if (randomElement) {
                this.startFlicker(randomElement);

                // Stop after random duration (1-3 seconds)
                setTimeout(() => {
                    this.stopFlicker(randomElement);
                }, 1000 + Math.random() * 2000);
            }

            // Schedule next random flicker (3-8 seconds)
            const nextDelay = 3000 + Math.random() * 5000;
            this.mobileRandomInterval = setTimeout(randomFlicker, nextDelay);
        };

        // Start after initial delay
        setTimeout(randomFlicker, 2000);
    }

    startFlicker(element) {
        // Add flicker class to trigger CSS animation
        element.classList.add('flicker-active');
    }

    stopFlicker(element) {
        element.classList.remove('flicker-active');
    }
}
