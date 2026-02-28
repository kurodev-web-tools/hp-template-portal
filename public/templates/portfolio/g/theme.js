/**
 * Glassmorphism Portfolio Theme - JS Effects
 * 特殊仕様: 背景メッシュのパララックス、光沢アニメーションの補助
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        initCustomCursor();
        initNavigation();
        initParallaxOrbs();
        initFadeEffects();
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
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            gsap.set(cursor, { x: cursorX, y: cursorY, overwrite: true });
        });

        const updateHover = (isHover) => {
            if (isHover) cursor.classList.add('hover');
            else cursor.classList.remove('hover');
        };

        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => updateHover(true));
            el.addEventListener('mouseleave', () => updateHover(false));
        });
    }

    // ============================================
    // Navigation & Mobile Menu (Golden Master)
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
    // Parallax Orbs (Floating Glass)
    // ============================================
    function initParallaxOrbs() {
        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');

        if (!orb1 || !orb2) return;

        // Make them react to mouse movement slightly for a 3D feel
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;

            gsap.to(orb1, { x: x, y: y, duration: 1, ease: 'power2.out' });
            gsap.to(orb2, { x: -x * 1.5, y: -y * 1.5, duration: 1.5, ease: 'power2.out' });
        });

        // Also react to scroll
        gsap.to(orb1, {
            y: 300,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });

        gsap.to(orb2, {
            y: -200,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2
            }
        });
    }

    // ============================================
    // Fade Effects
    // ============================================
    function initFadeEffects() {
        gsap.utils.toArray('.glass-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

})();
