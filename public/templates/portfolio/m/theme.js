document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Nav with Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
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

    // Smooth Scroll & Close Menu on Nav Click
    gsap.registerPlugin(ScrollToPlugin);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (window.innerWidth <= 992 && navList && navList.classList.contains('active')) {
                toggleMenu();
            }

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
                    gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: 80 }, ease: 'power3.inOut' });
                }, 50);
            }
        });
    });

    // 3. Scroll Reveal (data-reveal elements)
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Character-level Reveal (SplitText style)
    // Target headings and hero text
    const splitTargets = document.querySelectorAll('.hero-name, .hero-title');
    splitTargets.forEach((el, elIdx) => {
        const text = el.innerText;
        el.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'split-char';
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${(elIdx * 0.2) + (i * 0.03)}s`;
            el.appendChild(span);
        });
    });

    // Trigger reveal for hero (visible immediately)
    setTimeout(() => {
        document.querySelectorAll('.hero .split-char').forEach(ch => {
            ch.classList.add('visible');
        });
    }, 200);

    // Trigger for scroll targets
    const charObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chars = entry.target.querySelectorAll('.split-char');
                chars.forEach((ch, i) => {
                    setTimeout(() => ch.classList.add('visible'), i * 30);
                });
                charObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.about-text p, .works-heading').forEach(el => {
        charObserver.observe(el.closest('section') || el);
    });

    // 5. Copy email on click
    const emailLink = document.querySelector('.contact-email');
    if (emailLink) {
        emailLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = emailLink.getAttribute('data-email');
            try {
                await navigator.clipboard.writeText(email);
                emailLink.textContent = 'Copied!';
                setTimeout(() => emailLink.textContent = email, 2000);
            } catch {
                window.location.href = `mailto:${email}`;
            }
        });
    }

});
