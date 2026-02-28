document.addEventListener('DOMContentLoaded', () => {
    // 1. GSAP Initialization
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 2. Line Drawing Animation logic
    const drawLines = document.querySelectorAll('.draw-line');
    drawLines.forEach(line => {
        const length = line.getTotalLength ? line.getTotalLength() : 1000;

        // Initial state
        gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        // Trigger on scroll
        gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
            }
        });
    });

    // 3. Golden Master Reveal Effects
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => {
        const type = el.dataset.reveal || 'fade-up';
        const delay = parseFloat(el.dataset.delay) || 0;

        gsap.from(el, {
            opacity: 0,
            y: type.includes('fade-up') ? 30 : 0,
            x: type.includes('fade-left') ? 30 : (type.includes('fade-right') ? -30 : 0),
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%'
            },
            delay: delay
        });
    });

    // 4. Custom LERP Cursor (Golden Master Standards)
    // Re-applying LERP logic if premium-effects.js doesn't auto-init correctly for this theme
    if (typeof initPremiumCursor === 'function') {
        initPremiumCursor({
            color: '#ffffff', // Will be inverted via CSS blend-mode
            size: 20
        });
    }

    // 5. Hero Red Point Blink
    gsap.to('.red-point', {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // 6. Smooth Anchor Scrolling & Mobile menu close
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navList && navList.classList.contains('active')) {
                toggleMenu();
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

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
});
