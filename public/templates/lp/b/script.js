/**
 * Theme B: Brand Story - KINARI
 * Parallax effects and elegant animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initParallax();
    initFadeInAnimations();
    initSmoothScroll();
    initNewsletterForm();
});

/**
 * Header scroll effect
 * Change header style on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateHeader();
}

/**
 * Parallax Effect
 * Smooth parallax scrolling for background elements
 * Uses transform instead of background-position for better performance
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');

    if (!parallaxElements.length) return;

    let ticking = false;
    let windowHeight = window.innerHeight;

    // Update dimensions on resize
    window.addEventListener('resize', () => {
        windowHeight = window.innerHeight;
    }, { passive: true });

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(element => {
            // Skip hero background as it's handled by a unified animation loop
            if (element.classList.contains('hero__bg')) return;

            const rect = element.getBoundingClientRect();
            // speed is defined in HTML data-speed (e.g. 0.5)
            const speed = parseFloat(element.dataset.speed) || 0.5;

            // Check if element is roughly in viewport (with buffer)
            const top = rect.top + scrollY; // absolute top
            const isVisible = (top < scrollY + windowHeight + 100) && (top + rect.height > scrollY - 100);

            if (isVisible) {
                // Calculate relative scroll position
                // When element is in center of screen, offset should be 0 ideally?
                // Or just simple scroll correlation
                const offset = (scrollY * speed * 0.2); // Simplified formula for stability
                element.style.transform = `translateY(${offset}px)`;
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Initial update
    updateParallax();
}

/**
 * Fade In Animations
 * Elegant fade-in animations with staggered delays
 */
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;

                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay * 1000);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Smooth Scroll
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Newsletter Form
 * Handle newsletter form submission
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter__form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = form.querySelector('.newsletter__input');
        const btn = form.querySelector('.newsletter__btn');
        const email = input.value.trim();

        if (email && isValidEmail(email)) {
            // Simulate form submission
            btn.innerHTML = '<span>登録完了</span>';
            btn.style.background = 'var(--color-earth-light)';
            input.value = '';

            setTimeout(() => {
                btn.innerHTML = '<span>登録</span>';
                btn.style.background = '';
            }, 3000);
        } else {
            input.style.borderColor = '#EF4444';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Collection Items - Image Reveal Animation
 */
(function () {
    const collectionItems = document.querySelectorAll('.collection__item');

    if (!collectionItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target.querySelector('.collection__image');
                if (image) {
                    image.style.opacity = '0';
                    image.style.transform = 'scale(1.1)';

                    setTimeout(() => {
                        image.style.transition = 'opacity 1s ease, transform 1s ease';
                        image.style.opacity = '1';
                        image.style.transform = 'scale(1)';
                    }, 100);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    collectionItems.forEach(item => {
        observer.observe(item);
    });
})();

/**
 * Philosophy Section - Line Draw Animation
 */
(function () {
    const philosophySection = document.querySelector('.philosophy');
    if (!philosophySection) return;

    const titleLines = philosophySection.querySelectorAll('.philosophy__title-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                titleLines.forEach((line, index) => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateX(-30px)';

                    setTimeout(() => {
                        line.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        line.style.opacity = '1';
                        line.style.transform = 'translateX(0)';
                    }, index * 200);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const title = philosophySection.querySelector('.philosophy__title');
    if (title) observer.observe(title);
})();

/**
 * Journal Cards - Staggered Entrance
 */
(function () {
    const journalItems = document.querySelectorAll('.journal__item');

    if (!journalItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    journalItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
})();

/**
 * Atmosphere Quote - Typewriter Effect
 */
(function () {
    const atmosphereSection = document.querySelector('.atmosphere');
    if (!atmosphereSection) return;

    const quote = atmosphereSection.querySelector('.atmosphere__quote');
    const cite = atmosphereSection.querySelector('.atmosphere__cite');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (cite) {
                    cite.style.opacity = '0';
                    cite.style.transform = 'translateY(10px)';

                    setTimeout(() => {
                        cite.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
                        cite.style.opacity = '0.8';
                        cite.style.transform = 'translateY(0)';
                    }, 500);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.4
    });

    if (quote) observer.observe(quote);
})();

/**
 * Instagram Grid - Wave Animation
 */
(function () {
    const instagramItems = document.querySelectorAll('.footer__instagram-item');

    if (!instagramItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    instagramItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
})();

/**
 * Hero Title - Character by Character Reveal
 */
(function () {
    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lines = entry.target.querySelectorAll('.hero__title-line');

                lines.forEach((line, lineIndex) => {
                    const text = line.textContent;
                    line.innerHTML = '';

                    text.split('').forEach((char, charIndex) => {
                        const span = document.createElement('span');
                        span.textContent = char === ' ' ? '\u00A0' : char;
                        span.style.display = 'inline-block';
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(20px)';
                        span.style.transition = `opacity 0.6s ease ${charIndex * 0.05}s, transform 0.6s ease ${charIndex * 0.05}s`;

                        line.appendChild(span);

                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, 500 + (lineIndex * 1000) + (charIndex * 50));
                    });
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(heroTitle);
})();

/**
 * Scroll Progress Indicator
 * Optional: Add scroll progress bar
 */
(function () {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: var(--color-earth);
        z-index: 9999;
        transition: width 0.1s linear;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    let ticking = false;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        progressBar.style.width = progress + '%';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
})();

/**
 * Hero Section Animation
 * Unified handling for Scroll Parallax + Mouse Movement
 */
function initHeroAnimation() {
    if (window.matchMedia('(pointer: coarse)').matches) {
        // Mobile: Scroll only parallax for hero (Simplified)
        let ticking = false;
        const heroBg = document.querySelector('.hero__bg');
        if (!heroBg) return;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        const speed = parseFloat(heroBg.dataset.speed) || 0.5;
                        const offset = (scrollY * speed * 0.2);
                        heroBg.style.transform = `translateY(${offset}px) scale(1.05)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        return;
    }

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroBg = hero.querySelector('.hero__bg');
    if (!heroBg) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });

    function animate() {
        // Smooth mouse movement
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        scrollY = window.scrollY;

        // Only calculate if hero is visible
        if (scrollY < window.innerHeight) {
            const speed = parseFloat(heroBg.dataset.speed) || 0.5;
            const parallaxOffset = (scrollY * speed * 0.2);

            const moveX = currentX * 15;
            const moveY = (currentY * 15) + parallaxOffset;

            heroBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Replace the previous anonymous function with the call
initHeroAnimation();
