document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Scroll Logic
    const container = document.querySelector('.horizontal-container');
    const record = document.querySelector('.vinyl-record');

    // Sync Record Speed with Scroll
    let isScrolling;
    container.addEventListener('scroll', () => {
        // Speed up rotation on scroll
        record.style.animationDuration = '2s';

        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            // Return to normal speed
            record.style.animationDuration = '10s';
        }, 100);
    });

    // Horizontal Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const panel = entry.target.querySelector('.glass-panel');
                if (panel) {
                    panel.style.opacity = '1';
                    panel.style.transform = 'translateY(0)';
                }
            }
        });
    }, { root: container, threshold: 0.5 });

    document.querySelectorAll('.h-section').forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu Logic (Inject links dynamically based on sections)
    const mobileList = document.querySelector('.mobile-nav-list');
    const sections = ['intro', 'about', 'playlist', 'contact'];
    const labels = ['INTRO', 'ARTIST', 'PLAYLIST', 'REQUEST'];

    sections.forEach((id, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = labels[index];
        a.onclick = () => {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
            toggleMenu(); // Close menu
        };
        li.appendChild(a);
        mobileList.appendChild(li);
    });

    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];

    function toggleMenu() {
        const isActive = menu.classList.toggle('active');
        toggle.querySelector('.material-icons').textContent = isActive ? 'close' : 'grid_3x3';

        // Ensure links are interactive
        if (isActive) {
            menu.style.pointerEvents = 'auto';
        } else {
            // Delay disabling pointer events to allow closing animation
            setTimeout(() => {
                if (!menu.classList.contains('active')) {
                    menu.style.pointerEvents = 'none';
                }
            }, 1200);
        }
    }

    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking outside links (optional, for UX)
    // But since it covers screen, maybe not needed.
    // Close when link clicked is handled in link generation.

    // Initialize Rhythmic Effect
    const rhythmic = new RhythmicEffect();
});

// ============================================
// RHYTHMIC EFFECT - Jazz Lounge Ease & Stagger
// ============================================

class RhythmicEffect {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupStaggerReveal();
    }

    setupHoverEffects() {
        // PC: Add rhythm-hover class to glass panel elements
        if (!this.isMobile) {
            const glassPanels = document.querySelectorAll('.glass-panel');
            
            glassPanels.forEach(panel => {
                // Apply to child elements
                const elements = panel.querySelectorAll('h1, h2, h3, p, li, .hero-sub, .text-body');
                elements.forEach((el, index) => {
                    el.classList.add('rhythm-hover');
                    // Add staggered delay for multiple elements
                    el.style.transitionDelay = `${index * 0.05}s`;
                });
            });

            // Special handling for track list items
            const trackItems = document.querySelectorAll('.track-list li');
            trackItems.forEach((item, index) => {
                item.classList.add('rhythm-hover');
                item.style.transitionDelay = `${index * 0.08}s`;
            });
        }
    }

    setupStaggerReveal() {
        const container = document.querySelector('.horizontal-container');
        
        // Enhanced Intersection Observer with Stagger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const panel = entry.target.querySelector('.glass-panel');
                    if (panel) {
                        // Reveal panel first
                        panel.style.opacity = '1';
                        panel.style.transform = 'translateY(0)';
                        
                        // Then stagger child elements
                        const children = panel.querySelectorAll('h1, h2, h3, p, li, .hero-sub, .text-body, .section-title, .track-list li');
                        children.forEach((child, index) => {
                            child.classList.add('rhythm-reveal');
                            // Assign stagger delay (max 5 delays)
                            const delayClass = `rhythm-delay-${(index % 5) + 1}`;
                            child.classList.add(delayClass);
                            
                            // Trigger reveal after panel animation
                            setTimeout(() => {
                                child.classList.add('revealed');
                            }, 100 + (index * 100));
                        });
                    }
                } else {
                    // Reset for re-animation when scrolling back
                    const panel = entry.target.querySelector('.glass-panel');
                    if (panel) {
                        panel.style.opacity = '0';
                        panel.style.transform = 'translateY(20px)';
                        
                        const children = panel.querySelectorAll('.rhythm-reveal');
                        children.forEach(child => {
                            child.classList.remove('revealed');
                        });
                    }
                }
            });
        }, { 
            root: container, 
            threshold: 0.5,
            rootMargin: '0px'
        });

        document.querySelectorAll('.h-section').forEach(section => {
            observer.observe(section);
        });
    }
}

