document.addEventListener('DOMContentLoaded', () => {

    // 1. Neon Flicker Animation
    function initFlicker() {
        const glowElements = document.querySelectorAll('.glow');

        glowElements.forEach(el => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    el.style.opacity = '0.5';
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, 50 + Math.random() * 100);
                }
            }, 100);
        });
    }
    initFlicker();

    // 2. Equalizer Animation
    const eqBars = document.querySelectorAll('.eq-bar');
    if (eqBars.length > 0) {
        function animateEQ() {
            eqBars.forEach(bar => {
                const height = 20 + Math.random() * 80;
                bar.style.height = `${height}%`;
                bar.style.transition = `height ${0.2 + Math.random() * 0.5}s ease-in-out`;
            });
        }
        setInterval(animateEQ, 300);
    }

    // 2.5 Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('is-open');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('is-open');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // 3. Skill Bar Observer
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const width = target.getAttribute('data-level') || '0%';
                target.style.width = width;
                skillObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // 4. Smooth Scroll
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                setTimeout(() => {
                    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power3.inOut' });
                }, 50);
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                setTimeout(() => {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: { y: target, offsetY: 80 },
                        ease: 'power3.inOut'
                    });
                }, 50);
            }
        });
    });

    // 5. Letter Reveal (Standard)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

});
