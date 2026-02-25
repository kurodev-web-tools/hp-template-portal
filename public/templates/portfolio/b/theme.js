/**
 * Blueprint Portfolio Theme - GSAP Animations
 * 特殊仕様: 設計図エフェクト
 */

(function () {
    'use strict';

    // Wait for DOM ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        gsap.registerPlugin(ScrollTrigger);

        initCustomCursor();
        initNavigation();
        initHeroAnimations();
        initBlueprintDrawing();
        initSkillsAnimations();
        initDates();
    }

    function initDates() {
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '.');
        const d1 = document.getElementById('currentDate');
        const d2 = document.getElementById('stampDate');
        if (d1) d1.textContent = dateStr;
        if (d2) d2.textContent = dateStr;
    }

    // ============================================
    // Custom Cursor with LERP
    // ============================================
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        // Hide if touch device
        if (window.matchMedia('(pointer: coarse)').matches) {
            cursor.style.display = 'none';
            return;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        gsap.set(cursor, {
            x: cursorX,
            y: cursorY
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.25;
            cursorY += dy * 0.25;

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

        document.querySelectorAll('a, button, .work-row').forEach(el => {
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
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            });
        });

        // Mobile Toggle Logic (Template A / Golden Master standard)
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                // In a production scenario, you would toggle a specific mobile menu container.
                // For scaffolding, we just toggle display for now.
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.background = 'rgba(0, 59, 111, 0.95)';
                    navMenu.style.padding = '2rem';
                }
            });
        }
    }

    // ============================================
    // Hero Animations
    // ============================================
    function initHeroAnimations() {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.from('.corner', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)"
        })
            .from('.spec-header', {
                opacity: 0,
                y: -20,
                duration: 0.5
            }, "-=0.2")
            .from('.hero-content h1 span', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.3")
            .from('.hero-subtitle', {
                opacity: 0,
                x: -20,
                duration: 0.5
            }, "-=0.4")
            .from('.hero-scroll', {
                opacity: 0,
                duration: 1
            });
    }

    // ============================================
    // Blueprint Drawing (SVG / Line effects)
    // ============================================
    function initBlueprintDrawing() {
        // About Section Lines
        const aboutSection = document.querySelector('.about');

        gsap.from('.dimension-line.top', {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
            },
            width: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from('.dimension-line.left', {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
            },
            height: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.2
        });

        gsap.to('.spec-item', {
            scrollTrigger: {
                trigger: '.spec-list',
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1
        });

        // Works List Entry
        gsap.to('.work-row', {
            scrollTrigger: {
                trigger: '.works-list',
                start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1
        });

        // Stamp entry
        gsap.to('.approval-stamp', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
            },
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'bounce.out'
        });
    }

    // ============================================
    // Skills Animations (ASCII Bar Reveal)
    // ============================================
    function initSkillsAnimations() {
        const skillBars = document.querySelectorAll('.skill-bar-ascii');

        skillBars.forEach(bar => {
            const originalText = bar.textContent;

            ScrollTrigger.create({
                trigger: bar,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    // Typewriter effect for ASCII bar
                    let currentLength = 0;
                    bar.textContent = '';

                    const interval = setInterval(() => {
                        if (currentLength >= originalText.length) {
                            clearInterval(interval);
                        } else {
                            bar.textContent = originalText.substring(0, currentLength + 1);
                            currentLength++;
                        }
                    }, 30);
                }
            });
        });
    }

})();
