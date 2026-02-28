/**
 * Holographic Portfolio Theme - JS Effects
 * 特殊仕様: マウス連携3Dチルトアクション (CSS vars), LERPカーソル
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        initCustomCursor();
        initNavigation();
        init3DTiltCards();
        initHeroParallax();
        initFadeEffects();

        // Recalculate scroll positions after all assets load
        window.addEventListener('load', () => ScrollTrigger.refresh());
    }

    // ============================================
    // Custom Cursor with LERP
    // ============================================
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        if (window.matchMedia('(pointer: coarse)').matches) {
            cursor.style.display = 'none';
            return;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        gsap.set(cursor, { x: cursorX, y: cursorY });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;

            gsap.set(cursor, { x: cursorX, y: cursorY, overwrite: true });
        });

        const updateHover = (isHover) => {
            if (isHover) cursor.classList.add('hover');
            else cursor.classList.remove('hover');
        };

        document.querySelectorAll('a, button, input, textarea, .holo-card-wrap, .hex').forEach(el => {
            el.addEventListener('mouseenter', () => updateHover(true));
            el.addEventListener('mouseleave', () => updateHover(false));
        });
    }

    // ============================================
    // Navigation (Golden Master)
    // ============================================
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('is-open');
                navMenu.classList.toggle('is-open');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (window.innerWidth <= 768) {
                        navToggle.classList.remove('is-open');
                        navMenu.classList.remove('is-open');
                    }

                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        setTimeout(() => {
                            gsap.to(window, {
                                duration: 1.5,
                                scrollTo: target,
                                ease: 'power3.inOut'
                            });
                        }, 50);
                    }
                });
            });
        }
    }

    // ============================================
    // Hero Text Parallax
    // ============================================
    function initHeroParallax() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;

            gsap.to(heroTitle, {
                x: x, y: y, duration: 1, ease: 'power2.out'
            });
        });
    }

    // ============================================
    // 3D Tilt Cards (Holo Effect)
    // ============================================
    function init3DTiltCards() {
        const cards = document.querySelectorAll('.holo-card-wrap');

        cards.forEach(wrap => {
            const card = wrap.querySelector('.holo-card');

            wrap.addEventListener('mousemove', (e) => {
                // Ignore on mobile
                if (window.innerWidth <= 768) return;

                const rect = wrap.getBoundingClientRect();

                // Get mouse position relative to the card center (-1 to 1)
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
                const rotateY = ((x - centerX) / centerX) * 15;

                // Position for background glare gradient (percentage)
                const pointerX = (x / rect.width) * 100;
                const pointerY = (y / rect.height) * 100;

                // Pass to CSS variables
                card.style.setProperty('--rotateX', `${rotateX}deg`);
                card.style.setProperty('--rotateY', `${rotateY}deg`);
                card.style.setProperty('--pointerX', `${pointerX}%`);
                card.style.setProperty('--pointerY', `${pointerY}%`);
            });

            // Reset on leave
            wrap.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotateX', `0deg`);
                card.style.setProperty('--rotateY', `0deg`);
                card.style.setProperty('--pointerX', `50%`);
                card.style.setProperty('--pointerY', `50%`);
            });
        });
    }

    // ============================================
    // Fade In Effects
    // ============================================
    function initFadeEffects() {
        // Hexagons stagger fade in — use fromTo so initial state is explicit and reliable
        const hexEls = document.querySelectorAll('.hex');
        if (hexEls.length) {
            gsap.fromTo('.hex',
                { scale: 0, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.hex-grid',
                        start: 'top 75%',
                        once: true
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.5)'
                }
            );
        }

        // Works cards fade up
        gsap.utils.toArray('.holo-card-wrap').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    once: true
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

})();
