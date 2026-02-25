/**
 * Ethereal Portfolio Theme - JS Effects
 * 特殊仕様: フェードイン、流体的な動き
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger);

        initCustomCursor();
        initNavigation();
        initFadeEffects();
        initTextareaResize();
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
            // Ethereal specifically uses a very smooth, slightly slower lag (0.1) for a "floating" feel.
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;

            gsap.set(cursor, {
                x: cursorX,
                y: cursorY,
                overwrite: true
            });
        });

        const updateHover = (isHover) => {
            if (isHover) cursor.classList.add('hover');
            else cursor.classList.remove('hover');
        };

        // Add hover effects cleanly
        document.querySelectorAll('a, button, input, textarea, .tag').forEach(el => {
            el.addEventListener('mouseenter', () => updateHover(true));
            el.addEventListener('mouseleave', () => updateHover(false));
        });
    }

    // ============================================
    // Navigation
    // ============================================
    function initNavigation() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scroll for nav links targeting IDs
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: target,
                        ease: 'power3.inOut'
                    });
                }
            });
        });

        // Mobile Menu toggle (Golden Master + bugfix applied)
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.background = 'rgba(248, 249, 255, 0.98)';
                    navMenu.style.padding = '3rem 2rem';
                    navMenu.style.gap = '2rem';
                    navMenu.style.borderBottom = '1px solid #E6E6FA';
                }
            });

            // Auto-close on link click (mobile)
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navMenu.style.display = 'none';
                    }
                });
            });
        }
    }

    // ============================================
    // Fade In Effects on Scroll
    // ============================================
    function initFadeEffects() {
        // Hero Fade in
        gsap.from('.hero-title, .hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.2
        });

        // Works Project Rows Fade in
        const projects = document.querySelectorAll('.project-row');
        projects.forEach((proj, i) => {
            gsap.from(proj, {
                scrollTrigger: {
                    trigger: proj,
                    start: 'top 80%'
                },
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out'
            });
        });

        // About Tags Stagger
        gsap.from('.tag', {
            scrollTrigger: {
                trigger: '.tags',
                start: 'top 85%'
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.5)'
        });
    }

    // ============================================
    // Textarea Auto Resize
    // ============================================
    function initTextareaResize() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });
    }

})();
