/**
 * Theme A: App Showcase - TaskFlow
 * Interactive Mockup and Theme-specific JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initPricingToggle();
    initFAQAccordion();
    initInteractiveMockup();
    initScrollResponsiveMockup();
    initDynamicDate();
});

/**
 * Pricing Toggle
 * Toggle between monthly and yearly pricing
 */
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    if (!toggle) return;

    const monthlyLabels = document.querySelectorAll('[data-period="monthly"]');
    const yearlyLabels = document.querySelectorAll('[data-period="yearly"]');
    const priceAmounts = document.querySelectorAll('.pricing-card__amount[data-monthly]');

    toggle.addEventListener('change', () => {
        const isYearly = toggle.checked;

        // Update label styles
        monthlyLabels.forEach(label => {
            label.classList.toggle('pricing__toggle-label--active', !isYearly);
        });
        yearlyLabels.forEach(label => {
            label.classList.toggle('pricing__toggle-label--active', isYearly);
        });

        // Update prices
        priceAmounts.forEach(amount => {
            const monthlyPrice = amount.getAttribute('data-monthly');
            const yearlyPrice = amount.getAttribute('data-yearly');
            if (isYearly && yearlyPrice) {
                amount.textContent = yearlyPrice;
            } else if (monthlyPrice) {
                amount.textContent = monthlyPrice;
            }
        });
    });
}

/**
 * FAQ Accordion
 * Expand/collapse FAQ items
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('is-open');
                }
            });

            // Toggle current item
            item.classList.toggle('is-open', !isOpen);
        });
    });
}

/**
 * Interactive Mockup
 * Handle card interactions in the interactive phone mockup
 */
function initInteractiveMockup() {
    const cards = document.querySelectorAll('.interactive-app__card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a visual feedback effect
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);

            // Simulate card movement between columns
            const currentColumn = card.closest('.interactive-app__column');
            const columns = document.querySelectorAll('.interactive-app__column');
            const currentIndex = Array.from(columns).indexOf(currentColumn);

            // Move to next column (cycle back to first if at end)
            const nextIndex = (currentIndex + 1) % columns.length;
            const nextColumn = columns[nextIndex];

            if (nextColumn && nextColumn !== currentColumn) {
                // Animate the move
                card.style.opacity = '0';
                card.style.transform = 'translateX(20px)';

                setTimeout(() => {
                    nextColumn.querySelector('.interactive-app__cards').appendChild(card);
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';

                    // Update card status based on column
                    if (nextColumn.getAttribute('data-column') === 'done') {
                        card.classList.add('interactive-app__card--done');
                    } else {
                        card.classList.remove('interactive-app__card--done');
                    }
                }, 200);
            }
        });
    });
}

/**
 * Scroll Responsive Mockup
 * The phone mockup responds to scroll position
 */
function initScrollResponsiveMockup() {
    const mockup = document.querySelector('.interactive-phone');
    if (!mockup) return;

    const cards = mockup.querySelectorAll('.interactive-app__card');
    const finger = mockup.querySelector('.interactive-phone__finger');

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateMockup() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const mockupRect = mockup.getBoundingClientRect();

        // Check if mockup is in viewport
        if (mockupRect.top < windowHeight && mockupRect.bottom > 0) {
            const progress = 1 - (mockupRect.top / windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            // Subtle rotation based on scroll
            const rotation = (clampedProgress - 0.5) * 5;
            mockup.style.transform = `perspective(1000px) rotateY(${rotation}deg)`;

            // Animate cards based on scroll direction
            const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';

            cards.forEach((card, index) => {
                const delay = index * 0.1;
                const cardProgress = Math.max(0, Math.min(1, (clampedProgress - delay) / (1 - delay)));

                if (scrollDirection === 'down') {
                    card.style.transform = `translateY(${(1 - cardProgress) * 20}px)`;
                    card.style.opacity = 0.5 + (cardProgress * 0.5);
                }
            });

            // Animate finger indicator
            if (finger) {
                const fingerOffset = Math.sin(Date.now() / 500) * 5;
                finger.style.transform = `translateY(${fingerOffset}px)`;
            }
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateMockup);
            ticking = true;
        }
    }, { passive: true });

    // Initial update
    updateMockup();
}

/**
 * Phone Mockup Parallax Effect
 * Add subtle parallax to hero phone mockup
 */
(function () {
    const heroMockup = document.querySelector('.hero__mockup');
    if (!heroMockup) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.1;

        heroMockup.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
})();

/**
 * Smooth reveal animations for steps
 */
(function () {
    const steps = document.querySelectorAll('.step');

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        stepObserver.observe(step);
    });
})();

/**
 * Feature cards stagger animation
 */
(function () {
    const featureCards = document.querySelectorAll('.feature-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
})();

/**
 * Pricing cards animation
 */
(function () {
    const pricingCards = document.querySelectorAll('.pricing-card');

    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });

    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index === 1 ? 'translateY(30px) scale(0.95)' : 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        pricingObserver.observe(card);
    });
})();

/**
 * Testimonial cards animation
 */
(function () {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2
    });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        testimonialObserver.observe(card);
    });
})();

/**
 * Float cards animation enhancement
 */
(function () {
    const floatCards = document.querySelectorAll('.phone-mockup__float-card');

    floatCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1)';
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.zIndex = '';
        });
    });
})();

/**
 * CTA buttons pulse animation
 */
(function () {
    const ctaButtons = document.querySelectorAll('.cta__btn');

    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'none';
        });
    });
})();

/**
 * Add pulse animation keyframes dynamically
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes gentlePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
        50% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
    }
    
    .cta__btn--primary {
        animation: gentlePulse 2s infinite;
    }
    
    .cta__btn--primary:hover {
        animation: none;
    }
`;
document.head.appendChild(style);

/**
 * Dynamic Date for Mockup
 * Sets the date in the phone mockup to today
 */
function initDynamicDate() {
    const dateEl = document.querySelector('.app-ui__date');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()} 日`;
    }
}
