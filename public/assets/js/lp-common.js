/**
 * LP Common JavaScript (Infrastructure for A-Z)
 * Provides common functionality like scroll animations, smooth scrolling, and basic form validation.
 */
document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    initSmoothScroll();
    initCopyrightDate();
    initCopyrightDate();
    initMobileMenu();
    initPricingTabs();

    // Optional: Form Validation (can be initialized if form exists)
    const form = document.querySelector('.js-validate-form');
    if (form) {
        initFormValidation(form);
    }
});

/**
 * 1. Scroll Observer
 * Adds 'is-visible' class to elements when they enter the viewport.
 */
function initScrollObserver() {
    const targets = document.querySelectorAll('.js-scroll-trigger');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve if animation should only happen once
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -20% 0px', // Trigger when element is 20% from bottom
        threshold: 0
    });

    targets.forEach(target => observer.observe(target));
}

/**
 * 2. Smooth Scroll
 * Smoothly scrolls to anchors starting with #
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const menuToggle = document.querySelector('.js-mobile-toggle');
                const nav = document.querySelector('.js-mobile-nav');
                if (menuToggle && nav && nav.classList.contains('is-active')) {
                    menuToggle.classList.remove('is-active');
                    nav.classList.remove('is-active');
                    document.body.style.overflow = '';
                }

                const headerOffset = 80; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 3. Copyright Year
 * Updates year in footer
 */
function initCopyrightDate() {
    const yearSpan = document.querySelector('.js-current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * 4. Mobile Menu Toggle
 * Handles hamburger menu interaction
 */
function initMobileMenu() {
    const toggle = document.querySelector('.js-mobile-toggle');
    const nav = document.querySelector('.js-mobile-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-active');
            nav.classList.toggle('is-active');

            // Prevent background scrolling when menu is open
            if (nav.classList.contains('is-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * 5. Simple Form Validation
 * @param {HTMLFormElement} form 
 */
function initFormValidation(form) {
    form.addEventListener('submit', (e) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-error');
            } else {
                input.classList.remove('is-error');
            }

            // Email Validation
            if (input.type === 'email' && input.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isValid = false;
                    input.classList.add('is-error');
                }
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('入力内容をご確認ください。');
        }
    });
}

/**
 * 6. Pricing Tabs (Mobile)
 * Syncs tab buttons with horizontal scroll
 */
function initPricingTabs() {
    const controls = document.querySelectorAll('.js-price-control');
    const container = document.querySelector('.js-pricing-grid');
    const cards = document.querySelectorAll('.js-price-card');

    if (!container || controls.length === 0) return;

    // 1. Tab Click -> Scroll
    controls.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Update UI
            controls.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            // Scroll
            const card = cards[index];
            if (card) {
                // Center the card
                const left = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
                container.scrollTo({
                    left: left,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll/Swipe -> Update Tab
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(cards).indexOf(entry.target);
                if (index !== -1) {
                    controls.forEach(b => b.classList.remove('is-active'));
                    controls[index].classList.add('is-active');
                }
            }
        });
    }, {
        root: container,
        threshold: 0.6
    });

    cards.forEach(card => observer.observe(card));
}
