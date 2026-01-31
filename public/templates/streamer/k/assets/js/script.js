document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // For potential button animation

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'shield';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');

                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'shield';

                document.body.style.overflow = '';
            });
        });
    }

    // Page Transition Simulation (since it's multi-page, real transition happens on load)
    const content = document.querySelector('.page-content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';

    setTimeout(() => {
        content.style.transition = 'all 0.8s ease-out';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 100);

    // Initialize Banner Burn Effect
    const bannerBurn = new BannerBurnEffect();
});

// ============================================
// BANNER BURN - Knight's Flame Effect
// ============================================

class BannerBurnEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.targetElements = document.querySelectorAll('.hero-content, .artifact-card, .paper-sheet, .wax-seal');
        this.lingerDelay = 800; // ms
        this.lingerTimers = new Map();
        
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileBurn();
        } else {
            this.setupPCBurn();
        }
    }

    setupPCBurn() {
        this.targetElements.forEach(element => {
            // Mouse enter - ignite
            element.addEventListener('mouseenter', () => {
                // Clear any existing linger timer
                if (this.lingerTimers.has(element)) {
                    clearTimeout(this.lingerTimers.get(element));
                    this.lingerTimers.delete(element);
                }
                
                element.classList.add('banner-burn');
                element.classList.remove('calming');
                
                // Add extra sparks
                this.addSparks(element);
            });

            // Mouse leave - calm down with lingering effect
            element.addEventListener('mouseleave', () => {
                element.classList.add('calming');
                
                const timer = setTimeout(() => {
                    element.classList.remove('banner-burn');
                    element.classList.remove('calming');
                    this.removeSparks(element);
                }, this.lingerDelay);
                
                this.lingerTimers.set(element, timer);
            });
        });
    }

    setupMobileBurn() {
        // Use IntersectionObserver to trigger burn when elements are in center
        const observerOptions = {
            threshold: 0.6,
            rootMargin: '-20% 0px -20% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in center - ignite
                    entry.target.classList.add('banner-burn');
                    entry.target.classList.remove('calming');
                    this.addSparks(entry.target);
                } else {
                    // Element left center - calm down
                    entry.target.classList.add('calming');
                    
                    setTimeout(() => {
                        entry.target.classList.remove('banner-burn');
                        entry.target.classList.remove('calming');
                        this.removeSparks(entry.target);
                    }, this.lingerDelay);
                }
            });
        }, observerOptions);

        this.targetElements.forEach(element => {
            observer.observe(element);
        });
    }

    addSparks(element) {
        // Add additional spark elements for more dramatic effect
        for (let i = 0; i < 3; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = `${20 + (i * 30)}%`;
            spark.style.animationDelay = `${i * 0.3}s`;
            element.appendChild(spark);
        }
    }

    removeSparks(element) {
        const sparks = element.querySelectorAll('.spark');
        sparks.forEach(spark => spark.remove());
    }
}
