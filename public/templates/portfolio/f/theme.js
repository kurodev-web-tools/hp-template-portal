/**
 * Film Portfolio Theme - JS Effects
 * 特殊仕様: 横スクロール強制（ScrollTrigger）、追従カーソルのコンテキスト変化
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        initCustomCursor();
        initNavigation();
        initHeroCounter();
        initHorizontalFilmstrip();
        initContextAwareCursor();
        initReceiptDate();
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

        document.querySelectorAll('a, button, input, textarea, .film-panel').forEach(el => {
            el.addEventListener('mouseenter', () => updateHover(true));
            el.addEventListener('mouseleave', () => updateHover(false));
        });
    }

    // ============================================
    // Context Aware Cursor (changes color/style based on section)
    // ============================================
    function initContextAwareCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        // Darkroom mode
        ScrollTrigger.create({
            trigger: '.darkroom',
            start: 'top center',
            end: 'bottom center',
            onEnter: () => cursor.classList.add('darkroom-mode'),
            onLeave: () => cursor.classList.remove('darkroom-mode'),
            onEnterBack: () => cursor.classList.add('darkroom-mode'),
            onLeaveBack: () => cursor.classList.remove('darkroom-mode'),
        });

        // Receipt mode
        ScrollTrigger.create({
            trigger: '.receipt-section',
            start: 'top center',
            onEnter: () => cursor.classList.add('receipt-mode'),
            onLeaveBack: () => cursor.classList.remove('receipt-mode'),
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
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.background = 'rgba(26, 26, 26, 0.98)';
                    navMenu.style.padding = '3rem 2rem';
                    navMenu.style.gap = '2rem';
                    navMenu.style.borderBottom = '1px solid #333';
                }
            });

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.innerWidth <= 768) navMenu.style.display = 'none';

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
        }
    }

    // ============================================
    // Hero Animated Film Counter
    // ============================================
    function initHeroCounter() {
        const counterEl = document.querySelector('.film-counter');
        if (!counterEl) return;

        // Animate counter from 001 to 024 quickly on load
        let obj = { val: 1 };
        gsap.to(obj, {
            val: 24,
            duration: 2,
            ease: "power1.inOut",
            onUpdate: () => {
                counterEl.innerHTML = ('000' + Math.floor(obj.val)).slice(-3) + ' / 036';
            }
        });
    }

    // ============================================
    // Horizontal Filmstrip Scroll (GSAP)
    // ============================================
    function initHorizontalFilmstrip() {
        const wrapper = document.querySelector('.filmstrip-wrapper');
        const panels = gsap.utils.toArray('.film-panel');
        if (!wrapper || panels.length === 0) return;

        // Calculate total horizontal width to scroll minus 1 viewport width
        // A simpler way with ScrollTrigger is translating X by -100% * (elements - 1)

        let scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".filmstrip-section",
                pin: true,           // Pin the section
                scrub: 1,            // Smooth scrubbing
                snap: 1 / (panels.length - 1), // Optional: snap to panels
                // The scroll distance
                end: () => "+=" + wrapper.offsetWidth
            }
        });
    }

    // ============================================
    // Receipt Date
    // ============================================
    function initReceiptDate() {
        const dateEl = document.querySelector('.current-date');
        if (dateEl) {
            const d = new Date();
            const year = d.getFullYear();
            const month = ('0' + (d.getMonth() + 1)).slice(-2);
            const day = ('0' + d.getDate()).slice(-2);
            const hours = ('0' + d.getHours()).slice(-2);
            const mins = ('0' + d.getMinutes()).slice(-2);
            dateEl.textContent = `${year}-${month}-${day} ${hours}:${mins}`;
        }
    }

})();
