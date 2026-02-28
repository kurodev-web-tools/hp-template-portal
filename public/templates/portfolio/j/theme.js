/**
 * Journal Portfolio Theme - JS Effects
 * 特殊仕様: スクロールプログレス、テキストリビールアニメーション、テキストエリアの自動高さ調整
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        initCustomCursor();
        initNavigation();
        initReadingProgress();
        initTextReveal();
        initAutoExpandTextarea();
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

        document.querySelectorAll('a, button, input, textarea, .pub-item').forEach(el => {
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

                // Toggle nav dark class specifically for mobile menu contrasting
                if (navMenu.classList.contains('is-open')) {
                    navToggle.classList.remove('nav-dark');
                } else {
                    if (window.scrollY < 50) {
                        navToggle.classList.add('nav-dark');
                    }
                }
            });

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (window.innerWidth <= 768) {
                        navToggle.classList.remove('is-open');
                        navMenu.classList.remove('is-open');
                        if (window.scrollY < 50) navToggle.classList.add('nav-dark');
                    }

                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        setTimeout(() => {
                            gsap.to(window, {
                                duration: 1.5,
                                scrollTo: { y: target, offsetY: 50 },
                                ease: 'power3.inOut'
                            });
                        }, 50);
                    }
                });
            });
        }
    }

    // ============================================
    // Reading Progress Bar
    // ============================================
    function initReadingProgress() {
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // ============================================
    // Text Reveal Animations
    // ============================================
    function initTextReveal() {
        // Hero texts play immediately
        gsap.to('.hero-title.reveal-text', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.2
        });

        gsap.to('.hero-subtitle.reveal-text', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.6
        });

        // Other elements fade up on scroll 
        gsap.utils.toArray('.ed-subheading, .drop-cap, .pub-item, blockquote').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    // ============================================
    // Auto Expand Textarea
    // ============================================
    function initAutoExpandTextarea() {
        const textareas = document.querySelectorAll('.auto-expand');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function () {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });
    }

})();
