/**
 * Template L - Local Map / Store Attraction JavaScript
 * Urban 24h Fitness Gym Landing Page
 */

(function () {
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
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => {
            observer.observe(trigger);
        });
    }

    // ==================================================================
    // Smooth Scroll for Anchor Links
    // ==================================================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const headerOffset = 80;
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
    // Current Time Status
    // ==================================================================
    function initCurrentTimeStatus() {
        const statusText = document.querySelector('.timetable__status-text');
        const statusDot = document.querySelector('.timetable__status-dot');

        if (!statusText || !statusDot) return;

        function updateStatus() {
            const now = new Date();
            const hour = now.getHours();
            const day = now.getDay(); // 0 = Sunday, 6 = Saturday

            // Gym is open 24/7
            const isOpen = true;

            if (isOpen) {
                statusText.textContent = '只今営業中';
                statusDot.style.background = '#34A853';
            }
        }

        updateStatus();

        // Update every minute
        setInterval(updateStatus, 60000);
    }

    // ==================================================================
    // Mobile Footer Visibility
    // ==================================================================
    function initMobileFooter() {
        const mobileFooter = document.querySelector('.mobile-footer');
        const heroSection = document.querySelector('.hero');

        if (!mobileFooter || !heroSection || window.innerWidth >= 768) return;

        let heroBottom = 0;

        function updateHeroBottom() {
            const heroRect = heroSection.getBoundingClientRect();
            heroBottom = heroRect.bottom + window.scrollY;
        }

        function handleScroll() {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                mobileFooter.style.transform = 'translateY(0)';
            } else {
                mobileFooter.style.transform = 'translateY(100%)';
            }
        }

        // Initial setup
        updateHeroBottom();
        mobileFooter.style.transform = 'translateY(100%)';
        mobileFooter.style.transition = 'transform 0.3s ease';

        // Event listeners
        window.addEventListener('resize', updateHeroBottom, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ==================================================================
    // Map Interactions
    // ==================================================================
    function initMapInteractions() {
        const mapPins = document.querySelectorAll('.hero__map-gym-pin, .access__map-svg');

        mapPins.forEach(pin => {
            pin.addEventListener('click', function () {
                // Open Google Maps directions
                window.open('https://maps.google.com/?q=35.6595,139.7004', '_blank');
            });

            pin.style.cursor = 'pointer';
        });
    }

    // ==================================================================
    // Button Click Effects
    // ==================================================================
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.c-btn, .mobile-footer__btn');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                // Skip if it's an anchor link
                if (this.getAttribute('href')?.startsWith('#')) return;

                // Add click animation
                this.style.transform = 'scale(0.97)';

                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Log for analytics
                const buttonText = this.textContent.trim();
                console.log('Button clicked:', buttonText);
            });
        });
    }

    // ==================================================================
    // Feature Card Hover Effects
    // ==================================================================
    function initFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-6px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    // ==================================================================
    // Route Animation Replay
    // ==================================================================
    function initRouteAnimation() {
        const routePath = document.querySelector('.hero__map-route-path');

        if (!routePath) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset animation
                    routePath.style.animation = 'none';
                    routePath.offsetHeight; // Trigger reflow
                    routePath.style.animation = 'dash 20s linear infinite';
                }
            });
        }, { threshold: 0.5 });

        observer.observe(routePath);
    }

    // ==================================================================
    // Initialize Everything
    // ==================================================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runInit);
        } else {
            runInit();
        }
    }

    function runInit() {
        initScrollAnimation();
        initSmoothScroll();
        initCurrentTimeStatus();
        initMobileFooter();
        initMapInteractions();
        initButtonEffects();
        initFeatureCards();
        initRouteAnimation();

        console.log('Template L initialized successfully');
    }

    // Start initialization
    init();
})();
