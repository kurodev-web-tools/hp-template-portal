/**
 * Template O - Offer Wall / Affiliate Ranking JavaScript
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        SCROLL_OFFSET: 100,
        ANIMATION_THRESHOLD: 0.15,
        SCORE_BAR_DELAY: 200
    };

    // ==================================================================
    // Mobile Menu Toggle
    // ==================================================================
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const headerNav = document.querySelector('.header__nav');

        if (!menuToggle || !headerNav) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            headerNav.classList.toggle('is-open');

            // Toggle aria-expanded for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !headerNav.contains(e.target)) {
                menuToggle.classList.remove('is-active');
                headerNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ==================================================================
    // Score Bar Animation
    // ==================================================================
    function initScoreBars() {
        const scoreBars = document.querySelectorAll('.score-bar__fill');

        if (!scoreBars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const score = bar.dataset.score;

                    if (score) {
                        // Delay animation slightly for visual effect
                        setTimeout(() => {
                            bar.style.width = score + '%';
                        }, CONFIG.SCORE_BAR_DELAY);
                    }

                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        scoreBars.forEach(bar => {
            observer.observe(bar);
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
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => {
            observer.observe(trigger);
        });
    }

    // ==================================================================
    // Sticky Table Header
    // ==================================================================
    function initStickyTableHeader() {
        // Sticky header removed due to layout issues
        /*
        const tableHeader = document.getElementById('tableHeader');
        const comparisonTable = document.getElementById('comparisonTable');
        
        if (!tableHeader || !comparisonTable || window.innerWidth < 768) return;
        ...
        */
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
                }
            });
        });
    }

    // ==================================================================
    // Rank Card Hover Effects
    // ==================================================================
    function initRankCardEffects() {
        const rankCards = document.querySelectorAll('.rank-card');

        rankCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    // ==================================================================
    // CTA Button Tracking
    // ==================================================================
    function initCtaTracking() {
        const ctaButtons = document.querySelectorAll('.c-btn-primary, .rank-card__cta');

        ctaButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                const rank = this.closest('.rank-card')?.dataset.rank;
                const buttonText = this.textContent.trim();

                // Log for analytics
                console.log('CTA Clicked:', {
                    rank: rank || 'N/A',
                    text: buttonText,
                    timestamp: new Date().toISOString()
                });

                // Track which rank is getting the most clicks
                if (rank) {
                    localStorage.setItem(`rank_${rank}_clicked`, Date.now());
                }

                // Google Analytics event (if available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'affiliate',
                        'event_label': `rank_${rank || 'other'}`,
                        'value': rank
                    });
                }
            });
        });
    }

    // ==================================================================
    // Comparison Table Sort (Optional Enhancement)
    // ==================================================================
    function initComparisonSort() {
        const table = document.querySelector('.comparison__table');

        if (!table) return;

        // Make table rows clickable to highlight
        const rows = table.querySelectorAll('.comparison__row:not(.comparison__row--cta)');

        rows.forEach(row => {
            row.addEventListener('click', function () {
                // Remove highlight from all rows
                rows.forEach(r => r.classList.remove('is-highlighted'));

                // Add highlight to clicked row
                this.classList.add('is-highlighted');
            });
        });
    }

    // ==================================================================
    // Reading Progress Indicator
    // ==================================================================
    function initReadingProgress() {
        let ticking = false;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            // Could add a progress bar element here if needed
            // document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    }

    // ==================================================================
    // Ranking Summary Click Scroll
    // ==================================================================
    function initRankingSummary() {
        const summaryItems = document.querySelectorAll('.ranking-summary__item');

        summaryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const rankCards = document.querySelectorAll('.rank-card');

                if (rankCards[index]) {
                    rankCards[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });

                    // Highlight the card briefly
                    rankCards[index].style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        rankCards[index].style.transform = '';
                    }, 300);
                }
            });

            item.style.cursor = 'pointer';
        });
    }

    // ==================================================================
    // Analytics Helper
    // ==================================================================
    function initAnalytics() {
        // Track page view
        console.log('Template O (Offer Wall) loaded');

        // Track time on page
        let startTime = Date.now();

        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            console.log('Time on page:', timeSpent, 'seconds');
        });

        // Track section views
        const sections = ['ranking', 'comparison', 'guide'];

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
        initMobileMenu();
        initScoreBars();
        initScrollAnimations();
        initStickyTableHeader();
        initSmoothScroll();
        initRankCardEffects();
        initCtaTracking();
        initComparisonSort();
        initReadingProgress();
        initRankingSummary();
        initAnalytics();

        console.log('Template O (Offer Wall) initialized successfully');
    }

    // Start initialization
    init();
})();
