document.addEventListener('DOMContentLoaded', () => {
    // Liquid Metal Effect
    if (window.PremiumEffects) {
        // Using "LiquidMetal" if implemented, or fallback to simple particles/canvas
        // Based on previous PremiumEffects.js, let's assume LiquidMetal exists or we simulate it.
        // Actually checking premium-effects.js content from previous turn... 
        // It had "LiquidMetal" (blobs). Perfect.
        PremiumEffects.LiquidMetal('#liquid-canvas', {
            colors: ['#ffffff', '#a0a0a0', '#404040'],
            count: 8
        });
    }

    // Mobile Menu (Mercury Pool)
    const toggle = document.querySelector('.mobile-toggle');
    const menuContainer = document.querySelector('.mobile-menu-container');
    const menuContent = document.querySelector('.mobile-menu-content');
    const menuLinks = menuContent ? menuContent.querySelectorAll('a') : [];

    if (toggle && menuContainer) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menuContainer.classList.toggle('active');

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'short_text';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuContainer.classList.remove('active');
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'short_text';
                document.body.style.overflow = '';
            });
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.metal-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Initialize Typewriter Effect
    const typewriter = new TypewriterEffect();
});

// ============================================
// TYPEWRITER EFFECT - Mechanical Text Animation
// ============================================

class TypewriterEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.typingSpeed = 50;
        this.deleteSpeed = 30;
        this.pauseDuration = 2000;
        this.activeAnimations = new Map();

        this.init();
    }

    init() {
        const targets = document.querySelectorAll('.hero-sub, .card-inner p');

        targets.forEach(element => {
            const originalText = element.textContent;
            element.setAttribute('data-original-text', originalText);

            if (this.isMobile) {
                // Mobile: IntersectionObserver triggers animation
                this.setupMobileAnimation(element);
            } else {
                // PC: Hover triggers delete and retype
                this.setupPCHover(element);
            }
        });
    }

    setupPCHover(element) {
        const originalText = element.getAttribute('data-original-text');

        element.parentElement.addEventListener('mouseenter', () => {
            if (this.activeAnimations.has(element)) {
                clearTimeout(this.activeAnimations.get(element));
                this.activeAnimations.delete(element);
            }

            // Add cursor
            element.classList.add('typing-cursor');

            // Delete current text
            this.deleteText(element, () => {
                // Type new text after deletion
                setTimeout(() => {
                    this.typeText(element, originalText, () => {
                        // Remove cursor after typing completes
                        setTimeout(() => {
                            element.classList.remove('typing-cursor');
                        }, 1000);
                    });
                }, 100);
            });
        });
    }

    setupMobileAnimation(element) {
        const originalText = element.getAttribute('data-original-text');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Clear text first
                    element.textContent = '';
                    element.classList.add('typing-cursor');

                    // Start typing
                    setTimeout(() => {
                        this.typeText(element, originalText, () => {
                            // Remove cursor after typing completes
                            setTimeout(() => {
                                element.classList.remove('typing-cursor');
                            }, 1000);
                        });
                    }, 300);

                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    typeText(element, text, callback = null) {
        let index = 0;
        element.textContent = '';

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                const timeout = setTimeout(type, this.typingSpeed + Math.random() * 30);
                this.activeAnimations.set(element, timeout);
            } else if (callback) {
                callback();
            }
        };

        type();
    }

    deleteText(element, callback = null) {
        const text = element.textContent;
        let index = text.length;

        const del = () => {
            if (index > 0) {
                element.textContent = text.substring(0, index - 1);
                index--;
                const timeout = setTimeout(del, this.deleteSpeed);
                this.activeAnimations.set(element, timeout);
            } else if (callback) {
                callback();
            }
        };

        del();
    }
}
