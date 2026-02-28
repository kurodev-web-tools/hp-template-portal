/**
 * Cinematic Portfolio Theme - GSAP Animations
 * 特殊仕様: シネマカーテン、横スクロールフィルム、エンドロール
 */

(function () {
    'use strict';

    // Wait for DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        // 開幕のカーテンアニメーション用に少し遅延させる
        setTimeout(() => {
            document.body.classList.add('loaded');
            init();
        }, 500);
    });

    function init() {
        gsap.registerPlugin(ScrollTrigger);

        initCustomCursor();
        initNavigation();
        initHeroText();
        initAboutAnimations();
        initFilmstripScroll();
        initEndCredits();
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
            cursorX += dx * 0.15; // Slightly slower for Cinematic feel
            cursorY += dy * 0.15;

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

        document.querySelectorAll('a, button, .film-card').forEach(el => {
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

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
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

        // Mobile Menu toggle (Cinematic)
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('is-open');
                navMenu.classList.toggle('is-open');
            });

            // Close menu when a link is clicked (mobile)
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('is-open');
                    navToggle.classList.remove('is-open');
                });
            });
        }
    }

    // ============================================
    // Hero Text Reveal (Wait for Curtains)
    // ============================================
    function initHeroText() {
        const tl = gsap.timeline({ delay: 1.5 }); // Wait for curtains

        // Split text simulation if no split library
        document.querySelectorAll('.hero-title .text-line span').forEach(el => {
            gsap.set(el, { y: '100%' });
        });

        tl.to('.hero-title .text-line span', {
            y: '0%',
            duration: 1.5,
            stagger: 0.2,
            ease: 'power4.out'
        })
            .to('.hero-subtitle', {
                opacity: 1,
                duration: 2,
                ease: 'power2.inOut'
            }, "-=0.5")
            .to('.scroll-prompt', {
                opacity: 1,
                duration: 1
            });
    }

    // ============================================
    // About Section
    // ============================================
    function initAboutAnimations() {
        const aboutContent = document.querySelector('.about-content');

        if (aboutContent) {
            gsap.to(aboutContent, {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 60%',
                },
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out'
            });
        }
    }

    // ============================================
    // Horizontal Filmstrip Scrolling logic
    // (Translating vertical mouse wheel to horizontal scroll)
    // ============================================
    function initFilmstripScroll() {
        const filmstripContainer = document.querySelector('.filmstrip-container');

        if (filmstripContainer) {
            // Optional: convert vertical scroll wheel to horizontal scrolling if inside area
            // Note: overscroll-behavior/scroll-snap often sufficient on mobile, 
            // but for PC mouse wheel, this helps.
            filmstripContainer.addEventListener('wheel', (evt) => {
                // If scrolling predominantly vertically, perhaps convert to horizontal
                if (Math.abs(evt.deltaY) > Math.abs(evt.deltaX)) {
                    filmstripContainer.scrollLeft += evt.deltaY;
                    evt.preventDefault();
                }
            });
        }
    }

    // ============================================
    // End Credits Roll
    // ============================================
    function initEndCredits() {
        const creditsScroll = document.querySelector('.credits-scroll');
        const contactSection = document.querySelector('.contact');

        if (creditsScroll && contactSection) {
            // End credits style ScrollTrigger
            ScrollTrigger.create({
                trigger: contactSection,
                start: 'top top',
                end: '+=100%',
                pin: true, // Pin the section while credits roll
                animation: gsap.to(creditsScroll, {
                    y: '-100%', // Roll up entirely
                    ease: 'none'
                }),
                scrub: 1 // Link animation to scroll bar directly
            });
        }
    }

})();
