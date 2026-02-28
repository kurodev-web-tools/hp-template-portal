/**
 * Aurora Portfolio Theme - GSAP Animations
 * 生きた光のキャンバス
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
        initAboutAnimations();
        initWorksAnimations();
        initSkillsAnimations();
        initContactAnimations();
        initScrollEffects();
    }

    // ============================================
    // Custom Cursor with Glow
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

        // Immediately set initial position
        gsap.set(cursor, {
            x: cursorX - 10,
            y: cursorY - 10
        });

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            // Smoother following using LERP
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;

            gsap.set(cursor, {
                x: cursorX - 10,
                y: cursorY - 10,
                overwrite: true
            });
        });

        // Hover effects on interactive elements
        const updateHover = (isHover) => {
            if (isHover) cursor.classList.add('hover');
            else cursor.classList.remove('hover');
        };

        document.querySelectorAll('a, button, .work-item').forEach(el => {
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

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile Nav Toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('is-open');
                navMenu.classList.toggle('is-open');
            });
        }

        // Smooth scroll for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Close mobile menu on click
                if (navToggle && navMenu) {
                    navToggle.classList.remove('is-open');
                    navMenu.classList.remove('is-open');
                }

                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    // Slight delay to allow the menu closing animation to start before scrolling
                    setTimeout(() => {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: {
                                y: target,
                                offsetY: 80
                            },
                            ease: 'power3.inOut'
                        });
                    }, 50);
                }
            });
        });
    }

    // ============================================
    // Hero Animations
    // ============================================
    function initHeroAnimations() {
        const hero = document.querySelector('.hero');
        const titleLines = document.querySelectorAll('.text-line');
        const subtitle = document.querySelector('.hero-subtitle');
        const scrollIndicator = document.querySelector('.hero-scroll');

        // Split text into lines manually if SplitType not available
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.innerHTML = '';
            const span = document.createElement('span');
            span.textContent = text;
            line.appendChild(span);
        });

        const titleSpans = document.querySelectorAll('.text-line span');

        const tl = gsap.timeline({ delay: 0.5 });

        // Animate title lines
        tl.to(titleSpans, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out'
        })
            .to(subtitle, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.5')
            .to(scrollIndicator, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5');

        // Aurora gradient parallax on mouse move
        const gradient = document.querySelector('.hero-gradient');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            gsap.to(gradient, {
                x: x,
                y: y,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // ============================================
    // About Animations
    // ============================================
    function initAboutAnimations() {
        const aboutSection = document.querySelector('.about');
        const image = document.querySelector('.about-image');
        const content = document.querySelector('.about-content');
        const stats = document.querySelectorAll('.stat-item');

        // Image animation
        gsap.from(image, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Content animation
        gsap.from(content, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Stats counter animation
        stats.forEach((stat, index) => {
            const number = stat.querySelector('.stat-number');
            const target = parseInt(number.textContent);

            gsap.from(stat, {
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.4 + (index * 0.15),
                ease: 'power2.out'
            });

            // Counter animation
            ScrollTrigger.create({
                trigger: aboutSection,
                start: 'top 50%',
                onEnter: () => {
                    gsap.to({ value: 0 }, {
                        value: target,
                        duration: 2,
                        delay: 0.4 + (index * 0.15),
                        ease: 'power2.out',
                        onUpdate: function () {
                            number.textContent = Math.round(this.targets()[0].value) + '+';
                        }
                    });
                }
            });
        });
    }

    // ============================================
    // Works Animations
    // ============================================
    function initWorksAnimations() {
        const worksSection = document.querySelector('.works');
        const workItems = document.querySelectorAll('.work-item');

        // Section title
        gsap.from('.works .section-title', {
            scrollTrigger: {
                trigger: worksSection,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Work items staggered animation
        workItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // Parallax effect on images
        workItems.forEach(item => {
            const img = item.querySelector('img');

            ScrollTrigger.create({
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(img, {
                        y: (progress - 0.5) * 20,
                        ease: 'none',
                        overwrite: true
                    });
                }
            });
        });
    }

    // ============================================
    // Skills Animations
    // ============================================
    function initSkillsAnimations() {
        const skillsSection = document.querySelector('.skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillItems = document.querySelectorAll('.skill-item');

        // Section title
        gsap.from('.skills .section-title', {
            scrollTrigger: {
                trigger: skillsSection,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Skill items
        skillItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });

        // Skill bars animation
        skillBars.forEach(bar => {
            const skillValue = bar.dataset.skill;

            ScrollTrigger.create({
                trigger: skillsSection,
                start: 'top 60%',
                once: true,
                onEnter: () => {
                    gsap.to(bar, {
                        width: skillValue + '%',
                        duration: 1.5,
                        ease: 'power3.out',
                        delay: 0.3
                    });
                }
            });
        });
    }

    // ============================================
    // Contact Animations
    // ============================================
    function initContactAnimations() {
        const contactSection = document.querySelector('.contact');
        const title = document.querySelector('.contact-title');
        const link = document.querySelector('.contact-link');
        const socials = document.querySelectorAll('.social-link');

        // Background animation
        gsap.to('.contact-background', {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });

        // Title
        gsap.from(title, {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Email link
        gsap.from(link, {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'back.out(1.7)'
        });

        // Social links
        gsap.from(socials, {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power2.out'
        });
    }

    // ============================================
    // Scroll Effects
    // ============================================
    function initScrollEffects() {
        // Parallax for sections
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            if (section.classList.contains('hero')) return;

            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -30,
                ease: 'none'
            });
        });

        // Fade in elements
        const fadeElements = document.querySelectorAll('.fade-in');

        fadeElements.forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: () => el.classList.add('visible'),
                once: true
            });
        });
    }

})();
