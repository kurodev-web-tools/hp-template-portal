/**
 * Template N - Newsletter Theme JavaScript
 * Editorial-style landing page for paid newsletter
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        SCROLL_OFFSET: 100,
        ANIMATION_THRESHOLD: 0.1
    };

    // ==================================================================
    // Subscribe Form Handler
    // ==================================================================
    function initSubscribeForms() {
        const forms = [
            document.getElementById('subscribeForm'),
            document.getElementById('subscribeFormBottom')
        ];

        forms.forEach(form => {
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const emailInput = form.querySelector('input[type="email"]');
                const email = emailInput.value.trim();

                if (email) {
                    // Show success message
                    alert('ご登録ありがとうございます！\n最新のインサイトをお届けします。');

                    // Clear the input
                    emailInput.value = '';

                    // Log for analytics (replace with actual tracking)
                    console.log('New subscription:', email);

                    // Optional: Track event
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'subscribe', {
                            'event_category': 'engagement',
                            'event_label': 'newsletter_signup'
                        });
                    }
                }
            });
        });
    }

    // ==================================================================
    // Scroll Animations
    // ==================================================================
    function initScrollAnimations() {
        const triggers = document.querySelectorAll('.js-scroll-trigger');

        if (!triggers.length) return;

        const observerOptions = {
            root: null,
            rootMargin: `0px 0px -${CONFIG.SCROLL_OFFSET}px 0px`,
            threshold: CONFIG.ANIMATION_THRESHOLD
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Uncomment below to only animate once
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => {
            observer.observe(trigger);
        });
    }

    // ==================================================================
    // Smooth Scroll Navigation
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

                    // Optional: Update URL without jumping
                    history.pushState(null, '', targetId);
                }
            });
        });
    }

    // ==================================================================
    // Header Scroll Effect
    // ==================================================================
    function initHeaderScroll() {
        const header = document.querySelector('.header');

        if (!header) return;

        let lastScrollY = 0;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                header.classList.add('is-scrolled');
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('is-scrolled');
                header.style.boxShadow = 'none';
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateHeader();
    }

    // ==================================================================
    // Preview Card Interaction
    // ==================================================================
    function initPreviewCard() {
        const previewCard = document.querySelector('.preview__card');
        const unlockCta = document.querySelector('.preview__card-cta');

        if (!previewCard || !unlockCta) return;

        // Add hover effect to preview card
        previewCard.addEventListener('mouseenter', () => {
            previewCard.style.transform = 'translateY(-4px)';
            previewCard.style.transition = 'transform 0.3s ease';
        });

        previewCard.addEventListener('mouseleave', () => {
            previewCard.style.transform = 'translateY(0)';
        });

        // Unlock CTA scrolls to subscribe form
        unlockCta.addEventListener('click', (e) => {
            e.preventDefault();

            const subscribeForm = document.getElementById('subscribeForm');

            if (subscribeForm) {
                subscribeForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Focus the input after scroll
                setTimeout(() => {
                    const input = subscribeForm.querySelector('input[type="email"]');
                    if (input) input.focus();
                }, 500);
            }
        });
    }

    // ==================================================================
    // Input Focus Effects
    // ==================================================================
    function initInputEffects() {
        const inputs = document.querySelectorAll('.subscribe-form__input');

        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('is-focused');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('is-focused');
            });
        });
    }

    // ==================================================================
    // Reading Time Estimation (Optional Enhancement)
    // ==================================================================
    function initReadingTime() {
        const previewContent = document.querySelector('.preview__card-content');

        if (!previewContent) return;

        // Simple reading time calculation
        const text = previewContent.textContent || '';
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

        console.log(`Estimated reading time: ${readingTime} min`);
    }

    // ==================================================================
    // Analytics Helper
    // ==================================================================
    function initAnalytics() {
        // Track page view
        console.log('Template N loaded');

        // Track CTA button clicks
        const ctaButtons = document.querySelectorAll('.c-btn-primary');

        ctaButtons.forEach(button => {
            button.addEventListener('click', function () {
                const buttonText = this.textContent.trim();
                console.log('CTA clicked:', buttonText);

                // Google Analytics 4 event (if available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'cta',
                        'event_label': buttonText
                    });
                }
            });
        });

        // Track section views
        const sections = ['benefits', 'preview', 'testimonials'];

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        console.log('Section viewed:', sectionId);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(section);
        });
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
        initSubscribeForms();
        initScrollAnimations();
        initSmoothScroll();
        initHeaderScroll();
        initPreviewCard();
        initInputEffects();
        initReadingTime();
        initAnalytics();

        console.log('Template N (Newsletter) initialized successfully');
    }

    // Start initialization
    init();
})();
