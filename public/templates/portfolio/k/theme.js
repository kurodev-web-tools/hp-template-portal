/**
 * Template K - Knowledge Portfolio Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initFloatingBlobs();
    initMobileMenu();
    initCustomCursor();
    initFadeEffects();
});

/**
 * Floating 'Cloud Blobs' Animation
 */
function initFloatingBlobs() {
    gsap.to('.blob-1', {
        x: '30%',
        y: '20%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.blob-2', {
        x: '-20%',
        y: '15%',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
}

/**
 * Mobile Menu Logic (Golden Master Style)
 */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('is-open');
        });

        // Close on link click
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                if (window.innerWidth <= 768) {
                    menu.classList.remove('active');
                    toggle.classList.remove('is-open');
                }

                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
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
                } else if (targetId === '#') {
                    setTimeout(() => {
                        gsap.to(window, {
                            duration: 1.5,
                            scrollTo: 0,
                            ease: 'power3.inOut'
                        });
                    }, 50);
                }
            });
        });
    }
}

/**
 * Custom Cursor (Golden Master Standards)
 */
function initCustomCursor() {
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

        function animate() {
            cursorX = lerp(cursorX, mouseX, 0.15);
            cursorY = lerp(cursorY, mouseY, 0.15);
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(animate);
        }
        animate();
    }
}

/**
 * Scroll Reveal Effects
 */
function initFadeEffects() {
    gsap.utils.toArray('.reveal').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}
