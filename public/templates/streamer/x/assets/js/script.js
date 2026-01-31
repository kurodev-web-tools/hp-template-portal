document.addEventListener('DOMContentLoaded', () => {
    // Shockwave Effect on Scroll
    const container = document.querySelector('.snap-container');
    const wave = document.querySelector('.shockwave-overlay');
    let isScrolling;

    // Mobile Menu
    const toggle = document.querySelector('.menu-btn');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            toggle.classList.toggle('active'); // Added

            const icon = toggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'reorder';

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close when clicking a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active'); // Added
                const icon = toggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'reorder';
                document.body.style.overflow = '';
            });
        });
    }


    // Detect section change
    let currentSection = 0;
    const sections = document.querySelectorAll('.snap-section');

    // Track user interaction to allow vibration
    let userInteracted = false;
    const enableInteraction = () => { userInteracted = true; };
    document.addEventListener('click', enableInteraction, { once: true });
    document.addEventListener('touchstart', enableInteraction, { once: true });

    const header = document.querySelector('.xtreme-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger shockwave
                wave.classList.remove('shockwave-active');
                void wave.offsetWidth; // Trigger reflow
                wave.classList.add('shockwave-active');

                // Header Theme Switching (Invert colors on white sections)
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                const isEvenSection = sectionIndex % 2 !== 0; // Sections 2, 4... are index 1, 3...
                if (header) {
                    header.classList.toggle('header-invert', isEvenSection);
                }

                // Haptics - only if user has interacted
                // Double check with userActivation API if available to prevent console noise
                const isActive = userInteracted || (navigator.userActivation && navigator.userActivation.hasBeenActive);

                if (navigator.vibrate && isActive) {
                    try {
                        navigator.vibrate(20);
                    } catch (e) {
                        console.debug('Vibration blocked', e);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});

// ============================================
// XTREME IMPACT SYSTEM - Gravity & Shockwave
// ============================================

class XtremeImpactSystem {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.actionCards = document.querySelectorAll('.action-card');
        this.xTitles = document.querySelectorAll('.x-title');
        this.shockwaveOverlay = document.querySelector('.shockwave-overlay');
        this.snapContainer = document.querySelector('.snap-container');
        
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.setupMobileLanding();
        } else {
            this.setupPCClickShockwave();
        }
    }

    setupPCClickShockwave() {
        // Listen for clicks anywhere on the document
        document.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Create click shockwave
            this.createClickShockwave(x, y);
            
            // Repulse nearby action cards
            this.repulseCards(x, y);
            
            // Shake titles
            this.shakeTitles();
        });
    }

    setupMobileLanding() {
        // Track snap scroll landing
        let lastScrollTop = 0;
        let isSettling = false;
        
        if (this.snapContainer) {
            this.snapContainer.addEventListener('scroll', () => {
                const scrollTop = this.snapContainer.scrollTop;
                const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
                lastScrollTop = scrollTop;
                
                // Detect when scroll is slowing down (landing)
                if (scrollSpeed < 5 && !isSettling && scrollSpeed > 0) {
                    isSettling = true;
                    
                    // Trigger landing impact after a short delay
                    setTimeout(() => {
                        this.triggerLandingImpact();
                        isSettling = false;
                    }, 100);
                }
            }, { passive: true });
        }
    }

    createClickShockwave(x, y) {
        // Create visual shockwave at click point
        const ripple = document.createElement('div');
        ripple.className = 'click-shockwave';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        requestAnimationFrame(() => {
            ripple.classList.add('expanding');
        });
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }

    repulseCards(clickX, clickY) {
        this.actionCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from click to card
            const dx = cardCenterX - clickX;
            const dy = cardCenterY - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only repulse if within range (500px)
            if (distance < 500 && distance > 0) {
                // Calculate repulsion force (inverse of distance)
                const force = Math.max(0, (500 - distance) / 500);
                const repulseX = (dx / distance) * force * 50; // Max 50px movement
                const repulseY = (dy / distance) * force * 30; // Max 30px movement
                
                // Apply repulsion
                card.style.transform = `translate(${repulseX}px, ${repulseY}px) skew(-10deg)`;
                card.classList.add('repulsed');
                
                // Return to original position
                setTimeout(() => {
                    card.style.transform = '';
                    card.classList.remove('repulsed');
                }, 300);
            }
        });
    }

    shakeTitles() {
        this.xTitles.forEach(title => {
            title.classList.add('impact-shake');
            setTimeout(() => {
                title.classList.remove('impact-shake');
            }, 400);
        });
    }

    triggerLandingImpact() {
        // Vibration
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        
        // Enhanced shockwave overlay
        if (this.shockwaveOverlay) {
            this.shockwaveOverlay.classList.add('distortion');
            this.shockwaveOverlay.classList.add('landing-shockwave');
            
            setTimeout(() => {
                this.shockwaveOverlay.classList.remove('landing-shockwave');
                this.shockwaveOverlay.classList.remove('distortion');
            }, 800);
        }
        
        // Screen shake effect
        document.body.classList.add('screen-shake');
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 300);
        
        // Shake titles
        this.shakeTitles();
    }
}

// Initialize
const xtremeImpact = new XtremeImpactSystem();
