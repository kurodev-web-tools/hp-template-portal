/**
 * Template M - Movie / VSL JavaScript
 * Video Sales Letter Landing Page
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        DELAYED_CTA_TIME: 5000, // 5 seconds for demo (use 60000-120000 for production)
        VIDEO_STICKY_THRESHOLD: 300,
        SPOTS_REMAINING: 12
    };

    // State
    let videoPlaying = false;
    let delayedCtaShown = false;

    // ==================================================================
    // Delayed CTA
    // ==================================================================
    function initDelayedCta() {
        const delayedCta = document.getElementById('delayedCta');

        if (!delayedCta) return;

        // Show CTA after delay
        setTimeout(() => {
            showDelayedCta();
        }, CONFIG.DELAYED_CTA_TIME);

        // Also show on scroll past certain point
        let scrollTriggered = false;

        window.addEventListener('scroll', () => {
            if (!scrollTriggered && !delayedCtaShown) {
                const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

                if (scrollPercent > 10) {
                    scrollTriggered = true;
                    showDelayedCta();
                }
            }
        }, { passive: true });
    }

    function showDelayedCta() {
        if (delayedCtaShown) return;

        const delayedCta = document.getElementById('delayedCta');

        if (delayedCta) {
            delayedCta.classList.add('is-visible');
            delayedCtaShown = true;

            // Animate spots counter
            animateSpotsCounter();

            console.log('Delayed CTA shown');
        }
    }

    // ==================================================================
    // Spots Counter Animation
    // ==================================================================
    function animateSpotsCounter() {
        const spotsElement = document.querySelector('.delayed-cta__spots-count');

        if (!spotsElement) return;

        const targetValue = CONFIG.SPOTS_REMAINING;
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current = Math.floor(targetValue + (20 - targetValue) * (1 - easeOut));
            spotsElement.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ==================================================================
    // Video Player
    // ==================================================================
    function initVideoPlayer() {
        const playButton = document.getElementById('playButton');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoIframe = document.getElementById('videoIframe');

        if (!playButton || !videoPlayer) return;

        playButton.addEventListener('click', () => {
            startVideo();
        });

        // Auto-play simulation when video comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    // Could auto-play here if desired
                }
            });
        }, { threshold: 0.5 });

        observer.observe(videoPlayer);
    }

    function startVideo() {
        const videoPlayer = document.getElementById('videoPlayer');

        if (!videoPlayer || videoPlaying) return;

        videoPlayer.classList.add('is-playing');
        videoPlaying = true;

        // Simulate video progress
        startVideoProgress();

        console.log('Video started');
    }

    // ==================================================================
    // Video Progress Bar
    // ==================================================================
    function startVideoProgress() {
        const progressBar = document.getElementById('videoProgress');

        if (!progressBar) return;

        let progress = 0;
        const duration = 300000; // 5 minutes simulated video
        const interval = 100;

        const timer = setInterval(() => {
            progress += interval;
            const percent = Math.min((progress / duration) * 100, 100);

            progressBar.style.width = percent + '%';

            // Show CTA at 20% progress if not already shown
            if (percent > 20 && !delayedCtaShown) {
                showDelayedCta();
            }

            if (progress >= duration) {
                clearInterval(timer);
            }
        }, interval);
    }

    // ==================================================================
    // Sticky Video (Mobile)
    // ==================================================================
    function initStickyVideo() {
        const videoContainer = document.getElementById('videoContainer');

        if (!videoContainer || window.innerWidth >= 768) return;

        let lastScrollY = 0;

        function handleScroll() {
            const scrollY = window.scrollY;
            const videoHeight = videoContainer.offsetHeight;

            if (scrollY > videoHeight && videoPlaying) {
                videoContainer.classList.add('is-sticky');
            } else {
                videoContainer.classList.remove('is-sticky');
            }

            lastScrollY = scrollY;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ==================================================================
    // Scroll Animations
    // ==================================================================
    function initScrollAnimations() {
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
    // FAQ Accordion
    // ==================================================================
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');

            if (!question) return;

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('is-open');
                    }
                });

                // Toggle current item
                item.classList.toggle('is-open');
            });
        });
    }

    // ==================================================================
    // Smooth Scroll
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
    // Button Click Effects
    // ==================================================================
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.c-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);

                // Track click
                console.log('CTA clicked:', this.textContent.trim());
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==================================================================
    // Testimonial Video Thumbnails
    // ==================================================================
    function initTestimonialVideos() {
        const videoThumbs = document.querySelectorAll('.testimonial-card__video');

        videoThumbs.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Show coming soon or play video
                alert('受講生へのインタビュー動画は近日公開予定です！');
            });
        });
    }

    // ==================================================================
    // Urgency Timer (Countdown effect)
    // ==================================================================
    function initUrgencyTimer() {
        // Randomly decrease spots counter occasionally
        const spotsElement = document.querySelector('.delayed-cta__spots-count');

        if (!spotsElement) return;

        setInterval(() => {
            if (delayedCtaShown && Math.random() > 0.7) {
                const current = parseInt(spotsElement.textContent);
                if (current > 3) {
                    spotsElement.textContent = current - 1;

                    // Flash effect
                    spotsElement.style.color = '#ff0000';
                    setTimeout(() => {
                        spotsElement.style.color = '';
                    }, 500);
                }
            }
        }, 15000); // Every 15 seconds
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
        initDelayedCta();
        initVideoPlayer();
        initStickyVideo();
        initScrollAnimations();
        initFaqAccordion();
        initSmoothScroll();
        initButtonEffects();
        initTestimonialVideos();
        initUrgencyTimer();

        console.log('Template M (VSL) initialized successfully');
    }

    // Start initialization
    init();
})();
