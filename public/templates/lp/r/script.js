/**
 * Recruitment LP Template R
 * Future & Career
 * Vanilla JS with IntersectionObserver
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const floatingCta = document.getElementById('floatingCta');

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ============================================
    // Floating CTA Visibility
    // ============================================
    function handleFloatingCta() {
        const heroHeight = document.getElementById('hero').offsetHeight;
        const entrySection = document.getElementById('entry');
        const entryRect = entrySection.getBoundingClientRect();
        
        // Show floating CTA after scrolling past hero
        // Hide it when near the entry section (to avoid duplication)
        if (window.scrollY > heroHeight * 0.5 && entryRect.top > window.innerHeight) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section-header, .value-card, .member-card, .job-card, .benefit-item'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Hero Content Animation on Load
    // ============================================
    function initHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });
    }

    // ============================================
    // Stats Counter Animation
    // ============================================
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const numericValue = parseInt(text.replace(/\D/g, ''));
        
        let current = 0;
        const duration = 1500;
        const increment = numericValue / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            element.textContent = displayValue;
        }, 16);
    }

    // ============================================
    // Throttled Scroll Handler
    // ============================================
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHeaderScroll();
                handleFloatingCta();
                ticking = false;
            });
            ticking = true;
        }
    }

    // ============================================
    // Coming Soon Handler
    // ============================================
    window.showComingSoon = function(event) {
        event.preventDefault();
        alert('Coming Soon!\n\nこの機能は現在開発中です。\n実装時にはエントリーフォームや採用サイトへのリンクが機能します。');
    };

    // ============================================
    // Initialize
    // ============================================
    function init() {
        initHeroAnimation();
        initScrollReveal();
        initSmoothScroll();
        initStatsAnimation();
        
        // Scroll event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleHeaderScroll();
        handleFloatingCta();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
