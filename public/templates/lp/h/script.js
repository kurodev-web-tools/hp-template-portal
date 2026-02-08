/**
 * Lumiere Visage - Template H (How-to)
 * Scrollytelling & Interactive Features
 */

(function() {
    'use strict';

    // ========================================
    // Configuration
    // ========================================
    const CONFIG = {
        scrollytelling: {
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        },
        stickyCTA: {
            hideAt: 200,
            showAt: 100
        },
        animations: {
            duration: 500,
            easing: 'ease-out'
        }
    };

    // ========================================
    // DOM Elements
    // ========================================
    const elements = {
        stepItems: document.querySelectorAll('.step-item'),
        stepImages: document.querySelectorAll('.step-image'),
        stickyCTA: document.querySelector('.sticky-cta'),
        techFeatures: document.querySelectorAll('.tech-feature'),
        solutionCards: document.querySelectorAll('.solution-card'),
        testimonialCards: document.querySelectorAll('.testimonial-card')
    };

    // ========================================
    // Scrollytelling - Main Gimmick
    // ========================================
    class ScrollytellingController {
        constructor() {
            this.currentStep = 1;
            this.isActive = false;
            this.init();
        }

        init() {
            // Check if we're on desktop
            if (window.innerWidth < 1024) {
                this.setupMobileSteps();
                return;
            }

            this.setupIntersectionObserver();
            this.activateStep(1);
        }

        setupMobileSteps() {
            // On mobile, show all step images as we scroll
            elements.stepItems.forEach((item, index) => {
                item.style.opacity = '1';
                item.style.transform = 'none';
            });
        }

        setupIntersectionObserver() {
            const observerOptions = {
                root: null,
                rootMargin: CONFIG.scrollytelling.rootMargin,
                threshold: CONFIG.scrollytelling.threshold
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const step = parseInt(entry.target.dataset.step);
                        this.activateStep(step);
                    }
                });
            }, observerOptions);

            // Observe all step items
            elements.stepItems.forEach(item => {
                this.observer.observe(item);
            });
        }

        activateStep(stepNumber) {
            if (this.currentStep === stepNumber) return;
            
            this.currentStep = stepNumber;

            // Update images with crossfade
            elements.stepImages.forEach((img, index) => {
                const imgStep = parseInt(img.dataset.step);
                
                if (imgStep === stepNumber) {
                    img.classList.add('active');
                    img.style.opacity = '1';
                } else {
                    img.classList.remove('active');
                    img.style.opacity = '0';
                }
            });

            // Update step items styling
            elements.stepItems.forEach(item => {
                const itemStep = parseInt(item.dataset.step);
                
                if (itemStep === stepNumber) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Custom event for analytics/debugging
            window.dispatchEvent(new CustomEvent('stepChange', { 
                detail: { step: stepNumber } 
            }));
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }

    // ========================================
    // Sticky CTA Controller
    // ========================================
    class StickyCTAController {
        constructor() {
            this.lastScrollY = 0;
            this.ticking = false;
            this.isHidden = false;
            this.init();
        }

        init() {
            // Only initialize on mobile
            if (window.innerWidth >= 768) return;

            this.bindEvents();
        }

        bindEvents() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        this.handleScroll();
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        }

        handleScroll() {
            const currentScrollY = window.scrollY;
            
            // Hide when near top
            if (currentScrollY < CONFIG.stickyCTA.showAt) {
                this.hide();
            } else if (currentScrollY > CONFIG.stickyCTA.hideAt) {
                this.show();
            }

            // Hide when scrolling down near offer section
            const offerSection = document.getElementById('offer');
            if (offerSection) {
                const offerRect = offerSection.getBoundingClientRect();
                if (offerRect.top < window.innerHeight && offerRect.bottom > 0) {
                    this.hide();
                }
            }

            this.lastScrollY = currentScrollY;
        }

        show() {
            if (!this.isHidden) return;
            elements.stickyCTA?.classList.remove('hidden');
            this.isHidden = false;
        }

        hide() {
            if (this.isHidden) return;
            elements.stickyCTA?.classList.add('hidden');
            this.isHidden = true;
        }
    }

    // ========================================
    // Scroll Animation Controller
    // ========================================
    class ScrollAnimationController {
        constructor() {
            this.observers = [];
            this.init();
        }

        init() {
            this.setupFadeInAnimations();
            this.setupTechFeatures();
            this.setupSolutionCards();
            this.setupTestimonials();
        }

        setupFadeInAnimations() {
            const fadeElements = document.querySelectorAll('.problem-item, .stat-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            fadeElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            this.observers.push(observer);
        }

        setupTechFeatures() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            elements.techFeatures.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateX(-30px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(el);
            });

            this.observers.push(observer);
        }

        setupSolutionCards() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            elements.solutionCards.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            this.observers.push(observer);
        }

        setupTestimonials() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            elements.testimonialCards.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px) scale(0.95)';
                el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                observer.observe(el);
            });

            this.observers.push(observer);
        }

        destroy() {
            this.observers.forEach(observer => observer.disconnect());
        }
    }

    // ========================================
    // Smooth Scroll
    // ========================================
    class SmoothScrollController {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        this.scrollTo(target);
                    }
                });
            });
        }

        scrollTo(element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    class HeaderScrollController {
        constructor() {
            this.header = document.querySelector('.site-header');
            this.lastScrollY = 0;
            this.ticking = false;
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        this.handleScroll();
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        }

        handleScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            } else {
                this.header.style.boxShadow = 'none';
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // ========================================
    // Performance Optimizations
    // ========================================
    class PerformanceOptimizer {
        static init() {
            // Debounce resize events
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('resizeDebounced'));
                }, 250);
            });

            // Preload critical images
            const criticalImages = [
                'https://placehold.co/600x700/f0fdfa/14b8a6?text=Step+1:+Power+On',
                'https://placehold.co/600x700/f0fdfa/14b8a6?text=Step+2:+Glide',
                'https://placehold.co/600x700/f0fdfa/14b8a6?text=Step+3:+Finish'
            ];

            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }
    }

    // ========================================
    // Analytics Helper (Optional)
    // ========================================
    class AnalyticsHelper {
        static track(eventName, data = {}) {
            // Custom analytics tracking
            if (window.gtag) {
                window.gtag('event', eventName, data);
            }
            
            console.log('[Analytics]', eventName, data);
        }

        static init() {
            // Track step changes
            window.addEventListener('stepChange', (e) => {
                this.track('scrollytelling_step_change', {
                    step: e.detail.step
                });
            });

            // Track CTA clicks
            document.querySelectorAll('.btn-primary').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.track('cta_click', {
                        location: btn.closest('section')?.className || 'unknown'
                    });
                });
            });
        }
    }

    // ========================================
    // Initialize Application
    // ========================================
    function init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize controllers
        const scrollytelling = new ScrollytellingController();
        const stickyCTA = new StickyCTAController();
        const smoothScroll = new SmoothScrollController();
        const headerScroll = new HeaderScrollController();

        // Only enable animations if user doesn't prefer reduced motion
        let scrollAnimations;
        if (!prefersReducedMotion) {
            scrollAnimations = new ScrollAnimationController();
        }

        // Performance optimizations
        PerformanceOptimizer.init();

        // Analytics (comment out if not needed)
        // AnalyticsHelper.init();

        // Handle resize
        window.addEventListener('resizeDebounced', () => {
            // Reinitialize scrollytelling on breakpoint change
            scrollytelling.destroy();
            scrollytelling.init();
        });

        // Expose to global for debugging
        window.LumiereLP = {
            scrollytelling,
            stickyCTA,
            scrollAnimations,
            goToStep: (step) => scrollytelling.activateStep(step)
        };

        console.log('✨ Lumiere Visage LP initialized');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();