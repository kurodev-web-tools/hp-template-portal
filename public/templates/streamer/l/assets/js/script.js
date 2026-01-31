document.addEventListener('DOMContentLoaded', () => {
    // Starry Background
    if (window.PremiumEffects) {
        PremiumEffects.Particles('#stars-container', {
            limit: 200,
            color: 'rgba(255, 255, 255, 0.8)',
            speed: 0.1
        });
    }

    // Moon Phase Scroll Effect
    const moon = document.querySelector('.moon-phase');
    window.addEventListener('scroll', () => {
        const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        // Simulate phase change by shifting shadow
        const shadowX = -40 + (scrollPercent * 80); // -40 to +40
        moon.style.boxShadow = `inset ${shadowX}px 0px 60px rgba(0,0,0,0.9)`;
    });

    // Orbital Menu
    const orbitalToggle = document.querySelector('.orbital-toggle');
    const orbitalMenu = document.querySelector('.orbital-menu');
    const orbitalLinks = orbitalMenu ? orbitalMenu.querySelectorAll('a') : [];

    if (orbitalToggle && orbitalMenu) {
        orbitalToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = orbitalMenu.classList.toggle('active');

            // Icon Switch
            const icon = orbitalToggle.querySelector('.material-icons');
            if (icon) icon.textContent = isActive ? 'close' : 'brightness_3';
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!orbitalMenu.contains(e.target) && orbitalMenu.classList.contains('active')) {
                orbitalMenu.classList.remove('active');
                const icon = orbitalToggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'brightness_3';
            }
        });

        // Close when link clicked
        orbitalLinks.forEach(link => {
            link.addEventListener('click', () => {
                orbitalMenu.classList.remove('active');
                const icon = orbitalToggle.querySelector('.material-icons');
                if (icon) icon.textContent = 'brightness_3';
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

    document.querySelectorAll('.moon-card, .schedule-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });

    // Initialize Book Flip Effect
    const bookFlip = new BookFlipEffect();
});

// ============================================
// BOOK FLIP EFFECT - 3D Card Flip
// ============================================

class BookFlipEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.cards = document.querySelectorAll('.moon-card');
        this.init();
    }

    init() {
        // Transform existing cards into flip structure
        this.cards.forEach(card => {
            this.transformCard(card);
        });

        // Re-query cards after DOM transformation
        this.cards = document.querySelectorAll('.moon-card');

        if (this.isMobile) {
            this.setupMobileInteraction();
        } else {
            this.setupPCInteraction();
        }
    }

    transformCard(card) {
        // Get original content
        const originalContent = card.innerHTML;
        const title = card.querySelector('h3')?.textContent || 'Moon Phase';
        const description = card.querySelector('p')?.textContent || '';

        // Create container
        const container = document.createElement('div');
        container.className = 'moon-card-container';

        // Clear card and rebuild structure
        card.innerHTML = '';
        card.classList.remove('moon-card');
        card.classList.add('moon-card');

        // Create front face (original content)
        const front = document.createElement('div');
        front.className = 'front';
        front.innerHTML = originalContent;

        // Create back face (moon surface details)
        const back = document.createElement('div');
        back.className = 'back';
        back.innerHTML = `
            <h3>${title}</h3>
            <div class="detail-info">
                <p>Hidden Face of the Moon</p>
                <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">
                    The dark side reveals ancient secrets and lunar mysteries that have remained concealed for millennia.
                </p>
            </div>
            <div class="flip-hint">
                ${this.isMobile ? 'Tap to flip back' : 'Hover to return'}
            </div>
        `;

        // Append faces to card
        card.appendChild(front);
        card.appendChild(back);

        // Wrap in container
        card.parentNode.insertBefore(container, card);
        container.appendChild(card);
    }

    setupPCInteraction() {
        // PC uses CSS hover, no JS needed
        // Just add a hint for accessibility
        this.cards.forEach(card => {
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Flip card to see hidden face');
        });
    }

    setupMobileInteraction() {
        // Mobile: click to toggle
        const containers = document.querySelectorAll('.moon-card-container');

        containers.forEach(container => {
            const card = container.querySelector('.moon-card');

            // Use touchstart for better mobile response
            container.addEventListener('touchstart', (e) => {
                e.preventDefault();
                card.classList.toggle('flipped');
            }, { passive: false });

            // Fallback click for desktop testing
            container.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });

        // Scroll tilt effect
        this.setupScrollTilt();
    }

    setupScrollTilt() {
        const containers = document.querySelectorAll('.moon-card-container');
        let lastScrollY = window.scrollY;

        // Update tilt on scroll
        const updateTilt = () => {
            containers.forEach(container => {
                const card = container.querySelector('.moon-card');
                const rect = container.getBoundingClientRect();
                
                // Only apply tilt if card is not flipped
                if (!card.classList.contains('flipped')) {
                    const viewportCenter = window.innerHeight / 2;
                    const elementCenter = rect.top + rect.height / 2;
                    const distance = elementCenter - viewportCenter;

                    // Calculate tilt based on position (max 15 degrees)
                    const maxTilt = 15;
                    const tiltAmount = (distance / viewportCenter) * maxTilt;
                    const clampedTilt = Math.max(-maxTilt, Math.min(maxTilt, tiltAmount));
                    
                    // Apply tilt with smooth transition
                    card.style.transform = `rotateY(${clampedTilt}deg)`;
                }
            });
            
            lastScrollY = window.scrollY;
        };

        // Update on scroll
        window.addEventListener('scroll', updateTilt, { passive: true });
        
        // Initial update
        updateTilt();
    }
}
