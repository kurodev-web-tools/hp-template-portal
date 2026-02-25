/* Template L - Logical Portfolio JS */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial GSAP state
    gsap.registerPlugin(ScrollTrigger);

    // 2. Custom Cursor (Square Blueprint Style)
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    const speed = 0.15;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        let distX = mouseX - ballX;
        let distY = mouseY - ballY;
        ballX = ballX + (distX * speed);
        ballY = ballY + (distY * speed);

        if (cursor) {
            cursor.style.left = ballX - 15 + 'px';
            cursor.style.top = ballY - 15 + 'px';
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // 3. Grid Anim (Subtle Parallax)
    gsap.to('.blueprint-grid', {
        backgroundPosition: '50px 50px',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // 4. Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 5. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});
