/**
 * Template K - Kit/Bundle Theme JavaScript
 * Coffee Starter Kit Landing Page
 */

(function() {
    'use strict';

    // ==================================================================
    // Scroll Animation
    // ==================================================================
    function initScrollAnimation() {
        const triggers = document.querySelectorAll('.js-scroll-trigger');
        
        if (!triggers.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Keep observing for re-animation on scroll back
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => {
            observer.observe(trigger);
        });
    }

    // ==================================================================
    // Floating CTA Visibility
    // ==================================================================
    function initFloatingCta() {
        const floatingCta = document.querySelector('.floating-cta');
        const heroSection = document.querySelector('.hero');
        
        if (!floatingCta || !heroSection) return;

        let lastScrollY = 0;
        let heroBottom = 0;

        function updateHeroBottom() {
            const heroRect = heroSection.getBoundingClientRect();
            heroBottom = heroRect.bottom + window.scrollY;
        }

        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Show floating CTA when scrolled past hero section
            if (scrollY > heroBottom - windowHeight / 2) {
                floatingCta.classList.remove('is-hidden');
            } else {
                floatingCta.classList.add('is-hidden');
            }

            lastScrollY = scrollY;
        }

        // Initial calculation
        updateHeroBottom();
        
        // Recalculate on resize
        window.addEventListener('resize', updateHeroBottom, { passive: true });
        
        // Handle scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
    }

    // ==================================================================
    // Smooth Scroll for Anchor Links
    // ==================================================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerOffset = 20;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================================================================
    // Bundle Items Animation Counter
    // ==================================================================
    function initBundleCounter() {
        const bundleSection = document.querySelector('.bundle');
        
        if (!bundleSection) return;

        const items = bundleSection.querySelectorAll('.bundle__item');
        
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // ==================================================================
    // Button Click Tracking (for analytics)
    // ==================================================================
    function initButtonTracking() {
        const buttons = document.querySelectorAll('.c-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add a subtle click effect
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Log for analytics (in production, send to analytics service)
                const buttonText = this.textContent.trim();
                console.log('Button clicked:', buttonText);
            });
        });
    }

    // ==================================================================
    // Value Counter Animation
    // ==================================================================
    function initValueCounter() {
        const valueSection = document.querySelector('.value');
        
        if (!valueSection) return;

        const bundlePrice = valueSection.querySelector('.value__bundle-price');
        const savingsAmount = valueSection.querySelector('.value__bundle-save');
        
        if (!bundlePrice) return;

        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateValue(bundlePrice, 0, 12900, 1000, '¥');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(valueSection);
    }

    function animateValue(element, start, end, duration, prefix = '') {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.floor(start + (end - start) * easeOut);
            element.textContent = prefix + current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // ==================================================================
    // Initialize Everything
    // ==================================================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runInit);
        } else {
            runInit();
        }
    }

    function runInit() {
        initScrollAnimation();
        initFloatingCta();
        initSmoothScroll();
        initBundleCounter();
        initButtonTracking();
        initValueCounter();
        
        console.log('Template K initialized successfully');
    }

    // Start initialization
    init();
})();
