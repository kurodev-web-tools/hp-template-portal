document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'graphic_eq';

            // Retro sound effect simulation (vibration)
            if (isActive && navigator.vibrate) navigator.vibrate(20);

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.querySelector('.material-icons').textContent = 'graphic_eq';
                document.body.style.overflow = '';
            });
        });
    }

    // Hover sound effect (Optional if we want pure CSS vibe, but adds retro feel)
    // We won't load audio files to keep it simple, but we can vibrate
    document.querySelectorAll('a, button, .pixel-card, .inventory-list li').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (navigator.vibrate) navigator.vibrate(5);
        });
    });

    // Initialize Block Build Effect
    const blockBuild = new PixelBuildEffect();
});

// ============================================
// BLOCK BUILD EFFECT - Retro Game Style
// ============================================

class PixelBuildEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.cards = document.querySelectorAll('.pixel-card, .pixel-box');
        this.items = document.querySelectorAll('.item-row');
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileBlockBuild();
        } else {
            this.setupPCPopOut();
        }
    }

    setupPCPopOut() {
        // PC: Mouse hover - pop out with pixel-perfect movement
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add pop out class
                card.classList.add('block-pop');
                
                // Add white flash effect randomly
                if (Math.random() > 0.7) {
                    card.classList.add('flash-white');
                    setTimeout(() => {
                        card.classList.remove('flash-white');
                    }, 200);
                }
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('block-pop');
            });
        });

        // Add shake effect on click for extra retro feel
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.add('shake-pixel');
                setTimeout(() => {
                    card.classList.remove('shake-pixel');
                }, 400);
            });
        });
    }

    setupMobileBlockBuild() {
        // Mobile: Block step-by-step build animation
        
        // Setup cards
        this.cards.forEach((card, index) => {
            // Reset initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.classList.add('block-build');
            
            // Add stagger delay class
            const delayClass = `block-delay-${(index % 6) + 1}`;
            card.classList.add(delayClass);
        });

        // Setup items
        this.items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.classList.add('block-build');
            
            const delayClass = `block-delay-${(index % 6) + 1}`;
            item.classList.add(delayClass);
        });

        // IntersectionObserver for scroll-triggered build
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger build animation
                    entry.target.classList.add('building');
                    
                    // Add flash effect when fully built
                    setTimeout(() => {
                        entry.target.classList.add('flash-white');
                        setTimeout(() => {
                            entry.target.classList.remove('flash-white');
                        }, 200);
                    }, 600);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        // Observe all elements
        this.cards.forEach(card => observer.observe(card));
        this.items.forEach(item => observer.observe(item));
    }
}
